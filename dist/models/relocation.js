"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relocation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const relocationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
});
exports.Relocation = mongoose_1.default.model('Relocation', relocationSchema);
