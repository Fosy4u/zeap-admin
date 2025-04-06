import { NavLink } from 'react-router-dom';
import { ProductInterface } from '../../../interface/interface';
import NoPic from '../../../images/icon/noPhoto.png';
import { Badge } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import { getStatusBg } from '../../../utils/helpers';

const ProductCard = ({
  product,
  showStatus = false,
}: {
  product: ProductInterface;
  showStatus?: boolean;
}) => {
  const currency = useSelector(globalSelectors.selectCurrency);
  const getDefaultImageLink = (product: ProductInterface) => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      //array of color images
      const colorImages = colors.map((color) => color.images).flat();
      const isDefault = colorImages.find((image) => image.isDefault);
      if (isDefault) {
        return isDefault.link;
      }
      return colorImages[0]?.link;
    }
    return NoPic;
  };
  return (
    <NavLink key={product?.productId} to={`/product/${product?._id}`}>
      <div className="flex md:hidden flex-col light:bg-grey8 gap-2 p-2 my-2 cursor-pointer rounded-lg shadow-md duration-300 hover:scale-105 hover:shadow-lg transform overflow-hidden ">
        <img
          src={getDefaultImageLink(product)}
          alt={product?.title}
          className="w-full h-50 object-contain"
        />

        <div className="">
          <p className="mb-2 text-sm  dark:text-white text-gray-900">
            {product?.title}
          </p>
        </div>
        <div className="flex  flex-col">
          <span className="flex justify-between">
            {product?.variations[0]?.price ? (
              <p className="mr-2 text-md font-semibold text-gray-900 dark:text-white">
                {currency?.symbol}
                {product?.variations[0]?.discount ||
                  product?.variations[0]?.price}
              </p>
            ) : (
              <Badge color="failure">No price set </Badge>
            )}
            {product?.variations[0]?.discount && (
              <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300 ">
                {currency?.symbol}
                {product?.variations[0]?.price}
              </p>
            )}
          </span>
          {product?.variations[0]?.discount && (
            <p className="text-xs text-green-500">
              {product?.promo?.discountPercentage}% off
            </p>
          )}
        </div>
        {showStatus && (
          <div className="absolute right-0 top-0 h-16 w-16 ">
            <div
              className={`absolute transform rotate-45 ${getStatusBg(product?.status)} text-center  font-semibold py-1 right-[-35px] top-[32px] w-[170px]`}
            >
              {product?.status}
            </div>
          </div>
        )}
      </div>
      <div className=" hidden md:block mx-auto mt-2  transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img
          className="h-[35rem] w-full object-cover object-center"
          src={getDefaultImageLink(product)}
          alt={product?.title}
        />
        <div className="p-4 h-32">
          <h2 className="mb-2 text-sm  dark:text-white text-gray-900">
            {product?.title}
          </h2>

          <div className="flex  justify-between">
            <span className="flex flex-col">
              {product?.variations[0]?.price ? (
                <p
                  className={`mr-2 text-lg font-semibold text-gray-900 dark:text-white ${product?.variations[0]?.discount && 'line-through'}`}
                >
                  {currency?.symbol}
                  {product?.variations[0]?.price}
                </p>
              ) : (
                <Badge color="failure">No price set </Badge>
              )}
              {product?.variations[0]?.discount && (
                <p className="text-xs text-green-500">
                  {product?.promo?.discountPercentage}% off
                </p>
              )}
            </span>
            <span>
              {product?.variations[0]?.discount && (
                <p className="text-base  font-medium text-gray-500  dark:text-gray-300">
                  {currency?.symbol}
                  {product?.variations[0]?.discount}
                </p>
              )}
            </span>
          </div>

          {showStatus && (
            <div className="absolute right-0 top-0 h-16 w-16">
              <div
                className={`absolute transform rotate-45 ${getStatusBg(product?.status)} text-center  font-semibold py-1 right-[-35px] top-[32px] w-[170px]`}
              >
                {product?.status}
              </div>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
