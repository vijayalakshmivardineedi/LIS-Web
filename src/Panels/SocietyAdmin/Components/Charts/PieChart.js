import React, { useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchVisitors } from "../../Pages/VisitorRecord/ListSlice";
import { useDispatch, useSelector } from "react-redux";

const PieCharts = () => {
    const dispatch = useDispatch();
    const visitors = useSelector(state => state.visitorsRecords.visitors);
    const status = useSelector(state => state.visitorsRecords.status);
    const error = useSelector(state => state.visitorsRecords.error);

    useEffect(() => {
      dispatch(fetchVisitors());
    }, [dispatch]);

    // Count the number of visitors for each status
    const countStatus = (status) => {
        return visitors.filter(visitor => visitor.status === status).length;
    };

    const checkinCount = countStatus("Check In");
    const waitingCount = countStatus("Waiting");
    const checkoutCount = countStatus("Check Out");

    return (
        <PieChart
            series={[
                {
                    data: [
                        { value: checkinCount, label: 'Check In' },
                        { value: checkoutCount, label: 'Check Out' },
                        { value: waitingCount, label: 'Waiting' },
                    ],
                },
            ]}
            width={350}
            height={150}
        />
    );
};

export default PieCharts;
