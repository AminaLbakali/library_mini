import {Schema, model} from "mongoose"


const livreSchema =Schema({
  code:String,
  image:String,
  titre:String,
  description:String,
  auteur:String
})

export default model('livre',livreSchema)