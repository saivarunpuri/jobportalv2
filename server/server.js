import "./config/instrument.js"
import express from "express"
import cors from"cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js"

//Intialize Express
const app=express()

//COnnect Database

await connectDB()

//MiddleWear 
app.use(cors())
app.use(express.json())

//Routes
app.get("/",(req,res)=>{
res.send("API WOrking")
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

//POrt
const PORT=process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`)
})

app.post("/webhooks",clerkWebhooks)