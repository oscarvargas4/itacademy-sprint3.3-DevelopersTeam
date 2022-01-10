const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  tasks: [{
    taskName: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null },
  }],

});

// Compile model from schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
