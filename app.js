/**
 * Created by tujiaw on 15/8/8.
 */
/**
 * Created by tujiaw on 15/8/8.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('underscore');
var mongoose = require('mongoose');
var Movie = require('./model/movie');
var User = require('./model/user');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc startted on port ' + port);

// index page
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'imooc 首页',
                movies: movies
            });
        }
    })

});

// detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        if (err) {
            console.log(err);
        } else {
            res.render('detail', {
                title: 'imooc' + movie.title,
                movie: movie
            });
        }

    });
});

// admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
});

app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function(err, movie) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/movie/' + movie._id);
                    }
                })
            }
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/movie/' + movie._id);
            }
        })
    }
});

// list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render('list', {
                title: 'imooc 列表页',
                movies: movies
            });
        }
    });
});

// signup
app.post('/user/signup', function(req, res) {
    var user = req.body.user;
    console.log(user);
    var _user = new User(user);
    _user.save(function(err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            res.redirect('/');
        }
    });
});
