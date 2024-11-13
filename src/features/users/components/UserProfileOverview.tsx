import StatCard from '../../../lib/StatCard';
import {
  UserIcon,
  CartPlusIcon,
  StoreIcon,
  WalletIcon,
  FavouriteIcon,
  CartIcon,
} from '../../../utils/icon';

const UserProfileOverview = ({
  setValue,
  shopsNumber,
}: {
  setValue: (value: string) => void;
  shopsNumber: number;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <UserIcon />
          </span>
        }
        title="Bio Data"
        showDetail={true}
        handleClick={() => setValue('Bio')}
        className="cursor-pointer md:hidden"
        titleClassName="text-darkGold"
      />
      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <StoreIcon />
          </span>
        }
        title="Shops"
        showDetail={true}
        handleClick={() => setValue('Shops')}
        className="cursor-pointer "
        subTitle={shopsNumber?.toString()}
        titleClassName="text-darkGold"
      />
      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <CartPlusIcon />
          </span>
        }
        title="Orders"
        showDetail={true}
        handleClick={() => setValue('Orders')}
        className="cursor-pointer "
        subTitle="0"
        titleClassName="text-darkGold"
      />
      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <WalletIcon />
          </span>
        }
        title="Vouchers"
        showDetail={true}
        handleClick={() => setValue('Vouchers')}
        className="cursor-pointer "
        subTitle="0"
        titleClassName="text-darkGold"
      />

      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <FavouriteIcon />
          </span>
        }
        title="Favorites"
        showDetail={true}
        handleClick={() => setValue('Favorites')}
        className="cursor-pointer "
        subTitle="0"
        titleClassName="text-darkGold"
      />
      <StatCard
        icon={
          <span className="flex justify-center align-center text-slate-400">
            <CartIcon />
          </span>
        }
        title="Cart"
        showDetail={true}
        handleClick={() => setValue('Cart')}
        className="cursor-pointer "
        subTitle="0"
        titleClassName="text-darkGold"
      />
    </div>
  );
};

export default UserProfileOverview;
