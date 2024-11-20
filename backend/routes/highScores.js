const express = require("express")
const router = express.Router()
const HighScore = require("../models/highScore")
// score and user data send
router.post("/score",async(req,res)=>{
    try {
    let score =  await new HighScore({
        user:req.body.user,
        highScore:req.body.score
    })  
    score = score.save()
    res.status(200) 
    } catch (error) {
      return res.status(400).send({msg:error})  
    }
})

// get all user and there score
router.get('/userNscore',async(req,res)=>{
  try{
  const data = await HighScore.find().populate('user', 'username -_id')
  if(!data){
    return res.status(400).send({msg:"unablr to find user.."})
  }
  else{
    return res.send(data)
  }
  }

  catch(err){
return res.status(400).send({msg:err})
  }
})
module.exports=router