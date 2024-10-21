import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../../../Redux/Slice/SuperAdmin/PaymentSlice";

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

const LineCharts = () => {
  const dispatch = useDispatch();
  const { Payments } = useSelector((state) => state.Payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const monthlyIncome = new Array(12).fill(0);
  Payments.forEach((payment) => {
    const date = new Date(payment.paymentDate);
    const month = date.getMonth(); monthlyIncome[month] += parseFloat(payment.price) || 0;
  });
  const chartData = xLabels.map((label, index) => (monthlyIncome[index]));
  return (
    <LineChart
      width={550}
      height={250}
      series={[{ data: chartData, label: "Income", id: "uvId" }]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      yAxis={[{ data: chartData, scaleType: "linear" }]}
    />
  );
};

export default LineCharts;