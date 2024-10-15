
import Chart from "react-apexcharts";
import Datepicker from "../../../lib/DatePicker";



const SalesCountChart = ({fillColors, labels, data, totalLabel}: {
    fillColors: string[],
    labels?: string[],
    data: number[],
    totalLabel?: string
}) => {

 
    //colors: ["#133522", "#D5B07B"],
  
    

    
  
    const options: ApexCharts.ApexOptions = {
        stroke: {
            colors: ["transparent"],
            lineCap: "round",
          },
      chart: {
        type: "donut",
        fontFamily: "Inter, sans-serif",
        // foreColor: labelColor,
        toolbar: {
          show: false,
        },
      },
        labels: labels,
fill: {
    colors: fillColors,
},
   
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "1px",
                fontFamily: "Inter, sans-serif",
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "1px",
                fontFamily: "Inter, sans-serif",
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
               
                show: true,
                label: totalLabel || "Total",
                color: "#888",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a:any, b:any) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
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
  
    return <Chart height={420} options={options} series={series} type="donut" />;
  };








const ShopSalesCount = () => {
    
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between my-1">
        <div className="text-sm">Sales Count</div>
        <div className="text-sm"><Datepicker /></div>
        </div>
        <div className="flex justify-between my-3 flex-wrap">
            <div className="flex items-center text-center gap-1 text-sm flex-wrap">
                <div className="w-[16px] h-[16px] bg-baseGreen rounded-md"></div>
                <div>Ready Made = <strong>{100}</strong></div>

            </div>
            <div className="flex items-center text-center gap-1 text-sm flex-wrap">
                <div className="w-[16px] h-[16px] bg-gold rounded-md"></div>
                <div>Bespoke = <strong>{50}</strong></div>

            </div>

        </div>
        <div className="flex justify-center">
            <SalesCountChart
            fillColors={["#D5B07B","#133522" ]}
           labels ={[ "Bespoke", "Ready Made"]}
              data={[40,100]}
              totalLabel = "Total Sales"
     
            />
            </div>
    

    </div>
  )
}

export default ShopSalesCount


