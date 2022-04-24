import express from "express";
import cors from "cors";
import chalk from "chalk";

import validateURL from "./utils/validateURL.js";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

// let tweet = {
//   username: "bobesponja",
//   avatar:
//     "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
//   tweet: "Kono Giob Calça Giovanna... ESTOU PRONTO!!!!",
// };

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  users.length > 0
    ? users.forEach((user) => console.log(user))
    : console.log("No users");

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
  const { username, tweet } = req.body;
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

  if (tweets.length > 0) {
    tweets.forEach((_tweet) => (_tweet ? console.log(_tweet) : ""));
  }

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let tenLastTweets = [];

  for (let i = tweets.length; i > tweets.length - 10; i--) {
    const currentTweet = tweets[i - 1];

    if (currentTweet) {
      tenLastTweets.push(currentTweet);
    }
  }

  res.send(tenLastTweets);
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
