import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import articlesRoutes from './routes/articles/articles.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/articles', articlesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
