import { Button } from 'flowbite-react';
import { ProductOrdersInterface } from '../../../interface/interface';

const ProductOrderPayShop = ({
  productOrder,
}: {
  productOrder: ProductOrdersInterface;
}) => {
  const shopRevenue = productOrder?.shopRevenue;

  return (
    <>
      {productOrder && (
        <Button
          disabled={productOrder?.status.value !== 'order delivered'}
          color={shopRevenue?.status === 'pending' ? 'success' : 'failure'}
          size="sm"
        >
          {shopRevenue?.status === 'pending' ? 'Pay Shop' : 'Revert to pending'}
        </Button>
      )}
    </>
  );
};

export default ProductOrderPayShop;
