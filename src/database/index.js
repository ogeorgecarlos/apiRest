import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Professor from "../models/professor";
import User from "../models/user";

const models = [Aluno, Professor, User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));