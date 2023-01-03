export const weatherChartData = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "WeaterPerDay",
        data: [],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#e08546",
        borderWidth: 3,
      },
      // {
      //   label: "Planetary Mass (relative to the Sun x 10^-6)",
      //   data: [],
      //   backgroundColor: "rgba(71, 183,132,.5)",
      //   borderColor: "#47b784",
      //   borderWidth: 3,
      // },
    ],
  },
  options: {
    responsive: true,
    lineTension: 1,

    scales: {
      y: {
        suggestedMin: -60,
        suggestedMax: 60,
      },
    },
  },
};

export default weatherChartData;
