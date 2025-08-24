import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { globalSelectors } from '../../../redux/services/global.slice';

import Loading from '../../../lib/Loading';
import { useEffect, useState } from 'react';
import {
  EmailListInterface,
  ShopInterface,
} from '../../../interface/interface';
import { Alert } from 'flowbite-react';
import EmailListHeader from './EmailListHeader';
import DownloadCSV from '../../../lib/DownloadCSV';
import EmailTable from './EmailTable';

const EmailList = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredEmailList, setFilteredEmailList] = useState([]);
  const [input, setInput] = useState('');
  const emailListQuery = zeapApiSlice.useGetEmailListQuery(
    {},
    { skip: !token },
  );
  const emailList = emailListQuery?.data?.data;
  const csvData = filteredEmailList?.map((contact: EmailListInterface) => {
    return {
      Email: contact.email,
      Subscribed: contact.subscribedTo,
      Source: contact.source,
      Date: new Date(contact.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
    };
  });
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
    if (emailList?.length > 0) {
      const result = emailList?.filter((row: ShopInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ShopInterface]);
        });
      });

      setFilteredEmailList(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, emailList]);

  return (
    <div>
      <EmailListHeader setInput={setInput} title={'Email List'} />

      {emailList?.length === 0 && !emailListQuery.isLoading && (
        <Alert color="info">No email in list.</Alert>
      )}
      {emailListQuery.isLoading && <Loading />}
      {emailList?.length > 0 && !emailListQuery.isLoading && (
        <Alert color="info" className="mb-5">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Email List</span>
            <span className="text-sm">
              The list of all emails subscribed to either newsletters or waiting
              lists.
            </span>
            <span className="text-sm">
              You can export this list by clicking the export button on the top
              right of the table.
            </span>
          </div>
        </Alert>
      )}
      <div className="flex justify-end">
        {emailList && (
          <DownloadCSV data={csvData} fileName={`email_list-${new Date()}`} />
        )}
      </div>
      {filteredEmailList?.length > 0 && (
        <EmailTable emailList={filteredEmailList} />
      )}
    </div>
  );
};

export default EmailList;
