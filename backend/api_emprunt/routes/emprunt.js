import express from "express";
import emprunt from "../models/emprunt.js";
import amqp from "amqplib";
import dotenv from "dotenv";

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

connectRabbitMQ().then(() => {
  console.log("connected to rabbitMQ");
});

router.post("/", (req, res) => {
  const empruntData = req.body;
  let client = null
  let livre = null;
  let countMessage= 0 
  channel.sendToQueue(livre_queue, Buffer.from(JSON.stringify(empruntData)));

  channel.sendToQueue(client_queue, Buffer.from(JSON.stringify(empruntData)));

  channel.consume(emprunt_queue, (data) => {
    countMessage++

    if(countMessage===1){
      livre = JSON.parse(data.content.toString());
    }else{
      client = JSON.parse(data.content.toString());
    }

   if(countMessage===2 && client && livre){
       const newEmprunt = {
         livre:livre[0],
         client:client[0],
       }
       emprunt.create(newEmprunt)
     .then(() => res.json({ message: "livre bien reservee" })).catch((e)=>{
       return res.status(500).json({message: e.message})
     });
     }
  });
  
});
router.get("/", (req, res) => {
  emprunt.find({}).then((data) => res.json(data));
});
export default router;
