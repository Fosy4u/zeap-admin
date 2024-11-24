import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../redux/services/global.slice';

import Loading from '../../lib/Loading';
import { useEffect, useState } from 'react';
import PromoHeader from './components/PromoHeader';
import { PromoInterface } from '../../interface/interface';
import PromoList from './components/PromoList';

const Promos = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredPromos, setFilteredPromos] = useState([]);
  console.log('filteredPromos', filteredPromos);
  const [input, setInput] = useState('');
  const promosQuery = zeapApiSlice.useGetPromosQuery({}, { skip: !token });
  const promos = promosQuery?.data?.data;

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
    if (promos?.length > 0) {
      const result = promos?.filter((row: PromoInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof PromoInterface]);
        });
      });

      setFilteredPromos(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, promos]);

  return (
    <div>
      <PromoHeader setInput={setInput} title={'Promos'} />

      {promos?.length === 0 && promosQuery.status === 'fulfilled' && (
        <div>No promos found</div>
      )}
      {promosQuery.isLoading && <Loading />}
      {filteredPromos?.length > 0 && <PromoList promos={filteredPromos} />}
    </div>
  );
};

export default Promos;
