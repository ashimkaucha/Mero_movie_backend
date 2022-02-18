const Movie = require("../models/movie.js");
const Showtime = require("../models/showtime.js");

module.exports.insert_movie = async function (req, res) {
  const { mname, mdesc, releasedate, mcategories } = req.body;
  const movie = new Movie({
    mname,
    mdesc,
    releasedate,
    mcategories,
  });
  await movie.save();
  res.json({ msg: "Movie Inserted", success: true });
};
module.exports.upload_movie_cover = async function (req, res) {
  const movieId = req.params.movieId;
  if (req.file == undefined) {
    return res.json({ msg: "only png/jpeg/gif files are allowed!" });
  }
  const filename = req.file.filename;
  await Movie.updateOne(
    { _id: movieId },
    {
      cover: "http://localhost:90/public/" + filename,
    }
  );
  res.json({ msg: "Movie Cover Updated", success: true });
};

module.exports.update_movie = async function (req, res) {
  const movieId = req.params.movieId;
  const { mname, mdesc, releasedate, mcategories } = req.body;

  await Movie.updateOne(
    { _id: movieId },
    {
      mname,
      mdesc,
      releasedate,
      mcategories,
    }
  );
  res.json({ msg: "Movie Updated", success: true });
};

module.exports.delete_movie = async function (req, res) {
  const movieId = req.params.movieId;
  await Movie.findByIdAndDelete(movieId);
  res.json({ msg: "Movie Deleted", success: true });
};

module.exports.get_movie = async function (req, res) {
  const data = await Movie.find();
  res.json({ msg: "Movie Fetched", success: true, data });
};

module.exports.get_single_movie_showtime = async function (req, res) {
  try {
    const movieId = req.params.movieId;

    const data = await Movie.findById(movieId);
    const showTime = await Showtime.find({ movieId });
    res.json({
      msg: "Single Movie and Its Related data Fetched",
      success: true,
      data,
      showTime,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: `Error Occured ${error}` });
  }
};
module.exports.get_single_movie = async function (req, res) {
  try {
    const movieId = req.params.movieId;

    const data = await Movie.findById(movieId);

    res.json({
      msg: "Single Movie data Fetched",
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: `Error Occured ${error}` });
  }
};
