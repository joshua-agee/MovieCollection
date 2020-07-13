//import * as mongoose from 'mongoose';
const User =require('../../models/user');
const Movie =require('../../models/movie');

const addToCollection = (user, movie, userComments) =>{
    let newMovie
    Movie.findById(movie._id, (err, foundMovie) =>{
        if(err){console.log(err)} else {
            newMovie = foundMovie;
        }
    })
    User.findOByID(user._id, (err, foundUser)=>{
        if(err) {console.log(err)} else {
            foundUser.movieCollection.push({
                movie: newMovie,
                userComments: userComments,
            })
            console.log(foundUser.movieCollection);
        }
    })
}
module.exports = addToCollection;