import { Avatar, Timeline } from 'flowbite-react';
import { HiCalendar } from 'react-icons/hi';
import { TimelineInterface } from '../../../interface/interface';
import NoPic from '../../../images/user/avatar-anika-visser.png';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en);

const ProductTimeline = ({
  timeLines,
  viewAll = false,
}: {
  timeLines: TimelineInterface[];
  viewAll?: boolean;
}) => {
  const sortedTimeLines =
    [...timeLines]?.sort(
      (a: TimelineInterface, b: TimelineInterface) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    ) || [];

  return (
    <div
      className={` ${!viewAll ? 'max-h-[32rem]' : 'h-full'} overflow-y-auto w-full p-4 bg-grey8 dark:bg-grey2  rounded-md`}
    >
      {timeLines?.length > 0 ? (
        <Timeline>
          {sortedTimeLines?.map((timeLine, index) => (
            <Timeline.Item key={index}>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>
                  {
                    <ReactTimeAgo
                      date={new Date(timeLine?.date)}
                      locale="en-US"
                    />
                  }
                </Timeline.Time>
                <Timeline.Title className="text-sm">
                  {timeLine?.description}
                </Timeline.Title>
                <Timeline.Body>
                  <span className="inline-flex items-center gap-2">
                    <Avatar
                      img={timeLine?.actionBy?.imageUrl?.link || NoPic}
                      alt="Neil image"
                      rounded
                      size="sm"
                    />
                    {timeLine?.actionBy?.displayName}
                  </span>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <div className="flex items-center justify-center h-96">
          No timeline found
        </div>
      )}
    </div>
  );
};

export default ProductTimeline;
