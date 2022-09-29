import dotenv from 'dotenv';

dotenv.config({});

class Config {
    public MONGO_URL: string | undefined;
    public MONGO_USERNAME: string | undefined;
    public MONGO_PASSWORD: string | undefined;
    public JWT_TOKEN: string | undefined;
    public NODE_ENV: string | undefined;
    public SECRET_KEY_ONE: string | undefined;
    public SECRET_KEY_TWO: string | undefined;
    public CLIENT_URL: string | undefined;

    private readonly DEFAULT_MONGO_URL = 'cluster0.ir5nru3.mongodb.net/?retryWrites=true&w=majority'

    constructor() {
        this.MONGO_URL = process.env.MONGO_URL || this.DEFAULT_MONGO_URL;
        this.MONGO_USERNAME = process.env.MONGO_USERNAME || this.DEFAULT_MONGO_URL;
        this.MONGO_PASSWORD = process.env.MONGO_PASSWORD || this.DEFAULT_MONGO_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
    }

    public validateConfig(): void {
        for(const [key, value] of Object.entries(this)) {
            if(value === undefined) {
                throw new Error(`Configuration ${key} is undefined`);
            }
        }
    }
};

export const config: Config = new Config();