const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const saltRounds = 10; 

const userSchma =mongoose.Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        maxlength:50
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        maxlength:50
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    },
})

userSchma.pre('save',function(next){
    var user=this;
    if(user.isModified('password')){
           //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
    }else{
        next()
    }
 
})

const User =mongoose.model('User',userSchma)

module.exports ={User}