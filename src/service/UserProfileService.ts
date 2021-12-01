import { client } from "../db/prismaClient";
export class UserProfileService {
    async excute(user_id:string) {
        const user=await client.user.findFirst({
            where:{
                id:user_id
            }
        })
        return user
    }
}