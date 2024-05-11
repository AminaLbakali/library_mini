import express from "express"
import emprunt from "../models/emprunt.js"

const router = express.Router();

router.post('/' , (req,res)=>{
  const newEmprunt = req.body

  emprunt.create(newEmprunt).then(
    ()=>res.json({message:"livre bien reservee"})
  )
})
router.get('/' , (req,res)=>{
  
  emprunt.find({}).then(
    (data)=>res.json(data)
  )
})
export default router