import { PaymentInterface } from '../../../interface/interface';
import { useNavigate } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  numberWithCommas,
} from '../../../utils/helpers';
import ReactTimeAgo from 'react-time-ago';
import { Badge } from 'flowbite-react';

const PaymentTable = ({ payments }: { payments: PaymentInterface[] }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 bg-white dark:bg-boxdark dark:text-white w-full overflow-x-auto">
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Reference
            </th>

            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Paid By
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Amount
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Status
            </th>
            <th
              scope="col"
              className="h-10 px-4 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
            >
              Last Updated
            </th>
          </tr>

          {payments?.map((payment: PaymentInterface) => (
            <tr
              onClick={() => navigate(`/payment/${payment.reference}`)}
              key={payment?._id}
              className="h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 cursor-pointer hover:bg-slate-100"
            >
              <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                {payment?.reference}{' '}
              </td>

              <td
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/users/${payment?.user.userId}`);
                }}
                className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 underline cursor-pointer text-darkGold"
              >
                {capitalizeFirstLetter(payment?.user?.firstName)}{' '}
                {capitalizeFirstLetter(payment?.user?.lastName)}
              </td>
              <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                {getCurrencySmallSymbol(payment.currency)}
                {numberWithCommas(payment?.amount / 100)}
              </td>
              <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                <span
                  className={`${payment.status === 'success' && 'text-success'}`}
                >
                  {capitalizeFirstLetter(payment?.status)}
                </span>
              </td>
              <td className=" h-10 px-4 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500">
                {/* {payment?.paidAt ? (
                  <ReactTimeAgo date={payment?.paidAt} locale="en-US" />
                ) : (
                  'N/A'
                )} */}
                <span className="flex justify-between">
                  <ReactTimeAgo date={payment?.updatedAt} locale="en-US" />

                  <Badge color="success">View Details</Badge>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
