/*const { model } = require("mongoose");

const { OrdersSchema } = require("../schema/OrdersSchema");

const OrdersModel = new model("order", OrdersSchema);

module.exports = { OrdersModel };*/



import { model } from "mongoose";
import { OrdersSchema } from "../schema/OrdersSchema.js"; // Ensure correct file extension

const OrdersModel = model("order", OrdersSchema);

export { OrdersModel };

