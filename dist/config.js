"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.mongodbUri = void 0;
const dotenv_1 = require("dotenv");
// Load your environment variables from .env
(0, dotenv_1.config)();
exports.mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/easytravelex';
exports.port = process.env.PORT || 3000;
