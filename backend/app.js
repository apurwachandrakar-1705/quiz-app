require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const db = process.env.mongoURL;
const cors = require('cors');
const morgan = require("morgan");
const api = process.env.SCORE_URL;
const userRouter = require("./routes/users");
const highScoreRouter = require("./routes/highScores");
const errorHandler = require("./helpers/error-handler");
const authJwt = require("./helpers/jwt");
// MIDDleWare
console.log(api);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
// app.use(authJwt());
app.use(errorHandler);
app.use(`${api}/users`, userRouter);
app.use(`${api}/scores`, highScoreRouter);
mongoose
  .connect(db)
  .then(() => console.log("COnnected with db..."))
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`server running on port:${port}`));
