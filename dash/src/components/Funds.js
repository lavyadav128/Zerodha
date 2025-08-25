import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Funds = () => {
  const [fundsData, setFundsData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const API_BASE = "http://localhost:3000";

  // Fetch funds data
  const fetchFunds = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/funds`);
      setFundsData(res.data);
    } catch (error) {
      console.error("Error fetching funds:", error);
      setSnackbar({ open: true, message: "Failed to load funds", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  // Add funds handler
  const handleAddFunds = async () => {
    try {
      await axios.post(`${API_BASE}/funds/add`, { amount: parseFloat(amount) });
      setSnackbar({ open: true, message: "Funds added successfully!", severity: "success" });
      fetchFunds();
      setOpenAdd(false);
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
      setSnackbar({ open: true, message: "Failed to add funds", severity: "error" });
    }
  };

  // Withdraw funds handler
  const handleWithdrawFunds = async () => {
    try {
      await axios.post(`${API_BASE}/funds/withdraw`, { amount: parseFloat(amount) });
      setSnackbar({ open: true, message: "Funds withdrawn successfully!", severity: "success" });
      fetchFunds();
      setOpenWithdraw(false);
      setAmount("");
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data || "Failed to withdraw funds. Check balance.",
        severity: "error",
      });
    }
  };

  if (loading || !fundsData) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Page Header */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Funds Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your equity and commodity balances with ease.
      </Typography>

      {/* Quick Actions */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">
          Instant, zero-cost fund transfers via UPI.
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenAdd(true)}
            sx={{ textTransform: "none" }}
          >
            Add Funds
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenWithdraw(true)}
            sx={{ textTransform: "none" }}
          >
            Withdraw
          </Button>
        </Box>
      </Paper>

      {/* Equity & Commodity Cards */}
      <Grid container spacing={3}>
        {/* Equity Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Equity
            </Typography>
            <Divider sx={{ my: 1 }} />

            {[
              { label: "Available margin", value: fundsData.availableMargin, highlight: true },
              { label: "Used margin", value: fundsData.usedMargin },
              { label: "Available cash", value: fundsData.availableCash },
              { label: "Opening balance", value: fundsData.openingBalance },
              { label: "Payin", value: fundsData.payin },
              { label: "SPAN", value: fundsData.span },
              { label: "Delivery margin", value: fundsData.deliveryMargin },
              { label: "Exposure", value: fundsData.exposure },
              { label: "Options premium", value: fundsData.optionsPremium },
              { label: "Collateral (Liquid funds)", value: fundsData.collateralLiquid },
              { label: "Collateral (Equity)", value: fundsData.collateralEquity },
              { label: "Total collateral", value: fundsData.totalCollateral },
            ].map(({ label, value, highlight }, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                py={0.7}
              >
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: highlight ? "green" : "text.primary",
                    fontWeight: highlight ? 600 : 400,
                  }}
                >
                  ₹{Number(value).toLocaleString("en-IN")}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Commodity Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Commodity
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              You don't have a commodity account.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                textTransform: "none",
              }}
            >
              Open Account
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Funds Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddFunds}
            disabled={!amount}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Funds Dialog */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWithdrawFunds}
            disabled={!amount}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Funds;
