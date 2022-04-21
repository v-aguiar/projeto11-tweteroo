import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const users = [];
const tweets = [];

// let tweet = {
//   username: "bobesponja",
//   avatar:
//     "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
//   tweet: "Coorre Patrickeee, o hub ta vindoooo! AAAAA!!",
// };

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  users.length > 0
    ? users.forEach((user) => console.log(user))
    : console.log("No users");

  // validateAvatarURL(avatar);

  users.push({
    username: username,
    avatar: avatar,
  });

  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  tweets.push({
    username,
    tweet,
  });

  tweets.length > 0
    ? tweets.forEach((_tweet) => console.log(_tweet))
    : console.log("No tweets");

  res.send("OK");
});

app.listen(5000, () =>
  console.log(
    chalk.magentaBright.bold(
      "\n🚀 Server is runinng!!!\n\nListening on port 5000...\n"
    )
  )
);
