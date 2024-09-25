const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    mobile : {
        type: Number,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        default: ()=>{
            const utcDate = new Date();
            const istDate = new Date(utcDate.setHours(utcDate.getHours() + 5, utcDate.getMinutes() + 30));
            return istDate;
        }
    }
  });
  const User = mongoose.model("user", UserSchema);
  module.exports = User;