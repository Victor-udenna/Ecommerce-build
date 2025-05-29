import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { imageUrl } from '@/lib/imageUrl';
import { PortableText } from 'next-sanity';
import AddToCartButton from '@/components/AddToCartButton';

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  const isOutOfStock = product?.stock != null && product?.stock <= 0;

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div
        className={`relative w-full aspect-square overflow-hidden rounded-2xl shadow-md transition-all duration-300 ${isOutOfStock ? 'opacity-60' : ''}`}
      >
        {product.image && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name ?? 'Product image'}
            fill
            className="object-cover hover:scale-105"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
            <span className="text-white font-semibold text-xl">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <div className="text-2xl font-semibold">&#8358;{product.price?.toFixed(2)}</div>
          <div className="prose max-w-none text-gray-700">
            {Array.isArray(product.description) && <PortableText value={product.description} />}
          </div>
        </div>
        <AddToCartButton product={product} disabled={isOutOfStock}/>
      </div>
    </div>
  );
}

export default ProductPage;
