import mongoose from 'mongoose';
import ReviewSchema from './Reviews.js';
const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
  {
    headLine: {
      type: String,
      required: [true, 'Please add a healine'],
      trim: true,
      maxlength: [50, 'Headline cannot be more than 50 chars'],
    },
    subHead: {
      type: String,
      required: [true, 'Please add a subhead'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
      trim: true,
    },
    category: {
      name: {
        type: String,
        required: [true, 'Please add a category name'],
        trim: true,
      },
      img: {
        type: String,
        required: [true, 'Please add a img'],
        trim: true,
      },
    },

    authorId: { type: String },
    cover: {
      type: String,
      required: [true, 'Please add a cover'],
      trim: true,
    },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export default model('Article', ArticleSchema);
