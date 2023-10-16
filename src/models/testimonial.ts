import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String, required: true },
  text: { type: String, required: true },
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
