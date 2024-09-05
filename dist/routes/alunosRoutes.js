"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _requireEmailPassword = require('../midllewares/requireEmailPassword'); var _requireEmailPassword2 = _interopRequireDefault(_requireEmailPassword);
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);

const router = new _express2.default.Router();

router.get("/get", _requireEmailPassword2.default, _TokenController2.default.checkToken, _AlunoController2.default.show);
router.get("/get-all", _requireEmailPassword2.default, _TokenController2.default.checkToken, _AlunoController2.default.index);
router.post("/create", _requireEmailPassword2.default, _TokenController2.default.checkToken, _AlunoController2.default.store);
router.put("/update", _requireEmailPassword2.default, _TokenController2.default.checkToken, _AlunoController2.default.update);
router.delete("/delete", _requireEmailPassword2.default, _TokenController2.default.checkToken, _AlunoController2.default.delete);

exports. default = router;
