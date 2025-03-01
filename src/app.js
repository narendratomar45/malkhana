const express = require("express");
const connectDb = require("./config/db.js");
const app = express();
const summonEntryRouter = require("./routes/summonEntryRoutes.js");
const userRouter = require("./routes/userRoute.js");
const PORT = 7000;
app.use(express.json());
app.use("/", summonEntryRouter);
app.use("/auth", userRouter);
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
