import { HiAdjustmentsHorizontal, HiComputerDesktop } from 'react-icons/hi2';
import { PaymentInterface } from '../../../interface/interface';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import { HiInformationCircle } from 'react-icons/hi';
import PaystackPaymentTimeline from './PaystackPaymentTimeline';
import StripePaymentTimeline from './StripePaymentTimeline';

const PaymentSideB = ({ payment }: { payment: PaymentInterface }) => {
  const timeInSeconds = payment.log?.time_spent;
  // convert time to hours, minutes and seconds
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return (
    <div className="flex flex-col  gap-8  divide-y divide-slate-300 p-4 bg-grey8 dark:bg-slate-900">
      <div className="flex justify-between">
        <span className="flex flex-col gap-2">
          <span className="font-bold">Card Type</span>
          <span className="text-md">
            {payment.cardType ? capitalizeFirstLetter(payment.cardType) : 'N/A'}
          </span>
        </span>
        <span className="flex flex-col gap-2">
          <span className="font-bold">Bank / Funding and Country</span>
          {payment.bank && (
            <span className="text-md">
              {payment.bank} ({payment.countryCode})
            </span>
          )}
          {!payment.bank && <span className="text-md">N/A</span>}
        </span>
      </div>
      <div className="flex gap-12 h-[18rem] justify-center items-center">
        <span className="flex flex-col gap-2">
          <span className="font-bold">Duration</span>
          {payment.log?.time_spent ? (
            <span className="text-md">
              {hours}h {minutes}m {seconds}s
            </span>
          ) : (
            <span className="text-md">N/A</span>
          )}
        </span>
        <span className="flex flex-col gap-2">
          <span className="flex gap-2 items-center text-success">
            <span>
              <HiComputerDesktop className="text-2xl " />
            </span>
            <span className="flex  flex-col">
              <span className="font-bold">Device Type</span>
              {payment.log ? (
                <span className="text-md">{payment.deviceType}</span>
              ) : (
                <span className="text-md">N/A</span>
              )}
            </span>
          </span>
          {payment?.gateway !== 'stripe' && (
            <>
              <span className="flex gap-2 items-center text-warning">
                <span>
                  <HiAdjustmentsHorizontal className="text-2xl " />
                </span>
                <span className="flex  flex-col">
                  <span className="font-bold">Attempts</span>

                  <span className="text-md">{payment.log?.attempts || 0}</span>
                </span>
              </span>
              <span className="flex gap-2 items-center text-danger">
                <span>
                  <HiInformationCircle className="text-2xl " />
                </span>
                <span className="flex  flex-col">
                  <span className="font-bold text-danger">Errors</span>
                  <span className="text-md">{payment.log?.errors || 0}</span>
                </span>
              </span>
            </>
          )}
        </span>
      </div>
      {payment?.gateway !== 'stripe' ? (
        <PaystackPaymentTimeline history={payment.log?.history} />
      ) : (
        <StripePaymentTimeline logs={payment.log} />
      )}
    </div>
  );
};

export default PaymentSideB;
