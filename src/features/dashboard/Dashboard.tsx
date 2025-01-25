import { globalSelectors } from '../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import OrderOverview from './components/OrderOverview';
import ProductOverview from './components/ProductOverview';
import Skeleton from '../../lib/Skeleton';
import UserShopCount from './components/UserShopCount';

const Dashboard = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getGenralProductAnalyticsQuery =
    zeapApiSlice.useGetProductOrderAnalyticsQuery({}, { skip: !token });
  const getCountAnalyticsQuery = zeapApiSlice.useGetCountAnalyticsQuery(
    {},
    { skip: !token },
  );
  const isLoading =
    getGenralProductAnalyticsQuery.isLoading ||
    getCountAnalyticsQuery.isLoading;
  const productOrderAnalytics = getGenralProductAnalyticsQuery.data?.data;
  const countAnalytics = getCountAnalyticsQuery.data?.data;

  return (
    <div>
      {isLoading && <Skeleton />}

      <div className="flex flex-col gap-4 h-100">
        <UserShopCount />
        {!isLoading && productOrderAnalytics && (
          <OrderOverview
            productOrderAnalytics={productOrderAnalytics}
            countAnalytics={countAnalytics}
          />
        )}
        <ProductOverview />
      </div>
    </div>
  );
};

export default Dashboard;
