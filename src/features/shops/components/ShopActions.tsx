import { useState } from 'react';
import { ShopInterface } from '../../../interface/interface';
import SimpleModal from '../../../lib/SimpleModal';
import { AddShop } from './AddShop';
import ShopDeleteRestore from './ShopDeleteRestore';
import ShopComment from './ShopComment';
import ShopStatus from './ShopStatus';

const buttonClass =
  'w-[56px] h-[56px] text-gray-500 rounded-full border border-gray-200 dark:border-gray-600 hover:text-white shadow-sm dark:hover:text-white bg-emerald-100 dark:text-gray-400 hover:bg-emerald-500  dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400';

const ShopActions = ({ shop }: { shop: ShopInterface }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const [openEnable, setOpenEnable] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  return (
    <>
      <div
        data-dial-init
        className="fixed bottom-6 end-5 group"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          id="speed-dial-menu-text-outside-button-square"
          className={`flex flex-col items-center mb-4 space-y-2  ${!open && 'hidden'}`}
        >
          <button
            onClick={() => setOpenEdit(true)}
            type="button"
            className={buttonClass}
          >
            <svg
              className="w-4 h-4 mx-auto mb-1 text-darkGold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="1.9"
                d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
              />
            </svg>

            <span className="block mb-px text-xs font-medium ">Edit</span>
          </button>
          <button
            onClick={() => setOpenComment(true)}
            type="button"
            className={buttonClass}
          >
            <svg
              className="w-4 h-4 mx-auto mb-1 text-darkGold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
                d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
              />
            </svg>

            <span className="block mb-px text-xs font-medium ">Comment</span>
          </button>
          <button
            onClick={() => setOpenStatus(true)}
            type="button"
            className={buttonClass}
          >
            <svg
              className="w-4 h-4 mx-auto mb-1 text-darkGold"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
                d="M12 3v1m0 16v1m8.66-10.66l-.7.7M4.34 12.34l-.7.7m16.97 4.95l-.7-.7M4.34 7.66l-.7-.7M21 12h-1M4 12H3m15.66-6.66l-.7.7M6.34 17.66l-.7-.7"
              />
            </svg>

            <span className="block mb-px text-xs font-medium ">Status</span>
          </button>

          {shop?.disabled && (
            <button
              onClick={() => setOpenEnable(true)}
              type="button"
              className={buttonClass}
            >
              <svg
                className="w-4 h-4 mx-auto mb-1 text-darkGold"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.9"
                  d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                />
              </svg>

              <span className="block mb-px text-xs font-medium ">Enable</span>
            </button>
          )}
          {!shop?.disabled && (
            <button
              onClick={() => setOpenDisable(true)}
              type="button"
              className={buttonClass}
            >
              <svg
                className="w-4 h-4 mx-auto mb-1 text-darkGold"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.9"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>

              <span className="block mb-px text-xs font-medium ">Disable</span>
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          data-dial-toggle="speed-dial-menu-text-outside-button-square"
          aria-expanded="false"
          className="flex items-center justify-center text-white  rounded-full w-14 h-14 hover:bg-emerald-800 dark:hover:bg-emerald-300 bg-emerald-400 dark:bg-emerald-700  focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:rotate-45 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>

      {openEdit && (
        <SimpleModal
          isLoading={false}
          closeOnOutsideClick={false}
          open
          showActionButtons={false}
          headerText="Edit Shop"
          close={() => setOpenEdit(false)}
          onclick={() => {}}
        >
          <AddShop
            shop={shop}
            mode="edit"
            setOpenModal={setOpenEdit}
            openModal={openEdit}
          />
        </SimpleModal>
      )}

      {openDisable && (
        <ShopDeleteRestore
          close={() => setOpenDisable(false)}
          mode="disable"
          shop={shop}
          open={openDisable}
        />
      )}

      {openEnable && (
        <ShopDeleteRestore
          close={() => setOpenEnable(false)}
          mode="enable"
          shop={shop}
          open={openEnable}
        />
      )}

      {openComment && (
        <ShopComment
          shopId={shop?.shopId}
          open={openComment}
          close={() => setOpenComment(false)}
        />
      )}
      {openStatus && (
        <ShopStatus
          shopId={shop?.shopId}
          status={shop.status as 'new' | 'reviewed'}
          open={openStatus}
          close={() => setOpenStatus(false)}
        />
      )}
    </>
  );
};

export default ShopActions;
