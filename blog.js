/**
 * Created by tujiaw on 15/8/23.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('underscore');
var mongoose = require('mongoose');
var Post = require('./model/post');
var Tag = require('./model/tag');

var app = express();
var port = process.env.PORT || 3333;

mongoose.connect('mongodb://localhost/blog');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('blog startted on port ' + port);

function Link() {
    this.text = "";
}
app.get('/', function(req, res) {
    var links = new Array({text:"first"}, {text:"second"}, {text:"third"});
    Post.find().sort({updateTime:-1}).limit(10).exec(function(err, posts) {
        if (err) {
            console.error(err);
        } else {
            res.render('post', {
                title: 'tjw blog',
                posts: posts,
                category: links
            })
        };
    });
});

app.get('/admin/write_post', function(req, res) {
   res.render('write_post', {
       title: 'write post',
       post: {
           title: '',
           content: ''
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
        _post = new Post({
            title: post.title,
            content: post.content
        });
        _post.save(function(err, postData) {
            if (err) {
                console.error(err);
            } else {
                //res.redirect('/post/' + postData._id);
            }
        });
    }
});