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
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/blog');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('blog startted on port ' + port);

app.get('/', function(req, res) {
    res.render('post', {
        title: 'tjw blog'
    });
});