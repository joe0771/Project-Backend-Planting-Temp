const User = require("../model/user_model");
const Line = require("../model/line_model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.userRegister = async (req, res) => {
  const email = req.body.email;
  try {
    const result = await User.findOne({ email: email });
    if (result) {
      return res.status(200).json({
        success: false,
        message: "User already exists!",
        result: null,
      });
    }

    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = { ...req.body, password };

    await User.create(user, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(200).json({
          success: false,
          message: "User create fail!",
          result: null,
        });
      }

      const token = await jwt.sign({ result }, "fake-jwt-secret", {
        expiresIn: "100d",
      });

      res.status(201).json({
        success: true,
        message: "User created",
        result: result,
        access_token: token,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: "Bad request!",
      result: null,
    });
  }
};

exports.userLogin = async (req, res) => {
  const email = req.body.email;
  try {
    const result = await User.findOne({ email: email });
    if (!result) {
      return res.status(200).json({
        success: false,
        message: "User not found!",
        result: null,
      });
    }

    if (!(await bcrypt.compare(req.body.password, result.password))) {
      return res.status(200).json({
        success: false,
        message: "User not found!",
        result: null,
      });
    }
    const token = await jwt.sign({ result }, "fake-jwt-secret", {
      expiresIn: "100d",
    });

    res.status(200).json({
      success: true,
      message: "Login success!",
      result: result,
      access_token: token,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request!",
      result: null,
    });
  }
};


