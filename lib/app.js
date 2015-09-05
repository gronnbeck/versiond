import express from 'express';
import Peek from './peek';
import Generate from './generate-config';

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

    const port = this.config.port;

    const peek = new Peek(this.config, this.logger);
    const generate = new Generate(this.config, this.logger);

    app.get('/v1/config/applications/:id/', peek.get());
    app.post('/v1/config/applications/:id/generate', generate.post());

    app.listen(port, () => {
      this.logger.info('Running versiond on port: ' + port);
    });
  }
}

module.exports = App;
