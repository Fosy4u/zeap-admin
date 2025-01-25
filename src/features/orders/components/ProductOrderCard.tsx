import { ProductOrdersInterface } from '../../../interface/interface';
import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  getProductOrderStatusBg,
  numberWithCommas,
} from '../../../utils/helpers';
import NoPic from '../../../images/icon/noPhoto.png';
import ReactTimeAgo from 'react-time-ago';
import { Badge } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

const ProductOrderCard = ({
  productOrder,
}: {
  productOrder: ProductOrdersInterface;
}) => {
  const status = productOrder?.status;
  const product = productOrder?.product;
  const user = productOrder?.user;
  const amount = productOrder?.amount;
  const shop = productOrder?.shop;

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
    <NavLink
      to={`/orders/product-order/${productOrder?._id}`}
      className="bg-grey8 dark:bg-boxdark dark:text-white w-[320]  rounded-md  p-4 flex flex-col gap-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <span>order# {productOrder?.orderId}</span>
        <span
          className={`text-xs w-[100px] text-center border p-2 rounded-md ${getProductOrderStatusBg(status?.value)}`}
        >
          {capitalizeFirstLetter(status.name)}{' '}
        </span>
      </div>
      <div className="flex gap-4 w-full h-25">
        <div>
          <img
            src={getDefaultImageLink()}
            alt="product"
            className="w-16 h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">{product?.title}</span>
          {amount.map((price) => (
            <strong className="text-sm" key={price.currency}>
              {getCurrencySmallSymbol(price.currency)}
              {numberWithCommas(price?.value)}
            </strong>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span>
          By {capitalizeFirstLetter(user?.firstName)}{' '}
          {capitalizeFirstLetter(user?.lastName)}
        </span>
        <span className="text-xs">
          <ReactTimeAgo date={productOrder?.createdAt} locale="en-US" />
        </span>
      </div>
      <div className="flex justify-between ">
        <div className="text-xs flex flex-col gap-1">
          <span>Shop</span>
          <Badge color="info">{shop?.shopName}</Badge>
        </div>
        <div className="text-xs flex flex-col gap-1">
          <span>Shop Payment Status</span>
          <Badge
            className="w-fit"
            color={
              productOrder?.shopRevenue?.status === 'paid'
                ? 'success'
                : 'warning'
            }
          >
            {productOrder?.shopRevenue?.status}
          </Badge>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductOrderCard;
