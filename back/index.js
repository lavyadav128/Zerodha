import dotenv from 'dotenv';
import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./model/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Middleware to parse JSON bodies
app.use(express.json());

// If you're using URL-encoded data (form submissions), use this middleware as well:
app.use(express.urlencoded({ extended: true }));

/*const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const server = createServer(app);
const io = connectToSocket(server);
*/

dotenv.config();
import { HoldingsModel } from './model/HoldingsModel.js';
import { PositionsModel } from './model/PositionsModel.js';
import { OrdersModel } from './model/OrdersModel.js';


//const PORT = process.env.PORT || 3002;
/*const uri = process.env.MONGO_URL;

main()         //An asynchronous function to connect to the MongoDB database using Mongoose.
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(uri);
}*/

 

//app.use(bodyParser.json());


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.set("port", (process.env.PORT || 3000))


const start = async () => {
  app.set("mongo_user")
  const connectionDb = await mongoose.connect("mongodb+srv://lavkumaryadav824:abcdef123@zerodhacluster.irm0h.mongodb.net/?retryWrites=true&w=majority&appName=ZerodhaCluster")

  console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
  server.listen(app.get("port"), () => {
      console.log("LISTENIN ON PORT 3000")
  });
}
start();