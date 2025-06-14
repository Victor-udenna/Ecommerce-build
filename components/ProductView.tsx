import { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';
import { CategorySelectorComponent } from './ui/category-selector';

interface ProductViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col w-full">
      <div>
        <CategorySelectorComponent categories={categories} />
      </div>
      <div className=" mt-5 w-full flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
