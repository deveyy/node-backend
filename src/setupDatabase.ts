import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from './config';
import { redisConnection } from '@service/redis/redis.connection';

const log: Logger = config.createLogger('setUpDatabase');

export default () => {
    const connect = () => {
        mongoose.connect(`mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_URL}`)
            .then(() => {
                log.info('Successfully connected to database');
                redisConnection.connect();
            })
            .catch((error) => {
                log.error('Error connecting to database', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
