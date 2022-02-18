// Testing of Community User Schema
const User = require("../models/users");
const mongoose = require("mongoose");

// Creating New Database for testing
const url = "mongodb://localhost:27017/Booking";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("User Schema Testing", () => {
  // Insert Blog Testing
  it("Inserting User", () => {
    const user = {
      fname: "Ashim",
      lname: "kaucha",
      phoneNumber: "9090909090",
      email: "ashim@gmail.com",
      password: "12345",
    };

    return User.create(user).then((pro_ret) => {
      expect(pro_ret.fname).toEqual("Ashim");
    });
  });

  // Update Blog testing
  it("To Test if Update user working or not", async () => {
    return User.findOneAndUpdate(
      { lname: "kaucha" },
      { $set: { email: "ashim123@gmail.com" } }
    ).then((pp) => {
      expect(pp.fname).toEqual("Ashim");
    });
  });

  // Delete User testing
  it("To Test if Delete User Working or not", async () => {
    const status = await User.deleteMany();
    expect(status.ok).toBe(1);
  });
});
