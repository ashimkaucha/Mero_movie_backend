const jwt = require("jsonwebtoken");
const Users = require("../models/users");

//create a main guard
module.exports.mainGuard = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "token");
    Users.findOne({ _id: data._id })
      .then(function (result) {
        req.userData = result;
        next();
      })
      .catch(function (e) {
        res.status(401).json({ error: e });
      });
  } catch (e) {
    res.status(401).json({ error: e });
  }
};

// creating a mini guard
module.exports.verifyAdmin = function (req, res, next) {
  if (!req.userData) {
    return res.status(401).json({ msg: "Unauthorized!!", success: false });
  } else if (req.userData.userType !== "Admin") {
    return res.status(401).json({ msg: "Unauthorized!!", success: false });
  }
  next();
};
