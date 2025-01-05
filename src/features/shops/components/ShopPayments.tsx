import { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { Alert, Button } from 'flowbite-react';

import ShopPaymentCard from './ShopPaymentCard';

const ShopPayments = ({ shopId }: { shopId: string }) => {
  const [limit, setLimit] = useState(3);
  const token = useSelector(globalSelectors.selectAuthToken);
  const shopPaymentsQuery = zeapApiSlice.useGetShopPaymentsQuery(
    { shopId },
    { skip: !token || !shopId },
  );
  const isLoading = shopPaymentsQuery.isLoading;
  const shopPayments = shopPaymentsQuery?.data?.data;
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        {isLoading && <Loading />}
        <h5 className="text-xl font-bold text-darkGold">
          Shop Payments ({shopPayments?.length})
        </h5>
        <Button
          color="primary"
          size="xs"
          onClick={() => setLimit(limit === 3 ? shopPayments?.length : 3)}
          disabled={isLoading || !shopPayments || shopPayments.length < 3}
        >
          {limit < shopPayments?.length ? 'View Less' : 'View All'}
        </Button>
      </div>
      {shopPaymentsQuery?.status === 'fulfilled' &&
        shopPayments.length === 0 && (
          <Alert color="info" className="mb-4">
            No payments yet
          </Alert>
        )}
      <div className="flex flex-col gap-3">
        {shopPayments?.slice(0, limit).map((payment: any) => (
          <div
            key={payment._id}
            className="flex justify-center items-center w-full"
          >
            <ShopPaymentCard payment={payment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPayments;
