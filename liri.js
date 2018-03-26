require("dotenv").config();

var myKeys = require("./key.js")
var request = require("request");

var spotify = new Spotify(myKeys.spotify);
var client = new Twitter(myKeys.spotify);

//var commmand = process.argv[2];

//var searchItem = process.argv[3];

//var queryUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

//function for each type of search?
/*request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200) {

    console.log(JSON.parse(body));

    }
    });
*/

// my-tweets; spotify-this-song ''; movie-this '' ; do-what-it-says