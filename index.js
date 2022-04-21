﻿import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());

app.listen(5000, () =>
  console.log(
    chalk.magentaBright.bold(
      "\n🚀 Server is runinng!!!\n\nListening on port 5000...\n"
    )
  )
);
