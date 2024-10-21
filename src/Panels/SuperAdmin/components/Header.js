import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { IconButton, Box, Typography, Drawer, Card, Chip, Button } from "@mui/material";
import { PiSignOutBold } from "react-icons/pi";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { fetchNotifications, updateNotifications } from "../../../Redux/Slice/SuperAdmin/notificationSlice";

const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "white",
  color: "#800336",
  marginLeft: "10px",
  marginRight: "10px",
  "& svg": {
    fontSize: "20px",
  },
  "&:hover": {
    backgroundColor: "white",
    opacity: 1,
  },
}));

const NotificationItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { NotifyData = [] } = useSelector((state) => state.notification.notifications || "");

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('superAdmin');
    window.location.href = '/Login';
  };

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  console.log("notifications", NotifyData);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const getChipColor = (Category) => {
    console.log(Category);
    if (Category === "Demo Request") {
      return "#fed7aa";
    } else if (Category === "Society Registered") {
      return "#ffe4e6";
    } else if (Category === "Payment Approval") {
      return "#f0fdf4";
    }

    return "default";
  };
  const markAsRead = async (id) => {
    try {
      const result = await dispatch(updateNotifications(id));
      if (result.type === "notifications/updateNotifications/fulfilled") {
        dispatch(fetchNotifications());
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  const DrawerList = (
    <Box
      sx={{ width: 480 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ padding: 2 }}>
        {NotifyData.length > 0 ? (
          NotifyData.map((notification) => (
            <Card key={notification._id} sx={{ marginBottom: 2, backgroundColor: "#fcf6f0" }}>
              <NotificationItem>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ justifyContent: "space-between" }}
                  mb={1}
                >
                  <Chip
                    label={notification.Category}
                    style={{ backgroundColor: getChipColor(notification.Category), fontFamily: "Montserrat, sans-serif", color: "#ea580c", fontWeight: 600 }}
                    size="small"
                  />
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    {formatDateTime(notification.createdAt)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
                  {notification.SenderName}
                </Typography>
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => markAsRead(notification._id)}
                  >
                    Mark as Read
                  </Button>
                </Box>
              </NotificationItem>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
            No notifications available.
          </Typography>
        )}
      </Box>
    </Box>
  );

  const links = [
    { to: "/superadmin/dashboard", label: "Dashboard" },
    { to: "/superadmin/cities", label: "Societies" },
    { to: "/superadmin/payments", label: "Payment" },
    { to: "/superadmin/renewal", label: "Renewal" },
    { to: "/superadmin/societyCreation", label: "Society Creation" },
    { to: "/superadmin/plans", label: "Our Plans" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#800336",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "700",
            fontStyle: "italic",
            color: "white",
            marginRight: "20px",
          }}
        >
          LivInSync
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "45px" }}>
        {links.map((link, index) => (
          <Link key={index} to={link.to} style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: location.pathname === link.to ? "#f8e9dc" : "white",
                borderBottom: location.pathname === link.to ? "2px solid #f8e9dc" : "",
                fontFamily: "Outfit, sans-serif",
                fontWeight: "600",
                textTransform: "uppercase"
              }}
            >
              {link.label}
            </Typography>
          </Link>
        ))}
      </Box>
      <Box sx={{ display: "flex", marginRight: 3 }}>
        <GradientIconButton onClick={() => navigate("/superadmin/demoRequests")}>
          <BiSolidMessageSquareError />
        </GradientIconButton>
        <GradientIconButton onClick={toggleDrawer(true)}>
          <IoNotificationsSharp />
        </GradientIconButton>
        <GradientIconButton onClick={handleLogout}>
          <PiSignOutBold />
        </GradientIconButton>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#800336",
            paddingTop: 2,
            paddingBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "Georgia, serif", fontWeight: "700", marginLeft: 2 }}>
            Notifications
          </Typography>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "white", marginRight: 2 }}>
            <MdClose />
          </IconButton>
        </Box>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default Header;
