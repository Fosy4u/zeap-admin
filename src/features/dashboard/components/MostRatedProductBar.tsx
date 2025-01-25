import { Badge } from 'flowbite-react';

import { NavLink } from 'react-router-dom';
import Skeleton from '../../../lib/Skeleton';

const MostRatedProductBar = ({
  mostRatedProducts,
  isLoading,
}: {
  mostRatedProducts: any[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
      <span className=" text-sm font-semibold dark:text-white">
        Most Rated Products
      </span>
      <div className="flex flex-col gap-2">
        {isLoading && <Skeleton />}
        {mostRatedProducts.map((item: any) => (
          <NavLink
            to={`/product/${item?.product._id}`}
            key={item?.product._id}
            className="flex gap-2 justify-between px-4 shadow-md py-2 rounded-full dark:bg-boxdark dark:text-white border dark:border-slate-400 cursor-pointer"
          >
            <div className="text-xs md:text-sm">
              {item?.product?.title} <strong></strong>
            </div>
            <Badge color="success" className="text-md font-bold">
              {item?.rating}
            </Badge>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MostRatedProductBar;
