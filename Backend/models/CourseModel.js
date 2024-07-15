import mongoose from "mongoose";
import studentuser from "./StudentModel";
const Schema = mongoose.Schema;

const coursemodel = mongoose.model('Course', new Schema({
    'coursename': { type: String, required: true, lowercase: true },
    'coursedescription': { type: String, required: true},
    'type': { type: String, enum: ['user', 'student',], default: 'user' },
    'email': { type: String, require: true, unique: true },
    'role': {type: String,enum: ['student', 'admin'],default: 'trainer'},
    'password': { type: String, required: true },
    'reset_password': { type: Object, required: false },
    'enrolledCourses': [{ type: mongoose.studentuser, ref: 'Course', },],
}));

export default coursemodel;