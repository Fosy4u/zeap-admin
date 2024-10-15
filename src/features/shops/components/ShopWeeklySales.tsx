
import Chart from "react-apexcharts";
import { ShopInterface } from "../../../interface/interface";
import { kFormatter } from "../../../utils/helpers";
import { useThemeMode } from "flowbite-react";



const SalesWeeklyChart = ({  data,  currency}: {
 
    labels?: string[],
    data: any[],
    totalLabel?: string,
    currency: string
}) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;
 
    //colors: ["#133522", "#D5B07B"],
  
    

    
  
    const options: ApexCharts.ApexOptions = {
      stroke: {
        curve: "smooth",
      },
      chart: {
        type: "area",
        fontFamily: "Inter, sans-serif",
        foreColor: labelColor,
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom,
          opacityTo,
          type: "vertical",
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
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
        strokeColors: "#ffffff",
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      xaxis: {
        categories: [
          "01 Feb",
          "02 Feb",
          "03 Feb",
          "04 Feb",
          "05 Feb",
          "06 Feb",
          "07 Feb",
        ],
        labels: {
          style: {
            colors: [labelColor],
            fontSize: "14px",
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
          position: "back",
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
            fontSize: "14px",
            fontWeight: 500,
          },
          formatter: function (value) {
            return currency + value;
          },
        },
      },
      legend: {
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "Inter, sans-serif",
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
      ]
      
    };
    
    
    
    

    const series = data;
  
    return <Chart height={420} options={options} series={series} type="area"

     />;
  };



const ShopWeeklySales = ({shop}:{
  shop: ShopInterface
}) => {
    
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between my-1">
        <div className="text-sm">Weekly Sales</div>
        <div className="text-sm">Date Picker</div>
        </div>
        <div className="flex justify-between my-3 flex-wrap">
            <div className="flex items-center text-center gap-1 text-sm flex-wrap">
              
                <div>Total Order = <strong>{121}</strong></div>

            </div>
            <div className="flex items-center text-center gap-1 text-sm flex-wrap">
      
                <div>Total Revenue = <strong>{`${shop?.currency?.symbol} ${kFormatter(350000)}`}</strong></div>

            </div>

        </div>
        <div>
            <SalesWeeklyChart
            
              data={  [{
                
                  name: "Revenue",
                  data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
                  color: "#133522",
                
              }]}
              totalLabel = "Revenue"
              currency = {shop?.currency?.symbol || "₦"}
     
            />
            </div>
    

    </div>
  )
}

export default ShopWeeklySales


