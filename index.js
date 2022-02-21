const express =require('express')
const res = require('express/lib/response')
const app =express()
const port =5000
const bodyParser=require('body-parser')

const config = require('./config/key');
const {User} =require("./models/User")

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const mongoose =require('mongoose')

mongoose.connect(config.mongoURI,{
}).then(()=>console.log('MongoDB connect.....'))
.catch(err => console.log(err))

app.get('/',(req,res) => res.send('Hello Word! 안녕하세요 ㅎㅎ'))

app.post('/register',(req,res)=>{

    const user = new User(req.body)
    
    user.save((err,useInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true

        })
    })
})
app.listen(port,() => console.log('Example app listening on port',port,'!') )


