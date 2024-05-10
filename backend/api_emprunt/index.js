import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json())

const port = process.env.PORT;
const mongoDB = process.env.MONGODB

mongoose.connect(`${mongoDB}/empruntsDB`).then(()=>{console.log('connected to mongodb')}).catch(()=>{
   console('error connection to mongodb', error)
})


app.listen(port , ()=>{
  try{
    console.log('server running on port : ' + port)
  }catch(e){
    console.log('error running server ' + e)
  }
})