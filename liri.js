//all things that liri node will require
require("dotenv").config();

var myKeys = require("./key.js")
var request = require("request");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//variables gathered when passing arguements in the terminal. first is the command (search type) and then search item (what will be searched if applicable)
var command = process.argv[2];
var searchItem = process.argv[3];

//function that will gather latest tweets 
function twitterSearch (){
  fs.appendFile("log.txt", "\n'Command: my-tweets'", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });
  var client = new Twitter(myKeys.twitter);
  var params = {screen_name: 'Grascons'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++){
        console.log(tweets[i].user.screen_name + " Tweeted: " + tweets[i].text + " On: " + tweets[i].created_at);
      }
    }
  });
}

//function that will gather info of the song searched
function spotifySearch () {
  fs.appendFile("log.txt", "\n'Command: spotify-this-song; Song searched: " + searchItem + "'", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });
  var songSearch;

  //only works if arguement is literally " " vs being left blank in order to get default song
  if (searchItem === " "){
    songSearch = "The Sign Ace of Base";
  }
  else {
    songSearch = searchItem;
  }
  var spotify = new Spotify(myKeys.spotify);
  spotify.search({ type: 'track', query: songSearch }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Band or Artist Name: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
  });
}

//function that will gather info of the film searched
function omdb(){
  fs.appendFile("log.txt", "\n'Command: movie-this; Film searched: " + searchItem + "'", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });

  var queryUrl;

  //only works if arguement is literally " " vs being left blank in order to get default film
  if (searchItem === " "){
    queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
  }
  else {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";
  }
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

//function for do-what-it-says. It will read the random.txt file and split the array. it will take from this "I want it that way" as a song and run the spotify function and search this song.
function doWhatItSays (){
  fs.appendFile("log.txt", "\n'Command: do-what-it-says'", function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var output = data.split(",");
    //for loop wasnt actually necessary
        //for (var i = 1; i < output.length; i++){
        //command = dataArr[0];
    searchItem = output[1];
    spotifySearch();
        //}
  });  
}

//if statements that determine the type of search and corresponding functions to run
if (command === "my-tweets"){
  twitterSearch();
}
else if (command === "spotify-this-song"){
  spotifySearch ();  
}
else if (command === "movie-this"){
  omdb();
}
else if (command === "do-what-it-says"){
  doWhatItSays();
}