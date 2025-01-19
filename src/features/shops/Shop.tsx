import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import TopSection from './components/TopSection';
import { globalSelectors } from '../../redux/services/global.slice';
import { useParams } from 'react-router-dom';
import Loading from '../../lib/Loading';
import ShopOverview from './components/ShopOverview';
import ShopActions from './components/ShopActions';
import ShopProfile from './components/ShopProfile';
import ShopProducts from './components/ShopProducts';
import ShopProductOrders from './components/ShopProductOrders';
import ShopPayments from './components/ShopPayments';

const Shop = () => {
  const { id } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const shopQuery = zeapApiSlice.useGetShopQuery(
    {
      shopId: id,
    },
    { skip: !token || !id },
  );
  const shop = shopQuery?.data?.data;
  const user = shop?.user;
  const shopAnalyticsQuery = zeapApiSlice.useGetShopAnalyticsQuery(
    { shopId: id },
    { skip: !shop || !token },
  );
  const shopAnalytics = shopAnalyticsQuery?.data?.data;
  const isLoading = shopQuery.isLoading || shopAnalyticsQuery.isLoading;

  return (
    <div>
      {isLoading && <Loading />}
      {shop && shopAnalytics && (
        <>
          <TopSection shop={shop} shopAnalytics={shopAnalytics} />
          <ShopOverview shopAnalytics={shopAnalytics} />
          <ShopProductOrders shop_id={shop._id} />
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-1">
              <ShopProfile user={user} shop={shop} />
              <ShopPayments shopId={shop.shopId} />
            </div>
            <div className="col-span-3">
              <ShopProducts shopId={shop.shopId} />
            </div>
          </div>
          <ShopActions shop={shop} />
        </>
      )}
    </div>
  );
};

export default Shop;
