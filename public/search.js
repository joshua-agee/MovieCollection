//page for api logic

const imdbTitleSearchURL = 'https://imdb-api.com/en/API/SearchTitle/k_tmoi66ix/';
const omdbTitleSearchURL =  'https://www.omdbapi.com/?apikey=a757985a'
let results;
// use imdb api for posters and omdb for everything else? because of cap on free api key? 

const searchMovieTitles = (title) =>{
    $.ajax({
        url: omdbTitleSearchURL,
        type: "GET",
        data: {
            "s" : title,
        }
    }).then(function(data) {
        return new Promise (function (resolve) {
            results = data;
            resolve (
                displayResults(results)
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
                const $titleCell = $('<td>').text(results.Search[i].Title);
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