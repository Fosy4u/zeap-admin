import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../../redux/services/global.slice';

import Loading from '../../../lib/Loading';
import { useEffect, useState } from 'react';
import { ShopInterface } from '../../../interface/interface';
import ShopHeader from '../../shops/components/ShopHeader';
import { Alert } from 'flowbite-react';
import NewShopTable from './NewShopTable';

const NewShops = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredShops, setFilteredShops] = useState([]);
  const [input, setInput] = useState('');
  const shopsQuery = zeapApiSlice.useGetNewShopsQuery({}, { skip: !token });
  const shops = shopsQuery?.data?.data;

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
    if (shops?.length > 0) {
      const result = shops?.filter((row: ShopInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ShopInterface]);
        });
      });

      setFilteredShops(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, shops]);

  return (
    <div>
      <ShopHeader setInput={setInput} title={'New Shops'} />

      {shops?.length === 0 && !shopsQuery.isLoading && (
        <Alert color="info">No disabled shops found.</Alert>
      )}
      {shopsQuery.isLoading && <Loading />}
      {shops?.length > 0 && !shopsQuery.isLoading && (
        <Alert color="info" className="mb-5">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">New Shops</span>
            <span className="text-sm">These shops are newly registered.</span>
            <span className="text-sm">
              To change a shop's status, go to the shop's detail page and click
              on the status badge under the shop actions floating button.
            </span>
          </div>
        </Alert>
      )}
      {filteredShops?.length > 0 && <NewShopTable shops={filteredShops} />}
    </div>
  );
};

export default NewShops;
