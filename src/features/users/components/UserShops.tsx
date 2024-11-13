import { Alert } from 'flowbite-react';
import { ShopInterface } from '../../../interface/interface';

import ShopBar from '../../shops/components/ShopBar';

const UserShops = ({ shops }: { shops: ShopInterface[] }) => {
  return (
    <div className="my-4">
      {shops?.length === 0 && (
        <Alert color="info" className="mt-4">
          No shops found
        </Alert>
      )}
      {shops?.map((shop: ShopInterface) => {
        return (
          <div key={shop._id}>
            <ShopBar shop={shop} />
          </div>
        );
      })}
    </div>
  );
};

export default UserShops;
