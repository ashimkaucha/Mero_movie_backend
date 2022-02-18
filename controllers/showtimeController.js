const Showtime = require("../models/showtime.js");

module.exports.insert_showtime = async function (req, res) {
  const { movieId, datetime, price } = req.body;
  const userId = req.userData;
  console.log(req.body);
  const showtime = new Showtime({
    userId,
    movieId,
    datetime,
    price,
  });
  await showtime
    .save()
    .then(() => {
      res.json({ msg: "New Showtime Inserted", success: true });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: `Couldnot Add Showtime ${err}` });
    });
};

module.exports.update_showtime = async function (req, res) {
  const { datetime, price } = req.body;
  const showtimeId = req.params.showtimeId;
  await Showtime.updateOne(
    { _id: showtimeId },
    {
      datetime,
      price,
    }
  );
  res.json({ msg: "Showtime Updated", success: true });
};

module.exports.delete_showtime = async function (req, res) {
  const showtimeId = req.params.showtimeId;
  await Showtime.deleteOne({ _id: showtimeId });
  res.json({ msg: "Showtime Deleted", success: true });
};

module.exports.get_shows = async function (req, res) {
  const movieId = req.body.movieId;
  const data = await Showtime.find({
    datetime: {
      $gte: Date.now(),
    },
  });
  res.json({ msg: "Showtime Fetched", success: true, data });
};

module.exports.book_show = async function (req, res) {
  const userId = req.userData._id;
  const showtimeId = req.params.showtimeId;
  const seat = +req.params.seat;
  console.log(showtimeId, seat);
  const showtime = await Showtime.findById(showtimeId);
  const booking = [...showtime.booking];
  const newBooking = booking.filter(function (user) {
    return user.toString() != userId.toString();
  });
  try {
    if (newBooking.length + seat <= 10) {
      for (let i = 0; i < seat; i++) {
        newBooking.push(userId);
      }
      showtime.booking = [...newBooking];
      await showtime.save();
      res.json({ msg: "Booking Completed", success: true });
    } else {
      res.json({ msg: "Booking Failed", success: false });
    }
  } catch (error) {
    console.log(error.response);
  }
};
