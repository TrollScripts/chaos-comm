// Base Imports
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Symbols } from './symbols';

// Import Services
import { StatusService } from '../services/status/status.service';

// Import Controllers
import "../controllers/status/status.controller"

const container = new Container();
container.bind<StatusService>(Symbols.StatusService).to(StatusService);

const server = new InversifyExpressServer(container);
server.setConfig((app) => {

    const logger = morgan('combined');
    app.use(logger);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
});

server.setErrorConfig((app) => {
    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
});

const app = server.build();
app.listen(4000, () => { console.log('OpenChaos CommServer listening on port 4000'); });
