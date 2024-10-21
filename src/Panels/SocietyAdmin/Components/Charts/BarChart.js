import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2780, 1890, 2390, 3490, 3000];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const BarCharts = () => {
    return (
        <BarChart
            width={700}
            height={300}
            series={[
                { data: pData, label: 'income', id: 'pvId' },
                { data: uData, label: 'expenses', id: 'uvId' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
    )
}
export default BarCharts;