/**
 * Created by tujiaw on 15/8/22.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schema/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;