import mongoose from "mongoose";
const Schema = mongoose.Schema;

const traineruser = mongoose.model('trainer', new Schema({
    'name': { type: String, required: true, lowercase: true },
    'type': { type: String, enum: ['Trainer', 'student',], default: 'Trainer' },
    'email': { type: String, require: true, unique: true },
    'role': { type: String, enum: ['Trainer', 'admin'], default: 'Trainer' },
    'image': {data: Buffer, contentType: String },
    'password': { type: String, required: true },
    'reset_password': { type: Object, required: false },
    'verificationCode':{ type: Number, required: false},
}));

export default traineruser;
