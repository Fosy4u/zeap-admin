import { useParams } from 'react-router-dom';
import zeapApiSlice from '../../redux/services/zeapApi.slice';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../redux/services/global.slice';
import Loading from '../../lib/Loading';
import Banner from '../../lib/Banner';
import UserLayout from './components/UserLayout';
import { useEffect, useState } from 'react';
import UserHeader from './components/UserHeader';

const User = () => {
  const { id } = useParams();
  const token = useSelector(globalSelectors.selectAuthToken);
  const [input, setInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const getUserQuery = zeapApiSlice.useGetUserQuery(
    { userId: id },
    {
      skip: !token || !id,
    },
  );
  const usersQuery = zeapApiSlice.useGetUsersQuery({}, { skip: !token });
  const users = usersQuery?.data?.data;

  const user = getUserQuery?.data?.data;
  const getShopQuery = zeapApiSlice.useGetShopsQuery(
    { userId: user?.userId },
    {
      skip: !token || !user?.userId,
    },
  );
  const shops = getShopQuery?.data?.data;

  const isLoading = getUserQuery.isLoading || usersQuery.isLoading;
  const fulfilled =
    getUserQuery?.status === 'fulfilled' &&
    usersQuery?.status === 'fulfilled' &&
    getShopQuery?.status === 'fulfilled';

  useEffect(() => {
    if (users?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), 'i');

      const result = users?.filter((row: any) => {
        return Object.keys(row).some((field) => {
          return (
            searchRegex.test(row[field]?.toString()) ||
            searchRegex.test(row[field]?.regNo?.toString())
          );
        });
      });

      setFilteredUsers(result);
    }
  }, [input, users]);

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

  return (
    <div>
      <span className="hidden md:block">
        <UserHeader setInput={setInput} title={'User'} />
      </span>
      <span className="md:hidden">
        <UserHeader setInput={setInput} title={'User'} showSearchBar={false} />
      </span>
      {isLoading && <Loading />}
      {fulfilled && !user && (
        <Banner
          message="User not found. Please ensure the selected personnel is
                  on the system and not deleted."
          variant="warning"
        />
      )}

      {user && users?.length > 0 && (
        <UserLayout user={user} users={filteredUsers} shops={shops} />
      )}
    </div>
  );
};

export default User;
