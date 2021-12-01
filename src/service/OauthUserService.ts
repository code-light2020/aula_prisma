import axios from "axios";
import { client } from "../db/prismaClient"
import { sign } from "jsonwebtoken"
interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    name: string;
    id: number
    avatar_url: string
    login: string
}
export class OauthUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"
        const { data: { access_token } } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        })
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        })
        const { id, avatar_url, login, name } = response.data
        let user = await client.user.findFirst({
            where: {
                github_id: id
            }
        })
        if (!user) {
            user = await client.user.create({
                data: {
                    github_id: id,
                    name,
                    login,
                    avatar_url
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatarUrl: user.avatar_url,
                id: user.github_id
            }
        }, `${process.env.JWT_SECRET}`, {
            subject: user.id,
            expiresIn: "1d"

        })
        return { token, user }

    }
}