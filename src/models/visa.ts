import mongoose from 'mongoose';

const visaSchema = new mongoose.Schema({
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

export const Visa = mongoose.model('Visa', visaSchema);
