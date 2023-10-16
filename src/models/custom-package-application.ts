import mongoose from 'mongoose';

const customPackageApplicationSchema = new mongoose.Schema({
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

export const CustomPackageApplication = mongoose.model(
  'CustomPackageApplication',
  customPackageApplicationSchema,
);
