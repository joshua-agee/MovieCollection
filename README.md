# MovieCollection
Second Project for SEI

This app allows users to create and update their accounts on the site, and with an account, they can add movies to their own personal collection from a master collection of movies.  New movies can be added to the master collection manually or by an online search that combines an API call to OMDB API for the initial search result list (top ten results).  When a specific title is chosen, details are displayed, and the movie can be added.  A new call to the IMDB-API is made to populate all the details into a form which can be edited by the user, and then added to the master collection.  
 This is done using node.js, express, EJS, jQuery, MongoDB, express-session, bcrypt, body-parser and dotenv.  Styling is done with Bootstrap.  

The two different APIs are used for two reasons : request limitations and structure of data.  The data quality provided by IMDB API is higher, but the free API key has a limit on the number of daily requests.  In this version, the higher quality data is not yet used extensively (full cast, actor info, director info, etc.) but the ground work is laid for that.  

Outstanding tasks include better styling, and process flow.
