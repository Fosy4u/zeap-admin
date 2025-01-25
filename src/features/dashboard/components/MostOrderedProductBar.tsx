import { Badge } from 'flowbite-react';

import { NavLink } from 'react-router-dom';
import Skeleton from '../../../lib/Skeleton';

const MostOrderedProductBar = ({
  mostOrderedProducts,
  isLoading,
}: {
  mostOrderedProducts: any[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
      <span className=" text-sm font-semibold dark:text-white">
        Most Ordered Products
      </span>
      <div className="flex flex-col gap-2">
        {isLoading && <Skeleton />}
        {mostOrderedProducts.map((item: any) => (
          <NavLink
            to={`/product/${item?.product._id}`}
            key={item?.product._id}
            className="flex gap-2 justify-between px-4 shadow-md py-2 rounded-full dark:bg-boxdark dark:text-white border dark:border-slate-400 cursor-pointer"
          >
            <div className="text-xs md:text-sm">
              {item?.product?.title} <strong></strong>
            </div>
            <Badge color="info" className="text-md font-bold">
              {item?.quantity}
            </Badge>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MostOrderedProductBar;
