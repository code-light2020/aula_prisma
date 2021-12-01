import { Request, response, Response} from "express"
import { OauthUserService } from "../service/OauthUserService"
export class OauthUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body;
        const service = new OauthUserService();
        try {
            const result = await service.execute(code);
            return res.json(result);
        } catch (error:any) {
            response.json({ error: error.message })
        }
    }
}

