import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionType: { type: String, required: true },
  transactionDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: { type: String },
});

export default mongoose.model('Operation', TransactionSchema);
