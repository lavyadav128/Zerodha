import { Schema } from "mongoose";

const FundsSchema = new Schema({
  availableMargin: { type: Number, required: true, default: 0 },
  usedMargin: { type: Number, required: true, default: 0 },
  availableCash: { type: Number, required: true, default: 0 },
  openingBalance: { type: Number, required: true, default: 0 },
  payin: { type: Number, required: true, default: 0 },
  span: { type: Number, default: 0 },
  deliveryMargin: { type: Number, default: 0 },
  exposure: { type: Number, default: 0 },
  optionsPremium: { type: Number, default: 0 },
  collateralLiquid: { type: Number, default: 0 },
  collateralEquity: { type: Number, default: 0 },
  totalCollateral: { type: Number, default: 0 }
});

export { FundsSchema };
