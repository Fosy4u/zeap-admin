import { HiOutlineArrowRight } from 'react-icons/hi';
import { ShopInterface } from '../../../interface/interface';
import { Badge } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const ShopBar = ({ shop }: { shop: ShopInterface }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/shops/${shop?.shopId}`)}
      className="flex justify-between items-center p-2 rounded-full bg-grey8 dark:bg-grey2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      <div className="flex justify-around items-center">
        <span>{shop?.shopId}</span>
        <Badge
          color={shop?.disabled ? 'danger' : 'success'}
          size="xs"
          className="ml-2"
        >
          {shop?.disabled ? 'Disabled' : 'Enabled'}
        </Badge>
      </div>
      <div>{shop?.shopName}</div>
      <div>
        <HiOutlineArrowRight className="text-darkGold h-5 w-5" />
      </div>
    </div>
  );
};

export default ShopBar;
