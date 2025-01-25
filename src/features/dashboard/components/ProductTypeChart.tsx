import { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ThemeContext } from '../../../contexts/themeContext';
import Skeleton from '../../../lib/Skeleton';

const ProductTypeChart = ({
  data,
  totalProductCount,
  isLoading,
}: {
  data: { label: string; count: number }[];
  totalProductCount: number;
  isLoading: boolean;
}) => {
  const { theme } = useContext(ThemeContext);

  const categories = data.map((item) => item.label);
  const seriesData = data.map((item) => item.count);

  const [state, setState] = useState({
    options: {
      xaxis: {
        categories,
        labels: {
          style: {
            colors: theme === 'dark' ? '#ffffff' : '#000000',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme === 'dark' ? '#ffffff' : '#000000',
          },
        },
      },

      // set colors for each bar
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: '#219653',
              },
            ],

            backgroundBarColors: ['#D5F4E3'],
            backgroundBarOpacity: 1,
          },
        },
      },
    },
    series: [
      {
        name: 'Products',
        data: seriesData,
      },
    ],
  });

  useEffect(() => {
    if (theme === 'dark') {
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            labels: {
              ...prevState.options.xaxis.labels,
              style: {
                ...prevState.options.xaxis.labels.style,
                colors: '#ffffff',
              },
            },
          },
          yaxis: {
            ...prevState.options.yaxis,
            labels: {
              ...prevState.options.yaxis.labels,
              style: {
                ...prevState.options.yaxis.labels.style,
                colors: '#ffffff',
              },
            },
          },
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            labels: {
              ...prevState.options.xaxis.labels,
              style: {
                ...prevState.options.xaxis.labels.style,
                colors: '#000000',
              },
            },
          },
          yaxis: {
            ...prevState.options.yaxis,
            labels: {
              ...prevState.options.yaxis.labels,
              style: {
                ...prevState.options.yaxis.labels.style,
                colors: '#000000',
              },
            },
          },
        },
      }));
    }
  }, [theme]);
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 ">
      <span className=" text-sm font-semibold dark:text-white">
        Total Products: {totalProductCount}
      </span>
      {isLoading && <Skeleton />}
      <Chart
        height={420}
        options={state.options}
        type="bar"
        series={state.series}
      />
    </div>
  );
};

export default ProductTypeChart;
