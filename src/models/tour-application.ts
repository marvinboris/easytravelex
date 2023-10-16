import mongoose from "mongoose";

const tourApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customerType: { type: String, required: true },
  nationality: { type: String, required: true },
  phone: { type: String, required: true },
  persons: { type: Number, required: true },
  preferredDate: { type: Date, required: true },
  passportIdPhoto: { type: String, required: true },
  status: { type: String, required: true },
});

export const TourApplication = mongoose.model(
  "TourApplication",
  tourApplicationSchema
);
