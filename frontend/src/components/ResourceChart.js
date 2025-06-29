
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ResourceChart = ({ data, label }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Used', 'Free'],
        datasets: [
          {
            data: [data.used, data.total - data.used],
            backgroundColor: ['#ff6384', '#36a2eb'],
            hoverOffset: 6,
            borderWidth: 0,
            // Make ring thicker
            cutout: '50%', // Thicker ring than 65%
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: label,
            font: {
              size: 20
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14
              }
            }
          }
        }
      }
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data, label]);

  return (
    <div style={{ width: '340px', height: '340px', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ResourceChart;
