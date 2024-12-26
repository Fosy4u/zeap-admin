import { ProductInterface } from '../../../interface/interface';
import ProductCard from './ProductCard';

// import { HiChevronRight } from "react-icons/hi";
// import { NavLink } from "react-router-dom";

const ProductTileList = ({
  products = [],
}: {
  products: ProductInterface[];
}) => {
  // const getProductTypeLabel = (type:string) => {

  //     if(type === "readyMadeCloth") return "Ready Made Cloth"
  //     if(type ==="readyMadeShoe") return "Ready Made Footwear"
  //     if(type ==="accessory") return "Accessory"
  // }

  return (
    <div className="flex flex-col md:mt-16">
      <div className="md:hidden grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 w-full items-center justify-center cursor-pointer">
        {products?.map((product: ProductInterface) => (
          <ProductCard key={product?.productId} product={product} />
        ))}
      </div>

      <div className="hidden md:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 w-full  items-center justify-center cursor-pointer">
        {products?.map((product: ProductInterface) => (
          <ProductCard key={product?.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductTileList;
