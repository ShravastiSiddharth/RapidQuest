import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Swal from 'sweetalert2';

const RepeatCustomersChart = () => {
  const [chartData, setChartData] = useState(null);
  const [interval, setInterval] = useState('yearly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (interval !== 'custom') {
        setStartDate('');
        setEndDate('');
      }

      if (interval === 'custom' && new Date(endDate) < new Date(startDate)) {
        Swal.fire({
          title: 'Invalid Date Range',
          text: 'End date cannot be earlier than start date.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return; 
      }

      setLoading(true);
      try {
        const response = await axios.post('https://rapidquest-assessment-backend.onrender.com/api/customers/repeat-customers', {
          interval,
          startDate,
          endDate
        });

        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map(item => item._id);
          const values = data.map(item => item.repeatCustomers);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Repeat Customers',
                data: values,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
              }
            ]
          });
        } else {
          Swal.fire({
            title: 'No Data Found',
            text: 'No data available for the selected time range.',
            icon: 'info',
            confirmButtonText: 'OK'
          });
          setChartData(null);
        }
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interval, startDate, endDate]);

  return (
    <div className="p-8 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Repeat Customers Chart</h1>
      <div className="flex justify-center items-center mb-8 space-x-4">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Interval</label>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {interval === 'custom' && (
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-700">to</span>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : chartData ? (
        <Line data={chartData} />
      ) : (
        <p className="text-center text-red-500">No data available for the selected range.</p>
      )}
    </div>
  );
};

export default RepeatCustomersChart;
