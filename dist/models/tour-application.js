"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourApplication = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourApplicationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    customerType: { type: String, required: true },
    nationality: { type: String, required: true },
    phone: { type: String, required: true },
    persons: { type: Number, required: true },
    preferredDate: { type: Date, required: true },
    passportIdPhoto: { type: String, required: true },
    status: { type: String, required: true },
});
exports.TourApplication = mongoose_1.default.model('TourApplication', tourApplicationSchema);
