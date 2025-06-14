'use client';
import { ClerkLoaded, SignedIn, UserButton, useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import useCartStore from '@/store';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  const [isMobileNav, setIsMobileNav] = useState(false);

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error('Error creating passkey:', err);
    }
  };

  const openMenu = () => {
    setIsMobileNav(!isMobileNav);
  };

  useEffect(() => {
    setIsMobileNav(false);
  }, [pathname]);
  return (
    <>
      <header className="fixed w-full top-0 left-0 right-0 bg-white z-20">
        <div className="flex flex-wrap container  w-full items-center justify-between">
          <div className="flex items-center flex-1 gap-3.5">
            <Link href="/" className="text-2xl font-bold text-black hover:opacity-50 cursor-pointer">
              Shopr
            </Link>
            <Form action={'/search'} className="w-full  max-w-[500px] hidden lg:flex lg:flex-grow  mt-2 sm:mt-0">
              <input
                type="text"
                name="query"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-[500px]"
                placeholder="Search for products"
              />
            </Form>
          </div>
          <div className="hidden  lg:flex items-center gap-3.5  mt-4 sm:flex-none sm:mt-0">
            <Link
              href={'/cart'}
              className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center text-blue font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 11-1 9" />
                <path d="m19 11-4-7" />
                <path d="M2 11h20" />
                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                <path d="M4.5 15.5h15" />
                <path d="m5 11 4-7" />
                <path d="m9 11 1 9" />
              </svg>

              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </Link>
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href={'/orders'}
                  className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center  text-black font-semibold py-2 px-2 rounded"
                >
                  <span>Orders</span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center">
                  <UserButton />
                </div>
              ) : (
                <SignInButton mode="modal" />
              )}

              {user?.passkeys?.length === 0 && (
                <button
                  onClick={createClerkPasskey}
                  className="bg-white hover:bg-slate-800 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border "
                >
                  Create a Passkey now
                </button>
              )}
            </ClerkLoaded>
          </div>

          <ClerkLoaded>
            <div className="flex items-center gap-7">
              <button
                onClick={() => {
                  router.push('/search');
                }}
                className="flex items-center gap-2 relative"
              >
                {pathname.includes('/search') ? (
                  <svg
                    fill="none"
                    className="lg:hidden"
                    height="32"
                    viewBox="0 0 16 16"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="m12.0153 11.0728 2.8548 2.8541-.9432.9431-2.8541-2.8548c-1.0619.8514-2.38284 1.3144-3.7439 1.3125-3.31135 0-5.99882-2.6875-5.99882-5.99886 0-3.31135 2.68747-5.99882 5.99882-5.99882 3.3113 0 5.9988 2.68747 5.9988 5.99882.002 1.36106-.4611 2.68196-1.3124 3.74396zm-1.3371-.4946c.8459-.86991 1.3184-2.03598 1.3164-3.24936 0-2.57816-2.08821-4.66575-4.6657-4.66575-2.57816 0-4.66575 2.08759-4.66575 4.66575 0 2.57749 2.08759 4.66576 4.66575 4.66576 1.21338.0019 2.37945-.4705 3.2494-1.3164zm-3.3493.0833c1.84058 0 3.3327-1.49208 3.3327-3.33266 0-1.84059-1.49212-3.33268-3.3327-3.33268-1.84059 0-3.33268 1.49209-3.33268 3.33268 0 1.84058 1.49209 3.33266 3.33268 3.33266z"
                      fill="#001018"
                      fillRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="lg:hidden"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                )}
              </button>
              {/* mobile sigin button */}
              {user ? (
                <div className="flex items-center lg:hidden">
                  <UserButton />
                </div>
              ) : (
                <div className="lg:hidden">
                  {' '}
                  <SignInButton mode="modal" />
                </div>
              )}
              <button
                onClick={() => {
                  openMenu();
                }}
                className="flex items-center gap-2 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="lg:hidden"
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
                {!isMobileNav && (
                  <span className="lg:hidden absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </ClerkLoaded>
        </div>
      </header>
      {isMobileNav && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="bg-white h-screen p-5 z-10 fixed top-[70px] bottom-0 lg:hidden left-0 right-0"
        >
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex-col justify-between h-full text-2xl list-none"
          >
            <motion.li
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className={` px-2.5 font-bold mb-10 ${pathname === '/' ? 'font-bold text-black' : 'text-slate-400'}`}
            >
              <Link href="/">Home</Link>
            </motion.li>
            <motion.li
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className={` px-2.5 font-bold mb-10 ${pathname === '/cart' ? 'font-bold text-black' : 'text-slate-400'}`}
            >
              <Link className="relative" href="/cart">
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              </Link>
            </motion.li>
            <motion.li
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className={` px-2.5 font-bold mb-10 ${pathname === '/orders' ? 'font-bold text-black' : 'text-slate-400'}`}
            >
              <Link href="/orders">Orders</Link>
            </motion.li>

            {user?.passkeys?.length === 0 && (
              <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <button
                  onClick={createClerkPasskey}
                  className="bg-white hover:bg-slate-800 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border "
                >
                  Create a Passkey now
                </button>
              </motion.li>
            )}
          </motion.ul>
        </motion.div>
      )}
    </>
  );
};

export default Header;
