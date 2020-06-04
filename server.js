//#region imports
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();
const http = require("http").createServer(app);

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
//#endregion

http.listen(process.env.PORT || 4000, () => {
	console.log("🚀🚀 Server ready");
});