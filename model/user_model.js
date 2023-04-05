const mongoose = require("mongoose");
const moment = require("moment-timezone");

const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: dateTime,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", UserSchema);