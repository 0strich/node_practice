const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const usersSchema = require('../models/users');

module.exports = mongoose.model('users', usersSchema);