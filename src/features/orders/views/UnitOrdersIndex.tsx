import { Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Loading from '../../../lib/Loading';
import { globalSelectors } from '../../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import OrderHeader from '../components/OrderHeader';
import OrderList from '../components/OrderList';
import { OrderInterface } from '../../../interface/interface';

const UnitOrdersIndex = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredOrder, setFilteredOrder] = useState([]);

  const [input, setInput] = useState('');
  const ordersQuery = zeapApiSlice.useGetOrdersQuery({}, { skip: !token });
  const orders = ordersQuery?.data?.data;

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
    if (orders?.length > 0) {
      const result = orders?.filter((row: OrderInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof OrderInterface]);
        });
      });

      setFilteredOrder(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, orders]);

  return (
    <div>
      <OrderHeader setInput={setInput} title={'Main Orders'} />

      {orders?.length === 0 && ordersQuery.status === 'fulfilled' && (
        <div>
          <Alert color="info" className="mb-4">
            No active order found
          </Alert>
        </div>
      )}
      {ordersQuery.isLoading && <Loading />}
      {filteredOrder?.length > 0 && <OrderList orders={filteredOrder} />}
    </div>
  );
};

export default UnitOrdersIndex;
