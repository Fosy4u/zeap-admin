import { useSelector } from 'react-redux';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import UserHeader from './components/UserHeader';
import { globalSelectors } from '../../redux/services/global.slice';
import UserTable from './components/UserTable';
import Loading from '../../lib/Loading';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserTileList from './components/UserTileList';
import UserDisplaySwitcher from './components/UserDisplaySwitcher';
import { UserInterface } from '../../interface/interface';
import DownloadCSV from '../../lib/DownloadCSV';

const tileLink = '/table';

const Users = () => {
  const location = useLocation().pathname;
  const view = location.includes(tileLink) ? 'table' : 'tile';
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [input, setInput] = useState('');
  const usersQuery = zeapApiSlice.useGetUsersQuery({}, { skip: !token });
  const users = usersQuery?.data?.data;
  const csvData = users?.map((user: UserInterface) => {
    return {
      'First Name': user.firstName,
      'Last Name': user.lastName,
      Email: user.email,
      'Phone Number': user.phoneNumber,
      'Preffered Currency': user.prefferedCurrency,
      'Shop Enabled': user.shopEnabled,
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
    if (users?.length > 0) {
      const result = users?.filter((row: UserInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof UserInterface]);
        });
      });

      setFilteredUsers(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, users]);

  return (
    <div>
      <UserHeader setInput={setInput} title={'Users'} />

      {users?.length === 0 && !usersQuery.isLoading && (
        <div>No users found</div>
      )}
      {usersQuery.isLoading && <Loading />}
      <div className="flex justify-between">
        {users && <UserDisplaySwitcher view={view} />}
        {users && (
          <DownloadCSV data={csvData} fileName={`users-${new Date()}`} />
        )}
      </div>
      {users && view === 'table' ? (
        <UserTable users={filteredUsers} />
      ) : (
        <UserTileList users={filteredUsers} />
      )}
    </div>
  );
};

export default Users;
