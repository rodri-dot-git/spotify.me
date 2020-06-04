const dotenv = require("dotenv");
dotenv.config();
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
});

module.exports.callback = function callback(code) {
    
}