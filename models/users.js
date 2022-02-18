const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
  },
  profile: {
    type: String,
    default:
      "https://img.search.brave.com/KbRNVWFimWUnThr3tB08-RFa0i7K1uc-zlK6KQedwUU/rs:fit:860:752:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI0LTI0/ODI1M191c2VyLXBy/b2ZpbGUtZGVmYXVs/dC1pbWFnZS1wbmct/Y2xpcGFydC1wbmct/ZG93bmxvYWQucG5n",
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
