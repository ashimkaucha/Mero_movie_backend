const express = require("express");
const auth = require("../middleware/auth");
const showtimeController = require("../controllers/showtimeController.js");
const router = new express.Router();

router.post(
  "/showtime/insert",
  auth.mainGuard,
  auth.verifyAdmin,
  showtimeController.insert_showtime
);

router.put(
  "/showtime/update/:showtimeId",
  auth.mainGuard,
  auth.verifyAdmin,
  showtimeController.update_showtime
);

router.delete(
  "/showtime/delete/:showtimeId",
  auth.mainGuard,
  auth.verifyAdmin,
  showtimeController.delete_showtime
);

router.get("/showtime", showtimeController.get_shows);

router.post(
  "/showtime/book/:showtimeId/:seat",
  auth.mainGuard,
  showtimeController.book_show
);

module.exports = router;
