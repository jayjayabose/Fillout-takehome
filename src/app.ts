import express, { Application} from 'express';
import apiRouter from './controllers/api';

const app: Application = express();
app.use('/v1/api', apiRouter)

export default app;