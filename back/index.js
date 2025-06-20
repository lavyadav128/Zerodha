import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// Models
import { connectToSocket } from "./model/socketManager.js";
import { HoldingsModel } from "./model/HoldingsModel.js";
import { PositionsModel } from "./model/PositionsModel.js";
import { OrdersModel } from "./model/OrdersModel.js";

// Routes
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// ✅ CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight request handling
app.options("*", cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1/users", userRoutes);

// ====== Holdings ======
app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.post("/saveHoldings", async (req, res) => {
  try {
    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(req.body);
    res.send("✅ Holdings saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error saving holdings");
  }
});

// ====== Positions ======
app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// ====== Orders ======
app.get("/allOrders", async (req, res) => {
  const orders = await OrdersModel.find();
  res.json(orders);
});

// DELETE order by ID
app.delete("/order/:id", async (req, res) => {
  try {
    await OrdersModel.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send({ success: false, message: "Error deleting order" });
  }
});

// Create new order
app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  try {
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();
    res.send("✅ Order saved!");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("❌ Error saving order");
  }
});

// ====== Funds Section (NEW) ======
let fundData = {
  availableMargin: 4043.10,
  usedMargin: 3757.30,
  availableCash: 4043.10,
  openingBalance: 4043.10,
  payin: 4064.00,
  span: 0.0,
  deliveryMargin: 0.0,
  exposure: 0.0,
  optionsPremium: 0.0,
  collateralLiquid: 0.0,
  collateralEquity: 0.0,
  totalCollateral: 0.0,
};

// GET funds info
app.get("/funds", (req, res) => {
  res.json(fundData);
});

// POST add funds
app.post("/funds/add", (req, res) => {
  const { amount } = req.body;
  fundData.availableCash += amount;
  fundData.availableMargin += amount;
  fundData.payin += amount;
  res.send("✅ Funds added successfully");
});

// POST withdraw funds
app.post("/funds/withdraw", (req, res) => {
  const { amount } = req.body;
  if (amount > fundData.availableCash) {
    return res.status(400).send("❌ Not enough funds");
  }
  fundData.availableCash -= amount;
  fundData.availableMargin -= amount;
  res.send("✅ Funds withdrawn successfully");
});

// ====== Server & DB Start ======
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

start();
