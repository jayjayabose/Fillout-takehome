import express, { Application} from 'express';
import apiRouter from './routes/routes';

const app: Application = express();
app.use('/v1/api', apiRouter)

export default app;