import {Schema, model} from "mongoose"


const livreSchema =Schema({
  code:String,
  titre:String,
  description:String,
  auteur:String
})

export default model('livre',livreSchema)