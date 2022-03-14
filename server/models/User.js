const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const saltRounds = 10; 
const jwt = require('jsonwebtoken');

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

userSchma.methods.comparePassword=function(planinPassword,cd){
    //plainPassword 암호된 비밀번호 맞는지 확인
    bcrypt.compare(planinPassword,this.password, function(err,isMatch){
        if(err) return cb(err),
        cb(null,isMatch)
    })
}

userSchma.methods.generateToken = function(cb){

    var user = this;

    var token = jwt.sign(user._id.toHexString(),'secretToken');
    user.token =token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchma.statics.findByToken = function(token,cb){
    var user=this;

    jwt.verify(token,'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온  token과 DB에 보관된 토큰일 일치하는 지 확인

        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })


}

const User =mongoose.model('User',userSchma)

module.exports ={User}