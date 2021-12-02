import "dotenv/config"
import express from "express";
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { route } from "./router";
const app = express();
app.use(cors())
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`Usuario connectado no socket ${socket.id}`)
})
app.use(express.json())
app.use(route);
app.get("/github", (_, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/sigin/callback", (req, res) => {
  const { code } = req.query;
  return res.json(code);
})

export { httpServer, io }

