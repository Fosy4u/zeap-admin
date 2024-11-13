import Chart from 'react-apexcharts';
import { ShopInterface } from '../../../interface/interface';
import { kFormatter } from '../../../utils/helpers';
import { Button, Popover, useThemeMode } from 'flowbite-react';
import { useState } from 'react';
// import WeekFilter from "../../../lib/weekFilter/WeekFilter";

import { HiChevronDown } from 'react-icons/hi';
import WeekSelector from '../../../lib/weekFilter/WeekSelector';

const SalesWeeklyChart = ({
  data,
  currency,
}: {
  labels?: string[];
  data: any[];
  totalLabel?: string;
  currency: string;
}) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === 'dark';

  const borderColor = isDarkTheme ? '#374151' : '#F3F4F6';
  const labelColor = isDarkTheme ? '#93ACAF' : '#6B7280';
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  //colors: ["#133522", "#D5B07B"],

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: 'smooth',
    },
    chart: {
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom,
        opacityTo,
        type: 'vertical',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: '#ffffff',
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
        formatter: function (value) {
          return currency + value;
        },
      },
    },
    legend: {
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };

  const series = data;

  return <Chart height={420} options={options} series={series} type="area" />;
};

const ShopWeeklySales = ({ shop }: { shop: ShopInterface }) => {
  const [value, setValue] = useState(new Date());

  //fet first and last day of the week
  const firstDay = new Date(value);
  const lastDay = new Date(value);
  const day = firstDay.getDay();
  const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1);
  firstDay.setDate(diff);
  lastDay.setDate(diff + 6);

  const convertDate = (date: Date) => {
    let dt = new Date(date);

    return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}.`;
  };
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between my-1">
        <div className="text-sm">Weekly Sales</div>
        <Popover
          content={
            <div className="">
              <WeekSelector setValue={setValue} />
            </div>
          }
        >
          <Button color="success" size="xs">
            {convertDate(firstDay)} - {convertDate(lastDay)}
            <HiChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </Popover>

        {/* {!openWeekPicker && ( 
          <Button   
          color="success"
          size="xs"
          onClick={() => setOpenWeekPicker(!openWeekPicker)}>

       
        {convertDate(firstDay)} - {convertDate(lastDay)}
        <HiChevronDown className="ml-2 h-5 w-5" />
      </Button> )} */}

        {/* {openWeekPicker && (<WeekFilter 
        value={value}
        setValue={setValue}
        close = {() => setOpenWeekPicker(false)}
        />)}  */}
      </div>
      <div className="flex justify-between my-3 flex-wrap">
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div>
            Total Order = <strong>{121}</strong>
          </div>
        </div>
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div>
            Total Revenue ={' '}
            <strong>{`${shop?.currency?.symbol} ${kFormatter(350000)}`}</strong>
          </div>
        </div>
      </div>
      <div>
        <SalesWeeklyChart
          data={[
            {
              name: 'Revenue',
              data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
              color: '#133522',
            },
          ]}
          totalLabel="Revenue"
          currency={shop?.currency?.symbol || '₦'}
        />
      </div>
    </div>
  );
};

export default ShopWeeklySales;
