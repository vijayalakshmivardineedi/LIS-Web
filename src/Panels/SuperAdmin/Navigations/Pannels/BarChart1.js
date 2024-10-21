import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
const uData = [100, 80, 140, 155, 300, 220, 259, 300, 380, 490, 420, 500];
const pData = [50, 30, 70, 35, 120, 182, 199, 250, 300, 430, 300, 440];
const qData = [30, 15, 40, 25, 60, 130, 152, 200, 260, 400, 180, 390];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BarChart1 = () => {
  return (
    <BarChart
      width={1000}
      height={300}
      series={[
        { data: pData, label: "Website Visitors", id: "pvId" },
        { data: uData, label: "No. of Clients Approach", id: "uvId" },
        { data: qData, label: "Demos", id: "qvId" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
};
export default BarChart1;
