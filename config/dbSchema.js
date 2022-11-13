const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',require:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    password:{type:'string',required:true},
    role:{type:'string',default:'user'},
    createdAt:{type:Date,default:Date.now()}
})

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    imageUrl:{type:String,default:null}
})



let usersModel = mongoose.model('users',userSchema);
let foodModel = mongoose.model('foods',foodSchema);

module.exports={mongoose,usersModel,foodModel}