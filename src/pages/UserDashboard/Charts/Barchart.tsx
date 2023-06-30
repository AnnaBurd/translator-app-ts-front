import { Chart as ChartJS, registerables } from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(...registerables);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 4,
        callback: (value: number) => value + " tk ",
      },
      border: {
        display: false,
        dash: [4, 6],
      },

      grid: {
        color: "#e2e8f0",
        tickLength: 0,
      },
    },
  },
};

const months = Array.from({ length: 12 }, (_item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "short" });
});

const currDate = new Date();
const baseMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
baseMonth.setMonth(baseMonth.getMonth() - 4);
const sortedMonths = [...months.splice(baseMonth.getMonth()), ...months];
const labels = sortedMonths.slice(0, 6);

// console.log("currDate", currDate);
// console.log("baseMonth", baseMonth);
// console.log("labels", labels);
const data = {
  labels,
  datasets: [
    {
      label: "Tokens used",
      data: [100, 120, 100, 130, 100, 100],
      backgroundColor: "rgba(113, 131, 152, 0.9)",
      maxBarThickness: 8,
      categoryPercentage: 0.5,
    },
    {
      label: "Words translated",
      data: [100, 130, 100, 100, 100, 100],
      backgroundColor: "rgba(161, 174, 217, 0.9)",
      maxBarThickness: 8,
      categoryPercentage: 0.5,
    },
    {
      label: "Documents created",
      data: [1, 2, 0, 1, 2, 3],
      backgroundColor: "rgba(236, 99, 87, 0.9)",
      maxBarThickness: 8,
      categoryPercentage: 0.5,
    },
  ],
};

const Barchart = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Barchart;
