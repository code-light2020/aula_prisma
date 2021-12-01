import { Router } from "express"
import { MessageController } from "./controller/MessageController";
import { OauthUserController } from "./controller/OauthUserController";
import { isAuthenticated } from "./middleware/OauthMiddleware";

const route = Router();
route.post("/authenticate", new OauthUserController().handle)
route.post("/message", isAuthenticated,new MessageController().handle)

export { route }