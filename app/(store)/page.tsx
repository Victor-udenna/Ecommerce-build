import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductView';
import BlackFridayBanner from '@/components/BlackFridayBanner';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="container">
      <BlackFridayBanner />
      <div className="flex flex-col  pt-10 items-center justify-top min-h-screen">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
