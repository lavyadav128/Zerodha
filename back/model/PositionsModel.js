/*const { model } = require("mongoose");

const { PositionsSchema } = require("../schema/PositionsSchema");

const PositionsModel = new model("position", PositionsSchema);

module.exports = { PositionsModel };*/



import { model } from "mongoose";
import { PositionsSchema } from "../schema/PositionsSchema.js"; // Ensure correct file extension

const PositionsModel = model("position", PositionsSchema);

export { PositionsModel };
