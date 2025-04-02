import "reflect-metadata"
import express from "express"
import cookieParser from 'cookie-parser';
import {container} from './config/inversify.config';
import { InversifyExpressServer } from "inversify-express-utils";
import { Connection } from "./config/db/connection";
import cors from 'cors'

const db = new Connection();
db.connections();

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};


const server = new InversifyExpressServer(container);
server.setConfig(app => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions))
});



const app = server.build();
app.listen(8000, (): void => {
  console.log(`Server is running at port ${8000}`);
});