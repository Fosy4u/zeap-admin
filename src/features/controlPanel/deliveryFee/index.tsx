import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { DeliveryFeeInterface } from '../../../interface/interface';
import DeliveryFeeDetails from './DeliveryFeeDetails';
import { Alert, Badge } from 'flowbite-react';
import { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

const DeliveryFee = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showInfo, setShowInfo] = useState(true);
  const getDeliveryFeesQuery = zeapApiSlice.useGetDeliveryFeesQuery(
    {},
    { skip: !token },
  );
  const deliveryFees = getDeliveryFeesQuery.data?.data;

  const isLoading = getDeliveryFeesQuery.isLoading;

  return (
    <div className="h-[90vh] overflow-y-auto">
      {' '}
      <div className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xl ">Delivery Fees</h1>
        </div>
      </div>
      {!showInfo && (
        <div className="flex justify-end mb-4">
          <Badge
            color="info"
            icon={HiInformationCircle}
            className="cursor-pointer w-fit"
            size="xs"
            onClick={() => setShowInfo(true)}
          >
            Show Info
          </Badge>
        </div>
      )}
      {showInfo && (
        <Alert
          color="info"
          icon={HiInformationCircle}
          onDismiss={() => setShowInfo(false)}
          rounded
        >
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-semibold"> Note:</span>Total Delivery fee of
              a basket is calculated based on quantity, location, delivery
              method, and free delivery threshold when enabled for the location
            </span>
            <ul className="list-disc pl-5">
              <li>
                <span className="font-semibold">Location:</span> Different
                locations can have different delivery fees.
              </li>
              <li>
                <span className="font-semibold">Quantity:</span> For local
                deliveries within Nigeria, the delivery fee is subject to a 50%
                increment for each additional item included in the basket. In
                the case of international deliveries, the delivery fee increases
                by 70% for every additional item
              </li>

              <li>
                <span className="font-semibold">Delivery Method:</span>{' '}
                Different delivery methods can have different fees. Note that
                Nigeria has only standard method.
              </li>
              <li>
                <span className="font-semibold">Free Delivery Threshold:</span>{' '}
                If enabled, delivery fee is waived if the basket total exceeds a
                certain amount.
              </li>
            </ul>
            <span></span>
          </div>
        </Alert>
      )}
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
