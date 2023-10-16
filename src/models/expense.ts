import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  paymentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

export const Expense = mongoose.model("Expense", expenseSchema);
