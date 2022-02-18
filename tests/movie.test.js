// Testing of Community Movie Schema
const Movie = require("../models/movie");
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
describe("Movie Schema Testing", () => {
  // Insert Movie Testing
  it("Inserting ShowTime", () => {
    const movie = {
      mname: "Avengers",
      mdesc: "Hero",
      mcategories: "Action",
    };

    return Movie.create(movie).then((pro_ret) => {
      expect(pro_ret.mname).toEqual("Avengers");
    });
  });

  // Update Movie testing
  it("To Test if Update Movie working or not", async () => {
    return Movie.findOneAndUpdate(
      { mname: "Avengers" },
      { $set: { mdesc: "Magic" } }
    ).then((pp) => {
      expect(pp.mcategories).toEqual("Action");
    });
  });

  // Delete Movie testing
  it("To Test if Delete Movie Working or not", async () => {
    const status = await Movie.deleteMany();
    expect(status.ok).toBe(1);
  });
});
