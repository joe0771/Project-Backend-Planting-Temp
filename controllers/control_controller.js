const Line = require("../model/line_model");
const moment = require("moment-timezone");
const { ObjectId } = require("mongodb");

exports.controllerUpdate = async (req, res) => {
  const dateTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

  try {
    const { lineId, temp, pv, sv } = req.body;

    const pvTemp = `${temp}.pv`;
    const svTemp = `${temp}.sv`;
    const updateAtTemp = `${temp}.updateAt`;

    const params = {
      $set: {
        [pvTemp]: pv,
        [svTemp]: sv,
        [updateAtTemp]: dateTime,
      },
    };

    const result = await Line.findOneAndUpdate({ lineId: lineId }, params);

    if (!result) {
      return res.status(200).json({
        success: false,
        message: "Controller update fail!",
      });
    }

    console.log(`Udate line: ${lineId}, Temp: ${temp}, SV: ${sv}, PV: ${pv}`);

    return res.status(200).json({
      success: true,
      message: "Controller updated!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
};
