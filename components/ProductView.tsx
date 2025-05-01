import { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';

interface ProductViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col w-full">
      <div>
        {/* <CategorySelectorComponent categories={categories} /> */}
      </div>
      <div className=" w-full flex-1">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
