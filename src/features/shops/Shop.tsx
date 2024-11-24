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

  return (
    <div>
      {shopQuery.isLoading && <Loading />}
      {shop && (
        <>
          <TopSection shop={shop} />
          <ShopOverview shop={shop} />

          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <ShopProfile user={user} shop={shop} />
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
