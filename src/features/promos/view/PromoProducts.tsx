import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import PromoHeader from '../components/PromoHeader';
import Loading from '../../../lib/Loading';
import { Alert } from 'flowbite-react';
import ProductCard from '../../products/components/ProductCard';
import { ProductInterface } from '../../../interface/interface';
import { useParams } from 'react-router-dom';

const PromoProducts = () => {
  const { promoId } = useParams<{ promoId: string }>();
  const token = useSelector(globalSelectors.selectAuthToken);
  const promoProductsQuery = zeapApiSlice.useGetPromoProductsQuery(
    { promoId },
    { skip: !token },
  );
  const isLoading = promoProductsQuery.isLoading;
  const promoProducts = promoProductsQuery?.data?.data;
  const products = promoProducts?.products;
  const promo = promoProducts?.promo;
  return (
    <div>
      <PromoHeader title={promo?.title} />
      {isLoading && <Loading />}
      {products?.length === 0 && promoProductsQuery.status === 'fulfilled' && (
        <Alert color="info">No products found for this promo</Alert>
      )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoProducts;
