import { useState } from 'react';
import DateFilter from '../../../lib/DateFilter';
import { dateCalcHelper } from '../../../utils/dateCalcHelper';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Skeleton from '../../../lib/Skeleton';

const ProductOrderCountByDate = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const thisMonthFirstDay = dateCalcHelper.getThisMonthFirstDay();
  const thisMonthLastDay = dateCalcHelper.getThisMonthLastDay();
  const [toDate, setToDate] = useState<Date>(new Date(thisMonthLastDay));
  const [fromDate, setFromDate] = useState<Date>(new Date(thisMonthFirstDay));
  const getProductOrdersCountByDateAnalyticsQuery =
    zeapApiSlice.useGetProductOrdersCountByDateAnalyticsQuery(
      { fromDate, toDate },
      { skip: !token },
    );
  const isLoading = getProductOrdersCountByDateAnalyticsQuery.isLoading;
  const productOrdersCountByDateAnalytics =
    getProductOrdersCountByDateAnalyticsQuery.data?.data || 0;

  return (
    <div className="flex flex-col items-center  w-full h-full border border-gray-200 rounded-lg p-4 bg-grey8 shadow-lg dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between my-1 w-full">
        <div className="text-sm">Sub Orders</div>
        <DateFilter
          from={fromDate}
          setFrom={(date: string | Date) => setFromDate(new Date(date))}
          to={toDate}
          setTo={(date: string | Date) => setToDate(new Date(date))}
        />
      </div>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <div className="flex flex-col w-45 h-45 justify-center items-center rounded-full shadow-lg bg-white dark:bg-boxdark dark:text-white  ">
          <span className="text-success font-bold text-2xl">
            {productOrdersCountByDateAnalytics}
          </span>
          <span className="text-xl">Orders</span>
        </div>
      )}
    </div>
  );
};

export default ProductOrderCountByDate;
