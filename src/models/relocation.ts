import mongoose from 'mongoose';

const relocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
});

export const Relocation = mongoose.model('Relocation', relocationSchema);
