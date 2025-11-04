import mongoose, {Schema} from "mongoose"

const AdminSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    }
})

export const Admin = mongoose.model("admins", AdminSchema)