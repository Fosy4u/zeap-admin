import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';

import CurrencyRate from './components/CurrencyRate';

type RateType = {
  currency: string;
  rate: number;
  logs: [
    {
      currency: string;
      date: Date;
      value: number;
      user: {
        firstName: string;
        lastName: string;
        imageUrl: {
          name: string;
          link: string;
        };
      };
    },
  ];
};

const ExchangeRate = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getExchangeRateQuery = zeapApiSlice.useGetExchangeRateQuery(
    {},
    { skip: !token },
  );
  const isLoading = getExchangeRateQuery.isLoading;
  const exchangeRate = getExchangeRateQuery.data?.data;

  return (
    <div>
      {' '}
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">Exchange Rate</h1>
        </div>
      </div>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-8">
        {exchangeRate?.length > 0 &&
          exchangeRate.map((rate: RateType) => (
            <div key={rate.currency}>
              <CurrencyRate rateInfo={rate} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExchangeRate;
