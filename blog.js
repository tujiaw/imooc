/**
 * Created by tujiaw on 15/8/23.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');
var Post = require('./model/post');
var Tag = require('./model/tag');
var Category = require('./model/category');

var app = express();
var port = process.env.PORT || 3333;

mongoose.connect('mongodb://localhost/blog');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('blog startted on port ' + port);

function Link() {
    this.text = "";
}
app.get('/', function(req, res) {
    Post.find().sort({updateTime:-1}).limit(15).exec(function(err, posts) {
        if (err) {
            console.error(err);
        } else {
            Category.find().exec(function(err, categories) {
                if (err) {
                    console.error(err);
                } else {
                    res.render('post', {
                        title: 'tjw blog',
                        posts: posts,
                        categories: categories
                    });
                }
            });
        };
    });
});

app.get('/admin/write_post', function(req, res) {
    Category.find().exec(function(err, categories) {
        if (err) {
            console.error(err);
        } else {
            res.render('write_post', {
                title: 'write post',
                post: {
                    title: '',
                    content: '',
                    category:''
                },
                categories: categories
            });
        }
    });
});

function escape2Html(str) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

app.get('/show_post/:id', function(req, res) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            post.content = escape2Html(post.content);
            res.render('show_post', {
                title: post.title,
                postContent: post.content
            });
        }
    });
});
app.post('/admin/write_post/new', function(req, res) {
    var id = req.body.post._id;
    var post = req.body.post;
    var _post;
    console.log("write_post_submit:" + post.title);

    if (id !== 'undefined') {
        Post.findById(id, function(err, postData) {
            if (err) {
                console.error(err);
            } else {
                _post = _.extend(postData, post);
                _post.save(function(err, postData) {
                    res.redirect('/post/' + postData._id);
                })
            }
        });
    } else {
        post.profile = post.content.substr(0, 300);
        post.profile = post.profile.replace(/<[^>]+>/g, '');
        _post = new Post({
            title: post.title,
            profile: post.profile,
            content: post.content,
            category: post.category
        });
        _post.save(function(err, postData) {
            if (err) {
                console.error(err);
            } else {
                Category.findOne({name: post.category}, function(err, category) {
                    if (err) {
                        console.error(err);
                    } else if (category) {
                        var count = category.count + 1;
                        Category.findOneAndUpdate({name: post.category}, {count: count}, function(err, data) {});
                    }
                });
                res.redirect('/');
            }
        });
    }
});

app.get('/admin/category', function(req, res) {
    Category.find().exec(function(err, categories) {
        if (err) {
            console.error(err);
        } else {
            res.render('category', {
                title: 'category',
                categories: categories
            });
        }
    });
});

app.post('/admin/category/add', function(req, res) {
    console.log("post add category");
    var newName = req.body.name;
    if (newName !== 'undefined') {
        console.log(newName);
        var _category = new Category({
            name: newName,
            count:0
        });
        _category.save(function(err, results) {
            if (err) {
                console.error(err);
            } else {
                res.json({name: newName});
            }
        });
    }
});

app.delete('/admin/category', function(req, res) {
    var delName = req.query.name;
    if (delName) {
        Category.remove({name: delName}, function(err, category) {
            if (err) {
                console.error(err);
            } else {
                res.json({success: 1});
            }
        })
    }
});