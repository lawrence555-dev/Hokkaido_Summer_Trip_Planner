import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { Radar, Line } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

export const ComparisonRadar = () => {
    const data = [95, 65, 60, 95, 85]; // Hardcoded to Plan A stats

    const radarData = {
        labels: ['景點', '餘裕', '購物', '效率', '預算'],
        datasets: [{
            data: data,
            borderColor: '#826a9d',
            backgroundColor: 'rgba(130, 106, 157, 0.1)',
            borderWidth: 1.5,
            pointRadius: 2,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: { legend: { display: false } },
        scales: {
            r: {
                grid: { color: '#f0f0f0' },
                pointLabels: { font: { size: 10 }, color: '#aaa' },
                ticks: { display: false },
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    };

    return <Radar data={radarData} options={options} />;
};

export const BloomLine = () => {
    const lineData = {
        labels: ['7/1', '7/10', '7/20', '7/31'],
        datasets: [{
            data: [20, 65, 95, 75],
            borderColor: '#826a9d',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: 'white',
            borderWidth: 2
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { display: false }
        }
    };

    return <Line data={lineData} options={options} />;
};
