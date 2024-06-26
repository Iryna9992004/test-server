require('dotenv').config()
const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const router=require('./router/index')
const errorMiddleware=require('./middleware/error-middleware')

const app=express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
}));
app.use('/api',router);
app.use(errorMiddleware)

const start=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start()