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
  livre
    .create(newBook)
    .then(() => res.json({ message: "livre bien ajoutee" }))
    .catch((e) => {
      res.status(500).json({ message: "erreur d'ajout" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  livre
    .find({ code: id }, { _id: 0, titre: 1, description: 1, auteur: 1 })
    .then((data) => res.json(data));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { titre, description, auteur } = req.body;

  livre
    .updateOne(
      { code: id },
      { titre: titre, description: description, auteur: auteur }
    )
    .then(() => res.json({message: "livre bien modifier"}))
    .catch((error) => res.status(500).json({ message: 'erreur du modification' }));
});

router.delete("/:id" , (req,res)=>{
  const id = req.params.id
  livre.deleteOne({code:id}).then(()=>res.json({message: "livre supprimer"}))
  .catch((error)=>res.status(500).json({message:"livre pas trouver"}))
})

export default router;
