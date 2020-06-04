//#region imports
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();
const http = require("http").createServer(app);
const callback = require('./spotify').callback
//#endregion

//#region app use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "/public")));
//#endregion

//#region rutas get
app.get("/", (_, res) => res.redirect("/index"))

app.get("/index", (_, res) => {
    res.sendFile(path.join(__dirname, "public/views/index.html"));
});

app.get('/login', function (req, res) {
    const scopes = `user-read-private user-read-email user-top-read 
    user-read-playback-position user-read-recently-played`;
    let redirect_uri = 'https://spotify-me.herokuapp.com/callback'
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.SPOTIFY_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function (req, res) {
    callback(req.code)
    res.redirect("/index")
});
//#endregion

http.listen(process.env.PORT || 4000, () => {
    console.log("🚀🚀 Server ready");
});