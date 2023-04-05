const Line = require("../model/line_model");
const Report = require("../model/report_model");
const moment = require("moment-timezone");
const { ObjectId } = require("mongodb");

exports.clientCreateLine = async (req, res) => {
  const lineId = req.body.lineId;
  try {
    const resultFind = await Line.findOne({ lineId: lineId });
    if (resultFind) {
      return res.status(200).json({
        success: false,
        message: "Line already exists!",
      });
    }
    const resultCreate = await Line.create({ lineId: lineId });

    if (!resultCreate) {
      return res.status(200).json({
        success: false,
        message: "Line create fail!",
      });
    }

    res.status(201).json({
      success: true,
      message: "Line created",
      result: resultCreate,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request!",
      result: null,
    });
  }
};

exports.clientDeleteReport = async (req, res) => {
  try {
    const result = await Report.deleteMany({});
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Report delete success",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
};

exports.clientSettingTemp = async (req, res) => {
  try {
    const lineId = req.body.lineId;

    const minD = req.body.drying.min;
    const maxD = req.body.drying.max;
    const minC = req.body.curing.min;
    const maxC = req.body.curing.max;

    const updateParams = {
      $set: {
        "drying.min": minD,
        "drying.max": maxD,
        "curing.min": minC,
        "curing.max": maxC,
      },
    };

    const result = await Line.updateOne({ lineId: lineId }, updateParams);

    res.status(200).json({
      success: true,
      message: "Setting success",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
};

exports.clientRequestLine = async (req, res) => {
  try {
    const result = await Line.find({}).select({
      lineId: 1,
      drying: 1,
      curing: 1,
      _id: 0,
    });
    if (!result) {
      res.status(200).json({
        success: false,
        message: "Line is not defind",
        result: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Request line success",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
};

exports.clientRequestReport = async (req, res) => {
  try {
    let arrayA = [];
    let arrayB = [];
    let arrayD = [];

    const startDate = req.params.date;
    let dateParams = new Date(startDate);

    dateParams.getFullYear() +
      "-" +
      dateParams.getMonth() +
      "-" +
      dateParams.getDate() +
      1;

    let addDate = new Date(dateParams);
    addDate.setDate(dateParams.getDate() + 1);

    const endDate = addDate.toISOString().slice(0, 10);

    const result = await Report.find({
      createdAt: {
        $gte: `${startDate} 00:00:00.000"`,
        $lt: `${endDate} 06:50:00.000`,
      },
    });

    result.forEach((element) => {
      const lineId = element.lineId;
      const drying = element.pvDrying;
      const curing = element.pvCuring;
      const timeStamp = element.timeStamp;

      if (lineId === "A") {
        arrayA.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }

      if (lineId === "B") {
        arrayB.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }

      if (lineId === "D") {
        arrayD.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Request report success",
      result: { lineA: arrayA, lineB: arrayB, lineD: arrayD },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
};

exports.cliantRequestAverage = async (req, res) => {
  try {
    let arrayA = [];
    let arrayB = [];
    let arrayD = [];

    let startShift;
    let endShift;

    const startDate = req.body.date;
    const shift = req.body.shift;

    let dateParams = new Date(startDate);

    dateParams.getFullYear() +
      "-" +
      dateParams.getMonth() +
      "-" +
      dateParams.getDate() +
      1;

    let addDate = new Date(dateParams);
    addDate.setDate(dateParams.getDate() + 1);

    const endDate = addDate.toISOString().slice(0, 10);

    if (shift === "7-18.50") {
      startShift = `${startDate} 07:00:00.000`;
      endShift = `${startDate} 18:50:00.000`;
    } else {
      startShift = `${startDate} 19:00:00.000`;
      endShift = `${endDate} 06:50:00.000`;
    }


    const result = await Report.find({
      createdAt: {
        $gte: startShift,
        $lt: endShift,
      },
    });

    result.forEach((element) => {
      const lineId = element.lineId;
      const drying = element.pvDrying;
      const curing = element.pvCuring;
      const timeStamp = element.timeStamp;

      if (lineId === "A") {
        arrayA.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }

      if (lineId === "B") {
        arrayB.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }

      if (lineId === "D") {
        arrayD.push({
          drying: drying,
          curing: curing,
          timeStamp: timeStamp,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Request average success",
      result: { lineA: arrayA, lineB: arrayB, lineD: arrayD },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Bad request!",
    });
  }
}
