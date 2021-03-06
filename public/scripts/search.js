//page for api logic

const imdbTitleSearchURL = 'https://imdb-api.com/en/API/SearchTitle/k_tmoi66ix/';
const imdbSearchByIdURL = 'https://imdb-api.com/en/API/Title/k_tmoi66ix/';

const omdbSearchURL =  'https://www.omdbapi.com/?apikey=a757985a'
// let results;
// let result;
// use imdb api for posters and omdb for everything else? because of cap on free api key? 

const searchMovieTitles = (title) =>{
    $.ajax({
        url: omdbSearchURL,
        type: "GET",
        data: {
            "s" : title,
        }
    }).then(function(data) {
        return new Promise (function (resolve) {
            let results = data;
            resolve (
                displayResults(results)
            );
        });
    }), (error) =>{
        console.log(error);
    }
}
const searchByID = (imdbID) =>{
    $.ajax({
        url: omdbSearchURL,
        type: 'GET',
        data: {
            "i" : imdbID,
            "plot" : "full"
        }
    }).then(function(data) {
        return new Promise (function (resolve) {
            let result = data;
            resolve (
                displayResult(result)
            );
        });
    }), (error) =>{
        console.log(error);
    }
}
const displayResults = (results) =>{
    // if (typeOf(results) == 'object'){
    //     $('#results').html(`
    //         <h2> ${results.Title} </h2>
    //         <h3> ${results.Year} </h3>
    //         <h4> ${results.Rated} </h4>
    //         <p> ${results.Plot} </p>
    //     `)
    // } else {
        $('#results').empty();
        $('#results').html(`
        <h2> There are ${results.totalResults} search results</h2>`);

        let $table = $('<table>');
        $table.addClass('table');
        $table.html(
            `<thead class='thead-dark'>
            //         <tr>
            //           <th>Title</th>
            //           <th>Year</th>
            //           <th>Poster</th>
            //         </tr>
            //       </thead>`
            );
            for (let i=0; i<results.Search.length; i++){

                const $row = $('<tr>');
                const $titleCell = $('<td>').html(`<a href="/movies/searchdetail?imdbID=${results.Search[i].imdbID}" >${results.Search[i].Title}</a>`);
                const $yearCell = $('<td>').text(results.Search[i].Year);
                // const $ratedCell = $('<td>').text(results.Search[i].Rated);
                // const $plotCell = $('<td>').text(results.Search[i].Plot);
                const $posterCell = $('<td>').html(`<img src='${results.Search[i].Poster}' width='150px'>`);
                $row.append($titleCell, $yearCell, $posterCell);
                $table.append($row);
            }
            $('#results').append($table);
        }
    // }
const displayResult = (result) =>{
    $('#results').html(`
        <h2> ${result.Title} </h2>
        <img src="${result.Poster}" width="40%" >
        <h3> ${result.Year} </h3>
        <h4> ${result.Rated} </h4>
        <p> ${result.Plot} </p>
    `)
}
const addMovieToCollection = (imdbID) =>{
    $.ajax({
        url: `${imdbSearchByIdURL}${imdbID}/FullActor`,
        type: 'GET',
    }).then(function(data) {
        return new Promise (function (resolve) {
            let result = data;
            resolve (
                updateForm(result)
            );
            return result;
        });
    }), (error) =>{
        console.log(error);
    }
}

const updateForm = (result) =>{
    $('#id').val(result.id);
    $('#title').val(result.title);
    $('#fullTitle').val(result.fullTitle);
    $('#type').val(result.type);
    $('#year').val(result.year);
    $('#image').val(result.image);
    $('#runtimeStr').val(result.runtimeStr);
    $('#plot').text(result.plot);
    $('.spinner-border').remove();
}

// { "Title": "The Wizard of Oz",
// "Year": "1939",
// "Rated": "PG",
// "Released": "25 Aug 1939",
// "Runtime": "102 min",
// "Genre": "Adventure, Family, Fantasy, Musical",
// "Director": "Victor Fleming, George Cukor, Mervyn LeRoy, Norman Taurog, Richard Thorpe, King Vidor",
// "Writer": "Noel Langley (screenplay), Florence Ryerson (screenplay), Edgar Allan Woolf (screenplay), Noel Langley (adaptation), L. Frank Baum (from the book by)",
// "Actors": "Judy Garland, Frank Morgan, Ray Bolger, Bert Lahr",
// "Plot": "In this charming film based on the popular L. Frank Baum stories, Dorothy and her dog Toto are caught in a tornado's path and somehow end up in the land of Oz. Here she meets some memorable friends and foes in her journey to meet the Wizard of Oz who everyone says can help her return home and possibly grant her new friends their goals of a brain, heart and courage.",
// "Language": "English",
// "Country": "USA",
// "Awards": "Won 2 Oscars. Another 9 wins & 17 nominations.",
// "Poster": "https://m.media-amazon.com/images/M/MV5BNjUyMTc4MDExMV5BMl5BanBnXkFtZTgwNDg0NDIwMjE@._V1_SX300.jpg",
// "Ratings": [
//     { "Source": "Internet results Database"
//         , "Value": "8.0/10" },
//     { "Source": "Rotten Tomatoes",
//         "Value": "98%" },
//     { "Source": "Metacritic",
//         "Value": "100/100" }],
// "Metascore": "100",
// "imdbRating": "8.0",
// "imdbVotes": "364,177",
// "imdbID": "tt0032138",
// "Type": "results",
// "DVD": "19 Oct 1999",
// "BoxOffice": "$3,840,702",
// "Production": "Warner Bros. Pictures",
// "Website": "N/A",
// "Response": "True" }