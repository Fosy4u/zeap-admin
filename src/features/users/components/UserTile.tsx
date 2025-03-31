import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../../interface/interface';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import { capitalizeFirstLetter } from '../../../utils/helpers';

const UserTile = ({ user }: { user: UserInterface }) => {
  const admin = user?.isAdmin || user?.superAdmin;
  const navigate = useNavigate();
  return (
    <>
      {' '}
      <div
        onClick={() => navigate(`/users/${user?.userId}`)}
        className="overflow-scroll cursor-pointer   rounded shadow-md  light:shadow-slate-200 dark:shadow-slate-800 bg-grey8 dark:bg-grey2 dark:text-white mt-2 hover:shadow-2xl transition duration-300"
      >
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded  ">
              <img
                src={user?.imageUrl?.link || NoPic}
                alt="User"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded"
              />
            </span>

            <div className="flex flex-col">
              <span className=" underline">
                {capitalizeFirstLetter(user?.firstName)}{' '}
                {capitalizeFirstLetter(user?.lastName)}
              </span>
              {user?.email && (
                <span className="dark:text-slate-300 text-slate-500 text-xs">
                  {user?.email}
                </span>
              )}
            </div>
          </div>
          <div className="flex overflow-scroll mt-3">
            <span
              className={`inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-xs text-white mr-2 ${user?.disabled ? 'bg-danger' : 'bg-success'}`}
            >
              {user?.disabled ? 'Disabled' : 'Active'}
            </span>
            {/* <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2 min-w-20">
            ID: {user?.userId}
        </span> */}
            {user?.isVendor && (
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
                Vendor
              </span>
            )}

            <span
              className={`inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2 ${user?.isGuest ? 'bg-warning' : 'bg-success'}`}
            >
              {user?.isGuest ? 'Guest' : 'Signed Up'}
            </span>

            {admin && (
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
                Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTile;
