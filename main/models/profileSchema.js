import { mongoose } from "mongoose";

const profileSchema = new mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    serverID: {type: String, required: true},
    number: {type: Number, default: 0},
})

const model = mongoose.model('ProfileModels', profileSchema)

export default model;