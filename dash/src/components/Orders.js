import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:3000/allOrders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/${id}`);
      fetchOrders(); // refresh list after deletion
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧾 Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Typography variant="subtitle1" fontWeight="bold">
                {order.name}
              </Typography>
              <Typography>Qty: {order.qty}</Typography>
              <Typography>Price: ₹{order.price}</Typography>
              <Typography color={order.mode === "BUY" ? "green" : "red"}>
                {order.mode}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(order._id)} // assumes MongoDB _id
              >
                Delete
              </Button>
            </Stack>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default OrderPage;
