import React from "react";
import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts';

const PlansPieChart = () => {
  const { societies } = useSelector((state) => state.allsocieties);
  const planCounts = {
    Standard: 0,
    Premium: 0,
    Customized: 0,
  };
  societies.forEach((society) => {
    if (society.memberShip) {
      if (society.memberShip === 'Premium Plan') planCounts.Premium++;
      if (society.memberShip === 'Customized Plan') planCounts.Customized++;
      if (society.memberShip === "Standard Plan") planCounts.Standard++;
    }
  });
  return (
    <PieChart
    series={[
      {
        data: [
          { id: 0, label: 'Standard', value: planCounts.Standard },
          { id: 1, label: 'Premium', value: planCounts.Premium },
          { id: 2, label: 'Customized', value: planCounts.Customized }
        ],
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },
    ]}
    height={200}
  />
  );
};

export default PlansPieChart;