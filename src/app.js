const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db.js");
const cors = require("cors");
const app = express();
const summonEntryRouter = require("./routes/summonEntryRoutes.js");
const userRouter = require("./routes/userRoute.js");
const malkhanaEntryRouter = require("./routes/malkhanaEntry/malkhanaEntryRoutes.js");
const kurkiEntryRouter = require("./routes/malkhanaEntry/kurkiEntryRoutes.js");
const fslEntryRouter = require("./routes/malkhanaEntry/fslEntryRoutes.js");
const otherEntryRouter = require("./routes/malkhanaEntry/otherEntryRoutes.js");
const outMovementRouter = require("./routes/malkhanaMovement/malkhanaOutMovementRoutes.js");
const exciseRouter = require("./routes/seizeVehicle/exciseRoute.js");
const ipcRouter = require("./routes/seizeVehicle/ipcRoutes.js");
const mvActRouter = require("./routes/seizeVehicle/mvActRoutes.js");
const seizureRouter = require("./routes/seizeVehicle/seizureRoutes.js");
const importDataRouter = require("./routes/importDataRoutes.js");
const smsRouter = require("./routes/smsRoute.js");
const artoRouter = require("./routes/seizeVehicle/artoRoutes.js");
const unclaimedEntryRouter = require("./routes/malkhanaEntry/unclaimedEntryRoutes.js");
const unclaimedVehicleRouter = require("./routes/seizeVehicle/unclaimedRoutes.js");
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/", summonEntryRouter);
app.use("/api", malkhanaEntryRouter);
app.use("/api", fslEntryRouter);
app.use("/api", kurkiEntryRouter);
app.use("/api", otherEntryRouter);
app.use("/api", unclaimedEntryRouter);
app.use("/api", outMovementRouter);
app.use("/api", exciseRouter);
app.use("/api", ipcRouter);
app.use("/api", mvActRouter);
app.use("/api", seizureRouter);
app.use("/auth", userRouter);
app.use("/api", importDataRouter);
app.use("/api", smsRouter);
app.use("/api", artoRouter);
app.use("/api", unclaimedVehicleRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is connected http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });
