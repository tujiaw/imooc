/**
 * Created by tujiaw on 15/8/29.
 */
var mongoose = require('mongoose');
var CategorySchema = require('../schema/category');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;