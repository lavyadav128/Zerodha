import { model } from "mongoose";
import { OrdersSchema } from "../schema/OrdersSchema.js"; // make sure path is correct

export const OrdersModel = model("Order", OrdersSchema);
