const express = require("express");
const router = express.Router();

const controlController = require('../controllers/control_controller');

router.post("/controller-update", controlController.controllerUpdate)

module.exports = router;