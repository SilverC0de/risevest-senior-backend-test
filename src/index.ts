import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import Config from './config';

const app: Application = express();
const appPort = Config.SERVER.PORT;
const appVersion = Config.SERVER.VERSION;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy');
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


app.use(`/${appVersion}`, routes);


app.get(`/`, (req: Request, res: Response) => {
    res.status(200).json({ 
        message: 'Risevest Devtest',
        data: null 
    });
});

app.all('*', (req: Request, res: Response) => {
    res.status(406).json({
        message: 'Invalid route',
        data: null
    });
});


app.listen(appPort, () => {
    console.log(`Server started on port ${appPort}!`);
});