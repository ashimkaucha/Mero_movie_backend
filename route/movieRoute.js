const express = require("express");
const upload = require("../middleware/fileupload");
const app = express();

const router = new express.Router();
const movieController = require("../controllers/movieController.js");
const auth = require("../middleware/auth");

router.post(
  "/movies/insert",
  auth.mainGuard,
  auth.verifyAdmin,
  movieController.insert_movie
);

router.put(
  "/movies/update/:movieId",
  auth.mainGuard,
  auth.verifyAdmin,
  movieController.update_movie
);

router.put(
  "/movies/upload-cover/:movieId",
  auth.mainGuard,
  auth.verifyAdmin,
  upload.single("cover"),
  movieController.upload_movie_cover
);

router.delete(
  "/movies/delete/:movieId",
  auth.mainGuard,
  auth.verifyAdmin,
  movieController.delete_movie
);

router.get("/movies", movieController.get_movie);

router.get("/movie/single/:movieId", movieController.get_single_movie);

router.get(
  "/movieShowtime/:movieId",
  auth.mainGuard,
  movieController.get_single_movie_showtime
);

module.exports = router;
