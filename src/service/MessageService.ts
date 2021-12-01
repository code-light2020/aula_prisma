import { client } from "../db/prismaClient";

export class MessageSevice {
    async excute(text: string, user_id: string) {
        const message = client.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        })
        return message;
    }
}