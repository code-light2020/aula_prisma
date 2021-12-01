import "dotenv/config"
import express from "express";
// import { OauthUserService } from "@service/OauthUserService"
import { route } from "./router";

const app = express();
app.use(express.json())
app.use(route);

app.get("/github", (_, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/sigin/callback", (req,res) => {
  const { code } = req.query;
  return res.json(code);
})
app.listen(3333, () => {
  console.log(`is running ${process.env.JWT_SECRET}`);

})


