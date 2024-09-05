"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _path = require('path'); var _path2 = _interopRequireDefault(_path);

var _error_success_func = require('../utils/error_success_func');
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Fotos = require('../models/Fotos'); var _Fotos2 = _interopRequireDefault(_Fotos);

class PicController{
  async store(req, res){
    try{
      const file = req.file;
      if(!file) return res.status(412).json(_error_success_func.error.call(void 0, "Anexe uma foto para realizar o upload."));

      const email = req.email;
      if(!email) return res.status(412).json(_error_success_func.error.call(void 0, "É necessário e-mail para atualização de fotos."));

      const aluno = await _Aluno2.default.findOne({where:{email}});
      const alunoId = aluno.id;

      const body = {
        original_name: req.file.originalname,
        file_name: req.file.filename,
        aluno_id: alunoId
      };

      await _Fotos2.default.create(body)
        .then(()=> res.json(_error_success_func.success.call(void 0, "foto adicionada")))
        .catch(()=> res.json(_error_success_func.error.call(void 0, "foto não adicionada")));

      //return res.status(201).json(success(`Arquivo "${file.originalname}" enviado com sucesso`));
    }catch (e){
      return res.status(500).json(_error_success_func.error.call(void 0, "Erro inesperado no servidor"));
    }
  }

  async download(req, res){
    try{
      const {file_name} = req.params;
      if(!file_name) return res.status(412).json(_error_success_func.error.call(void 0, "Enter the file name to download"));

      const caminho = _path2.default.resolve(__dirname, "..","uploads", "images", file_name);
      res.attachment(caminho);
      return res.sendFile(caminho);
      //return res.status(200).json(success("Download's done!"));}
    }catch (e2){
      //console.log(e);
    };
  }
}

exports. default = new PicController();