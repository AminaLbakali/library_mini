import express from "express";
import livre from "../models/livre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  livre
    .find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => res.status(401).json({ message: error.message }));
});

router.post("/", async (req, res) => {
  const newBook = req.body;
  livre.create(newBook).then((book) => res.json(book));
});

export default router;
