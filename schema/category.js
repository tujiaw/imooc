/**
 * Created by tujiaw on 15/8/29.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema(
    {
        name: String,
        count: Number
    }
);

module.export = CategorySchema;