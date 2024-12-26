import { globalSelectors } from '../../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import { NavLink } from 'react-router-dom';

const ProductOrderOptions = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const productOrderStatusOptionsQuery =
    zeapApiSlice.useGetProductOrderStatusOptionsQuery({}, { skip: !token });
  const productOrderStatusOptions = productOrderStatusOptionsQuery?.data?.data;
  const isLoading = productOrderStatusOptionsQuery.isLoading;
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className=" gap-2 h-[80vh] cursor-pointer items-center justify-center grid grid-cols-1 md:grid-cols-3 ">
          {productOrderStatusOptions?.map(
            (option: { name: string; value: string }) => (
              <NavLink
                key={option.value}
                to={`/orders/product-orders/${option.value}`}
                className="w-full shadow-md bg-slate-100 text-black p-2 h-40 rounded-md flex justify-center items-center hover:bg-white"
              >
                {capitalizeFirstLetter(option.value)} product orders
              </NavLink>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ProductOrderOptions;
