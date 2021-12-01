import { Request, Response, NextFunction, response } from "express"
import { verify } from "jsonwebtoken"


interface IPayload{
    sub:string
}
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const head = req.headers.authorization
    if (!head) {
        return response.status(401).json({ error: "Token invalido" })
    }
    const [, token] = head.split(" ");
    try {
        const { sub } = verify(token, `${process.env.JWT_SECRET}`) as IPayload;
        req.user_id=sub;
        next();
    } catch (error: any) {
        return res.status(401).json({ error: error.message })
    }
}