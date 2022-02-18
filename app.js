const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const database = require("./database/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

const usersRoute = require("./route/usersRoute");
const movieRoute = require("./route/movieRoute");
const showtimeRoute = require("./route/showtimeRoute");

app.use(usersRoute);
app.use(movieRoute);
app.use(showtimeRoute);

app.listen(90);
