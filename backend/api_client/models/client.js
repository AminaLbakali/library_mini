import {Schema, model} from "mongoose"


const clientSchema =Schema({
  id:Number,
  nom:String,
  prenom:String,
  email:String
})

export default model('client',clientSchema)