import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart.js configuration
export const options = (theme) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: theme.palette.text.primary,
        font: {
          size: 14,
          weight: "500",
        },
      },
    },
    title: {
      display: true,
      text: "Holdings Overview",
      color: theme.palette.text.primary,
      font: {
        size: 18,
        weight: "bold",
      },
    },
    tooltip: {
      backgroundColor: theme.palette.background.default,
      titleColor: theme.palette.text.primary,
      bodyColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: theme.palette.text.secondary,
      },
      grid: {
        color: theme.palette.divider,
      },
    },
    y: {
      ticks: {
        color: theme.palette.text.secondary,
      },
      grid: {
        color: theme.palette.divider,
      },
    },
  },
});

export function VerticalGraph({ data }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: theme.palette.background.paper,
        p: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2, fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Portfolio Holdings
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar options={options(theme)} data={data} />
        </Box>
      </CardContent>
    </Card>
  );
}
