import express from "express";
import livre from "../models/livre.js";
import amqp from "amqplib"


const router = express.Router();
const RabbitMQURL = process.env.RabbitMQURL;
var connection, channel;
const client_queue = "api_client";
const livre_queue = "api_livre";
const emprunt_queue = "api_emprunt";
const notification_queue = "api_notification";


const connectRabbitMQ = async () => {
  connection = await amqp.connect(RabbitMQURL);
  channel = await connection.createChannel();
  channel.assertQueue(client_queue);
  channel.assertQueue(livre_queue);
  channel.assertQueue(emprunt_queue);
  channel.assertQueue(notification_queue);
};

connectRabbitMQ().then(() => {
  console.log("connect to rabbitMQ");
  channel.consume(livre_queue, (data) => {
    const empruntData = JSON.parse(data.content.toString());
    livre.find({_id: empruntData.code},{_id: 0 ,titre:1,description:1,auteur:1}).then((data)=>{
      const livreInfo  = {
        livre : data[0]
      }
      console.log(livreInfo)
      channel.sendToQueue(emprunt_queue , Buffer.from(JSON.stringify(livreInfo)))
    })
    channel.ack(data)
  });
});


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
  livre
    .find({_id: id }, { _id: 0, titre: 1, description: 1, auteur: 1 })
    .then((data) => res.json(data));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { titre, description, auteur } = req.body;

  livre
    .updateOne(
      { _id: id },
      { titre: titre, description: description, auteur: auteur }
    )
    .then(() => res.json({message: "livre bien modifier"}))
    .catch((error) => res.status(500).json({ message: 'erreur du modification' }));
});

router.delete("/:id" , (req,res)=>{
  const id = req.params.id
  livre.deleteOne({_id:id}).then(()=>res.json({message: "livre supprimer"}))
  .catch((error)=>res.status(500).json({message:"livre pas trouver"}))
})

export default router;
