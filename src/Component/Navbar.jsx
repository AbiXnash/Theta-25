import * as React from "react";
import { useState, useEffect } from "react";
import DevBtn from "./DevBtn";
import AppBtn from "./AppGlowButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Drawer,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Stack,
  useScrollTrigger,
  Slide,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Component to hide AppBar on scroll
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar(props) {
  // State variables
  const [isDown, setIsDown] = useState(false); // Tracks scroll position
  const [mobileOpen, setMobileOpen] = useState(false); // Controls mobile drawer state
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // Checks if screen size is medium or larger
  const [timeLeft, setTimeLeft] = useState(""); // Stores countdown timer text
  const navigate = useNavigate();

  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsDown(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to initialize countdown timer
  useEffect(() => {
    const targetDate = new Date("April 11, 2025 00:00:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setTimeLeft("It's time! 🎉");
        return;
      }
      const days = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );
      setTimeLeft(`${days}d ${hours}:${minutes}:${seconds}`);
    };
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timerInterval);
  }, []);

  // Function to handle navigation clicks
  const handleNavClick = (link) => {
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  // Navigation items
  const navItems = [
    { link: "/", name: "Home" },

    { link: "/gallery", name: "Gallery" },
    { link: "/Workshops", name: "Workshops" },
    { link: "/allEvents", name: "Events" },
    !isMdUp && { link: "/Cluster", name: "Clusters" },
    { link: "/contact-us", name: "Contact Us" },
  ].filter(Boolean); // Remove falsy values

  // Drawer component for mobile navigation
  const drawer = (
    <Stack
      direction="column"
      sx={{ width: "100vw", height: "100vh", bgcolor: "#181818" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {navItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleNavClick(item.link)}
            sx={{ justifyContent: "center" }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
        <ListItem
          sx={{
            justifyContent: "center",
            alignItems: "center", // Center horizontally
            flexDirection: "column", // Stack vertically
            display: "flex", // Ensure flexbox is active
            gap: "0.5rem", // Optional: space between buttons
          }}
        >
          <AppBtn />
          <DevBtn />
        </ListItem>
      </List>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: isDown
              ? "rgba(255, 255, 255, 0.6)"
              : "transparent",
            backdropFilter: isDown ? "blur(10px)" : "none",
            boxShadow: isDown ? 3 : 0,
            borderRadius: isDown ? "0 0 2rem 2rem" : "0",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <ImageListItem
              onClick={() => handleNavClick("/")}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src="/Assets/logo2.png"
                sx={{
                  width: { xs: "70px", sm: "80px" },
                  height: "auto",
                  ml: 1,
                }}
                alt="logo"
              />
            </ImageListItem>
            {/* Countdown Timer */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 0.7,
                  borderRadius: "14px",
                  border: "3px solid transparent",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  animation: "festPulse 4s infinite ease-in-out",
                  boxShadow: "0 0 15px 4px rgba(255, 87, 34, 0.4)",
                  "@keyframes festPulse": {
                    "0%": {
                      boxShadow: "0 0 10px 2px rgba(255, 87, 34, 0.3)",
                    },
                    "50%": {
                      boxShadow: "0 0 20px 5px rgba(255, 193, 7, 0.6)",
                    },
                    "100%": {
                      boxShadow: "0 0 10px 2px rgba(255, 87, 34, 0.3)",
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", sm: "1.5rem" },
                    textAlign: "center",
                    background:
                      "linear-gradient(90deg, #ff6f00, #ffc107, #d50000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "1px",
                  }}
                >
                  {timeLeft}
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleNavClick(item.link)}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: isDown ? "#000" : "#fff",
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <AppBtn />
              <DevBtn />
            </Box>
            {/* Mobile Navigation Button */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setMobileOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
}
