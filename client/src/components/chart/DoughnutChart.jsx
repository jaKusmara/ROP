// DoughnutChart.js

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: data.colors,
            },
          ],
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} width="400" height="400"></canvas>;
};

export default DoughnutChart;
