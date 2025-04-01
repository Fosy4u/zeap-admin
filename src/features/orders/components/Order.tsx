import { Badge } from 'flowbite-react';
import {
  OrderInterface,
  ProductOrdersInterface,
} from '../../../interface/interface';
import UserTile from '../../users/components/UserTile';
import ProductOrderCard from './ProductOrderCard';
import { formatCurrency } from '../../../utils/helpers';
import { NavLink } from 'react-router-dom';
import Reciept from './Reciept';

const Order = ({ order }: { order: OrderInterface }) => {
  const productOrders = order?.productOrders;
  const deliveryDetails = order?.deliveryDetails;
  const isCancelled = order?.cancel?.isCancelled;
  const payment = order?.payment;
  const calcProgress = () => {
    const total = productOrders?.length;
    const completed = productOrders?.filter(
      (productOrder) => productOrder.status.value === 'order delivered',
    ).length;
    return ((completed / total) * 100).toFixed(2);
  };
  return (
    <div className="flex flex-col text-black gap-4">
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Order ID: {order.orderId}</span>
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <span className=" text-xs">
              Progress - <strong>{calcProgress()}%</strong>
            </span>
            <div className="flex items-center">
              <progress
                id={order?.orderId}
                max="100"
                value={calcProgress()}
                className="block w-100% overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
              >
                {calcProgress()}%
              </progress>
            </div>
          </div>
          <Reciept order={order} />
        </div>
        <span className="dark:text-slate-300 text-slate-500 text-xs">
          {isCancelled && <Badge color="red">Cancelled</Badge>}
        </span>
      </div>
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Delivery Details</span>
        <div className="flex flex-col gap-2 bg-grey8 p-2">
          <div className="flex justify-between">
            <span>Address: </span>
            <span>{deliveryDetails?.address || 'N/P'}</span>
          </div>
          <div className="flex justify-between">
            <span>Region: </span>
            <span>{deliveryDetails?.region || 'N/P'}</span>
          </div>
          <div className="flex justify-between">
            <span>Post Code: </span>
            <span>{deliveryDetails?.postCode || 'N/P'}</span>
          </div>
          <div className="flex justify-between">
            <span>Country: </span>
            <span>{deliveryDetails?.country || 'N/P'}</span>
          </div>
          <div className="flex justify-between">
            <span>Contact No: </span>
            <span>{deliveryDetails?.phoneNumber || 'N/P'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Customer</span>
        <div>
          <UserTile user={order.user} />
        </div>
      </div>
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Payment</span>
        <NavLink
          to={`/payment/${payment.reference}`}
          className="flex justify-between p-2 cursor-pointer bg-grey8"
        >
          <span className="text-md ">{payment.reference}</span>
          <span className="text-md ">
            {formatCurrency(payment.amount / 100, payment.currency)}
          </span>
          <span className="text-md ">
            <Badge color="success">{payment.status}</Badge>
          </span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Sub Product Orders</span>
        <div className="grid grid-cols-1 gap-4   ">
          {productOrders.map((productOrder: ProductOrdersInterface) => (
            <div key={productOrder?._id}>
              <ProductOrderCard productOrder={productOrder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
