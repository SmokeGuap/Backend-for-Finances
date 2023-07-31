import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import router from 'router';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => console.log('MongoDB is running'))
  .catch((error) => console.log('DB error', error));

app.use(cors());
app.use(bodyParser.json());
app.use('/', router());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
