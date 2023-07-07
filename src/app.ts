import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

import { mongoConnect } from "./db/config";
import { bookRouter, memberRouter } from "./routes/router";

// utils
const PORT = process.env.PORT || 8000;

// server
const app = express();

app.use(bodyParser.json());
config();

app.get("/api/test", (_req, res) => {
  res.status(200).json({ message: "Api run successfully" });
});

app.use("/api", memberRouter);
app.use("/api", bookRouter);

app.listen(PORT, async () => {
  await mongoConnect();

  console.log(`app running on port: ${PORT} 🚀🚀🚀`);
});
