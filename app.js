
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
const port=3000
app.listen(port,()=>console.log(`app is listing on port ${port}`));

const sendNotification=require('./sendNotification')
app.post('/not',async(req,res)=>{
    let body=req.body
    let {title,token,message}=body
    sendNotification(token,title,message)
    res.send('notication is send to user')

})