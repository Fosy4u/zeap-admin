import { useState } from 'react';
import Chart from 'react-apexcharts';
import Skeleton from '../../../lib/Skeleton';

const ProductStatusChart = ({
  data,
  isLoading,
}: {
  data: { label: string; count: number }[];
  isLoading: boolean;
}) => {
  const categories = data.map((item) => item.label);
  const seriesData = data.map((item) => item.count);
  const [state] = useState({
    series: seriesData,
    options: {
      categories,
      chart: {
        type: 'polarArea' as 'polarArea',
      },
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      labels: categories,
    },
  });
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 ">
      <span className="text-sm font-semibold dark:text-white">
        Products By Status
      </span>
      {isLoading && <Skeleton />}
      <Chart
        height={420}
        options={state.options}
        type="polarArea"
        series={state.series}
      />
    </div>
  );
};

export default ProductStatusChart;
