import Chart from "chart.js/auto";
import { Data_DelayedMonthly, Data_DelayedDayOfWeek } from "../../../../data/charts";
import { Bar } from "react-chartjs-2";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

Chart.register(ChartjsPluginStacked100);


export function BarDelayedMonthly() {

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "August",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const barChartDelayedChart = {
        labels: months,
        datasets: [
        {
            label: "Delayed",
            data: Data_DelayedMonthly.filter((item) => item.IS_LATE).map(
            (item) => item.count
            ),
            borderWidth: 1,
            backgroundColor: "#ff6161",
        },
        {
            label: "On-Time",
            data: Data_DelayedMonthly.filter((item) => !item.IS_LATE).map(
            (item) => item.count
            ),
            borderWidth: 1,
            backgroundColor: "#5acc78",
        },
        ],
    };

    return (
        <Bar
            data={barChartDelayedChart}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              indexAxis: "y",
              scales: {
                x: {
                  stacked: true,
                  ticks: {
                    callback: (label) => label + "%",
                  },
                  title: {
                    display: true,
                    text: "Percentage of Flights",
                    //font: { style: "italic" },
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Months",
                    font: {
                      size: 14,
                    },
                    //font: { style: "italic" },
                  },
                },
              },
              plugins: {
                stacked100: { enable: true },
                title: {
                  display: true,
                  text: "Percent of Delayed Flights by Month",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />
    )
}


export function BarDelayedDayOfWeek() {

  const barChartDelayedDayOfWeek = {
      labels: Data_DelayedDayOfWeek.filter((_,index)=>index % 2 == 0).map((val)=>val.DAYOFWEEK),
      datasets: [
        {
          label: "Delayed",
          data: Data_DelayedDayOfWeek.filter((item) => item.IS_LATE).map(
            (item) => item.count
          ),
          borderWidth: 1,
          backgroundColor: "#ff6161",
        },
        {
          label: "On-Time",
          data: Data_DelayedDayOfWeek.filter((item) => !item.IS_LATE).map(
            (item) => item.count
          ),
          borderWidth: 1,
          backgroundColor: "#5acc78",
        },
      ],
    };

    return(<Bar
            data={barChartDelayedDayOfWeek}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              indexAxis: "y",
              scales: {
                x: {
                  stacked: true,
                  ticks: {
                    callback: (label) => label + "%",
                  },
                  title: {
                    display: true,
                    text: "Percentage of Flights",
                    //font: { style: "italic" },
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Months",
                    font: {
                      size: 14,
                    },
                    //font: { style: "italic" },
                  },
                },
              },
              plugins: {
                stacked100: { enable: true },
                title: {
                  display: true,
                  text: "Percent of Delayed Flights by Month",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />)

}