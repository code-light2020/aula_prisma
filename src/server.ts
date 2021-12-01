import { httpServer } from "./app";
const port=Number(process.env.APP_PORT) || 4000;
httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`);
})
