const express = require("express");
const Users = require("../models/users");
const app = express();
const bcrypt = require("bcryptjs"); // password hash
const jwt = require("jsonwebtoken");
const upload = require("../middleware/fileupload");
const auth = require("../middleware/auth");

const userController = require("../controllers/userController.js");

const router = new express.Router();

router.post("/user/register", userController.register_user);

router.post("/user/login", userController.login_user);

router.post("/admin/register", userController.register_admin);

router.post("/admin/login", userController.login_admin);

router.get("/user/:_id", auth.mainGuard, userController.get_user_detail);

router.put("/user/update", auth.mainGuard, userController.update_user_detail);

router.put(
  "/user/update-profile",
  auth.mainGuard,
  upload.single("profile"),
  userController.update_user_picture
);

module.exports = router;
