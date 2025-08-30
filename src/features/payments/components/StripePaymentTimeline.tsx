import { Timeline } from 'flowbite-react';
import { IoIosDoneAll } from 'react-icons/io';
import { capitalizeFirstLetter, displayDate } from '../../../utils/helpers';

const timelineTheme = {
  root: {
    direction: {
      horizontal: 'sm:flex',
      vertical: 'relative border-l border-gray-200 dark:border-gray-700',
    },
  },
  item: {
    point: {
      horizontal: 'flex items-center',
      line: 'hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex',
      marker: {
        icon: {
          base: 'h-3 w-3 text-cyan-600 dark:text-cyan-300',
          wrapper:
            'absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-success ring-8 ring-white  dark:ring-gray-900',
        },
      },
      vertical: '',
    },
  },
};

const logLabels = [
  {
    type: 'payment_intent.created',
    label: 'Payment Initiated',
    message: 'Payment process started',
    sign: 'warning',
  },
  {
    type: 'payment_intent.succeeded',
    label: 'Payment Successful',
    message: 'Payment was successful',
    sign: 'success',
  },
  {
    type: 'payment_intent.payment_failed',
    label: 'Payment Failed',
    message: 'Payment failed',
  },
  {
    type: 'charge.refunded',
    label: 'Payment Refunded',
    message: 'Payment was refunded',
    sign: 'info',
  },
  {
    type: 'charge.dispute.created',
    label: 'Dispute Created',
    message: 'Dispute was created',
    sign: 'warning',
  },
  {
    type: 'charge.dispute.closed',
    label: 'Dispute Closed',
    message: 'Dispute was closed',
    sign: 'info',
  },
];

const StripePaymentTimeline = ({
  logs,
}: {
  logs: {
    created: Date;
    type: string;
  }[];
}) => {
  return (
    <div>
      <Timeline theme={timelineTheme}>
        {logs.map((log, index) => {
          const label = logLabels.find((label) => label.type === log.type);
          return (
            <Timeline.Item key={index}>
              <Timeline.Point icon={IoIosDoneAll} />
              <Timeline.Content>
                <Timeline.Time>{displayDate(log.created)}</Timeline.Time>
                <Timeline.Title
                  className={`text-${label?.sign || 'slate-500'}`}
                >
                  {capitalizeFirstLetter(label?.label || 'Unknown')}
                </Timeline.Title>
                <Timeline.Body>
                  {capitalizeFirstLetter(
                    label?.message || 'No details available',
                  )}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default StripePaymentTimeline;
