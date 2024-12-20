import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from '@nextui-org/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ appointments }) => {

    const [viewType, setViewType] = useState('month');

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const years = [
        ...new Set(appointments.map((appointment) => new Date(appointment.date).getFullYear())),
    ].sort((a, b) => a - b);

    const appointmentsByYearMonth = {};
    const appointmentsByYear = {};

    appointments.forEach((appointment) => {
        const date = new Date(appointment.date);
        const year = date.getFullYear();
        const month = date.getMonth();

        if (!appointmentsByYearMonth[year]) {
            appointmentsByYearMonth[year] = Array(12).fill(0);
        }
        appointmentsByYearMonth[year][month] += 1;

        if (!appointmentsByYear[year]) {
            appointmentsByYear[year] = 0;
        }
        appointmentsByYear[year] += 1;
    });
    const yearDatasets = years.map((year, index) => {
        const colors = [
            'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)',
        ];
        const borderColors = [
            'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 205, 86, 0.8)',
        ];
        const colorIndex = index % colors.length;

        return {
            label: `Year ${year}`,
            data: Object.values(appointmentsByYearMonth[year]),
            borderColor: borderColors[colorIndex],
            backgroundColor: colors[colorIndex],
            fill: false,
        };
    });

    const totalAppointmentsByMonth = Array(12).fill(0);
    Object.values(appointmentsByYearMonth).forEach((monthlyCounts) => {
        monthlyCounts.forEach((count, month) => {
            totalAppointmentsByMonth[month] += count;
        });
    });

    const monthDataset = {
        label: 'Total Appointments by Month',
        data: totalAppointmentsByMonth,
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
    };

    const data = {
        labels: viewType === 'month' ? months : years,
        datasets: viewType === 'month' ? [monthDataset] : [{
            label: 'Total Appointments by Year',
            data: years.map(year => appointmentsByYear[year]),
            borderColor: 'rgba(75, 192, 192, 0.8)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
        }],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(0, 0, 0, 0.8)',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (viewType === 'year') {
                            const year = context.label;
                            return [
                                `Year ${year}: ${context.raw} appointments`,
                            ];
                        } else {
                            return `${months[context.dataIndex]}: ${context.raw} appointments`;
                        }
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)', 
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', 
                },
                title: {
                    display: true,
                    text: viewType === 'month' ? 'Months' : 'Years',
                    color: 'rgba(0, 0, 0, 0.8)', 
                },
            },
            y: {
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                title: {
                    display: true,
                    text: 'Appointments',
                    color: 'rgba(0, 0, 0, 0.8)',
                },
            },
        },
    };


    return (
        <>
            <div className="mb-4 flex gap-4">
                <Button
                    color={viewType === 'month' ? 'primary' : 'default'}
                    variant={viewType === 'month' ? 'solid' : 'bordered'}
                    onClick={() => setViewType('month')}
                >
                    Month-wise
                </Button>
                <Button
                    color={viewType === 'year' ? 'primary' : 'default'}
                    variant={viewType === 'year' ? 'solid' : 'bordered'}
                    onClick={() => setViewType('year')}
                >
                    Year-wise
                </Button>
            </div>
            <h2 className="text-xl mb-4 text-gray-300">
                Total Appointments by {viewType === 'month' ? 'Month' : 'Year'}
            </h2>
            <Line data={data} options={options} />
        </>
    );
}

export default LineChart;
