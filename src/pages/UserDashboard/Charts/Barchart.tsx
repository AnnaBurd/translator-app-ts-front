import { Chart as ChartJS, Tick, Ticks, registerables } from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      // text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      // type: "linear",
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 4,
        // suggestedMin: 100,
        callback: function (
          value: number | string,
          index: number,
          ticks: Tick[]
        ) {
          return (
            Ticks.formatters.numeric.apply(this, [+value, index, ticks]) +
            " tk "
          );
        },
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
    y2: {
      // type: "linear",
      position: "right" as const,
      ticks: {
        display: false,
        beginAtZero: true,
        maxTicksLimit: 0,
      },
      border: {
        display: false,
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

// const months = Array.from({ length: 12 }, (_item, i) => {
//   return new Date(0, i).toLocaleString("en-US", { month: "short" });
// });

// const currDate = new Date();
// const baseMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
// baseMonth.setMonth(baseMonth.getMonth() - 4);
// const sortedMonths = [...months.splice(baseMonth.getMonth()), ...months];
// const labels = sortedMonths.slice(0, 6);

// console.log("currDate", currDate);
// console.log("baseMonth", baseMonth);
// console.log("labels", labels);
// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Tokens used",
//       data: [100, 120, 100, 130, 100, 100],
//       backgroundColor: "rgba(113, 131, 152, 0.7)",
//       maxBarThickness: 9,
//       categoryPercentage: 0.45,
//     },
//     {
//       label: "Words translated",
//       data: [100, 130, 100, 100, 100, 100],
//       backgroundColor: "rgba(161, 174, 217, 0.7)",
//       maxBarThickness: 9,
//       categoryPercentage: 0.45,
//     },
//     {
//       label: "Documents created",
//       data: [1, 2, 0, 1, 2, 3],
//       backgroundColor: "rgba(236, 99, 87, 0.7)",
//       maxBarThickness: 9,
//       categoryPercentage: 0.45,
//       yAxisID: "y2",
//     },
//   ],
// };

type BarchartProps = {
  [key: string]: number[] | string[];
  labels: string[];
};

const Barchart: React.FC<BarchartProps> = ({
  tokensUsageStats,
  wordsUsageStats,
  documentsUsageStats,
  labels,
}) => {
  // console.log(tokensUsageStats, wordsUsageStats, documentsUsageStats, labels);

  const data = {
    labels,
    datasets: [
      {
        label: "Tokens used",
        data: tokensUsageStats,
        backgroundColor: "rgba(113, 131, 152, 0.7)",
        maxBarThickness: 9,
        categoryPercentage: 0.45,
      },
      {
        label: "Words translated",
        data: wordsUsageStats,
        backgroundColor: "rgba(161, 174, 217, 0.7)",
        maxBarThickness: 9,
        categoryPercentage: 0.45,
      },
      {
        label: "Documents created",
        data: documentsUsageStats,
        backgroundColor: "rgba(236, 99, 87, 0.7)",
        maxBarThickness: 9,
        categoryPercentage: 0.45,
        yAxisID: "y2",
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Barchart;
