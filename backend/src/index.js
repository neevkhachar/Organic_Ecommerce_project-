import dotenv from 'dotenv'
import connectDB from './db/connection.js';
import { app } from './app.js';

dotenv.config({
        path:"./.env"
});

connectDB().then(() => {
        app.listen(process.env.PORT || 8000, () => {
                console.log(`server started at ${process.env.PORT}`);
        })
})
.catch((err)=>{
        console.log("mongodb connection error ",err);
        
})

//express, listen port, cors policySSS
