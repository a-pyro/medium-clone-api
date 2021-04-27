import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import articlesRoutes from './routes/articles/articles.js';

const { connect } = mongoose;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/articles', articlesRoutes);

const PORT = process.env.PORT || 5000;
connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log('Running on port', PORT);
    });
  })
  .catch((err) => console.log(err));
