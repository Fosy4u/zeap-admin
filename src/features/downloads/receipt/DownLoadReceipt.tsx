import { OrderInterface } from '../../../interface/interface';
import {
  displayDate,
  formatCurrency,
  getCurrencySmallSymbol,
  numberWithCommas,
} from '../../../utils/helpers';
import LogoIcon from '../../../images/logo/app_logo.png';
import { useParams } from 'react-router-dom';
import zeapApiSlice from '../../../redux/services/zeapApi.slice';

const DownLoadReceipt = () => {
  const { order_id } = useParams();
  const orderQuery = zeapApiSlice.useGetOrderQuery({ order_id });
  const order: OrderInterface = orderQuery?.data?.data;
  const currency = order?.payment?.currency;

  const getProductOrderAmount = (
    amount: [{ value: number; currency: string }],
  ) => {
    const found = amount.find((item) => item.currency === currency);
    return `${getCurrencySmallSymbol(found?.currency || '')}${numberWithCommas(found?.value || 0)}`;
  };

  return (
    <>
      {order?.orderId && (
        <div
          className="w-full mx-auto p-6 bg-white rounded shadow-sm my-6 overflow-auto min-w-[30rem]"
          id="receipt"
        >
          <div className="flex justify-between items-center w-full overflow-auto ">
            <div>
              <img
                src={LogoIcon}
                alt="company-logo"
                className="object-contain rounded-lg w-24 h-24"
              />
            </div>

            <div className="text-right">
              <p>Zona Empires & Partners LTD .</p>
              <p className="text-gray-500 text-sm">admin@zeaper.com</p>
              <p className="text-gray-500 text-sm mt-1">+44-442341232</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 w-full overflow-auto">
            <div>
              <p className="font-bold text-gray-800">Receipt to :</p>
              <p className="text-gray-500">
                {order?.user?.firstName} {order?.user?.lastName}
                <br />
                {order?.user?.address}
              </p>
              <p className="text-gray-500">
                {order?.user?.region &&
                  order?.user?.region?.split('~')[0] + ','}{' '}
                {order?.user?.country}
              </p>
              <p className="text-gray-500">{order?.user?.email}</p>
            </div>

            <div className="text-right w-100 overflow-auto">
              <p className="">
                Order ID:
                <span className="text-gray-500">{order?.orderId}</span>
              </p>
              <p>
                Date:{' '}
                <span className="text-gray-500">
                  {displayDate(order?.createdAt, false)}
                </span>
              </p>
            </div>
          </div>

          <div className=" mt-8 flow-root mx-0 w-full overflow-auto">
            <table className="w-full overflow-auto">
              <thead className="border-b border-gray-300 text-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 pl-0"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3.5 text-right text-sm font-semibold text-gray-900 table-cell"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3.5 text-right text-sm font-semibold text-gray-900 table-cell"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.productOrders?.map((productOrder, index) => (
                  <tr
                    className="border-b border-gray-200 w-full overflow-auto"
                    key={index}
                  >
                    <td className=" w-full overflow-auto py-5 pr-3 text-sm pl-0">
                      <div className="font-medium text-gray-900">
                        {productOrder?.product?.title}
                      </div>
                      <div className="mt-1 truncate text-gray-500">
                        {productOrder?.sku}
                      </div>
                    </td>
                    <td className="px-3 py-5 text-right text-sm text-gray-500 table-cell w-full overflow-auto">
                      {productOrder?.quantity}
                    </td>
                    <td className="px-3 py-5 text-right text-sm text-gray-500 table-cell w-full overflow-auto">
                      <p>{getProductOrderAmount(productOrder?.amount)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    className="  pr-3 pt-6 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                  >
                    Subtotal
                  </th>

                  <td className="pl-3  pt-6 text-right text-sm text-gray-500 pr-0">
                    {formatCurrency(
                      order?.payment?.itemsTotal / 100,
                      order?.payment?.currency,
                    )}
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="  pr-3 pt-4 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                  >
                    Delivery Fee
                  </th>

                  <td className="pl-3 pt-4 text-right text-sm text-gray-500 pr-0">
                    {formatCurrency(
                      order?.payment?.deliveryFee / 100,
                      order?.payment?.currency,
                    )}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className=" pr-3 pt-4 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                  >
                    Applied Voucher Discount
                  </th>

                  <td className="pl-3  pt-4 text-right text-sm text-gray-500 pr-0">
                    {formatCurrency(
                      order?.payment?.appliedVoucherAmount / 100,
                      order?.payment?.currency,
                    )}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className=" pr-3 pt-4 text-right text-sm font-semibold text-gray-900 table-cell pl-0"
                  >
                    Total
                  </th>

                  <td className="pl-3 pt-4 text-right text-sm font-semibold text-gray-900 pr-0">
                    {formatCurrency(
                      order?.payment?.total / 100,
                      order?.payment?.currency,
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DownLoadReceipt;
