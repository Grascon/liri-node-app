require("dotenv").config();

var myKeys = require("./key.js")
var request = require("request");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var command = process.argv[2];

var searchItem = process.argv[3];

function twitterSearch (){
  if (command === "my-tweets"){
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
}

function spotifySearch () {
  var songSearch;
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

function omdb(){
  var queryUrl;
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
      console.log("imdbRating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

if (command === "my-tweets"){
  twitterSearch();
}
else if (command === "spotify-this-song"){
  spotifySearch ();  
}
else if (command === "movie-this"){
  omdb();
}