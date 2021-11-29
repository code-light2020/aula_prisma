import "dotenv/config"
import express from "express";
import {OuthService} from "@service/outhService"

const app=express();


app.get("/",(req,res)=>{
  req.github_id=1000;
})

app.listen(3333,()=>{
    console.log(`is running ${process.env.JWT_SECRET}`);
    
})


