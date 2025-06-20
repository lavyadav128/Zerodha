import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";

import GeneralContext from "./GeneralContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BuyActionWindow = ({ uid }) => {
  const [open, setOpen] = useState(true);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { closeBuyWindow } = useContext(GeneralContext); // ✅ this is the fix

  const handleBuyClick = () => {
    axios.post("http://localhost:3000/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    setSnackbarOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    closeBuyWindow(); // ✅ call the actual function
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="buy-dialog-description"
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle>Place Buy Order</DialogTitle>

        <DialogContent>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="dense"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
          <TextField
            label="Price"
            type="number"
            step="0.05"
            fullWidth
            margin="dense"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBuyClick} variant="contained" color="primary">
            Buy
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSnackbarOpen(false)}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          Buy order placed for {uid} — Qty: {stockQuantity}, ₹{stockPrice}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BuyActionWindow;
