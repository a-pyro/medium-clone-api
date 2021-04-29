import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a author name'],
    },
    img: {
      type: String,
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
      trim: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true }
);

AuthorSchema.static('findAuthorWithArticles', async function (id) {
  const author = await this.findById(id).populate('articles');
  return author;
});

export default model('Author', AuthorSchema);
