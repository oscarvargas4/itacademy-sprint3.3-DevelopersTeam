const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  tasks: [{
    taskName: String,
    start_date: { type: Date, default: Date.now, required: true },
    due_date: { type: Date, required: true },
  }],

});

// Compile model from schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
