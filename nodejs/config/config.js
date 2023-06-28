import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const MONGO_USERNAME = '';
const MONGO_PASSWORD = '';
const MONGO_DATABASE = 'flynaut-test';
const MONGO_STRING = `mongodb+srv://sharma:sharma@cluster0.0v8e6sg.mongodb.net/?retryWrites=true&w=majority`;

const MONGO = {
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  database: MONGO_DATABASE,
  string: MONGO_STRING,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
