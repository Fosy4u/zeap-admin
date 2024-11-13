import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import { useParams } from 'react-router-dom';
import Loading from '../../../lib/Loading';
import DraftProductList from '../components/DraftProductList';
import ProductHeader from '../components/ProductHeader';
import AddNewProductOptions from '../components/AddNewProductOptions';

const AddProduct = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const shopId = useParams<{ shopId: string }>().shopId;

  const shopDraftProductQuery = zeapApiSlice.useGetShopDraftProductsQuery(
    {
      shopId: shopId,
    },
    { skip: !token },
  );
  const draftProducts = shopDraftProductQuery?.data?.data;
  const isLoading = shopDraftProductQuery.isLoading;
  return (
    <div>
      <ProductHeader title={`Add Products: Shop - ${shopId}`} />
      {isLoading && <Loading />}
      {shopDraftProductQuery?.status === 'fulfilled' && (
        <DraftProductList draftProducts={draftProducts} />
      )}
      <div className="my-4">
        <AddNewProductOptions shopId={`${shopId}`} />
      </div>
    </div>
  );
};

export default AddProduct;
