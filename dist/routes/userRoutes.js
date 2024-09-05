"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _requireEmailPassword = require('../midllewares/requireEmailPassword'); var _requireEmailPassword2 = _interopRequireDefault(_requireEmailPassword);
var _checkSameUser = require('../midllewares/checkSameUser'); var _checkSameUser2 = _interopRequireDefault(_checkSameUser);
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);

const router = new _express2.default.Router();

router.get("/get", _requireEmailPassword2.default, _TokenController2.default.checkToken, _checkSameUser2.default, _UserController2.default.show);
router.get("/get-all", _requireEmailPassword2.default, _TokenController2.default.checkToken, _checkSameUser2.default,_UserController2.default.index);
router.put("/update", _requireEmailPassword2.default, _TokenController2.default.checkToken, _checkSameUser2.default, _UserController2.default.update);
router.post("/create", _UserController2.default.store);
router.delete("/delete", _requireEmailPassword2.default, _TokenController2.default.checkToken, _checkSameUser2.default, _UserController2.default.delete);

exports. default = router;