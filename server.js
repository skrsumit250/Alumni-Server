const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user_collection = require("./UserModel");
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://med-log.vercel.app']; 

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
const PORT = 8000;

require('dotenv').config();
// const URI = process.env.Local_URI;
const URI = process.env.DB_URI;

mongoose.connect(URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected", err);
  });

app.post('/login', async (req, res) => {
    const data = {
        uid:req.body.uid,
        name:req.body.name,
        email:req.body.email
    } 
    console.log(data);
    try{
        const user = await user_collection.findOne({ uid: data.uid });
        if(user){
            console.log('user found',user);
            res.json({ success: true, message: "Already Registered user"});
        } 
        else{
            const newUser = new user_collection(data);
            await newUser.save();
            res.json({ success: true, message: "New User Registered"});
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
