const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client_controller")

router.post("/client-create-line", clientController.clientCreateLine)

router.delete("/client-delete-report", clientController.clientDeleteReport);

router.post("/client-setting-temp", clientController.clientSettingTemp);

router.get("/client-request-line", clientController.clientRequestLine);

router.get("/client-request-report/:date", clientController.clientRequestReport);

router.post("/client-request-average", clientController.cliantRequestAverage);

module.exports = router;