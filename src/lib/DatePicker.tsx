import { Dropdown } from "flowbite-react";
import { FC, useState } from "react";
import { dateCalcHelper } from "../utils/dateCalcHelper";

const previousMonthLastDay = dateCalcHelper.getPreviousMonthLastDay();

const previousMonthFirstDay = dateCalcHelper.getPreviousMonthFirstDay();

const thisMonthFirstDay = dateCalcHelper.getThisMonthFirstDay();
const thisMonthLastDay = dateCalcHelper.getThisMonthLastDay();
const yesterday = dateCalcHelper.getYesterday();
const today = dateCalcHelper.getToday();
const thisWeekFirstDay = dateCalcHelper.getThisWeekFirstDay();
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

const Datepicker: FC = function () {
  const [to, setTo] = useState<string>(thisYearLastDay);
  const [from, setFrom] = useState<string>(thisYearFirstDay);



 

  const dateFilterOptions = [
    {
      label: "Today",
      from: today,
      to: today,
    },
    {
      label: "Yesterday",
      from: yesterday,
      to: yesterday,
    },
    {
      label: "This Week",
      from: thisWeekFirstDay,
      to: thisWeekLastDay,
    },
    {
      label: "Last Week",
      from: lastWeekFirstDay,
      to: lastWeekLastDay,
    },
    {
      label: "This Month",
      from: thisMonthFirstDay,
      to: thisMonthLastDay,
    },
    {
      label: "Last Month",
      from: previousMonthFirstDay,
      to: previousMonthLastDay,
    },
    {
      label: "This Quarter",
      from: thisQuarterFirstDay,
      to: thisQuarterLastDay,
    },
    {
      label: "Last Quarter",
      from: lastQuarterFirstDay,
      to: lastQuarterLastDay,
    },
    {
      label: "This Year",
      from: thisYearFirstDay,
      to: thisYearLastDay,
    },
    {
      label: "Last Year",
      from: lastYearFirstDay,
      to: lastYearLastDay,
    },
  ];

    return (
      <span className="text-sm text-gray-600">
        <Dropdown color="success" size="sm" label={dateFilterOptions?.find(
          (option) => option.from === from && option.to === to
        )?.label || "Custom Date"}>
          
          <Dropdown.Divider />
          {dateFilterOptions.map((option) => (
            <Dropdown.Item key={option.label} value={option.label}
              onClick={() => {
                setFrom(option.from);
                setTo(option.to);
              }}
              className={`${option.from === from && option.to === to ? "bg-success text-white" : ""}`}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        
          <Dropdown.Divider />
          <Dropdown.Item>Custom...</Dropdown.Item>
        </Dropdown>
      </span>
    );
  };

  export default Datepicker;