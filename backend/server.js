import mongoose from 'mongoose';
import { PORT,mongoDBURL } from './config.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Autorise seulement cette origine
    credentials: true, // Autorise l'envoi de cookies si nécessaire
}));

app.use(cookieParser());

app.get('/',(req,res)=>{
    console.log(req);
    return res.send('Welcome to Site Web MERN');
});

app.use(express.json()); 
app.use('/api/users', userRoutes);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})