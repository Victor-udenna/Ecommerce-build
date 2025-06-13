'use client';
import { ClerkLoaded, SignedIn, UserButton, useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useCartStore from '@/store';

const Header = () => {
  const { user } = useUser();
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error('Error creating passkey:', err);
    }
  };
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex flex-wrap w-full justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer  lg:mx-auto sm:0">
          Shopr
        </Link>
        <button>
          <svg
          className='lg:hidden'
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12H9" />
            <path d="M21 18H7" />
            <path d="M21 6H3" />
          </svg>
        </button>
        <Form action={'/search'} className="w-full hidden lg:flex sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
          <input
            type="text"
            name="query"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            placeholder="Search for products"
          />
        </Form>
        <div className="hidden  lg:flex items-center space-x-4 mt-4 sm:flex-none sm:mt-0">
          <Link
            href={'/cart'}
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>Cart</span>
          </Link>
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={'/order'}
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user?.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys?.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border "
              >
                Create a Passkey now
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
