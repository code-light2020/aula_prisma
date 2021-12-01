import { LastThreeMessageService } from "../service/LastThreeMessageService"
import { Request, Response } from "express"

export class LastThreeMessageController {
    async handle(req: Request, res: Response) {
        const message = new LastThreeMessageService();
        const messages = await message.excute();

        return res.json(messages);
    }
}