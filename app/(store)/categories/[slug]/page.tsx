import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/ProductView';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col items-center justify-top">
      <div className="bg-white container w-full">
        <h1 className="text-3xl font-bold mb-6 text-center lg:text-start">
          {slug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}{' '}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
