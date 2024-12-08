import { BasketItemIterface } from '../../../interface/interface';
import NoPic from '../../../images/icon/noPhoto.png';
import { globalSelectors } from '../../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../utils/helpers';

const BasketItem = ({ item }: { item: BasketItemIterface }) => {
  const currency = useSelector(globalSelectors.selectCurrency);
  const product = item.product;
  const quantity = item.quantity;
  const sku = item.sku;
  const variations = product?.variations;
  const variation = variations?.find((variation) => variation.sku === sku);
  const size = variation?.size;
  const color = variation?.colorValue;
  const getDefaultImageLink = () => {
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
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center gap-4">
        <img
          src={getDefaultImageLink()}
          alt="product"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <div className="text-xs md:text-sm text-gray-900 dark:text-white">
            {product?.title}
          </div>
          <div className="text-sm text-slate-400 flex flex-col md:flex-row gap-2">
            {size && <span>Size: {size}</span>}
            {color && <span>Color: {color}</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 text-black">
        <div className="text-sm font-semibold  border border-gray-200 rounded-md px-2">
          {quantity}
        </div>
        <div className="text-sm font-semibold text-black">
          {currency?.symbol}
          {numberWithCommas(Number(item?.price))}
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
