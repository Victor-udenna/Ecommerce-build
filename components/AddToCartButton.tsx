'use client';

import { Product } from '@/sanity.types';
import useCartStore from '@/store';
import { useEffect, useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-start space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center cursor-pointer justify-center
    transition-colors duration-200 ${
      itemCount === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-red hover:bg-gray-300'
    }`}
        disabled={itemCount === 0 || disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill={itemCount === 0 ? 'text-gray-400' : 'text-white'}
          viewBox="0 0 16 16"
        >
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center cursor-pointer justify-center
    transition-colors duration-200 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-slate-800'}`}
        disabled={disabled}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
    </div>
  );
}

export default AddToCartButton;
