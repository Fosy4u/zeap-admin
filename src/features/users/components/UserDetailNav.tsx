import { useState } from 'react';
import ClickOutside from '../../../utils/ClickOutside';

const UserDetailNav = ({
  setValue,
  value,
}: {
  setValue: (value: string) => void;
  value: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <div className="inline-flex overflow-scroll rounded">
      <button
        onClick={() => setValue('Bio')}
        className={`inline-flex md:hidden ${value === 'Bio' && 'bg-darkGold text-white'} h-10 items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Bio</span>
      </button>
      <button
        onClick={() => setValue('Overview')}
        className={`inline-flex h-10 ${value === 'Overview' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Overview</span>
      </button>
      <button
        onClick={() => setValue('Orders')}
        className={`inline-flex h-10 ${value === 'Orders' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Orders</span>
      </button>
      <button
        onClick={() => setValue('Vouchers')}
        className={`inline-flex h-10 ${value === 'Vouchers' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Vouchers</span>
      </button>
      <button
        onClick={() => setValue('Shops')}
        className={`hidden md:inline-flex h-10 ${value === 'Shops' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Shops</span>
      </button>
      <button
        onClick={() => setValue('Favourites')}
        className={`hidden md:inline-flex h-10 ${value === 'Favorites' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Favourites</span>
      </button>
      <button
        onClick={() => setValue('Cart')}
        className={`hidden md:inline-flex h-10 ${value === 'Cart' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Cart</span>
      </button>
      <button
        onClick={() => setValue('Points')}
        className={`hidden md:inline-flex h-10 ${value === 'Points' && 'bg-darkGold text-white'} items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>Points</span>
      </button>

      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`inline-flex md:hidden h-10  items-center justify-center gap-2 whitespace-nowrap border border-2 border-darkGold px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-darkGold focus-visible:outline-none`}
      >
        <span>More</span>
      </button>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <ClickOutside onClick={() => setDropdownOpen(false)}>
          <div
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <li
                onClick={() => setValue('Shops')}
                className="text-sm font-medium duration-300 ease-in-out hover:text-darkGold lg:text-base cursor-pointer"
              >
                Shops
              </li>
              <li
                onClick={() => setValue('Favourites')}
                className=" text-sm font-medium duration-300 ease-in-out hover:text-darkGold lg:text-base cursor-pointer"
              >
                Favourites
              </li>
              <li
                onClick={() => setValue('Cart')}
                className="text-sm font-medium duration-300 ease-in-out hover:text-darkGold lg:text-base cursor-pointer"
              >
                Cart
              </li>
              <li
                onClick={() => setValue('Points')}
                className="text-sm font-medium duration-300 ease-in-out hover:text-darkGold lg:text-base cursor-pointer"
              >
                Points
              </li>
            </ul>
          </div>
        </ClickOutside>
      )}
    </div>
  );
};

export default UserDetailNav;
