'use client';

import { Alert, Drawer } from 'flowbite-react';
import { BasketInterface } from '../../../interface/interface';
import BasketItem from './BasketItem';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: 'fixed z-99999  overflow-y-auto bg-slate-100  p-4 transition-transform ',

    position: {
      right: {
        on: 'right-0 top-0 h-screen w-100 md:w-[40vw] transform-none',
        off: 'right-0 top-0 h-screen w-80 translate-x-full',
      },
    },
  },
};

export function BasketDrawer({
  isOpen,
  setIsOpen,
  basket,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  basket: BasketInterface;
}) {
  const currency = useSelector(globalSelectors.selectCurrency);
  console.log('basket', basket);

  const totalWithoutVoucher = basket?.totalWithoutVoucher;
  const appliedVoucherAmount = basket?.appliedVoucherAmount ?? 0;

  const basketItems = basket?.basketItems;
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <Drawer.Header title="Basket" className="text-darkGold" />
      <Drawer.Items>
        <div className="p-4 flex flex-col">
          <div className="flex flex-col">
            {basketItems?.map((item, index) => (
              <div key={index}>
                <BasketItem item={item} />
              </div>
            ))}
          </div>
        </div>
        {appliedVoucherAmount > 0 && (
          <Alert color="success" className="w-full">
            Voucher applied: {currency?.symbol}
            {numberWithCommas(Number(appliedVoucherAmount))}
          </Alert>
        )}
        <div className="flex flex-col ">
          <div className="flex text-sm justify-between p-4 text-black font-semibold">
            <span>Subtotal</span>
            <span className="flex justify-between gap-2 ">
              {totalWithoutVoucher && (
                <span className="line-through text-slate-400">
                  {currency?.symbol}
                  {numberWithCommas(Number(totalWithoutVoucher))}
                </span>
              )}
              <span>
                {currency?.symbol}
                {numberWithCommas(Number(basket?.itemsTotal))}
              </span>
            </span>
          </div>
          <div className="flex text-sm justify-between p-4 text-black font-semibold">
            <span>Delivery</span>
            <span>
              {currency?.symbol}
              {numberWithCommas(Number(basket?.deliveryFee))}
            </span>
          </div>
          <div className="flex justify-between p-4 text-black font-bold">
            <span>Total</span>
            <span>
              {currency?.symbol}
              {numberWithCommas(Number(basket?.total))}
            </span>
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
