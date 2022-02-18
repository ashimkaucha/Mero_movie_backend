const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  mname: {
    type: String,
    //unique : true
  },
  mdesc: {
    type: String,
  },
  releasedate: {
    type: Date,
  },
  mcategories: {
    type: String,
    enum: ["Action", "Romance", "Horror", "Adventure"],
    default: "Action",
  },
  cover: {
    type: String,
    default:
      "https://img.search.brave.com/KbRNVWFimWUnThr3tB08-RFa0i7K1uc-zlK6KQedwUU/rs:fit:860:752:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI0LTI0/ODI1M191c2VyLXBy/b2ZpbGUtZGVmYXVs/dC1pbWFnZS1wbmct/Y2xpcGFydC1wbmct/ZG93bmxvYWQucG5n",
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
