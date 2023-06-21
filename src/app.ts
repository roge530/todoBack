import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose';
import { router } from '../routes/index'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'


const app = express();
dotenv.config()
const port = process.env.PORT;

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
const db = mongoose.connection;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
      extended: true,
  })
)
app.use(cors())
app.use(helmet())

app.use('/', router);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
