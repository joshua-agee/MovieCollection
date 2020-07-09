const express = require('express');
const router= express.Router();
const Movie = require('../models/movie');

//Index
router.get('/', (req,res)=>{
    Movie.find({}, (err, foundMovies)=>{
        if (err) {console.log(err)} else {
            res.render('movies/index.ejs', {
                movies: foundMovies,
                title: 'Movie List'
            });
        }
    })
})
//New
router.get('/new', (req, res)=>{
    res.render('movies/new.ejs',{
        title: 'New Movie'
    });
})
//search page
router.get('/search', (req, res)=>{
    res.render('movies/search.ejs', {
        title: "Search Page"
    })
})

//Show
router.get('/:id', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        if(err) {console.log(err)} else {
            res.render('movies/show.ejs', {
                movie: foundMovie,
                title: foundMovie.title
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
                title: foundMovie.title
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