import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from "path";

//*********************** */
import { PORT,mongoDBURL } from './config.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cookieParser());

app.get('/',(req,res)=>{
    console.log(req);
    return res.send('Welcome to Site Web MERN');
});

app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/upload", uploadRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})