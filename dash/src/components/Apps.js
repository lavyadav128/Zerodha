import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const apps = [
  {
    title: "Kite",
    description: "Advanced trading platform for equities, F&O, commodities, and more.",
    icon: <ShowChartIcon />,
    tags: ["Trading", "Live Data"],
    link: "/kite",
  },
  {
    title: "Coin",
    description: "Invest in direct mutual funds with zero commissions.",
    icon: <AccountBalanceWalletIcon />,
    tags: ["Investing", "Mutual Funds"],
    link: "/coin",
  },
  {
    title: "Console",
    description: "Dashboard to track portfolio, P&L, tax reports, and more.",
    icon: <InsightsIcon />,
    tags: ["Analytics", "Reports"],
    link: "/console",
  },
  {
    title: "Varsity",
    description: "Learn everything about markets for free with modules & quizzes.",
    icon: <SchoolIcon />,
    tags: ["Education"],
    link: "https://zerodha.com/varsity",
  },
  {
    title: "Sensibull",
    description: "Options trading strategies, payoffs, and analysis in one place.",
    icon: <TrendingUpIcon />,
    tags: ["Options", "Strategy"],
    link: "https://sensibull.com/",
  },
  {
    title: "Streak",
    description: "Algo trading platform to build and deploy strategies without coding.",
    icon: <AutoGraphIcon />,
    tags: ["Algo Trading", "Technical"],
    link: "https://streak.zerodha.com/",
  },
];

const Apps = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔧 Zerodha Apps & Tools
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Explore Zerodha’s powerful ecosystem designed for investors, traders, and learners.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {apps.map((app, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Avatar sx={{ bgcolor: "#1976d2", mb: 2 }}>{app.icon}</Avatar>
                <Typography variant="h6" gutterBottom>
                  {app.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {app.description}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {app.tags.map((tag, idx) => (
                    <Chip key={idx} label={tag} size="small" color="primary" />
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  href={app.link}
                  target="_blank"
                  fullWidth
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Apps;
