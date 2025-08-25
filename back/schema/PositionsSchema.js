import { Schema } from "mongoose";

const PositionsSchema = new Schema({
  product: { type: String, required: true },   // CNC, MIS, etc.
  name: { type: String, required: true },      // Stock name
  qty: { type: Number, required: true },       // Quantity
  avg: { type: Number, required: true },       // Average price
  price: { type: Number, required: true },     // Current market price
  net: { type: String, required: true },       // Net P&L
  day: { type: String, required: true },       // Day P&L
  isLoss: { type: Boolean, default: false }    // Whether currently in loss or not
});

export { PositionsSchema };
