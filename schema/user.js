/**
 * Created by tujiaw on 15/8/22.
 */
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    //bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //    if (err) {
    //        return next(err);
    //    }
    //    bcrypt.hash(user.password, salt, function(err, hash) {
    //        if (err) {
    //            return next(err);
    //        }
    //        user.password = hash;
    //        next();
    //    })
    //});

    user.password = hash;
    next();
});

module.exports = UserSchema;