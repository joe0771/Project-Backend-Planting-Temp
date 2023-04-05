const express = require('express');
const mongoose = require("mongoose");

const auth = require("./routes/auth_routes");
const client = require("./routes/client_routes");
const controller = require("./routes/controller_routes");
const report = require("./controllers/report_controller");
const checkUpdate = require("./controllers/check_updete_controller");

const url = "mongodb://localhost:27017/planting-temp";
const PORT = process.env.PORT || 5001;

mongoose.set("strictQuery", false);
mongoose
  .connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Start server in port ${PORT}`);
      console.log(`Database is connected . . .`);
    });
  })
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api", auth);
app.use("/api", client);
app.use("/api", controller);
app.use(report);
app.use(checkUpdate);

// app.use('/api', controllerRouter);
// app.use(reportRouter);
