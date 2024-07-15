import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminmodel = mongoose.model('admin', new Schema({
    'username': { type: String, require: true, unique: true },
    'password': { type: String, required: true },
    'isAdmin': {type:Boolean,default:false}
}));

export default adminmodel;