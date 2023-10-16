import mongoose from "mongoose";

const visaApplicationSchema = new mongoose.Schema({
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

export const VisaApplication = mongoose.model(
  "VisaApplication",
  visaApplicationSchema
);
