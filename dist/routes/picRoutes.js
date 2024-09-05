"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _picController = require('../controllers/picController'); var _picController2 = _interopRequireDefault(_picController);
var _multer = require('../midllewares/multer'); var _multer2 = _interopRequireDefault(_multer);
var _requireEmailPassword = require('../midllewares/requireEmailPassword'); var _requireEmailPassword2 = _interopRequireDefault(_requireEmailPassword);
var _TokenController = require('../controllers/TokenController'); var _TokenController2 = _interopRequireDefault(_TokenController);



const router = _express.Router.call(void 0, );

router.post("/post", _requireEmailPassword2.default, _TokenController2.default.checkToken, _multer2.default.single("myFile"), _picController2.default.store);
router.get("/download/:file_name", _requireEmailPassword2.default, _TokenController2.default.checkToken, _picController2.default.download);

exports. default = router;