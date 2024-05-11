import {Schema, model} from "mongoose"


const empruntSchema =Schema({
  livre:Object,
  client:Object,
  date_emprunt:{type:Date , default:Date.now},
  date_retour:{type:Date , default: null}
})

export default model('emprunt',empruntSchema)