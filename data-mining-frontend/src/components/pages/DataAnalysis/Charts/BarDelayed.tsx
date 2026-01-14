import Chart from "chart.js/auto";
import { Data_DelayedMonthly, Data_DelayedDayOfWeek, Data_AirlineDelayed, Data_DelayedHour, Data_AircraftAge } from "../../../../data/charts";
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
                    text: "% of Flights",
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
                  text: "Delayed Flights by Month",
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
                    text: "% of Flights",
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
                    text: "Day of Week",
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
                  text: "Delayed Flights by Day",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />)

}

export function BarAirlineDelayed() {

  const data = Data_AirlineDelayed.sort((r1,r2)=>r2.LATE_PCT-r1.LATE_PCT)

  const barAirlineDelayed = {
      labels: data.map((val)=>val.AIRLINE_NAME),
      datasets: [
        {
          label: "Delayed",
          data: data.map(
            (item) => item.LATE
          ),
          borderWidth: 1,
          backgroundColor: "#ff6161",
        },
        {
          label: "On-Time",
          data: data.map (
            (item) => item.COUNT - item.LATE
          ),
          borderWidth: 1,
          backgroundColor: "#5acc78",
        },
      ],
    };

    return(<Bar
            data={barAirlineDelayed}
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
                    text: "% of Flights",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Airlines",
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
                  text: "Delayed Flights by Airline",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />)

}


export function BarHourDelayed() {

  const data = Data_DelayedHour

  const bar = {
      labels: data.map((val)=>val.HOUR),
      datasets: [
        {
          label: "Delayed",
          data: data.map(
            (item) => item.LATE
          ),
          borderWidth: 1,
          backgroundColor: "#ff6161",
        },
        {
          label: "On-Time",
          data: data.map (
            (item) => item.COUNT - item.LATE
          ),
          borderWidth: 1,
          backgroundColor: "#5acc78",
        },
      ],
    };

    return(<Bar
            data={bar}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  
                  title: {
                    display: true,
                    text: "Hour",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    callback: (label) => label + "%",
                  },
                  title: {
                    display: true,
                    text: "% of Flights",
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
                  text: "Delayed Flights by Hour",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />)

}




export function BarAircraftAge() {

  const data = Data_AircraftAge


  const bar = {
      labels: data.map((val)=>val.AIRCRAFT_AGE),
      datasets: [
        {
          label: "Delayed",
          data: data.map(
            (item) => item.COUNT
          ),
          borderWidth: 1,
          backgroundColor: "#ff6161",
        },
        {
          label: "On-Time",
          data: data.map (
            (item) => item.COUNT - item.LATE
          ),
          borderWidth: 1,
          backgroundColor: "#5acc78",
        },
      ],
    };

    return(<Bar
            data={bar}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  
                  title: {
                    display: true,
                    text: "Age",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  
                  title: {
                    display: true,
                    text: "Flights",
                    font: {
                      size: 14,
                    },
                    //font: { style: "italic" },
                  },
                },
              },
              plugins: {
                
                title: {
                  display: true,
                  text: "Flight Delays by Aircraft Age",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />)

}


