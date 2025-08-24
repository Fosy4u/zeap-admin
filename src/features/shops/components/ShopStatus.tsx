import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { Drawer } from 'flowbite-react';

const drawerTheme = {
  root: {
    base: 'fixed z-99999 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',

    position: {
      bottom: {
        on: 'bottom-0  right-0 w-100 md:w-[700px] transform-none',
        off: 'bottom-0 left-0 right-0 w-full translate-y-full',
      },
    },
  },
};

const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Reviewed', value: 'reviewed' },
];

const ShopStatus = ({
  shopId,
  open,
  close,
  status,
}: {
  shopId: string;
  open: boolean;
  close: () => void;
  status: 'new' | 'reviewed';
}) => {
  const [updateShopStatus, updateShopStatusStatus] =
    zeapApiSlice.useUpdateShopStatusMutation();
  const isLoading = updateShopStatusStatus.isLoading;

  const updateStatus = (newStatus: 'new' | 'reviewed') => {
    const payload = {
      shopId,
      status: newStatus,
    };
    updateShopStatus({ payload })
      .unwrap()
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={close}
      position="bottom"
      edge
      theme={drawerTheme}
    >
      <Drawer.Header title="Statuss" titleIcon={() => <></>} />
      <Drawer.Items>
        <div className="p-4">
          {isLoading && <Loading />}
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Change Shop Status</span>
            <div className="grid grid-cols-2 gap-4">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  disabled={isLoading || option.value === status}
                  onClick={() =>
                    updateStatus(option.value as 'new' | 'reviewed')
                  }
                  className={`px-4 py-2 rounded-lg text-white font-medium ${
                    option.value === 'new'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } ${
                    option.value === status
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default ShopStatus;
