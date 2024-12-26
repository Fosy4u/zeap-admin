import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../redux/services/global.slice';

import Loading from '../../lib/Loading';
import { useEffect, useState } from 'react';

import { PaymentInterface } from '../../interface/interface';
import PaymentHeader from './components/PaymentHeader';
import PaymentTable from './components/PaymentTable';

const Payments = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [input, setInput] = useState('');
  const paymentsQuery = zeapApiSlice.useGetPaymentsQuery({}, { skip: !token });
  const payments = paymentsQuery?.data?.data;

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

  const searchRegex = new RegExp(escapeRegExp(input), 'i');
  // recursive search function
  const search = (item: any) => {
    let found = false;

    if (typeof item === 'string') {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (payments?.length > 0) {
      const result = payments?.filter((row: PaymentInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof PaymentInterface]);
        });
      });

      setFilteredPayments(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, payments]);

  return (
    <div>
      <PaymentHeader setInput={setInput} title={'Payments'} />

      {payments?.length === 0 && !paymentsQuery.isLoading && (
        <div>No payments found</div>
      )}
      {paymentsQuery.isLoading && <Loading />}
      {filteredPayments?.length > 0 && (
        <PaymentTable payments={filteredPayments} />
      )}
    </div>
  );
};

export default Payments;
