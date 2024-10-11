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
    degree:{
        type:String,
    },
    YearOfGraduation:{
        type:String,
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
            currentPosition:{type:String},
            company:{type:String},
            experience:{type:String},
        }
    ],
})
export const User_collection = mongoose.model('alumni',userSchema);