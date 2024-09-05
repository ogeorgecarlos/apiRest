import dotenv from "dotenv";
import {resolve} from "path";
dotenv.config();

import "./database";

import express from "express";
import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunosRoutes";
import pictureRoutes from "./routes/picRoutes";

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.static(resolve(__dirname, "src", "uploads")));
    this.app.use(express.urlencoded({extended:true}));
    this.app.use(express.json());
  }

  routes(){
    this.app.use(homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/token", tokenRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/pic", pictureRoutes);
  }
}

export default new App().app;