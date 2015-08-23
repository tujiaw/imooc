/**
 * Created by tujiaw on 15/8/23.
 */
var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    _id: Number,
    title: String,
    content: String,
    tags: [Number],
    status: Number,
    createTime: Date,
    updateTime: Date,
    authorId: Number
});

module.exports = PostSchema;