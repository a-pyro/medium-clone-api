import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;

const AuthorSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Please add author name'],
    },
    lastName: {
      type: String,
      trim: true,

      required: [true, 'Please add author last name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Please add a author email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a author password'],
      minlength: [8, 'Minumum lenght is 8 chars'],
      trim: true,
      // select: false,
    },
    img: {
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

AuthorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

AuthorSchema.statics.checkCredentials = async function (email, plainPwd) {
  const user = await this.findOne({ email });
  if (user) {
    console.log(user);
    const isMatch = await bcrypt.compare(plainPwd, user.password);
    if (isMatch) return user;
    else return null;
  } else return null;
};

//nascondo la pass quando la ritorno
AuthorSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export default model('Author', AuthorSchema);
