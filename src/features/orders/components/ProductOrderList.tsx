import { ProductOrdersInterface } from '../../../interface/interface';

import ProductOrderCard from './ProductOrderCard';

const ProductOrderList = ({
  productOrders,
}: {
  productOrders: ProductOrdersInterface[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {productOrders.map((productOrder: ProductOrdersInterface) => (
        <div key={productOrder?.orderId}>
          <ProductOrderCard productOrder={productOrder} />
        </div>
      ))}
    </div>
  );
};

export default ProductOrderList;
