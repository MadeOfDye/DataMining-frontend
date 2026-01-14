//import Chart from "chart.js/auto";
import { Data_OriginCorrelations, Data_ArrCorrelations } from "../../../../data/charts";
import { Bar } from "react-chartjs-2";


export function OriginWeatherCorrelations() {

  const data = Data_OriginCorrelations


 // NOTE: CHANGE TO groups of 10
  const barAirlineDelayed = {
      labels: data.map((val)=>val.Feature),
      datasets: [
        {
          label: 'Corr',
          data: data.map (
            (item) => item.val
          ),
          size:10
          ,
          backgroundColor: "#27006e",
          barPercentage: 1.1
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
                  title: {
                    display: true,
                    text: "Correlation with Delay",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    font: {
                        size:14
                    }
                  },
                  title: {
                    display: true,
                    text: "",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Origin Weather Correlations",
                  font: {
                    size: 16,
                  },
                },
                legend: {
                    display: false
                }
              },
            }}
          />)

}


export function ArrWeatherCorrelations() {

  const data = Data_ArrCorrelations


 // NOTE: CHANGE TO groups of 10
  const barAirlineDelayed = {
      labels: data.map((val)=>val.Feature),
      datasets: [
        {
          label: 'Corr',
          data: data.map (
            (item) => item.val
          ),
          size:10
          ,
          backgroundColor: "#27006e",
          barPercentage: 1.1
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
                  title: {
                    display: true,
                    text: "Correlation with Delay",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    font: {
                        size:14
                    }
                  },
                  title: {
                    display: true,
                    text: "",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Dest Weather Correlations",
                  font: {
                    size: 16,
                  },
                },
                legend: {
                    display: false
                }
              },
            }}
          />)

}
