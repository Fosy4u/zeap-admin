import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';

import { globalSelectors } from '../../redux/services/global.slice';
import { useParams } from 'react-router-dom';
import Loading from '../../lib/Loading';
import { Alert } from 'flowbite-react';
import PaymentSideA from './components/PaymentSideA';
import PaymentSideB from './components/PaymentSideB';
import PaymentHeader from './components/PaymentHeader';
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

  return (
    <div>
      <PaymentHeader showSearchBar={false} title={`Payment - ${reference}`} />
      {paymentQuery.isLoading && <Loading />}
      {paymentQuery.status === 'fulfilled' && !payment && (
        <Alert color="info">Payment with reference {reference} not found</Alert>
      )}
      {payment && (
        <div className="grid grid-cols-1  sm:grid-cols-2 ">
          <PaymentSideA payment={payment} />
          <PaymentSideB payment={payment} />
        </div>
      )}
    </div>
  );
};

export default Payment;
