import { Router } from "express"
import { OauthUserController } from "./controller/OauthUserController";

const route = Router();
route.post("/authenticate", new OauthUserController().handle)

export { route }