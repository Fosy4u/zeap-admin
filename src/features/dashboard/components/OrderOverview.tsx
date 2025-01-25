import { HiCash } from 'react-icons/hi';
import {
  CountAnalyticsInterface,
  ProductAnaliticsInterface,
} from '../../../interface/interface';
import StatCard2 from '../../../lib/StatCard2';
import StatCard3 from '../../../lib/StatCard3';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import ProductSalesCount from './ProductSalesCount';
import ProductOrderCountByDate from './ProductOrderCountByDate';
//import { Badge } from 'flowbite-react';
// import ProductReport from './ProductReport';

// import ProductWeeklySales from './ProductWeeklySales';

const OrderOverview = ({
  productOrderAnalytics,
  countAnalytics,
}: {
  productOrderAnalytics: ProductAnaliticsInterface;
  countAnalytics: CountAnalyticsInterface;
}) => {
  const productSold = productOrderAnalytics?.productSold;
  const ordersCountByStatus = productOrderAnalytics?.ordersCountByStatus || {};
  const productGroupsCount = productOrderAnalytics?.productGroupsCount || {};
  // const productType = countAnalytics?.productType || [];
  const basket = countAnalytics?.basket || {};
  const order = countAnalytics?.order || {};

  return (
    <div className="my-4 w-full">
      <div className="text-darkGold my-2">Orders Overview</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard2 title="Product Sold" value={productSold} />
        {Object.keys(ordersCountByStatus).length > 0 &&
          Object.keys(ordersCountByStatus).map((key) => (
            <StatCard2
              key={key}
              title={`${capitalizeFirstLetter(key)} Orders`}
              value={
                ordersCountByStatus[key as keyof typeof ordersCountByStatus]
              }
            />
          ))}
      </div>
      <div className="flex flex-col my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(productGroupsCount).length > 0 && (
            <ProductSalesCount productGroupsCount={productGroupsCount} />
          )}
          <div className="flex flex-col gap-4">
            <div className="flex  gap-2 h-30 ">
              {basket?.label && (
                <StatCard3
                  title={basket.label}
                  value={basket.count}
                  icon={<HiCash className="text-darkGold text-3xl" />}
                />
              )}
              {order?.label && (
                <StatCard3
                  title={order.label}
                  value={order.count}
                  icon={<HiCash className="text-success text-3xl" />}
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <ProductOrderCountByDate />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <ProductReport />
      </div> */}
      {/* <div>
        <ProductWeeklySales product={product} />
      </div> */}
    </div>
  );
};

export default OrderOverview;
