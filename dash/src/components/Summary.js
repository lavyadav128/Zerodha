import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Stack,
  Chip,
} from "@mui/material";

const Summary = () => {
  return (
    <Box sx={{ padding: 3, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Greeting Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        sx={{ mb: 2 }}
      >
        Hi, User! 👋
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Equity Section */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)" },
        }}
      >
        <CardContent>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Equity
          </Typography>
          <Grid container spacing={3} alignItems="center">
            {/* Left Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                ₹3.74k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Margin Available
              </Typography>
            </Grid>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Right Section */}
            <Grid item xs={12} md={7}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  Margins Used:{" "}
                  <Chip
                    label="₹0"
                    color="success"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>
                <Typography variant="body1">
                  Opening Balance:{" "}
                  <Chip
                    label="₹3.74k"
                    color="primary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Holdings Section */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)" },
        }}
      >
        <CardContent>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Holdings (13)
          </Typography>
          <Grid container spacing={3} alignItems="center">
            {/* Left Section */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{ color: "#00c853", fontWeight: "bold" }}
              >
                ₹1.55k{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: "0.9rem",
                    color: "#00c853",
                    fontWeight: "bold",
                  }}
                >
                  +5.20%
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                P&amp;L
              </Typography>
            </Grid>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

            {/* Right Section */}
            <Grid item xs={12} md={7}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  Current Value:{" "}
                  <Chip
                    label="₹31.43k"
                    color="primary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>
                <Typography variant="body1">
                  Investment:{" "}
                  <Chip
                    label="₹29.88k"
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Summary;
