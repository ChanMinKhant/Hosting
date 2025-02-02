import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, default: false },
    deviceId: { type: String, select: false },
    additionalData: { type: String },
    userType: { type: String },
    section: { type: String },
    major: { type: String },
    year: { type: String },
    occupation: { type: String },
    isBanned: { type: Boolean, default: false },
    reasonForBan: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
