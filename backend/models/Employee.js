const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    designation: {
        type: String,
        enum: ['HR', 'Sales', 'Manager'], 
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Employee', employeeSchema);
