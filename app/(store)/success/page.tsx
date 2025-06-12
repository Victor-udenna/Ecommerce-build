'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useCartStore from '@/store';
import successgif from '@/assets/gif.gif';
import Image from 'next/image';

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const clearBasket = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10 space-y-3 md:space-y-6">
      <Image src={successgif} alt="Success" width={200} height={200} className="w-[100px] h-auto" />
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      {orderNumber && (
        <p className="text-gray-600 max-w-md">
          Your Order number is <span className="font-semibold">{orderNumber}</span>{' '}
        </p>
      )}
      <p className="text-gray-600">A confirmation email has been sent to your registered email address.</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/orders">View Order Details</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}

export default SuccessPage;
