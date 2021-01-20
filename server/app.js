import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import postRouters from './routes/api/post';
import userRouters from './routes/api/user';

const app = express();
const {MONGO_URI} = config;

app.use(hpp());
app.use(helmet());
app.use(cors({origin: true, credential: true}));
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  useCreateIndex    : true
})
  .then(() => console.log('[MongoDB connecting Success'))
  .catch(e => console.log(e));

app.get('/');
app.use('/api/post', postRouters);
app.use('/api/user', userRouters);

export default app;