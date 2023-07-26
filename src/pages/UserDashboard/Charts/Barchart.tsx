import { Chart as ChartJS, Tick, Ticks, registerables } from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
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
        label: "Documents changed",
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
