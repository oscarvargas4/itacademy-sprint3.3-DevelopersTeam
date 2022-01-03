const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  tasks: [{
    taskName: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishAt: { type: Date, default: null },
  }],

});

// Compile model from schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
