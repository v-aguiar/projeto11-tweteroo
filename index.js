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

// let tweet = {
//   username: "bobesponja",
//   avatar:
//     "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
//   tweet: "eu até que gosto do hub... Mas não muito kkkk",
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

app.listen(5000, () =>
  console.log(
    chalk.magentaBright.bold(
      "\n🚀 Server is runinng!!!\n\nListening on port 5000...\n"
    )
  )
);
