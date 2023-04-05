const express = require("express");
const moment = require("moment-timezone");
const router = express.Router();
const Line = require("../model/line_model");

async function checkUpdate() {
  try {
    const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    const timeNow = new Date(dateTime);

    const result = await Line.find().select({
      lineId: 1,
      "drying.updateAt": 1,
      "curing.updateAt": 1,
      _id: 0,
    });

    result.forEach(async (element) => {
      let statusDrying;
      let dryingPV;

      let statusCuring;
      let curingPV;

      let updateStatus;

      const lineId = element.lineId;

      const updateDrying = new Date(element.drying.updateAt);
      const updateCuring = new Date(element.curing.updateAt);

      const differenceDrying = timeNow - updateDrying;
      const differenceCuring = timeNow - updateCuring;

      if (differenceDrying >= 300000) {
        await Line.updateOne(
          { lineId: lineId },
          {
            $set: {
              "drying.status": "off",
              "drying.pv": 0,
            },
          },
        );
      } else {
        await Line.updateOne(
          { lineId: lineId },
          {
            $set: {
              "drying.status": "on",
            },
          },
        );
      }

      if (differenceCuring >= 300000) {
        await Line.updateOne(
          { lineId: lineId },
          {
            $set: {
              "curing.status": "off",
              "curing.pv": 0,
            },
          },
        );
      } else {
        await Line.updateOne(
          { lineId: lineId },
          {
            $set: {
              "curing.status": "on",
            },
          },
        );
      }

    });
  } catch (err) {
    return console.log(err);
  }
}
checkUpdate();

setInterval(function () {
  checkUpdate();
}, 2000);

module.exports = router;
