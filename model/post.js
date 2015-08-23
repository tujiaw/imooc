/**
 * Created by tujiaw on 15/8/23.
 */

var mongoose = require('mongoose');
var PostSchema = require('../schema/post');
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;