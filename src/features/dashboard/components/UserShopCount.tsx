import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Skeleton from '../../../lib/Skeleton';
import StatCard3 from '../../../lib/StatCard3';
import { HiHome, HiUser } from 'react-icons/hi';

const UserShopCount = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getUserShopCountQuery = zeapApiSlice.useGetUserShopCountAnalyticsQuery(
    {},
    { skip: !token },
  );
  const isLoading = getUserShopCountQuery.isLoading;
  const userShopCount = getUserShopCountQuery.data?.data;
  console.log('userShopCount', userShopCount);
  const user = userShopCount?.user;
  const shop = userShopCount?.shop;
  return (
    <div>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user && (
            <StatCard3
              title={user?.label}
              value={user?.count}
              icon={<HiUser className="text-darkGold text-3xl" />}
            />
          )}
          {shop && (
            <StatCard3
              title={shop?.label}
              value={shop?.count}
              icon={<HiHome className="text-darkGold text-3xl" />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserShopCount;
