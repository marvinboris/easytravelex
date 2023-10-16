"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visa = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const visaSchema = new mongoose_1.default.Schema({
    duration: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    processingPeriod: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
    },
    photo: { type: String, required: true },
});
exports.Visa = mongoose_1.default.model('Visa', visaSchema);
