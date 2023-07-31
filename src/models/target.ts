import mongoose from 'mongoose';

const TargetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  initialDeposit: { type: Number, required: true },
  amount: { type: Number, required: true },
  percent: { type: Number, required: true },
  depositTerm: { type: Number, required: true },
  category: { type: String, required: true },
  daysToEnd: { type: Number },
  deadlineDate: { type: Date },
  isClosed: { type: Boolean },
  createdAt: { type: Date },
  closedAt: { type: Date },
  currentMonthAmount: { type: Number },
  totalAmount: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Target', TargetSchema);
