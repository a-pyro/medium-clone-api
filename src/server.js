import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import morgan from 'morgan';
import mongoose from 'mongoose';
import articlesRoutes from './routes/articles.js';
import authorsRoutes from './routes/authors.js';
import authRoutes from './routes/auth.js';
import {
  errorHandler,
  routeNotFoundHandler,
} from './middlewares/errors/errorHandling.js';

const { connect } = mongoose;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/authors', authorsRoutes);
app.use(routeNotFoundHandler);
app.use(errorHandler);

console.table(listEndpoints(app));
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
