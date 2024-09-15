import { useSelector } from "react-redux";
import zeapApiSlice from "../../redux/services/zeapApi.slice";
import UserHeader from "./components/UserHeader";
import { globalSelectors } from "../../redux/services/global.slice";
import UserTable from "./components/UserTable";
import Loading from "../../lib/Loading";
import { useEffect, useState } from "react";

const Users = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [input, setInput] = useState("");
  const usersQuery = zeapApiSlice.useGetUsersQuery({},  { skip: !token });
  const users = usersQuery?.data?.data;

  useEffect(() => {
    if (users?.length > 0) {
      const searchRegex = new RegExp(escapeRegExp(input), "i");

      const result = users?.filter((row:any) => {
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

  const escapeRegExp = (value:string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
 
  return <div>
     <UserHeader setInput={setInput} />
  

    {users?.length === 0 && !usersQuery.isLoading && <div>No users found</div>}
    {usersQuery.isLoading && <Loading />}
   {users && <UserTable users={filteredUsers} />}
  </div>;
}

export default Users;