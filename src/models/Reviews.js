import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'text field is required'],
      trim: true,
    },
    user: {
      type: String,
      required: [true, 'user field is required'],
      trim: true,
    },
  },
  { timestamps: true }
);
export default ReviewSchema;
