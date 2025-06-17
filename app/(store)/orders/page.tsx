import { getMyOrder } from '@/sanity/lib/orders/getMyOrder';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { formatCurrency } from '@/lib/formatCurrency';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import emptyOrderImg from '@/assets/empty-box.png';

async function Orders() {
  const { userId } = await auth();

  if (!userId) return redirect('/');

  const orders = await getMyOrder(userId);
  console.log('Orders:', orders);

  return (
    <>
      {orders?.length === 0 ? (
        <div className="text-center h-screen text-lg flex flex-col gap-2 items-center justify-center">
          <p className="text-2xl font-bold">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center container">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">My Orders</h1>
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order?.orderNumber}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">Order Number</p>
                        <p className="text-green-700 font-mono text-sm">{order?.orderNumber}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500 mr-2">Status:</span>
                      <div
                        className={`flex flex-col w-fit pb-[4px] items-center justify-center rounded-xs px-[8px] ${
                          order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }
                          `}
                      >
                        <span className={'text-sm font-medium'}>{order.status}</span>
                      </div>
                    </div>
                    <div className="text-sm sm:text-right">
                      <p className="text-gray-500">Total Amount</p>
                      <p className="text-lg font-bold">{formatCurrency(order.totalPrice ?? 0, order.currency)}</p>
                    </div>
                  </div>

                  {order.amountDiscount ? (
                    <div className="bg-blue-50 p-4 sm:p-5">
                      <p className="text-blue-600 bold font-medium text-sm">
                        Discount Applied: {formatCurrency(order.amountDiscount, order.currency)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Original Subtotal:{' '}
                        {formatCurrency((order.totalPrice ?? 0) + order.amountDiscount, order.currency)}
                      </p>
                    </div>
                  ) : null}

                  {/* Order Items */}
                  <div className="px-4 py-4 sm:px-6 sm:py-6">
                    <p className="text-sm font-semibold text-gray-600 mb-4">Order Items</p>
                    <div className="space-y-4">
                      {order.products?.map((productItem) => {
                        const product = productItem.product;
                        return (
                          <div key={product?._id} className="flex items-center gap-4 border-b pb-3 last:border-b-0">
                            {product?.image && (
                              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={imageUrl(product.image).url()}
                                  alt={product?.name ?? 'Product'}
                                  className="object-cover"
                                  fill
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{product?.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {productItem.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;
