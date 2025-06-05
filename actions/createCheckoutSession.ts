'use server';

import { CartItem } from '@/store';
import stripe from '@/sanity/lib/stripe';
import { imageUrl } from '@/lib/imageUrl';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedCartItem = {
  product: CartItem['product'];
  quantity: number;
};

export async function createCheckoutSession(items: GroupedCartItem[], metadata: Metadata) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Some items do not have a price set');
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: customerId ? metadata.customerEmail : undefined,
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      success_url: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || 'Unnamed Product',
            description: `Product ID: ${item.product_id}`,
            metadata: {
              id: item.product_id,
            },
            images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
