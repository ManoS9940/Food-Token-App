var express = require('express');
var router = express.Router();
const {mongodb,dbUrl} = require('../config/dbConfig')
const {mongoose,foodModel} = require('../config/dbSchema')
const {validateToken,adminGaurd} = require('../config/auth')
mongoose.connect(dbUrl)

router.get('/all-food',async(req, res)=>{
  try {
    let food = await foodModel.find()
    res.send({
      statusCode:200,
      food
    })
    
  } catch (error) {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
});

router.post('/add-food',validateToken,adminGaurd,async(req,res)=>{
  try {
    let food = await foodModel.create(req.body)
    res.send({
      statusCode:200,
      message:"Food Added Successfully",
      food
    })
    
  } catch (error) {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
})

router.delete('/delete-food/:id',validateToken,adminGaurd,async(req,res)=>{
  try {
    let food = await foodModel.deleteOne({_id:mongodb.ObjectId(req.params.id)})
    res.send({
      statusCode:200,
      message:"Food Deleted Successfully"
    })
    
  } catch (error) {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
  }
})



module.exports = router;
