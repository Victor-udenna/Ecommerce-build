'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useCartStore from '@/store';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        fill="currentColor"
        className="text-green-600"
        viewBox="0 0 16 16"
      >
        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
      </svg>
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
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
