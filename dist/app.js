"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunosRoutes = require('./routes/alunosRoutes'); var _alunosRoutes2 = _interopRequireDefault(_alunosRoutes);
var _picRoutes = require('./routes/picRoutes'); var _picRoutes2 = _interopRequireDefault(_picRoutes);

class App {
  constructor(){
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "src", "uploads")));
    this.app.use(_express2.default.urlencoded({extended:true}));
    this.app.use(_express2.default.json());
  }

  routes(){
    this.app.use(_homeRoutes2.default);
    this.app.use("/users", _userRoutes2.default);
    this.app.use("/token", _tokenRoutes2.default);
    this.app.use("/alunos", _alunosRoutes2.default);
    this.app.use("/pic", _picRoutes2.default);
  }
}

exports. default = new App().app;