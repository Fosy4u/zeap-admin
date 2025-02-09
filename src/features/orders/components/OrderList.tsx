import { useState } from 'react';
import { OrderInterface } from '../../../interface/interface';
import OrderCard from './OrderCard';

import { OrderDrawer } from './OrderDrawer';

const OrderList = ({ orders }: { orders: OrderInterface[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order_id, setOrder_id] = useState<string>('');
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {orders.map((order: OrderInterface) => (
        <div
          key={order?.orderId}
          onClick={() => {
            setIsOpen(true);
            setOrder_id(order._id);
          }}
        >
          <OrderCard order={order} />
        </div>
      ))}
      {isOpen && order_id && (
        <OrderDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          order_id={order_id}
        />
      )}
    </div>
  );
};

export default OrderList;
