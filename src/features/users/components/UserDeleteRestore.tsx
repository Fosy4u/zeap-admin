import { useState } from 'react';
import { UserInterface } from '../../../interface/interface';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Banner from '../../../lib/Banner';
import Loading from '../../../lib/Loading';

const UserDeleteRestore = ({
  close,
  mode = 'disable',
  user,
}: {
  close: () => void;
  mode?: 'disable' | 'enable';
  user: UserInterface;
}) => {
  const [disableUser, diableUserStatus] = zeapApiSlice.useDisableUserMutation();
  const [enableUser, enableUserStatus] = zeapApiSlice.useEnableUserMutation();
  const [error, setError] = useState<string | null>(null);

  const disable = () => {
    const payload = {
      ids: [user._id],
    };

    disableUser({ payload })
      .unwrap()
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log('err', err);
        setError(err.data.error);
      });
  };

  const enable = () => {
    const payload = {
      ids: [user._id],
    };

    enableUser({ payload })
      .unwrap()
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log('err', err);
        setError(err.data.error);
      });
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative  min-h-screen flex flex-col justify-center items-center bg-slate-100  dark:bg-slate-700 overflow-hidden">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {(diableUserStatus?.isLoading || enableUserStatus?.isLoading) && (
              <Loading />
            )}
            <button
              onClick={close}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {error && (
                <Banner variant="error" message={error} className="mb-4" />
              )}
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{`Are you sure you want to ${mode} ${user?.displayName}?`}</h3>
              <button
                onClick={mode === 'disable' ? disable : enable}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={close}
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200  hover:text-darkGold focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDeleteRestore;
