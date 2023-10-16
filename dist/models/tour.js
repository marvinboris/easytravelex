"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourSchema = new mongoose_1.default.Schema({
    persons: { type: Number, required: true },
    startingPrice: { type: Number, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    processingPeriod: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
    },
    photo: { type: String, required: true },
});
exports.Tour = mongoose_1.default.model('Tour', tourSchema);
