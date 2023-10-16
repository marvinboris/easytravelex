"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPackageApplication = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customPackageApplicationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    customerType: { type: String, required: true },
    nationality: { type: String, required: true },
    photo: { type: String, required: true },
    persons: { type: Number, required: true },
    startingDate: { type: Date, required: true },
    places: [{ type: String, required: true }],
    passportPhoto: { type: String, required: true },
    status: { type: String, required: true },
});
exports.CustomPackageApplication = mongoose_1.default.model('CustomPackageApplication', customPackageApplicationSchema);
