const mongoose = require('mongoose');

const {Schema} = mongoose;

const usersSchema = Schema({
  nickName: {
    type: String,
    unique: true,
    match: [/^.{2,20}$/, 'Should be 2-20 characters!'],
  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Should be a valid email address!',
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = usersSchema;