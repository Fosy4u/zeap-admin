import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../../redux/services/global.slice';

import Loading from '../../../lib/Loading';
import { useEffect, useState } from 'react';
import { ShopInterface } from '../../../interface/interface';
import ShopHeader from '../../shops/components/ShopHeader';
import { Alert } from 'flowbite-react';
import DisabledShopTable from './DisabledShopTable';

const DisabledShops = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredShops, setFilteredShops] = useState([]);
  const [input, setInput] = useState('');
  const shopsQuery = zeapApiSlice.useGetShopsQuery(
    {
      disabled: true,
    },
    { skip: !token },
  );
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
      <ShopHeader setInput={setInput} title={'Disabled Shops'} />

      {shops?.length === 0 && !shopsQuery.isLoading && (
        <Alert color="info">No disabled shops found.</Alert>
      )}
      {shopsQuery.isLoading && <Loading />}
      {shops?.length > 0 && !shopsQuery.isLoading && (
        <Alert color="failure">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Disabled Shops</span>
            <span className="text-sm">These shops are currently disabled.</span>
            <span className="text-sm">
              You can enable them from the shop settings.
            </span>
            <span className="text-sm">
              Note that some shops may be disabled due to new sign up, policy
              violations or other issues.
            </span>
          </div>
        </Alert>
      )}
      {filteredShops?.length > 0 && <DisabledShopTable shops={filteredShops} />}
    </div>
  );
};

export default DisabledShops;
