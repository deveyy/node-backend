import express, {Express} from 'express';
import dataBaseConnection from './setupDatabase';

import { config } from './config';
import { bdigitalServer } from './setupServer';

class Application {
    public initialize(): void {
        // init Config
        this.loadConfig();

        //init Database
        dataBaseConnection();
        const app: Express = express();
        const server: bdigitalServer = new bdigitalServer(app);
        server.start();
    }
    private loadConfig(): void {
        config.validateConfig();
        config.cloudinaryConfig();
    }
}

const application: Application = new Application();
application.initialize();
