import { searchProductsByName } from '@/sanity/lib/products/searchProductByName';
import ProductGrid from '@/components/ProductGrid';
import Form from 'next/form';

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  console.log(query)

  const hasResults = products.length > 0;

  return (
    <div className="">
      <div className="h-full w-full container">
        <Form action={'/search'} className="w-full max-w-[500px] lg:hidden flex flex-grow  mt-2 sm:mt-0">
          <input
            type="text"
            name="query"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-[500px]"
            placeholder="Search for products"
          />
        </Form>
        <h1 className="text-3xl font-bold mb-6 text-center md:text-start pt-10">
          {hasResults && query !== undefined && `Search results for: ${query}`}
          {!hasResults && query !== undefined && `No products found for: ${query}`}
          {!hasResults && query === undefined && ''}
        </h1>

        {hasResults && query !== undefined || query !== " " ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-gray-600 text-center">Try searching with different keywords</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
