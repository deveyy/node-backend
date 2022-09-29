import mongoose from "mongoose";
import { config } from "./config";

export default () => {
    const connect = () => {
        mongoose.connect(`mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_URL}`)
            .then(() => {
                console.log('Successfully connected to database');
            })
            .catch((error) => {
                console.log('Error connecting to database', error);
                return process.exit(1);
            })
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};