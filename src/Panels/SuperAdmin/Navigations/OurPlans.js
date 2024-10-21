import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import { getPlans } from "../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { fetchFeatures } from "../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import Plans from "./Plans/Plans";
import Features from "./Plans/Features";

const OurPlans = () => {
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(fetchFeatures());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ display: "flex", justifyContent: "center", color: "#630000" }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderBottom: 1,
              borderColor: "divider",
              marginTop: 2,
            }}
            TabIndicatorProps={{ style: { backgroundColor: "#630000" } }} // Custom indicator color
          >
            <Tab
              label="Plans"
              value="1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
                padding: "15px",
                color: "#630000",
                "&.Mui-selected": {
                  color: "#630000",
                },
              }}
            />
            <Tab
              label="Features"
              value="2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "700",
                padding: "15px",
                color: "#630000",
                "&.Mui-selected": {
                  color: "#630000",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ color: "#630000" }}>
          <Plans />
        </TabPanel>
        <TabPanel value="2" sx={{ color: "#630000" }}>
          <Features />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default OurPlans;