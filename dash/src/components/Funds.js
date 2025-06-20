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
} from "@mui/material";
import axios from "axios";

const Funds = () => {
  const [fundsData, setFundsData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Simulated API call
    axios.get("http://localhost:3000/funds").then((res) => {
      setFundsData(res.data);
    });
  }, []);

  const handleAddFunds = () => {
    axios.post("http://localhost:3000/funds/add", { amount }).then(() => {
      setOpenAdd(false);
      setAmount("");
    });
  };

  const handleWithdrawFunds = () => {
    axios.post("http://localhost:3000/funds/withdraw", { amount }).then(() => {
      setOpenWithdraw(false);
      setAmount("");
    });
  };

  if (!fundsData) return <Typography>Loading funds...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Funds Overview
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="body1">
          Instant, zero-cost fund transfers with UPI
        </Typography>
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="success" onClick={() => setOpenAdd(true)}>
            Add Funds
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpenWithdraw(true)}>
            Withdraw
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Equity</Typography>
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
              <Box key={i} display="flex" justifyContent="space-between" my={1}>
                <Typography>{label}</Typography>
                <Typography color={highlight ? "green" : "text.secondary"}>₹{value}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Commodity</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>You don't have a commodity account.</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleAddFunds}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleWithdrawFunds}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Funds;
