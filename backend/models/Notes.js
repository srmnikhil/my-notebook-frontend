const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    tag : {
        type: String,
        default: "General",
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
  const Notes = mongoose.model("notes", NotesSchema);
  module.exports = Notes;