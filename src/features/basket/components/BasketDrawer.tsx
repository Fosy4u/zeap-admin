'use client';

import { Drawer } from 'flowbite-react';
import { BasketInterface } from '../../../interface/interface';
import BasketItem from './BasketItem';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import { numberWithCommas } from '../../../utils/helpers';

const drawerTheme = {
  root: {
    base: 'fixed z-99999  overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',

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
        <div className="flex justify-between p-4 text-black font-semibold">
          <span>
            Subtotal
            <p className="text-sm text-slate-500">Delivery fee not included</p>
          </span>
          <span>
            {currency?.symbol}
            {numberWithCommas(Number(basket?.total))}
          </span>
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
