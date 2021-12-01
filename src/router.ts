import { Router } from "express"
import { MessageController } from "./controller/MessageController";
import { LastThreeMessageController } from "./controller/LastThreeMessageController";
import { OauthUserController } from "./controller/OauthUserController";
import {UserProfileController } from "./controller/UserProfileController";
import { isAuthenticated } from "./middleware/OauthMiddleware";

const route = Router();
route.post("/authenticate", new OauthUserController().handle)
route.post("/message", isAuthenticated,new MessageController().handle)
route.get("/lastmessages",new LastThreeMessageController().handle)
route.get("/profile",isAuthenticated,new UserProfileController().handle)

export { route }