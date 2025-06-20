// model/HoldingsModel.js
import mongoose from "mongoose";
import { HoldingsSchema } from "../schema/HoldingsSchema.js"; // Use named import

export const HoldingsModel = mongoose.model("Holding", HoldingsSchema);
