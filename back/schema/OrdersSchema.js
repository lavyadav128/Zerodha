import mongoose from "mongoose";

export const OrdersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    mode: { type: String, enum: ["BUY", "SELL"], required: true }, // restrict to BUY or SELL
  },
  { timestamps: true }
);
