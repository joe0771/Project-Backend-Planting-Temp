const mongoose = require("mongoose");
const moment = require("moment-timezone");

const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
    {
        lineId: {
          type: String,
          required: true,
        },
        pvDrying: { type: Number, default: 0.0 },
        pvCuring: { type: Number, default: 0.0 },
        timeStamp: { type: Number, default: 0 },
        createdAt: { type: String, default: dateTime },
      },
      { versionKey: false },
);

module.exports = mongoose.model("report", ReportSchema);
