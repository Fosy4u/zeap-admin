import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Skeleton from '../../../lib/Skeleton';
import ProductTypeChart from './ProductTypeChart';
import ProductStatusChart from './ProductStatusChart';
import MostRatedProductBar from './MostRatedProductBar';
import MostOrderedProductBar from './MostOrderedProductBar';

const ProductOverview = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getProductAnalyticsQuery = zeapApiSlice.useGetProductAnalyticsQuery(
    {},
    { skip: !token },
  );
  const isLoading = getProductAnalyticsQuery.isLoading;
  const productAnalytics = getProductAnalyticsQuery.data?.data;

  const productTypeAnalytics = productAnalytics?.productType;
  const totalProductCount = productAnalytics?.totalProductCount;
  const productStatus = productAnalytics?.productStatus;
  const mostRatedProducts = productAnalytics?.mostRatedProducts;
  const mostOrderedProducts = productAnalytics?.mostOrderedProducts;
  return (
    <div className="my-4 w-full flex flex-col gap-4">
      {isLoading && <Skeleton />}
      <div className="text-darkGold my-2">Products Overview</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isLoading && productAnalytics && (
          <ProductTypeChart
            data={productTypeAnalytics}
            totalProductCount={totalProductCount}
            isLoading={isLoading}
          />
        )}
        {productStatus?.length > 0 && (
          <ProductStatusChart data={productStatus} isLoading={isLoading} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isLoading && productAnalytics && (
          <MostRatedProductBar
            mostRatedProducts={mostRatedProducts}
            isLoading={isLoading}
          />
        )}
        {!isLoading && productAnalytics && (
          <MostOrderedProductBar
            mostOrderedProducts={mostOrderedProducts}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ProductOverview;
