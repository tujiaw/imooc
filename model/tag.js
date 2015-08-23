/**
 * Created by tujiaw on 15/8/23.
 */
var mongoose = require('mongoose');
var TagSchema = require('../schema/tag');
var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;