import Config from './config';
import Logger from './logger';
import App from './app';

const config = new Config();
const logger = new Logger();
const app = new App(config, logger);

app.start();
