import { model } from "mongoose";
import { FundsSchema } from "../schema/FundsSchema.js";

const FundsModel = model("fund", FundsSchema);
export { FundsModel };
