const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Booking", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("MongoDB Connected .........");
  })
  .catch(function (err) {
    console.log("error" + err);
  });
