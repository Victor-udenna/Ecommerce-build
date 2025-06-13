import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { imageUrl } from '@/lib/imageUrl';
import { PortableText } from 'next-sanity';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-static';
export const revalidate = 60;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  const isOutOfStock = product?.stock != null && product?.stock <= 0;

  return (
    <div className="container mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Image Section */}
        <div className="lg:col-span-6 w-full">
          <div
            className={`relative aspect-square w-full overflow-hidden rounded-2xl shadow-md ${
              isOutOfStock ? 'opacity-60' : ''
            }`}
          >
            {product.image && (
              <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? 'Product image'}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                <span className="text-white font-semibold text-xl">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-2xl font-semibold text-gray-800">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(product.price ?? 0)}
            </p>

            <div className="prose prose-neutral max-w-none text-gray-700">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>
          </div>

          <div className="mt-10">
            <AddToCartButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
