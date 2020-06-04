const dotenv = require("dotenv");
dotenv.config();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
});

module.exports.callback = async function callback(code) {
    await spotifyApi.clientCredentialsGrant(code)
    .then(async (data) => {
        await spotifyApi.setAccessToken(data.body['access_token'])
        .then(() => {
            spotifyApi.getMe()
            .then((data) => console.log(data.body))
            .catch((error) => console.log(error))
        })
        await spotifyApi.setRefreshToken(data.body['refresh_token']);
    })
    .catch((error) => console.log(error))


    let date = new Date();
	date.setHours(date.getHours() - 7)

    await spotifyApi.getFeaturedPlaylists({
        limit: 15,
        offset: 0,
        country: 'US',
        timestamp: date
    })
    .then(function (data) {
        //console.log('popular', data.body.playlists.items)
    }, function (err) {
        console.log("Something went wrong!", err);
    })
    .catch((error) => console.log(error))

}