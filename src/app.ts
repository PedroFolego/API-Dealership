import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';
import route from './routes';

const app = express();

app.use(express.json());
app.use(route);
app.use(errorHandler);

export default app;
