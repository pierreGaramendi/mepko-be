import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './delivery/routers/index'
import { connectToMongoDB } from './infrastructure/persistence/mongo/mongoose';
import cors from 'cors';
import { CORS_OPTIONS } from './infrastructure/config/corsConfig';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors(CORS_OPTIONS)); 
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
connectToMongoDB()
app.use('/', router);

app.get('/', (_, res) => {
  res.send('Ecommerce Backend API');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
