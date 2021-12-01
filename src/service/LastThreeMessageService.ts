import { client } from "../db/prismaClient";
export class LastThreeMessageService {
    async excute() {
        const messages = await client.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true
            }
        })
        return messages
    }
}