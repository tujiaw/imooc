/**
 * Created by tujiaw on 15/8/23.
 */

var mongoose = require('mongoose');

var TagSchema = mongoose.Schema({
    name: String,
    frequency: Number
});

module.exports = TagSchema;