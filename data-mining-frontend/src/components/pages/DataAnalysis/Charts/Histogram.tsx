//import Chart from "chart.js/auto";
import { Data_DepDelayBins, Data_ArrDelayBins } from "../../../../data/charts";
import { Bar } from "react-chartjs-2";


export function HistDepDelay() {

  const data = Data_DepDelayBins


  const sum_of_data = data.reduce((s, i)=>s + i.COUNT, 0)
 // NOTE: CHANGE TO groups of 10
  const barAirlineDelayed = {
      labels: data.map((val)=>val.DEPDELAY),
      datasets: [
        {
          label: 'Flight %',
          data: data.map (
            (item) => item.COUNT / sum_of_data
          ),
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
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Departure Delay (mins)",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    callback: (label) => ((label as number) * 100) + "%",
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
                title: {
                  display: true,
                  text: "Departure Delay Frequency",
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


export function HistArrDelay() {

  const data = Data_ArrDelayBins


  const sum_of_data = data.reduce((s, i)=>s + i.COUNT, 0)

  const barAirlineDelayed = {
      labels: data.map((val)=>val.ARRDELAY),
      datasets: [
        {
          label: 'Flight %',
          data: data.map (
            (item) => item.COUNT / sum_of_data
          ),
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
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  
                  
                  title: {
                    display: true,
                    text: "Arrival Delay (mins)",
                    font: {
                      size: 14,
                    },
                  },
                },
                y: {
                  stacked: true,
                  ticks: {
                    callback: (label) => ((label as number) * 100) + "%",
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
                title: {
                  display: true,
                  text: "Arrival Delay Frequency",
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