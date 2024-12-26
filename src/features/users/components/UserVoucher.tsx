import ReactTimeAgo from 'react-time-ago';
import { formatCurrency } from '../../../utils/helpers';
import { VoucherInterface } from '../../../interface/interface';
import { Alert, Badge } from 'flowbite-react';

const UserVoucher = ({ voucher }: { voucher: VoucherInterface }) => {
  return (
    <div
      key={voucher?._id}
      className="overflow-scroll border border-info  rounded rounded-2xl p-6   light:shadow-slate-200 dark:shadow-slate-800 bg-grey8 dark:bg-grey2 dark:text-white mt-2 hover:shadow-2xl transition duration-300"
    >
      <div className="flex flex-col p-2 gap-2">
        <div className="flex justify-between">
          <span className="text-lg ">Voucher - {voucher.code}</span>
          <span className="text-lg font-semibold text-success">
            {formatCurrency(voucher.amount, voucher.currency)}
          </span>
        </div>
        <Badge size="lg" color={voucher.isUsed ? 'failure' : 'success'}>
          {voucher.isUsed ? 'Used' : 'Unused'}
        </Badge>
        <Alert
          color={
            new Date(voucher.expiryDate).toDateString() >
            new Date().toDateString()
              ? 'failure'
              : 'success'
          }
        >
          {new Date(voucher.expiryDate).toDateString() >
          new Date().toDateString() ? (
            <span>
              {' '}
              Expired {''}
              <ReactTimeAgo date={voucher.expiryDate} locale="en-US" />
            </span>
          ) : (
            <span>
              Expires {''}
              <ReactTimeAgo date={voucher.expiryDate} locale="en-US" />
            </span>
          )}
        </Alert>
      </div>
    </div>
  );
};

export default UserVoucher;
