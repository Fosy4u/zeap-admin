import { Timeline } from 'flowbite-react';
import { IoIosDoneAll } from 'react-icons/io';
import { capitalizeFirstLetter } from '../../../utils/helpers';

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

const PaymentTimeline = ({
  history,
}: {
  history: [
    {
      type: string;
      message: string;
      time: number;
    },
  ];
}) => {
  const convertSecondstoMins = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes}m ${seconds}s`;
  };
  return (
    <div className="flex justify-center p-4">
      <Timeline theme={timelineTheme}>
        {history?.map(
          (
            item: { type: string; message: string; time: number },
            index: number,
          ) => (
            <Timeline.Item key={index}>
              <Timeline.Point icon={IoIosDoneAll} />
              <Timeline.Content>
                <Timeline.Time>{convertSecondstoMins(item.time)}</Timeline.Time>
                {/* <Timeline.Title>{item?.name}</Timeline.Title> */}
                <Timeline.Title
                  className={`${item.type === 'success' ? 'text-success' : 'text-warning'}`}
                >
                  {capitalizeFirstLetter(item?.type)}
                </Timeline.Title>
                <Timeline.Body>
                  {capitalizeFirstLetter(item?.message)}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ),
        )}
      </Timeline>
    </div>
  );
};

export default PaymentTimeline;
