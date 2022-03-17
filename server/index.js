const express =require('express')
const res = require('express/lib/response')
const app =express()

const bodyParser=require('body-parser')
const cookieParser= require('cookie-parser')
const config = require('./config/key');
const {User} =require("./models/User")
const {auth}=require('./middleware/auth')

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(cookieParser());

const mongoose =require('mongoose')
const read = require('body-parser/lib/read')
const req = require('express/lib/request')

mongoose.connect(config.mongoURI,{
}).then(()=>console.log('MongoDB connect.....'))
.catch(err => console.log(err))

app.get('/',(req,res) => res.send('Hello Word! 안녕하세요 ㅎㅎ'))
app.get('/api/hello',(req,res) => res.send('Hello Word!~~~'))
app.post('/api/usesrs/register',(req,res)=>{

    const user = new User(req.body)
    
    user.save((err,useInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true

        })
    })
})

app.post('/api/users/login',(req,res)=>{
    //요청된 이메일 데이터 베이스에 있는지 확인하기
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }
           //요청된 이메일이 데이터 베이스에 있ㅏ면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err,isMatch)=>{
        if(!isMatch)
        return res.json({loginSuccess:false,message: '제공된 이메일에 해당하는 유저가 없습니다.'})
    })
    //비밀번호까지 맞다면 토큰을 생성하기
    user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true, userId:user._id}) 
    })
  })
 
})

app.get('/api/user/auth',auth,(req,res)=>{
    //미들웨어가 여기까지 통과해 왔다는 authentcation이 true라는 말
    console.log(err)
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role === 0? false:true,
        isAuth:true,
        name:req.user.name, 
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout',auth,(req,res)=> {
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},(err,user)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    })
})


const port = 5001
app.listen(port,() => console.log('Example app listening on port',port,'!') )
//app.listen(port, () => console.log('Example app listening on port ${port}!'))
