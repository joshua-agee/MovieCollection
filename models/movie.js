// schema for a movie
//details from movie
//comments from user
//rating


const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {type: String}, //the imdb movie ex: "tt1375666"
    title: {type: String}, // short title: Inception
    fullTitle: {type: String}, // full title "Inception (2010)"
    type: {type: String}, //"Movie", "TV"
    year: {type: String}, 
    image: {type: String}, //link to poster
    runtimeStr: {type: String}, //"2h 28 mins"
    plot: {type: String}, // longer text of plot
    directorList: [{
        id: {type: String}, //"nm0634240" person id
        name: {type: String}, //"Christopher Nolan" 
    }],
    starList: [{
        id: {type: String}, //person id
        name: {type: String} //name
    }],
    actorList: [{
        id: {type: String}, //person id
        image: {type: String}, //headshot
        name: {type: String}, //name
        asCharacter: {type: String}, // name of char in role
    }],
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
