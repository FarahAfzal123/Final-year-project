import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentuser = mongoose.model('student', new Schema({
    'name': { type: String, required: true, lowercase: true },
    'type': { type: String, enum: ['student', 'admin'], default: 'student' },
    'image': { type: String, default: '/public/default.svg', require: false },
    'age': { type: Number, min: 18, max: 70, required: false },
    'email': { type: String, require: true, unique: true },
    'type': { type: String, enum: ['normal', 'valued'], default: 'normal' },
    'role': {type: String,enum: ['student'],default: 'student'},
    'password': { type: String, required: true },
    'reset_password': { type: Object, required: false },
    'verificationCode':{ type: Number, required: false},
    'created_at': { type: Date, default: new Date().toUTCString() },
    'updated_at': { type: Date, default: new Date().toUTCString() }
}));


export default studentuser;