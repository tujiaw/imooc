/**
 * Created by tujiaw on 15/8/23.
 */
var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: [Number],
    status: Number,
    createTime: Date,
    updateTime: Date,
    authorId: Number
});

PostSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createTime = this.updateTime = Date.now();
    } else {
        this.updateTime = Date.now();
    }

    next();
});

PostSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('updateTime').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
};

module.exports = PostSchema;