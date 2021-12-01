import { MessageSevice } from "../service/MessageService"
import {Request,Response} from "express"
export class MessageController{
    async handle(req:Request,res:Response){
        const message=new MessageSevice();
        const user=await message.excute(req.body.text,req.user_id);
        return res.json(user);
    }
}