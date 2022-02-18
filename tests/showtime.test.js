// Testing of ShowTime Schema
const ShowTime = require("../models/showtime");
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
describe("ShowTime Schema Testing", () => {
  // Insert ShowTime Testing
  it("Inserting ShowTime", () => {
    const showTime = {
      datetime: "6",
      price: 1000,
    };

    return ShowTime.create(showTime).then((pro_ret) => {
      expect(pro_ret.price).toEqual(1000);
    });
  });

  //Update ShowTime testing
  it("To Test if Update ShowTime working or not", async () => {
    return ShowTime.findOneAndUpdate(
      { datetime: "2022/1/12" },
      { $set: { price: 500 } }
    ).then((pp) => {
      expect(pp.datetime).toEqual("2022/1/12");
    });
  });

  // Delete ShowTime testing
  it("To Test if Delete ShowTime Working or not", async () => {
    const status = await ShowTime.deleteMany();
    expect(status.ok).toBe(1);
  });
});
