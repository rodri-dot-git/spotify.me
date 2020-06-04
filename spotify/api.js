const dotenv = require("dotenv");
dotenv.config();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
});

module.exports.callback = function callback(code) {
    spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
        console.log(data)
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    })
    .catch((error) => console.log(error))
}