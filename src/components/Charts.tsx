import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface LineChartProps {
  data: {
    labels: string[];
    supplierRecords: number[];
    customerRecords: number[];
  };
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const LineChart: React.FC<LineChartProps> = ({ data, selectedMonth, onMonthChange }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Supplier Records',
        data: data.supplierRecords,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.5,
      },
      {
        label: 'Customer Records',
        data: data.customerRecords,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Number of Bags',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Subtle grid lines
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Bags Overview</h3>
      </div>
      <div className="h-80"> {/* Adjust height for responsiveness */}
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const colorPalette = [
    'rgba(54, 162, 235, 0.8)', // Light Blue
    'rgba(75, 192, 192, 0.8)', // Teal Blue
    'rgba(0, 123, 255, 0.8)',  // Blue
    'rgba(100, 149, 237, 0.8)', // Cornflower Blue
    'rgba(70, 130, 180, 0.8)',  // Steel Blue
    'rgba(30, 144, 255, 0.8)',  // Dodger Blue
  ];

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colorPalette,
        hoverBackgroundColor: colorPalette.map(color => color.replace('0.8', '1')),
        borderWidth: 2, // Add space between the parts of the donut
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Hide the default legend
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw} kg`;  // Display in kg
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      onHover: (event: any, elements: any) => {
        if (elements && elements.length) {
          event.native.target.style.cursor = 'pointer';
        } else {
          event.native.target.style.cursor = 'default';
        }
      },
    },
    maintainAspectRatio: false, // Ensures the chart doesn't stretch
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}> {/* Reduced size */}
        <Doughnut data={chartData} options={options} />
      </div>
      <div style={{ marginTop: '30px', fontSize: '16px', textAlign: 'center', width: '100%' }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: '15px', // Increased space between items
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: colorPalette[index],
                marginRight: '15px', // Increased space between color and item name
                borderRadius: '50%',
              }}
            ></div>
            <span style={{ flex: 1, textAlign: 'left', fontWeight: '300' }}>{item.name}</span> {/* Lighter font */}
            <span style={{ fontWeight: '300' }}>{item.value} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};
