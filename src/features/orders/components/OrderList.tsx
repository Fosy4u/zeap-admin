import { OrderInterface } from '../../../interface/interface';
import OrderCard from './OrderCard';

const OrderList = ({ orders }: { orders: OrderInterface[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {orders.map((order: OrderInterface) => (
        <div key={order?.orderId}>
          <OrderCard order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
