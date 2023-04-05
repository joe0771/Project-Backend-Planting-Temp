const express = require("express");
const moment = require("moment-timezone");
const router = express.Router();
const Line = require("../model/line_model");
const Report = require("../model/report_model");

async function reportTemp() {
  try {
    const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

    const result = await Line.find().select({
      lineId: 1,
      "drying.pv": 1,
      "curing.pv": 1,
      _id: 0,
    });

    result.forEach(async (element) => {
      const report = {
        lineId: element.lineId,
        pvDrying: element.drying.pv,
        pvCuring: element.curing.pv,
        timeStamp: Date.now(),
        createdAt: dateTime,
      };

      await Report.create(report, async (err, data) => {
        if (err) {
          return console.log(err);
        }
      });
    });

    console.log(`******* Save report temperature success ${dateTime} *******`);
  } catch (err) {
    console.log(err);
  }
}
reportTemp();

setInterval(function () {
  reportTemp();
}, 300000);

module.exports = router;
