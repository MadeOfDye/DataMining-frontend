import { Data_DelayedOnTime } from "../../../../data/charts";
import { Pie } from "react-chartjs-2";

export function PieDelayed() {

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

    return (
        <Pie
            data={pieChartDelayedChart}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: "Flight Status",
                  font: {
                    size: 16,
                  },
                },
              },
            }}
        />
    )
}