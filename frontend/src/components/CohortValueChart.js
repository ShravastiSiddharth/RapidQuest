import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CohortValueChart = () => {
    const [chartData, setChartData] = useState(null);
    const [interval, setInterval] = useState('monthly');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://rapidquest-assessment-backend.onrender.com/api/customers/customer-lifetime-value', { interval });

                if (response.data && Array.isArray(response.data)) {
                    const data = response.data;
                    const labels = data.map(item => item._id);
                    const totalSpentValues = data.map(item => item.totalSpent);
                    const customersValues = data.map(item => item.customers);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Spent',
                                data: totalSpentValues,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                yAxisID: 'y1',
                            },
                            {
                                label: 'Number of Customers',
                                data: customersValues,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                yAxisID: 'y2',
                            }
                        ]
                    });
                } else {
                    console.error('Invalid data format received from the API');
                }
            } catch (error) {
                console.error('Error fetching lifetime value data:', error);
            }
        };

        fetchData();
    }, [interval]);

    return (
        <div className="p-8 bg-white shadow rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Customer Lifetime Value Chart</h2>
            <div className="flex justify-center items-center mb-6">
                <select 
                    value={interval} 
                    onChange={(e) => setInterval(e.target.value)} 
                    className="p-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <div className="relative">
                {chartData ? ( 
                    <Line 
                        data={chartData} 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: `Customer Lifetime Value (${interval.charAt(0).toUpperCase() + interval.slice(1)})`,
                                },
                            },
                            scales: {
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    title: {
                                        display: true,
                                        text: 'Total Spent ($)',
                                    },
                                },
                                y2: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    title: {
                                        display: true,
                                        text: 'Number of Customers',
                                    },
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                            },
                        }}
                    />
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                    
                )}
            </div>
        </div>
    );
};

export default CohortValueChart;

