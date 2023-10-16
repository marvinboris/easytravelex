import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
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

export const Tour = mongoose.model('Tour', tourSchema);
