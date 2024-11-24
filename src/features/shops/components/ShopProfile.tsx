import { ShopInterface, UserInterface } from '../../../interface/interface';
import UserInfo from '../../users/components/UserInfo';
import ShopInfo from './ShopInfo';

const ShopProfile = ({
  user,
  shop,
}: {
  user: UserInterface;
  shop: ShopInterface;
}) => {
  return (
    <div className="my-4 flex flex-col gap-4 w-full">
      <UserInfo user={user} />
      <ShopInfo shop={shop} />
    </div>
  );
};

export default ShopProfile;
