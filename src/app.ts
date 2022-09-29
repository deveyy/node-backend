import express, {Express} from 'express';
import { bdigitalServer } from './setupServer';

import dataBaseConnection from './setupDatabase';
import { config } from './config';

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
    }
}

const application: Application = new Application();
application.initialize();