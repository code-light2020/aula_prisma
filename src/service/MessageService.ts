import { client } from "../db/prismaClient";
import { io } from "../app";
export class MessageSevice {
    async excute(text: string, user_id: string) {
        const message = await client.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        })
        const infoFromWS={
            text:message.text,
            user_id: message.user_id,
            created_at:message.created_at,
            user:{
                name:message.user.name,
                avatar:message.user.avatar_url
            }
        }
        io.emit("new_message",infoFromWS)
        return message;
    }
}