import { useState } from 'react';
import './weekSelector.css';
import { v4 } from 'uuid';
import { addMonths, endOfWeek, startOfWeek, subMonths } from 'date-fns';
import { getDaysInMonth } from 'date-fns';

const ArrowLeft = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.9419 3.30806C13.186 3.55214 13.186 3.94786 12.9419 4.19194L7.13388 10L12.9419 15.8081C13.186 16.0521 13.186 16.4479 12.9419 16.6919C12.6979 16.936 12.3021 16.936 12.0581 16.6919L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L12.0581 3.30806C12.3021 3.06398 12.6979 3.06398 12.9419 3.30806Z"
    />
  </svg>
);

const ArrowRight = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.05806 3.30806C7.30214 3.06398 7.69786 3.06398 7.94194 3.30806L14.1919 9.55806C14.436 9.80214 14.436 10.1979 14.1919 10.4419L7.94194 16.6919C7.69786 16.936 7.30214 16.936 7.05806 16.6919C6.81398 16.4479 6.81398 16.0521 7.05806 15.8081L12.8661 10L7.05806 4.19194C6.81398 3.94786 6.81398 3.55214 7.05806 3.30806Z"
    />
  </svg>
);

const WeekSelector = ({ setValue }: { setValue: (date: Date) => void }) => {
  console.log(setValue);

  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState({
    firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
    lastDay: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const isLeapYear = () => {
    let leapYear = new Date(new Date().getFullYear(), 1, 29);
    // eslint-disable-next-line eqeqeq
    return leapYear.getDate() == 29;
  };

  const handleClick = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    let localDate;
    if ((e.target as HTMLElement).id.includes('prev')) {
      localDate = new Date(date.setDate(1));
      setDate(new Date(date.setDate(1)));
    } else if ((e.target as HTMLElement).id.includes('next')) {
      localDate = new Date(date.setDate(getDaysInMonth(date)));
      setDate(new Date(date.setDate(getDaysInMonth(date))));
    } else {
      localDate = new Date(date.setDate(Number((e.target as HTMLElement).id)));
      setDate(new Date(date.setDate(Number((e.target as HTMLElement).id))));
    }
    const firstDay = startOfWeek(localDate, { weekStartsOn: 1 });
    const lastDay = endOfWeek(localDate, { weekStartsOn: 1 });
    setWeek({ firstDay, lastDay });
    setValue(localDate);
  };

  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun',
    'July',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  const days: { [key: string]: number } = {
    '1': 31,
    '2': isLeapYear() ? 29 : 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  };

  const renderDays = () => {
    let month = date.getMonth() + 1;
    let ar = [];
    for (let i = 1; i <= days[month.toString()]; i++) {
      let currentDate = new Date(date).setDate(i);

      let cName = 'single-number ';
      if (
        new Date(week.firstDay).getTime() <= new Date(currentDate).getTime() &&
        new Date(currentDate).getTime() <= new Date(week.lastDay).getTime()
      ) {
        cName = cName + 'selected-week';
      }

      ar.push(
        <div
          key={v4()}
          id={i.toString()}
          className={cName}
          onClick={handleClick}
        >
          {i}
        </div>,
      );
    }

    const displayDate = new Date(date).setDate(1);
    let dayInTheWeek = new Date(displayDate).getDay();
    if (dayInTheWeek < 1) {
      dayInTheWeek = 7;
    }
    let prevMonth = [];
    let prevMonthDays = new Date(date).getMonth();
    if (prevMonthDays === 0) {
      prevMonthDays = 12;
    }
    for (let i = dayInTheWeek; i > 1; i--) {
      let previousMonth = new Date(date).setMonth(
        new Date(date).getMonth() - 1,
      );
      let currentDate = new Date(previousMonth).setDate(
        days[prevMonthDays] - i + 2,
      );
      let cName = 'single-number other-month';
      let currentTime = new Date(currentDate).getTime();
      let firstTime = new Date(week.firstDay).getTime();
      let endTime = new Date(week.lastDay).getTime();
      if (currentTime >= firstTime && currentTime <= endTime) {
        cName = 'single-number selected-week';
      }

      prevMonth.push(
        <div
          onClick={handleClick}
          key={v4()}
          id={'prev-' + i}
          className={cName}
        >
          {days[prevMonthDays] - i + 2}
        </div>,
      );
    }

    let nextMonth = [];
    let fullDays = 35;
    if ([...prevMonth, ...ar].length > 35) {
      fullDays = 42;
    }

    for (let i = 1; i <= fullDays - [...prevMonth, ...ar].length; i++) {
      let cName = 'single-number other-month';
      const lastDay = week.lastDay.getTime();
      const lastDayOfMonth = new Date(
        new Date(date).setDate(getDaysInMonth(date)),
      );

      if (
        lastDayOfMonth.getTime() <= lastDay &&
        week.firstDay.getMonth() === lastDayOfMonth.getMonth()
      ) {
        cName = 'single-number selected-week';
      }

      nextMonth.push(
        <div
          onClick={handleClick}
          key={v4()}
          id={'next-' + i}
          className={cName}
        >
          {i}
        </div>,
      );
    }
    return [...prevMonth, ...ar, ...nextMonth];
  };

  const handleDate = (next?: boolean) => {
    let localDate = new Date(date);
    if (next) {
      localDate = addMonths(localDate, 1);
    } else {
      localDate = subMonths(localDate, 1);
    }
    setDate(new Date(localDate));
  };

  return (
    <div className="week-picker-display" tabIndex={0}>
      <div className="flex flex-col">
        <div className="title-week">
          <div onClick={() => handleDate()} className="arrow-container">
            {ArrowLeft}
          </div>
          {`${months[date.getMonth()]} ${date.getFullYear()}.`}
          <div onClick={() => handleDate(true)} className="arrow-container">
            {ArrowRight}
          </div>
        </div>
        <div className="numbers-container">
          <div className="single-number day">Mon</div>
          <div className="single-number day">Tue</div>
          <div className="single-number day">Wed</div>
          <div className="single-number day">Thu</div>
          <div className="single-number day">Fri</div>
          <div className="single-number day">Sat</div>
          <div className="single-number day">Sun</div>
        </div>
        <div className="numbers-container">{renderDays()}</div>
      </div>
    </div>
  );
};

export default WeekSelector;
