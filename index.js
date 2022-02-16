const express =require('express')
const res = require('express/lib/response')
const app =express()
const port =5000


const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://joseungjin:wh5947@boilerplate.r7lah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=>console.log('MongoDB connect.....'))
.catch(err => console.log(err))

app.get('/',(req,res) => res.send('Hello Word! 안녕하세요'))

app.listen(port,() => console.log('Example app listening on port',port,'!') )


