import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const RepeatCustomersChart = () => {
  const [chartData, setChartData] = useState(null);
  const [interval, setInterval] = useState('yearly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if(interval!='custom'){
        setStartDate('');
        setEndDate('');
      }
      try {
        
        const response = await axios.post('http://localhost:5000/api/customers/repeat-customers', {
          interval,
          startDate,
          endDate
        });

        console.log("response", response);
        console.log("response data", response.data);

        const data = response.data;
        if (Array.isArray(data)) {
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
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
      }
    };

    fetchData();
  }, [interval, startDate, endDate]); // Dependencies: triggers fetchData on change

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Repeat Customers Chart</h2>
      <div className="flex items-center mb-4">
        <select value={interval} onChange={(e) => setInterval(e.target.value)} className="p-2 border rounded">
          <option value="yearly">Yearly</option>
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
        {interval === 'custom' && (
          <div className="flex items-center ml-4">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
            <span className="mx-2">to</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
          </div>
        )}
      </div>
      {chartData ? ( 
        <Line data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepeatCustomersChart;
