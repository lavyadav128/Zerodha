import express from "express";
import { PositionsModel } from "../models/PositionsModel.js";

const router = express.Router();

// GET all positions
router.get("/", async (req, res) => {
  try {
    const positions = await PositionsModel.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch positions", error });
  }
});

// POST a new position
router.post("/", async (req, res) => {
  try {
    const newPosition = new PositionsModel(req.body);
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ message: "Failed to add position", error });
  }
});

// DELETE a position by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PositionsModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete position", error });
  }
});

export default router;
