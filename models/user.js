//model for a user
//username collection, password

const mongoose = require('mongoose');
const Movie = require('./movie.js');

const userSchema = new mongoose.Schema({
    username:  {type: String, required: true}, //login name
    passwordHash: {type: String, required: true}, //password hash
    nickname: {type: String}, // friendly name
    movieCollection: [{
        movie_id: {type: String, required: true}, //mongodb ID from movie collection
        movieTitle: {type: String},
        movieYear: {type: String},
        movieImage: {type: String},
        userComments: {type: String},
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;