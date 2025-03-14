import { useState } from 'react';
import {
  BasketInterface,
  OrderInterface,
  ShopInterface,
  UserInterface,
  WishlistInterface,
} from '../../../interface/interface';
import UserDetailNav from './UserDetailNav';
import UserProfilePaper from './UserProfilePaper';
import UserTile from './UserTile';
import UserProfileOverview from './UserProfileOverview';
import UserInfo from './UserInfo';
import UserActions from './UserActions';
import SignInInfo from './SignInInfo';
import UserShops from './UserShops';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import OrderCard from '../../orders/components/OrderCard';
import { Alert } from 'flowbite-react';
import BasketCard from '../../basket/components/BasketCard';
import UserPoints from './UserPoints';
import ProductCard from '../../products/components/ProductCard';
import UserVoucherList from './UserVoucherList';

const UserLayout = ({
  users,
  user,
  shops,
}: {
  users: UserInterface[];
  user: UserInterface;
  shops: ShopInterface[];
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const voucherQuery = zeapApiSlice.useGetVouchersQuery(
    { user: user?._id },
    { skip: !token || !user?._id },
  );

  const ordersQuery = zeapApiSlice.useGetOrdersQuery(
    {
      user: user?._id,
    },
    { skip: !token || !user?._id },
  );
  const basketsQuery = zeapApiSlice.useGetBasketsQuery(
    {
      user: user?._id,
    },
    { skip: !token || !user?._id },
  );
  const getPointsQuery = zeapApiSlice.useGetPointsQuery(
    { user_id: user?._id },
    { skip: !token || !user?._id },
  );
  const getWishlistQuery = zeapApiSlice.useGetWishListQuery(
    { user_id: user?._id },
    { skip: !token || !user?._id },
  );

  const baskets = basketsQuery?.data?.data;
  const orders = ordersQuery?.data?.data;
  const vouchers = voucherQuery?.data?.data;
  const points = getPointsQuery?.data?.data;
  const wishlist = getWishlistQuery?.data?.data;
  const isLoading =
    ordersQuery.isLoading ||
    voucherQuery.isLoading ||
    basketsQuery.isLoading ||
    getPointsQuery.isLoading ||
    getWishlistQuery.isLoading;
  const [value, setValue] = useState('Overview');
  return (
    <div className="grid grid-cols-6 gap-4 md:divide-x h-screen">
      <UserActions user={user} />
      <div className="hidden md:flex flex-col col-span-2">
        <span className="border p-1 border-success border-4 mb-4">
          <UserTile user={user} />
        </span>
        {users
          .filter((person) => person?.userId !== user?.userId)
          .map((user) => {
            return (
              <div key={user._id}>
                <UserTile user={user} />
              </div>
            );
          })}
      </div>
      <div className="col-span-6 md:col-span-4 ">
        <div className="flex justify-center w-full">
          <UserProfilePaper user={user} />
        </div>
        <div className="p-2 flex justify-center mt-2 mb-3">
          <UserDetailNav setValue={setValue} value={value} />
        </div>

        <div className="md:p-2">
          {isLoading && <Loading />}
          {value === 'Bio' && (
            <div className="flex flex-col gap-4  md:hidden ">
              <UserInfo user={user} />
              <SignInInfo user={user} />
            </div>
          )}
          {value === 'Overview' && (
            <div className="flex  gap-4 w-full justify-center">
              <span className="hidden md:flex flex-col w-full h-fit">
                <UserInfo user={user} />
                <SignInInfo user={user} />
              </span>
              <span className="w-full">
                <UserProfileOverview
                  setValue={setValue}
                  shopsNumber={shops?.length || 0}
                  wishesNumber={wishlist?.length || 0}
                  ordersNumber={orders?.length || 0}
                  vouchersNumber={vouchers?.length || 0}
                  basketsNumber={baskets?.length || 0}
                />
              </span>
            </div>
          )}
          {value === 'Orders' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  ">
              {orders.map((order: OrderInterface) => (
                <div key={order?.orderId}>
                  <OrderCard order={order} />
                </div>
              ))}
              {orders.length === 0 && (
                <Alert color="info">No orders found</Alert>
              )}
            </div>
          )}
          {value === 'Vouchers' && (
            <div>
              {vouchers?.length > 0 && (
                <UserVoucherList vouchers={vouchers} user={user} />
              )}
              {vouchers?.length === 0 && (
                <Alert color="info">No vouchers found</Alert>
              )}
            </div>
          )}
          {value === 'Cart' && (
            <div>
              {baskets.map((basket: BasketInterface) => (
                <div key={basket?.basketId}>
                  <BasketCard basket={basket} />
                </div>
              ))}
              {baskets?.length === 0 && (
                <Alert color="info">No vouchers found</Alert>
              )}
            </div>
          )}
          {value === 'Wishes' && (
            <div className=" grid grid-cols-2   gap-5 w-full items-center justify-center cursor-pointer">
              {wishlist.map((wish: WishlistInterface) => (
                <div key={wish._id}>
                  <ProductCard
                    key={wish.product?.productId}
                    product={wish.product}
                  />
                </div>
              ))}
              {baskets?.length === 0 && (
                <Alert color="info">No product in wishlist</Alert>
              )}
            </div>
          )}

          {value === 'Shops' && (
            <div>
              <UserShops shops={shops} />
            </div>
          )}
          {value === 'Points' && (
            <div>
              <UserPoints points={points} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
