import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    location:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    education:[
        {
            university:{type:String},
            degree:{type:String},
            year:{type:String}
        }
    ],
    work:[
        {
            domain:{type:String},
            role:{type:String},
            company:{type:String},
            location:{type:String},
        }
    ],
})
export const User_collection = mongoose.model('alumni',userSchema);