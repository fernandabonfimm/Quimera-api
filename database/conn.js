const mongoose = require("mongoose");
const DATABASECONECTIVITY = process.env.DATABASECONECTIVITY;

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DATABASECONECTIVITY);
    console.log("database connected");
  } catch (err) {
    console.log(`error connecting to database: ${err}`);
  }
}
module.exports = main;
