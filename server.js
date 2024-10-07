import express from'express';
import cors from 'cors';
import mongoose from'mongoose';
import bodyParser from'body-parser';
import { User_collection } from './UserModel.js';
import dotenv from 'dotenv'

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://med-log.vercel.app']; 

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
const PORT = 8000;

dotenv.config()
// const URI = process.env.Local_URI;
const URI = process.env.DB_URI;

await mongoose.connect(URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected", err);
  });

// User Authentication
app.post('/auth', async (req, res) => {
    try{
        const user = await User_collection.findOne({ uid: req.body.uid });
        if(user){
            console.log('user found',user);
            res.json({ success: true, message: "Already Registered user",userdata:user});
        } 
        else{
            const data = {
                uid:req.body.uid,
                name:req.body.name,
                email:req.body.email,
                degree:"",
                YearOfGraduation:"",
                phone:"",
                linkedin:"",
                education:[],
                work:[],
            } 
            const newUser = new User_collection(data);
            await newUser.save();
            res.json({ success: true, message: "New User Registered",userdata:newUser});
        }
    } 
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Update User Profile
app.post('/profile', async (req, res) => {
    console.log(req.body);
    try{
        const user = await User_collection.findOneAndUpdate(req.body.uid, {
            $set: {
                name:req.body.name,
                degree:req.body.degree,
                YearOfGraduation:req.body.YearOfGraduation,
                phone:req.body.phone,
                linkedin:req.body.linkedin,
                education:req.body.education,
                work:req.body.work,
            }
        },{ new: true });

        if(!user){
            res.status(404).json({success:false, message: 'User not found'});
        } 
        else{
            res.json({ success:true,message: 'User profile updated successfully',user:user });
        }
    } 
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});

//**** route to api*/

import userRouter from './utils/UserDataRoute.js';

app.use("/api/v1/users",userRouter)