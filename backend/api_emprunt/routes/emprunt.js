import express from "express";
import emprunt from "../models/emprunt.js";
import amqp from "amqplib";
import dotenv from "dotenv";
import e from "express";

const router = express.Router();
dotenv.config();
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

let newEmprunt = false;
connectRabbitMQ().then(() => {
  console.log("connected to rabbitMQ");

  let livre = null;
  let client = null;
  channel.consume(emprunt_queue, (data) => {
    const empruntData = JSON.parse(data.content.toString());
    if (empruntData.livre) {
      livre = empruntData.livre;
    } else if (empruntData.client) {
      client = empruntData.client;
    }

    if (client && livre) {
      newEmprunt = true;
      console.log({
        livre: livre,
        client: client,
      });
      emprunt.create({
        livre: livre,
        client: client,
      });
      livre = null;
      client = null;
      newEmprunt = false;
    }

    channel.ack(data);
  });
});

router.post("/", (req, res) => {
  try {
    const empruntData = req.body;
    channel.sendToQueue(livre_queue, Buffer.from(JSON.stringify(empruntData)));
    channel.sendToQueue(client_queue, Buffer.from(JSON.stringify(empruntData)));
    res.json({ message: "livre bien reservee" });
  } catch (error) {
    res.status(500).jsonjson({ message: "erreur dans la reservation !" });
  }
});
router.get("/Allemprunt", (req, res) => {
  emprunt.find({}).then((data) => res.json(data));
});

router.get("/Allemprunt/:id", (req, res) => {
  const clientId = Number(req.params.id) ;
  emprunt
    .find({'client.id' : clientId},{_id:0,livre:1,client:1,date_emprunt:1,date_retour:1})
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: "Client not found" });
      } else {
        res.json(data);
      }
    })


    
    .catch((e) => res.status(404).json({ message: "non trouvee" }));
});
export default router;
