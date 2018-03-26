require("dotenv").config();

var myKeys = require("./key.js")

var spotify = new Spotify(myKeys.spotify);
var client = new Twitter(myKeys.spotify);