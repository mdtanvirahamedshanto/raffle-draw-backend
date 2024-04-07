const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;
app.use([cors(), express.json()]);

app.get("/helth", (req, res) => {
  res.send("Hello Word");
});
app.use("/api/v1/tickets", router);
app.use((_req, _res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;

  next(error);
});

app.use((error, _req, res, _next) => {
  console.log("Error from server: ", error);

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Server runing in ${port}`);
});
