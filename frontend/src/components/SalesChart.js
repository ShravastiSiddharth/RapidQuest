import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [interval, setInterval] = useState('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/sales?interval=${interval}`);
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [interval]);

  const chartData = {
    labels: salesData.map(item => item._id),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(item => item.totalSales),
        fill: false,
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  return (
    <div className="p-8 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Sales Dashboard</h1>
      <div className="flex justify-center mb-8">
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="p-2 bg-gray-100 border border-gray-300 rounded"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default SalesChart;
