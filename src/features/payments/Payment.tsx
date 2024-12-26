import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';

import { globalSelectors } from '../../redux/services/global.slice';
import { useParams } from 'react-router-dom';
import Loading from '../../lib/Loading';
import { Alert } from 'flowbite-react';
import PaymentSideA from './components/PaymentSideA';
const Payment = () => {
  const { reference } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const paymentQuery = zeapApiSlice.useGetPaymentQuery(
    {
      reference,
    },
    { skip: !token || !reference },
  );
  const payment = paymentQuery?.data?.data;
  console.log('payment', payment);

  return (
    <div>
      {paymentQuery.isLoading && <Loading />}
      {paymentQuery.status === 'fulfilled' && !payment && (
        <Alert color="info">Payment with reference {reference} not found</Alert>
      )}
      {payment && (
        <div className="grid grid-cols-1  sm:grid-cols-2  ">
          <PaymentSideA payment={payment} />
        </div>
      )}
    </div>
  );
};

export default Payment;
