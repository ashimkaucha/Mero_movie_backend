const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports.register_user = async function (req, res) {
  const { fname, lname, email, password, phoneNumber, userType } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({
    fname,
    lname,
    email,
    password: hashed,
    phoneNumber,
    userType,
  });
  await user.save();
  res.json({ msg: "Registered successfully!!!", success: true });
};

module.exports.login_user = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validLogin = await bcrypt.compare(req.body.password, user.password);
    if (validLogin) {
      const _id = user._id;
      const accessToken = jwt.sign({ _id }, "token");
      return res.json({
        msg: "User Login.",
        accessToken,
        isAdmin: true,
        data: user,
        success: true,
      });
    } else {
      return res.json({ msg: "Invalid Credential", success: false });
    }
  } else {
    return res.json({ msg: "Invalid Credential", success: false });
  }
};

module.exports.register_admin = async function (req, res) {
  const { fname, lname, email, password, phoneNumber } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({
    fname,
    lname,
    email,
    password: hashed,
    phoneNumber,
    userType: "Admin",
  });
  await user.save();
  return res.json({ msg: "Admin Registered successfully!!!", success: true });
};

module.exports.login_admin = async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validLogin = await bcrypt.compare(req.body.password, user.password);
    if (validLogin) {
      const _id = user._id;
      const accessToken = jwt.sign({ _id }, "token");
      return res.json({
        msg: "Admin Login.",
        isAdmin: true,
        accessToken: true,
        data: user,
        success: true,
      });
    } else {
      return res.json({ msg: "Invalid Credential", success: false });
    }
  } else {
    return res.json({ msg: "Invalid Credential", success: false });
  }
};

module.exports.get_user_detail = async function (req, res) {
  const _id = req.params._id;
  await User.findById(_id)
    .then((data) => {
      res
        .status(200)
        .json({ success: true, msg: "Successfully fetched User Data", data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err });
    });
};

module.exports.update_user_detail = async function (req, res) {
  const { fname, lname, phoneNumber } = req.body;
  const user = req.userData;
  await User.updateOne({ _id: user._id }, { fname, lname, phoneNumber });
  return res.json({ msg: "User Profile Updated", success: true });
};

module.exports.update_user_picture = async function (req, res) {
  if (req.file == undefined) {
    return res.json({ msg: "only png/jpeg/gif files are allowed!" });
  }
  const filename = req.file.filename;
  const user = req.userData;
  await User.updateOne(
    { _id: user._id },
    {
      profile: "http://localhost:90/public/" + filename,
    }
  );
  return res.json({ msg: "User Profile Picture Uploaded", success: true });
};
