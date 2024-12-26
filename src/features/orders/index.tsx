import { Alert } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

const Orders = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center w-full items-center h-screen">
      <NavLink
        to="/orders/unitOrders"
        className={`w-85 md:w-100 rounded-md shadow-md border p-4 px-2 md:px-4  hover:bg-lightGold dark:hover:bg-darkGold  transition duration-300`}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="text-xl font-bold text-darkGold dark:text-lightGold">
            Main Orders Per Unit
          </span>
          <Alert color="info" className="w-fit">
            <span className="text-sm ml-2">
              View orders per unit as ordered by customers
            </span>
          </Alert>
        </div>
      </NavLink>
      <NavLink
        to="/orders/product-orders"
        className={`w-85 md:w-100  rounded-md shadow-md border p-4 px-2 md:px-4 hover:bg-lightGold dark:hover:bg-darkGold transition duration-300`}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="text-xl font-bold text-darkGold dark:text-lightGold">
            Sub Orders (Product Orders)
          </span>
          <Alert color="info" className="w-fit">
            <span className="text-sm ml-2">
              View orders per product as assigned to vendors
            </span>
          </Alert>
        </div>
      </NavLink>
    </div>
  );
};

export default Orders;
