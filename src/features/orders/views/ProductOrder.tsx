import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../redux/services/global.slice';
import { NavLink, useParams } from 'react-router-dom';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';
import Loading from '../../../lib/Loading';
import { Alert, Button } from 'flowbite-react';
import ProductImage from '../../products/components/ProductImage';
import {
  capitalizeFirstLetter,
  displayDate,
  getCurrencySmallSymbol,
  getProductOrderStatusBg,
  numberWithCommas,
} from '../../../utils/helpers';
import ProductOrderBodyMeasurementDisplay from '../components/ProductOrderBodyMeasurementDisplay';
import ReactTimeAgo from 'react-time-ago';
import UserTile from '../../users/components/UserTile';
import ShopBar from '../../shops/components/ShopBar';
import OrderCard from '../components/OrderCard';
import { useState } from 'react';
import { ProductOrderStatusHistoryDrawer } from '../components/ProductOrderStatusHistoryDrawer';

const ProductOrder = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { productOrder_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const productOrderQuery = zeapApiSlice.useGetProductOrderQuery(
    {
      productOrder_id,
    },
    { skip: !token || !productOrder_id },
  );
  const productOrder = productOrderQuery?.data?.data;
  const product = productOrder?.product;
  const sku = productOrder?.sku;
  const order = productOrder?.order;
  const color = productOrder?.color;
  const bespokeColor = productOrder?.bespokeColor;
  const quantity = productOrder?.quantity;
  const size = productOrder?.size;
  const user = productOrder?.user;
  const shop = productOrder?.shop;
  const status = productOrder?.status;
  const deliveryAddress = productOrder?.deliveryAddress;
  const bodyMeasurements = productOrder?.bodyMeasurements || [];
  const amount = productOrder?.amount || [];
  const images = productOrder?.images.map((image: any) => image.link);
  const isLoading = productOrderQuery.isLoading;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">Ordered Product</h1>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button color="info" size="sm" onClick={() => setIsOpen(true)}>
            View Status History
          </Button>
        </div>
      </div>
      {isLoading && <Loading />}
      {productOrderQuery.status === 'fulfilled' && !productOrder && (
        <Alert color="info">Product order not found</Alert>
      )}

      {productOrder && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <NavLink
              to={`/product/${product._id}`}
              className="text-lg font-semibold cursor-pointer underline underline-thickness-thin underline-offset-small hover:text-darkGold"
            >
              {product.title}
            </NavLink>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-2  ">
            <div className="flex flex-col gap-4">
              {/* <span className="text-lg font-semibold">{product?.title}</span> */}
              <ProductImage images={images || []} />
              <div className="hidden md:block">
                <span className="font-bold">Body Measurements</span>
                <div className="flex flex-col gap-2 bg-grey8 p-2">
                  {bodyMeasurements?.length > 0 ? (
                    <ProductOrderBodyMeasurementDisplay
                      bodyMeasurements={bodyMeasurements}
                    />
                  ) : (
                    <Alert color="info">No body measurements</Alert>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8  divide-y divide-slate-300 m-2 p-4 bg-grey8 dark:bg-boxdark">
              <div className="flex justify-between items-center">
                <span className="text-md ">Status</span>
                <span
                  className={`text-md w-[100px] text-center border p-2 rounded-md font-bold  ${getProductOrderStatusBg(status?.value)}`}
                >
                  {capitalizeFirstLetter(status.name)}{' '}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Amount</span>
                <span className="text-lg font-semibold">
                  {amount.map((price: { currency: string; value: number }) => (
                    <span key={price.currency}>
                      {getCurrencySmallSymbol(price.currency)}
                      {numberWithCommas(price?.value)}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">SKU</span>
                <span className="text-lg font-semibold">{sku}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Colour</span>
                <span className="text-lg font-semibold">
                  {color || 'Not Specified'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Single Plain bespoke Colour</span>
                <span className="text-lg font-semibold">
                  {bespokeColor || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Quantity</span>
                <span className="text-lg font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Ordered on</span>
                <span className="text-lg font-semibold">
                  {' '}
                  <ReactTimeAgo date={productOrder?.createdAt} locale="en-US" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Last Updated on</span>
                <span className="text-lg font-semibold">
                  {' '}
                  <ReactTimeAgo date={productOrder?.updatedAt} locale="en-US" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">
                  Expected Vendor Completion Date
                </span>
                <span className="text-lg font-semibold">
                  {productOrder?.expectedVendorCompletionDate ? (
                    <span>
                      from{' '}
                      {displayDate(
                        productOrder?.expectedVendorCompletionDate?.min,
                        false,
                      )}{' '}
                      to{' '}
                      {displayDate(
                        productOrder?.expectedVendorCompletionDate?.max,
                        false,
                      )}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Expected Delivery Date</span>
                <span className="text-lg font-semibold">
                  {productOrder?.expectedDeliveryDate ? (
                    <span>
                      from{' '}
                      {displayDate(
                        productOrder?.expectedDeliveryDate?.min,
                        false,
                      )}{' '}
                      to{' '}
                      {displayDate(
                        productOrder?.expectedDeliveryDate?.max,
                        false,
                      )}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Delivery Company</span>
                <span className="text-lg font-semibold">
                  {productOrder?.deliveryCompany || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Delivery Tracking Number</span>
                <span className="text-lg font-semibold">
                  {productOrder?.deliveryTrackingNumber || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Delivery Tracking Link</span>
                <span className="text-lg font-semibold">
                  <a
                    href={productOrder?.deliveryTrackingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-darkGold"
                  >
                    {productOrder?.deliveryTrackingLink || 'N/A'}
                  </a>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Size</span>
                <span className="text-lg font-semibold">{size}</span>
              </div>
              <div className="block md:hidden">
                <span className="font-bold">Body Measurements</span>
                <div className="flex flex-col gap-2 bg-grey8 p-2">
                  {bodyMeasurements?.length > 0 ? (
                    <ProductOrderBodyMeasurementDisplay
                      bodyMeasurements={bodyMeasurements}
                    />
                  ) : (
                    <Alert color="info">No body measurements</Alert>
                  )}
                </div>
              </div>
              <div>
                <span className="font-bold">Customer</span>
                <div className=" bg-grey8 p-2 ">
                  <div>
                    <UserTile user={user} />
                  </div>
                </div>
              </div>
              <div>
                <span className="font-bold">Shop</span>
                <div className=" bg-grey8 p-2 ">
                  <div>
                    <ShopBar shop={shop} />
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold">Delivery Address</span>
                <div className=" bg-grey8 p-2 ">
                  <div className="flex flex-col gap-2 bg-grey8 p-2 dark:bg-boxdark">
                    <div className="flex justify-between">
                      <span>Address: </span>
                      <span>{deliveryAddress?.address || 'N/P'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Region: </span>
                      <span>{deliveryAddress?.region || 'N/P'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Post Code: </span>
                      <span>{deliveryAddress?.postCode || 'N/P'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Country: </span>
                      <span>{deliveryAddress?.country || 'N/P'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact No: </span>
                      <span>{deliveryAddress?.phoneNumber || 'N/P'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-bold">Main Parent Order</span>
                <div className="flex flex-col gap-2 bg-grey8 p-2">
                  <OrderCard order={order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <ProductOrderStatusHistoryDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productOrder_id={productOrder?._id}
        />
      )}
    </div>
  );
};

export default ProductOrder;
