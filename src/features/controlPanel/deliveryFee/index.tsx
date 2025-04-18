import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { DeliveryFeeInterface } from '../../../interface/interface';
import DeliveryFeeDetails from './DeliveryFeeDetails';
import { Alert } from 'flowbite-react';

const DeliveryFee = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const getDeliveryFeesQuery = zeapApiSlice.useGetDeliveryFeesQuery(
    {},
    { skip: !token },
  );
  const deliveryFees = getDeliveryFeesQuery.data?.data;

  const isLoading = getDeliveryFeesQuery.isLoading;

  return (
    <div>
      {' '}
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xl ">Delivery Fees</h1>
        </div>
      </div>
      <Alert color="info">
        <div className="flex flex-col gap-2">
          <span>
            <span className="font-semibold"> Note:</span>Total Delivery fee of a
            basket is calculated by quantity of items in the basket. one
            quantity incurs the set delivery fee for the country; while
            subsequent quantities incurs 30% of the set delivery fee.
          </span>
          <span>
            For example, if the set delivery fee is 1000, the first quantity
            incurs 1000, while the second quantity incurs 300.
          </span>
          <span></span>
        </div>
      </Alert>
      <div className="p-4 flex flex-col  items-center h-full w-full">
        {isLoading && <Loading />}
        {deliveryFees?.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {deliveryFees.map((deliveryFee: DeliveryFeeInterface) => (
              <div key={deliveryFee._id}>
                <DeliveryFeeDetails deliveryFee={deliveryFee} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryFee;
