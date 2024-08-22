import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const NewCustomersChart = () => {
    const [chartData, setChartData] = useState(null); 
    const [interval, setInterval] = useState('monthly');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/customers/new-customers', { interval, startDate, endDate });
                const data = response.data;

                if (Array.isArray(data)) {
                    const labels = data.map(item => item._id);
                    const values = data.map(item => item.newCustomers);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'New Customers',
                                data: values,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true,
                            }
                        ]
                    });
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [interval, startDate, endDate]);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <select value={interval} onChange={(e) => setInterval(e.target.value)} className="p-2 border rounded">
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                  
                </select>
            </div>
            <div className="mb-4">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded ml-2" />
            </div>
            {chartData ? ( // Conditional rendering
                <Line data={chartData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NewCustomersChart;
