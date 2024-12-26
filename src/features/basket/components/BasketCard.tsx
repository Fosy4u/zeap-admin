import { BasketInterface } from '../../../interface/interface';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import ReactTimeAgo from 'react-time-ago';
import { useState } from 'react';
import { BasketDrawer } from './BasketDrawer';

const BasketCard = ({ basket }: { basket: BasketInterface }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = basket?.user;

  const getDateColor = (date: Date) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(date).getTime());
    const diff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log('diff', diff);
    if (diff >= 3) {
      return '#F44336';
    }
    return '#219653';
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="overflow-scroll cursor-pointer   rounded shadow-md  light:shadow-slate-200 dark:shadow-slate-800 bg-grey8 dark:bg-grey2 dark:text-white mt-2 hover:shadow-2xl transition duration-300"
      >
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
              <span className="text-sm">
                {capitalizeFirstLetter(user?.firstName)}{' '}
                {capitalizeFirstLetter(user?.lastName)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="dark:text-slate-300 text-slate-500 text-xs">
                Last updated
              </span>
              <span>
                <ReactTimeAgo
                  date={basket?.updatedAt}
                  locale="en-US"
                  style={{ color: getDateColor(basket?.updatedAt) }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <BasketDrawer isOpen={isOpen} setIsOpen={setIsOpen} basket={basket} />
      )}
    </>
  );
};

export default BasketCard;