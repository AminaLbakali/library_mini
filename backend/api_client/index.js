import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
import clientRoute from "./routes/client.js"

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors())

const port = process.env.PORT;
const mongoDB = process.env.MONGODB

mongoose.connect(`${mongoDB}/clientsDB`).then(()=>{console.log('connected to mongodb')}).catch((error)=>{
   console('error connection to mongodb', error)
})

app.use('/client' , clientRoute)

app.listen(port ,()=>{
  try{
    console.log('server running on port : ' + port)
  }catch(e){
    console.log('error running server ' + e)
  }
})