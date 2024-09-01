import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Professor from "../models/professor";
import User from "../models/user";
import Fotos from "../models/Fotos";

const models = [Aluno, Professor, User, Fotos];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));