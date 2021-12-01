import { UserProfileService } from "../service/UserProfileService"
import { Request, Response } from "express"

export class UserProfileController {
    async handle(req: Request, res: Response) {
        const user = new UserProfileService();
        const profile = await user.excute(req.user_id);

        return res.json(profile);
    }
}