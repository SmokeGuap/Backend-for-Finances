import mongoose from 'mongoose';

const OperationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
});

export default mongoose.model('Operation', OperationSchema);
