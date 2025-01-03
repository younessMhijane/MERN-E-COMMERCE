import mongoose from 'mongoose';
import { PORT,mongoDBURL } from './config.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();

app.use(cookieParser());

app.get('/',(req,res)=>{
    console.log(req);
    return res.send('Welcome to Site Web MERN');
});

app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})