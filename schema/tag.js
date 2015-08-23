/**
 * Created by tujiaw on 15/8/23.
 */

var mongoose = require('mongoose');

var TagSchema = mongoose.Schema({
    _id: Number,
    name: String,
    frequency: Number
});

module.exports = TagSchema;