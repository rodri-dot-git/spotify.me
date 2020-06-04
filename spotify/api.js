const dotenv = require("dotenv");
dotenv.config();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
});

module.exports.callback = async function callback(code) {
    await spotifyApi.clientCredentialsGrant(code)
    .then((data) => {
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    })
    .catch((error) => console.log(error))
    spotifyApi.getMe()
    .then((data) => console.log(data.body))
    .catch((error) => console.log(error))
    spotifyApi.getFeaturedPlaylists({
        limit: 15,
        offset: 0,
        country: 'US',
        timestamp: date
    })
    .then(function (data) {
        console.log('popular', data.body.playlists.items)
    }, function (err) {
        console.log("Something went wrong!", err);
    })
    .catch((error) => console.log(error))

}