import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// Models
import { HoldingsModel } from "./model/HoldingsModel.js";
import { PositionsModel } from "./model/PositionsModel.js";
import { OrdersModel } from "./model/OrdersModel.js";

// Routes
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

// ✅ CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3001", "https://zerodhadash-wg06.onrender.com"],
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
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  console.log("Ping received at", new Date());
  res.send("Backend is alive!");
});


// ==========================
//      HOLDINGS ROUTES
// ==========================
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).send("❌ Error fetching holdings");
  }
});

app.post("/saveHoldings", async (req, res) => {
  try {
    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(req.body);
    res.send("✅ Holdings saved");
  } catch (err) {
    console.error("Error saving holdings:", err);
    res.status(500).send("❌ Error saving holdings");
  }
});


// ==========================
//      POSITIONS ROUTES
// ==========================
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).send("❌ Error fetching positions");
  }
});

// Save fresh positions (Overwrite old ones)
app.post("/savePositions", async (req, res) => {
  try {
    await PositionsModel.deleteMany({});
    await PositionsModel.insertMany(req.body);
    res.send("✅ Positions saved successfully");
  } catch (err) {
    console.error("Error saving positions:", err);
    res.status(500).send("❌ Error saving positions");
  }
});

// Update a single position by ID
app.put("/positions/:id", async (req, res) => {
  try {
    const updatedPosition = await PositionsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPosition) {
      return res.status(404).send("❌ Position not found");
    }
    res.json(updatedPosition);
  } catch (err) {
    console.error("Error updating position:", err);
    res.status(500).send("❌ Error updating position");
  }
});

// Delete a position by ID
app.delete("/positions/:id", async (req, res) => {
  try {
    await PositionsModel.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (err) {
    console.error("Error deleting position:", err);
    res.status(500).send({ success: false, message: "Error deleting position" });
  }
});


// ==========================
//        ORDERS ROUTES
// ==========================
app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrdersModel.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("❌ Error fetching orders");
  }
});

// Create a new order
app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  try {
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();
    res.send("✅ Order saved!");
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).send("❌ Error saving order");
  }
});

// Delete an order by ID
app.delete("/order/:id", async (req, res) => {
  try {
    await OrdersModel.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ success: false, message: "Error deleting order" });
  }
});



// ==========================
//        FUNDS ROUTES
// ==========================
import { FundsModel } from "./model/FundsModel.js";

// Get current funds
app.get("/funds", async (req, res) => {
  try {
    const funds = await FundsModel.findOne();
    if (!funds) {
      // Initialize default funds if not found
      const newFunds = new FundsModel({
        availableMargin: 4043.10,
        usedMargin: 3757.30,
        availableCash: 4043.10,
        openingBalance: 4043.10,
        payin: 4064.00
      });
      await newFunds.save();
      return res.json(newFunds);
    }
    res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).send("❌ Error fetching funds");
  }
});

// Add funds
app.post("/funds/add", async (req, res) => {
  try {
    const { amount } = req.body;
    let funds = await FundsModel.findOne();
    if (!funds) {
      funds = new FundsModel({});
    }
    funds.availableCash += amount;
    funds.availableMargin += amount;
    funds.payin += amount;
    await funds.save();
    res.send("✅ Funds added successfully");
  } catch (err) {
    console.error("Error adding funds:", err);
    res.status(500).send("❌ Error adding funds");
  }
});

// Withdraw funds
app.post("/funds/withdraw", async (req, res) => {
  try {
    const { amount } = req.body;
    const funds = await FundsModel.findOne();
    if (!funds || amount > funds.availableCash) {
      return res.status(400).send("❌ Not enough funds");
    }
    funds.availableCash -= amount;
    funds.availableMargin -= amount;
    await funds.save();
    res.send("✅ Funds withdrawn successfully");
  } catch (err) {
    console.error("Error withdrawing funds:", err);
    res.status(500).send("❌ Error withdrawing funds");
  }
});



// ==========================
//  SERVER & DB CONNECTION
// ==========================
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
};

start();
