import express, {Express} from 'express';
import { bdigitalServer } from './setupServer';



class Application {
    public initialize(): void {
        const app: Express = express();
        const server: bdigitalServer = new bdigitalServer(app);
        server.start();
    }
}

const application: Application = new Application();
application.initialize();