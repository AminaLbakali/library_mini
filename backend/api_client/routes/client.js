import express from "express";
import client from "../models/client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  client
    .find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => res.status(401).json({ message: error.message }));
});

router.post("/", async (req, res) => {
  const newClient = req.body;
  client
    .create(newClient)
    .then(() => res.json({ message: "client bien ajoutee" }))
    .catch((e) => {
      res.status(500).json({ message: "erreur d'ajout du client" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  
  client
    .find({ id: id }, { _id: 0, nom: 1, prenom: 1, email: 1 })
    .then((data) => res.json(data));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nom, prenom, email } = req.body;

  client
    .updateOne(
      { id: id },
      { nom: nom, prenom: prenom, email: email }
    )
    .then(() => res.json({ message: "client bien modifier" }))
    .catch((error) =>
      res.status(500).json({ message: "erreur du modification" })
    );
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  client
    .deleteOne({ id: id })
    .then(() => res.json({ message: "client supprimer" }))
    .catch((error) => res.status(500).json({ message: "client pas trouver" }));
});

export default router;
