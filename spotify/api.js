const dotenv = require("dotenv");
dotenv.config();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
});
const request = require('request-promise')

module.exports.callback = async function callback(code) {
    console.log(code)
    const options = {
        method: 'POST',
        json: true,
        uri: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic NzMzNWFlZGE2YzQyNDg1NGFkNThjZjUyNzJkNmNiY2E6ZmFmNjUxYzMwMTY0NDQ0ZWI2YTY4MWFkYjZmNDIwZWM='
        },
        form: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://spotify-me.herokuapp.com/callback'
        }
    }
    if (code.length > 0) {
        await request(options)
            .then((data) => {
                spotifyApi.setAccessToken(data.access_token)
                spotifyApi.setRefreshToken(data.refresh_token);
            })
            .catch((error) => console.log(error))
    
        await spotifyApi.getMe()
            .then((data) => console.log(data.body))
            .catch((error) => console.log(error))
    
        await spotifyApi.getFeaturedPlaylists({
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
    }else{
        console.log('no code provided')
    }

}