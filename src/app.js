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
const testRouter = require("./routes/testRoutes.js");
const smsRouter = require("./routes/smsRoute.js");
const PORT = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/", summonEntryRouter);
app.use("/api", malkhanaEntryRouter);
app.use("/api", fslEntryRouter);
app.use("/api", kurkiEntryRouter);
app.use("/api", otherEntryRouter);
app.use("/api", outMovementRouter);
app.use("/auth", userRouter);
app.use("/test", testRouter);
app.use("/api", smsRouter);
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
