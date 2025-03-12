const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGOOSE_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67c974851b4b44006458e3d4",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized!");
};

initDb();
