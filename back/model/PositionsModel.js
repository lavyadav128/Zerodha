import { model } from "mongoose";
import { PositionsSchema } from "../schema/PositionsSchema.js";

const PositionsModel = model("position", PositionsSchema);

export { PositionsModel };
