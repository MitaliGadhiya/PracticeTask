import { UserInterface } from "../interface/userInterface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<UserInterface>({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

export const UserModel = model<UserInterface>("user",userSchema)