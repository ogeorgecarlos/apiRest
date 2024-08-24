import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Professor from "../models/professor";

const models = [Aluno, Professor];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));