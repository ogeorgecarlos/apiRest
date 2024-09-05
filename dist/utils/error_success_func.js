"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function error(message){
    return {errors:[`${message}`]};
  } exports.error = error;

 function success(message){
    return {success:[`${message}`]};
  } exports.success = success;