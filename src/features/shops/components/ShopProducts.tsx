import { useSelector } from 'react-redux';

import { useState } from 'react';

import { Button } from 'flowbite-react';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import ProductCard from '../../products/components/ProductCard';
import { ProductInterface } from '../../../interface/interface';

const ShopProducts = ({ shopId }: { shopId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [limit, setLimit] = useState(12);

  const productsQuery = zeapApiSlice.useGetProductsQuery(
    {
      limit,
      pageNumber: 1,
      shopId: shopId,
    },
    { skip: !token || !shopId },
  );
  const products = productsQuery?.data?.data?.products;
  const totalCount = productsQuery?.data?.data?.totalCount;

  const isLoading = productsQuery.isLoading;

  return (
    <div>
      {isLoading && <Loading />}

      {products?.length > 0 && (
        <div className="flex flex-col md:flex-row md:gap-4 w-full mt-4 bg-grey8 dark:bg-grey2 p-4">
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold text-darkGold">Products</h5>
              </div>
            </div>
            <div className="flex flex-col md:gap-4">
              <div className="md:hidden grid grid-cols-2    gap-5 w-full items-center justify-center cursor-pointer">
                {products?.map((product: any) => (
                  <ProductCard
                    key={product?.productId}
                    product={product}
                    showStatus
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 md:grid-cols-3   gap-5 w-full  items-center justify-center cursor-pointer ">
              {products?.length > 0 &&
                products?.map((product: ProductInterface) => (
                  <ProductCard
                    key={product?.productId}
                    product={product}
                    showStatus
                  />
                ))}
            </div>

            <div className="flex justify-center">
              {totalCount > limit && (
                <Button
                  onClick={() => {
                    setLimit(limit + 12);
                  }}
                  className="m-4"
                  color="primary"
                  size="xs"
                >
                  Load More
                </Button>
              )}
              {limit > 12 && (
                <Button
                  onClick={() => {
                    setLimit(limit - 12);
                  }}
                  className="m-4"
                  color="primary"
                  size="xs"
                >
                  Load Less
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
