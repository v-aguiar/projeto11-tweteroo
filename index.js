import express from "express";
import cors from "cors";
import chalk from "chalk";

import validateURL from "./utils/validateURL.js";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!validateURL(avatar)) {
    res.status(400).send("⚠ URL inválida!");
  }

  if (username.length == 0 || avatar.length == 0) {
    res.status(400).send("⚠ Todos os campos são obrigatórios!");
  }

  users.push({
    username: username,
    avatar: avatar,
  });

  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers["user"];
  const { avatar } = users.find((user) => user.username === username);

  const validateData = avatar && username.length > 0 && tweet.length > 0;

  if (validateData) {
    tweets.push({
      username,
      tweet,
      avatar,
    });
  } else {
    res.status(400).send("⚠ Todos os campos são obrigatórios!");
  }

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);

  // Validate page value
  if (!page || page < 1) {
    res.sendStatus(400).send("⚠ Informe uma página válida!");
  }

  let tenCurrentTweets = [];

  const loopStart = tweets.length - 10 * (page - 1);
  const loopEnd = tweets.length - 10 - 10 * (page - 1);

  for (let i = loopStart; i > loopEnd; i--) {
    const currentTweet = tweets[i - 1];

    if (currentTweet) {
      tenCurrentTweets.push(currentTweet);
    }
  }

  res.send(tenCurrentTweets);
});

app.get("/tweets/:_username", (req, res) => {
  const username = req.params._username;

  let userTweets = tweets.filter((tweet) => tweet.username === username);

  if (userTweets.length === 0) {
    res.status(404).send("⚠ Usuário não encontrado!");
  }

  res.send(userTweets);
});

app.listen(5000, () =>
  console.log(
    chalk.magentaBright.bold(
      "\n🚀 Server is runinng!!!\n\nListening on port 5000...\n"
    )
  )
);
