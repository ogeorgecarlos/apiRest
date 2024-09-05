"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);
var _requireEmailPassword = require('../midllewares/requireEmailPassword'); var _requireEmailPassword2 = _interopRequireDefault(_requireEmailPassword);

const router = new _express2.default.Router();

router.post("/", _requireEmailPassword2.default, _TokenController2.default.store);

exports. default = router;