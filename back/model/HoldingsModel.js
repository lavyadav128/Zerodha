/*const { model } = require("mongoose");

const { HoldingsSchema } = require("../schema/HoldingsSchema");

const HoldingsModel = new model("holding", HoldingsSchema);

module.exports = { HoldingsModel };*/

import { model } from "mongoose";
import { HoldingsSchema } from "../schema/HoldingsSchema.js"; // Ensure correct file extension

const HoldingsModel = model("holding", HoldingsSchema);

export { HoldingsModel };


