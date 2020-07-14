const express = require('express');
const router= express.Router();
const Movie = require('../models/movie');
const User = require('../models/user');

//Index
router.get('/', (req,res)=>{
    Movie.find({}, (err, foundMovies)=>{
        if (err) {console.log(err)} else {
            res.render('movies/index.ejs', {
                movies: foundMovies,
                title: 'Movie List',
                currentUser: req.session.currentUser
            });
        }
    })
})
//New
router.get('/new', (req, res)=>{
    res.render('movies/new.ejs',{
        title: 'New Movie',
        currentUser: req.session.currentUser
    });
})
//search page
router.get('/search', (req, res)=>{
    res.render('movies/search.ejs', {
        title: "Search Page",
        currentUser: req.session.currentUser
    })
})
//search details page
router.get('/searchdetail', (req, res)=>{
    res.render('movies/searchdetail.ejs',{
        title: 'Movie Details',
        imdbID: req.query.imdbID,
        currentUser: req.session.currentUser
    })
    console.log(req.query.imdbID);
})
//Pull full data from IMDB and allow selection of user and comments
router.get('/searchdetail/add/:imdbID/', (req, res)=>{
    User.find({}, (err, foundUsers)=>{
        if(err) {console.log(err)} else {
            res.render('movies/addToCollection.ejs', {
                imdbID: req.params.imdbID,
                title: 'Add to collection',
                users: foundUsers,
                currentUser: req.session.currentUser
            });

        }
    })
})



//Show
router.get('/:id', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        if(err) {console.log(err)} else {
            res.render('movies/show.ejs', {
                movie: foundMovie,
                title: foundMovie.title,
                currentUser: req.session.currentUser
            })
        }
    })
})
//edit
router.get('/:id/edit', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        if(err) {console.log(err)} else {
            res.render('movies/edit.ejs', {
                movie: foundMovie,
                title: foundMovie.title,
                currentUser: req.session.currentUser
            })
        }
    })
})
//Update
router.put('/:id', (req, res)=>{
    Movie.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}, (err, updatedMovie)=>{
        if (err) {console.log(err)} else {
            res.redirect(`/movies/${req.params.id}`);
        }
    })
})
//add to user collection
router.put('/:id/add', (req,res)=>{
    if (!req.body.userComments){
        req.body.userComments = ""
    }
    Movie.findById(req.params.id, (err, foundMovie)=>{
        if(err){console.log(err)} else{
            let newMovie = {
                movie_id: foundMovie._id,
                movieTitle: foundMovie.title,
                movieYear: foundMovie.year,
                movieImage: foundMovie.image,
                moviePlot: foundMovie.plot,
                movieRuntime: foundMovie.runtimeStr,
                userComments: req.body.userComments,
            };
            User.findByIdAndUpdate(req.session.currentUser._id, {$push: {movieCollection: newMovie}}, {upsert: true}, (err)=>{
                if(err){console.log(err)} 
                res.redirect(`/users/${req.session.currentUser._id}`);
            })
        }
    })
})
//Create
router.post('/', (req, res)=>{
    Movie.create(req.body, (err, createdMovie)=>{
        if (err) {console.log(err)} else {
            res.redirect('/movies');
        }
    })
})
//Destroy
router.delete('/:id', (req,res)=>{
    Movie.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err)=>{
        if (err) {console.log(err)} else {
            res.redirect('/movies');
        }});
    });

module.exports = router;