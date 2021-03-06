/**
 * Created by tujiaw on 15/8/29.
 */
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema(
    {
        name: {
            unique: true,
            type: String
        },
        count: Number
    }
);

module.exports = CategorySchema;