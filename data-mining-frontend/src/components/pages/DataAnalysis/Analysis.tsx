import Chart from "chart.js/auto";
import { Data_DelayedOnTime, Data_DelayedMonthly } from "../../../data/charts";
import { Pie, Bar } from "react-chartjs-2";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

Chart.register(ChartjsPluginStacked100);

export function Analysis() {
  const container = {
    borderStyle: "solid",
    borderWidth: "0px 0px 1px 0px",
    borderBottom: "2px solid black",
    fontFamily: "Inter",
    paddingLeft: "50px",
  };

  const smalltitle = {
    textAlign: "center" as "center",
    fontSize:"24px",
    fontWeight:"bold",
    marginTop:"10px"
  };

  const note = { fontSize: "12px", fontStyle: "italic" };

  const chartStyle = {
    // height: "400px",
    backgroundColor: "lightgrey",
    padding: "5px",
    borderRadius: "5px",
    //width: "500px",
  };

  const pieChartDelayedChart = {
    labels: Data_DelayedOnTime.map((item) => item.name),
    datasets: [
      {
        label: "Flights",
        data: Data_DelayedOnTime.map((item) => item.amount),
        borderWidth: 1,
        backgroundColor: Data_DelayedOnTime.map((item) => item.colour),
      },
    ],
  };

  let months = [
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

  const flexContainer = {
    display: "flex",
    gap: "20px",
  };

  return (
    <div style={container}>
      <h2 style={smalltitle}>Visualisations</h2>
      <span style={note}>
        <b>Note:</b> Only data for 2024 is used in the following analysis.
      </span>
      <h3>Delayed flights</h3>
      <div style={flexContainer}>
        <div style={chartStyle}>
          <Pie
            data={pieChartDelayedChart}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: "Flight Arrival Status",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
          />
        </div>
        <div style={chartStyle}>
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
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
