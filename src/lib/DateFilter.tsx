import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { dateCalcHelper } from '../utils/dateCalcHelper';
import DatePicker from './DatePicker';
import moment from 'moment';

const previousMonthLastDay = dateCalcHelper.getPreviousMonthLastDay();

const previousMonthFirstDay = dateCalcHelper.getPreviousMonthFirstDay();

const thisMonthFirstDay = dateCalcHelper.getThisMonthFirstDay();
const thisMonthLastDay = dateCalcHelper.getThisMonthLastDay();
const yesterday = dateCalcHelper.getYesterday();
const today = dateCalcHelper.getToday();
const thisWeekFirstDay = dateCalcHelper.getThisWeekFirstDay();
console.log('thisWeekFirstDay', thisWeekFirstDay);
const thisWeekLastDay = dateCalcHelper.getThisWeekLastDay();
const lastWeekFirstDay = dateCalcHelper.getLastWeekFirstDay();
const lastWeekLastDay = dateCalcHelper.getLastWeekLastDay();
const thisQuarterFirstDay = dateCalcHelper.getQuarterFirstDay();
const thisQuarterLastDay = dateCalcHelper.getQuarterLastDay();
const lastQuarterFirstDay = dateCalcHelper.getLastQuarterFirstDay();
const lastQuarterLastDay = dateCalcHelper.getLastQuarterLastDay();
const thisYearFirstDay = dateCalcHelper.getThisYearFirstDay();
const thisYearLastDay = dateCalcHelper.getThisYearLastDay();
const lastYearFirstDay = dateCalcHelper.getPreviousYearFirstDay();
const lastYearLastDay = dateCalcHelper.getPreviousYearLastDay();

const DateFilter = ({
  from,
  to,
  setFrom,
  setTo,
}: {
  from: Date | string;
  to: Date | string;
  setFrom: (date: Date | string) => void;
  setTo: (date: Date | string) => void;
}) => {
  const [openCustom, setOpenCustom] = useState(false);
  const [customFrom, setCustomFrom] = useState<Date | string>(
    moment(new Date(from)).format('YYYY-MM-DD'),
  );

  const [customTo, setCustomTo] = useState<Date | string>(
    moment(new Date(to)).format('YYYY-MM-DD'),
  );

  const dateFilterOptions = [
    {
      label: 'Today',
      from: today,
      to: today,
    },
    {
      label: 'Yesterday',
      from: yesterday,
      to: yesterday,
    },
    {
      label: 'This Week',
      from: thisWeekFirstDay,
      to: thisWeekLastDay,
    },
    {
      label: 'Last Week',
      from: lastWeekFirstDay,
      to: lastWeekLastDay,
    },
    {
      label: 'This Month',
      from: thisMonthFirstDay,
      to: thisMonthLastDay,
    },
    {
      label: 'Last Month',
      from: previousMonthFirstDay,
      to: previousMonthLastDay,
    },
    {
      label: 'This Quarter',
      from: thisQuarterFirstDay,
      to: thisQuarterLastDay,
    },
    {
      label: 'Last Quarter',
      from: lastQuarterFirstDay,
      to: lastQuarterLastDay,
    },
    {
      label: 'This Year',
      from: thisYearFirstDay,
      to: thisYearLastDay,
    },
    {
      label: 'Last Year',
      from: lastYearFirstDay,
      to: lastYearLastDay,
    },
  ];
  const getLabel = (from: Date | string, to: Date | string) => {
    const found =
      dateFilterOptions?.find(
        (option) => option.from === from && option.to === to,
      ) ||
      dateFilterOptions.find(
        (option) =>
          option.from === moment(from).format('YYYY-MM-DD') &&
          option.to === moment(to).format('YYYY-MM-DD'),
      ) ||
      dateFilterOptions.find(
        (option) =>
          new Date(option.from).getTime() === new Date(from).getTime() &&
          new Date(option.to).getTime() === new Date(to).getTime(),
      );
    return found?.label || 'Custom';
  };
  return (
    <span className="text-sm text-gray-600">
      <Dropdown
        color="success"
        size="xs"
        label={getLabel(from, to)}
        dismissOnClick={false}
      >
        <Dropdown.Divider />
        {dateFilterOptions.map((option) => (
          <Dropdown.Item
            key={option.label}
            value={option.label}
            onClick={() => {
              setFrom(option.from);
              setTo(option.to);
              setOpenCustom(false);
            }}
            className={`${option.from === from && option.to === to ? 'bg-success text-white' : 'text-black'}`}
          >
            {option.label}
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            setOpenCustom(!openCustom);
          }}
        >
          Custom{' '}
        </Dropdown.Item>
        {openCustom && (
          <div className="flex gap-2 items-center">
            <DatePicker
              placeholder="From"
              title="select from date"
              value={new Date(customFrom)}
              maxDate={new Date(customTo)}
              setValue={(date: Date) => {
                setCustomFrom(date);
                setFrom(date);
              }}
            />
            <span className="text-gray-600 text-center">to</span>

            <DatePicker
              placeholder="To"
              title="select to date"
              value={new Date(customTo)}
              minDate={new Date(customFrom)}
              setValue={(date: Date) => {
                setCustomTo(date);
                setTo(date);
              }}
            />
          </div>
        )}
        {/* {openCustom && (
            <div className="flex flex-col">
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          )} */}
      </Dropdown>
    </span>
  );
};

export default DateFilter;
