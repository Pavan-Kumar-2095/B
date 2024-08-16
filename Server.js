const mongoose = require('mongoose')
const News = require("./Details")
const User = require("./User.js")
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000

app.use(cors({origin:'https://frontend-w71v-24t5ku9kh-pavan-kumar-2095s-projects.vercel.app/'}))

app.use(express.json())   

let uri = "mongodb+srv://developer0exe:321321@insights.c5adzzl.mongodb.net/"
mongoose.connect(uri)


app.listen(port , () =>{
    console.log(`example app listening at http://localhost:${port}`)
})

app.get('/',(req , res) =>{
    console.log("server running on port",port)
    res.json({"connection" : true})
})


app.get('/shop',async(req , res) =>{
    await mongoose.connect(uri)
    console.log("server running on /shop")  
    let length = await News.countDocuments()
    let newss = await News.find({})
    console.log(newss,length)
    let newnews = newss.reverse()
    res.status(200).json(newss)
})


app.get('/shop/:id',async(req , res) =>{
    await mongoose.connect(uri)
    console.log("server running on /shop/:id",port)
    console.log(req.params.id)
    console.log(req.url,req.params)
    let input = req.params.id
    let newss = await News.find({_id:input})
    console.log(newss)
    if(!!newss){
        res.status(200).json(newss)
        console.log('completed')
    }

})

app.post('/add' ,async(req,res)=>{
    console.log("server running on /add")
    await mongoose.connect(uri)
    console.log(req.body)

    let input = req.body
    const user = new News({ headlines:input.headlines , content : input.content  , date : input.time})
    await user.save()   
})

app.post('/delete' , async(req,res)=>{
    console.log("server running on /delete")
    await mongoose.connect(uri)
    console.log(req.body)
    let input = req.body
    const user = await News.exists({_id:input.id})
    console.log(user)
    if(!!user){
        const user = await News.deleteOne({_id : input.id})
    }
    
})


// **********************************************************************************************************************************
app.post('/signup' ,async(req,res)=>{
    console.log("server running on /signup")
    await mongoose.connect(uri)
    console.log(req.body)

    let input = req.body
    const user = new User({ username:input.username , password : input.password})
    await user.save()   
})

app.post('/login' ,async(req,res)=>{
    console.log("server running on /login")
    await mongoose.connect(uri)
    let input = req.body
    console.log(input)
    const users = await User.exists({ username:input.username , password:input.password})
    console.log(users,!!users)
    if(!!users){
        res.status(200).json({result:true})
    }
    else{
        res.status(404).json({result:false})
    }
})