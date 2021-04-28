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

    author: {
      name: {
        type: String,
        required: [true, 'Please add a author name'],
      },
      img: {
        type: String,
        required: [true, 'Please add a img'],
        trim: true,
      },
    },
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
