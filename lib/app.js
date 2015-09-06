import express from 'express';
import Peek from './appconfig/peek';
import Generate from './appconfig/generate-config';
import Stored from './stored-config';
import NewConfig from './appconfig/new';
import bodyParser from 'body-parser';

class App {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;

    if (config == null || logger == null) {
      throw Error('Missing config or logger');
    }
  }

  start() {
    const app = express();
    app.use(bodyParser.json());

    const port = this.config.port;

    const peek = new Peek(this.config, this.logger);
    const generate = new Generate(this.config, this.logger);
    const stored = new Stored(this.config, this.logger);
    const newConfig = new NewConfig(this.config, this.logger);

    app.get('/v1/env/:env/applications/:id/', peek.get());
    app.post('/v1/env/:env/applications/:id/generate', generate.post());
    app.post('/v1/env/:env/applications/:id', newConfig.post());
    app.get('/v1/config/stored/:hash/', stored.get());


    app.listen(port, () => {
      this.logger.info('Running versiond on port: ' + port);
    });
  }
}

module.exports = App;
