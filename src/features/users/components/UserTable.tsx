import { UserInterface } from '../../../interface/interface';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users }: { users: UserInterface[] }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 bg-white dark:bg-boxdark dark:text-white w-full overflow-x-auto">
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Name
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Email
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Phone
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Vendor
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Disabled
            </th>
          </tr>

          {users?.map((user: UserInterface) => (
            <tr
              onClick={() => navigate(`/users/${user?.userId}`)}
              key={user?._id}
              className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  "
            >
              <td
                data-th="Name"
                className=" hidden md:flex  h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 "
              >
                <div className="flex items-center">
                  <img
                    src={user?.imageUrl?.link || NoPic}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-3">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
              </td>

              <td className="md:hidden h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                {user?.firstName} {user?.lastName}
              </td>
              <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                {user?.email}
              </td>
              <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  ">
                {user?.phoneNumber}
              </td>
              <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  ">
                {user?.isVendor ? 'Yes' : 'No'}
              </td>
              <td className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500  ">
                {user?.disabled ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
