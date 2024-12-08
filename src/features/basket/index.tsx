import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../redux/services/global.slice';

import Loading from '../../lib/Loading';
import { useEffect, useState } from 'react';
import { BasketInterface } from '../../interface/interface';
import BasketList from './components/BasketList';
import BasketHeader from './components/BasketHeader';
import { Alert } from 'flowbite-react';

const Baskets = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredBasket, setFilteredBasket] = useState([]);
  console.log('filteredBasket', filteredBasket);
  const [input, setInput] = useState('');
  const basketsQuery = zeapApiSlice.useGetBasketsQuery({}, { skip: !token });
  const baskets = basketsQuery?.data?.data;

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
    if (baskets?.length > 0) {
      const result = baskets?.filter((row: BasketInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof BasketInterface]);
        });
      });

      setFilteredBasket(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, baskets]);

  return (
    <div>
      <BasketHeader setInput={setInput} title={'Basket'} />

      {baskets?.length === 0 && basketsQuery.status === 'fulfilled' && (
        <div>
          <Alert color="info" className="mb-4">
            No active basket found
          </Alert>
        </div>
      )}
      {basketsQuery.isLoading && <Loading />}
      {filteredBasket?.length > 0 && <BasketList baskets={filteredBasket} />}
    </div>
  );
};

export default Baskets;
