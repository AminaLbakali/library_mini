import {Schema, model} from "mongoose"


const clientSchema =Schema({
  nom:String,
  prenom:String,
  email:String
})

export default model('client',clientSchema)