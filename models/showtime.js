const mongoose = require("mongoose");
const User = require("./users");
const Movie = require("./movie");

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Movie,
  },
  datetime: {
    type: Date,
  },
  price: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  booking: {
    type: Array,
  },
});

const Showtime = mongoose.model("Showtime", showtimeSchema);
module.exports = Showtime;
