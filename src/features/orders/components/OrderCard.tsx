import { OrderInterface } from '../../../interface/interface';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import ReactTimeAgo from 'react-time-ago';
import { Badge } from 'flowbite-react';

const OrderCard = ({ order }: { order: OrderInterface }) => {
  const user = order?.user;
  const productOrders = order?.productOrders;
  const isCancelled = order?.cancel?.isCancelled;
  // const fulfilled =
  //   !productOrders?.find(
  //     (productOrder) => productOrder.status !== 'order delivered',
  //   ) && !isCancelled;

  // const getDateColor = (date: Date) => {
  //   const diffTime = Math.abs(new Date().getTime() - new Date(date).getTime());
  //   const diff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //   console.log('diff', diff);
  //   if (diff >= 3) {
  //     return '#F44336';
  //   }
  //   return '#219653';
  // };
  const calcProgress = () => {
    const total = productOrders?.length;
    const completed = productOrders?.filter(
      (productOrder) => productOrder?.status?.value === 'order delivered',
    ).length;
    return ((completed / total) * 100).toFixed(2);
  };
  return (
    <div className="overflow-scroll cursor-pointer   rounded shadow-md  light:shadow-slate-200 dark:shadow-slate-800 bg-grey8 dark:bg-grey2 dark:text-white mt-2 hover:shadow-2xl transition duration-300">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded  ">
              <img
                src={user?.imageUrl?.link || NoPic}
                alt="User"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded"
              />
            </span>
            <div className="flex flex-col">
              {user?._id && (
                <span className="text-sm">
                  {capitalizeFirstLetter(user?.firstName)}{' '}
                  {capitalizeFirstLetter(user?.lastName)}
                </span>
              )}
              <Badge>{order?.orderId}</Badge>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              {isCancelled && <Badge color="red">Cancelled</Badge>}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Placed on
            </span>
            <span>
              <ReactTimeAgo date={order?.createdAt} locale="en-US" />
            </span>
          </div>
        </div>
        {productOrders?.length > 0 && (
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
              <span className="dark:text-slate-300 text-slate-500 text-xs">
                Progress - <strong>{calcProgress()}%</strong>
              </span>
              <div className="flex items-center">
                <progress
                  id={order?.orderId}
                  max="100"
                  value={calcProgress()}
                  className="block w-100% overflow-hidden rounded bg-white [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
                >
                  {calcProgress()}%
                </progress>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
