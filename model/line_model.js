const mongoose = require("mongoose");
const moment = require("moment-timezone");

const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
const Schema = mongoose.Schema;

const LineSchema = new Schema(
  {
    lineId: {
      type: String,
      required: true,
    },
    drying: {
      status: { type: String, default: "off" },
      pv: { type: Number, default: 0.0 },
      sv: { type: Number, default: 0.0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      updateAt: { type: String, default: dateTime },
    },
    curing: {
      status: { type: String, default: "off" },
      pv: { type: Number, default: 0.0 },
      sv: { type: Number, default: 0.0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      updateAt: { type: String, default: dateTime },
    },
    createdAt: { type: String, default: dateTime },
  },
  { versionKey: false },
);

module.exports = mongoose.model("Line", LineSchema);
