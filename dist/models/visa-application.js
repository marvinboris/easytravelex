"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisaApplication = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const visaApplicationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    adult: { type: Boolean, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    passportExpiryDate: { type: Date, required: true },
    photos: {
        passport: { type: String, required: true },
        selfie: { type: String, required: true },
        birthCertificate: { type: String, required: true },
        paymentProof: { type: String, required: true },
    },
    status: { type: String, required: true },
});
exports.VisaApplication = mongoose_1.default.model('VisaApplication', visaApplicationSchema);
