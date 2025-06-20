import express from "express";
import { OrdersModel } from "../model/OrdersModel.js";

const router = express.Router();

// Create new order
router.post("/create", async (req, res) => {
  try {
    if (!req.body.name && req.body.symbol) {
      req.body.name = req.body.symbol;
    }

    const newOrder = new OrdersModel(req.body);
    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed", error });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ _id: -1 }); // newest first
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Delete order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await OrdersModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order", error });
  }
});

export default router;
