'use client';

import { Alert, Drawer } from 'flowbite-react';
import Order from './Order';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';

//import { useSelector } from 'react-redux';
//import { globalSelectors } from '../../../redux/services/global.slice';
// import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: 'fixed z-99999  overflow-y-auto bg-slate-100   p-4 transition-transform ',

    position: {
      right: {
        on: 'right-0 top-0 h-screen w-100 lg:w-[40vw] transform-none',
        off: 'right-0 top-0 h-screen w-80 translate-x-full',
      },
    },
  },
};

export function OrderDrawer({
  isOpen,
  setIsOpen,
  order_id,
}: {
  order_id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const token = useSelector(globalSelectors.selectAuthToken);
  const orderQuery = zeapApiSlice.useGetOrderQuery(
    { order_id },
    { skip: !token || !order_id },
  );
  const order = orderQuery?.data?.data;
  const isLoading = orderQuery.isLoading;
  console.log('order', order);

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <Drawer.Header title="Parent Order" className="text-darkGold" />
      <Drawer.Items>
        {isLoading && <Loading />}
        {orderQuery.status === 'fulfilled' && !order && (
          <Alert color="info">Order not found</Alert>
        )}
        {order && (
          <div className="p-4 flex flex-col">
            <Order order={order} />
          </div>
        )}
      </Drawer.Items>
    </Drawer>
  );
}
