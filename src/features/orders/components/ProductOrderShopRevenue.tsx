import { Badge } from 'flowbite-react';
import { ProductOrdersInterface } from '../../../interface/interface';
import ProductOrderPayShop from './ProductOrderPayShop';
import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  numberWithCommas,
} from '../../../utils/helpers';
import ReactTimeAgo from 'react-time-ago';

const ProductOrderShopRevenue = ({
  productOrder,
}: {
  productOrder: ProductOrdersInterface;
}) => {
  const shopRevenue = productOrder?.shopRevenue;

  const getShopRevenueStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'failure';
      default:
        return 'info';
    }
  };

  return (
    <>
      {productOrder && (
        <>
          <div className=" bg-grey8 p-2 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-md ">Payment Due for Vendor</span>
              <span className="text-lg font-semibold">
                {shopRevenue
                  ? `${getCurrencySmallSymbol(
                      shopRevenue?.currency,
                    )}${numberWithCommas(shopRevenue?.value)}`
                  : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-md ">Status</span>
              <Badge color={getShopRevenueStatusColor(shopRevenue?.status)}>
                {capitalizeFirstLetter(shopRevenue?.status)}
              </Badge>
            </div>
            <div className="flex flex-col">
              <span className="text-md ">Paid At</span>
              <span className="text-lg font-semibold">
                {shopRevenue?.paidAt ? (
                  <ReactTimeAgo date={shopRevenue?.paidAt} locale="en-US" />
                ) : (
                  'N/A'
                )}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-md ">Reference</span>
              <span className="text-lg font-semibold">
                {shopRevenue?.reference || 'N/A'}
              </span>
            </div>
          </div>
          <div className="my-4 flex justify-end">
            <ProductOrderPayShop productOrder={productOrder} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductOrderShopRevenue;
