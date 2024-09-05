"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

const router = new _express2.default.Router();

router.get("/", _HomeController2.default.index);

exports. default = router;