import { Badge } from 'flowbite-react';
import { PaymentInterface } from '../../../interface/interface';
import { capitalizeFirstLetter, formatCurrency } from '../../../utils/helpers';
import UserTile from '../../users/components/UserTile';

const PaymentSideA = ({ payment }: { payment: PaymentInterface }) => {
  const user = payment?.user;
  return (
    <div className="flex flex-col gap-8  divide-y divide-slate-300 p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-md ">Amount</span>
          <span className="text-2xl font-semibold text-success">
            {formatCurrency(payment.amount / 100, payment.currency)}
          </span>
        </div>
        <Badge
          size="lg"
          color={payment.status === 'success' ? 'success' : 'failure'}
        >
          {payment.status}
        </Badge>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-md ">Gateway</span>
        <span className="text-lg font-semibold">
          {payment.gateway || 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Reference</span>
        <span className="text-lg font-semibold">
          {payment.reference || 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Channel</span>
        <span className="text-lg font-semibold">
          {capitalizeFirstLetter(payment.channel || 'N/A')}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Items Total</span>
        <span className="text-lg font-semibold ">
          {payment.fees
            ? formatCurrency(payment?.itemsTotal / 100, payment.currency)
            : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Delivery Fee</span>
        <span className="text-lg font-semibold ">
          {payment.fees
            ? formatCurrency(payment?.deliveryFee / 100, payment.currency)
            : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Third Party Charges</span>
        <span className="text-lg font-semibold text-danger">
          {payment.fees
            ? formatCurrency(payment.fees / 100, payment.currency)
            : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Paid At</span>
        <span className="text-lg font-semibold">
          {payment?.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Message</span>
        <span className="text-lg font-semibold">
          {payment?.gatewayResponse ? payment.gatewayResponse : 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-md ">Customer</span>
        <span className="text-lg font-semibold">
          <UserTile user={user} />
        </span>
      </div>
    </div>
  );
};

export default PaymentSideA;
