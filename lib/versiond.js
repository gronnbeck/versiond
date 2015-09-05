class Config {
  constructor() {
    this.port = 8001 || process.env.PORT;
    this.etcdHost = null;
  }
}

class Logger {
  debug(message) {
    console.log(message);
  }
  info(message) {
    console.log(message);
  }
  warning(message) {
    console.log(message);
  }
  error(message, error) {
    console.log(message);
    if (error != null) {
      console.log(error);
    }
  }
}

import express from 'express';
import Etcd from 'node-etcd';
import flattenEtcdData from './flatten-etcd-data';

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

    const port = config.port;

    const etcd = new Etcd(config.etcdHost);
    const generateAppConfig = (req, res) => {
      res.status(500).send('Not impl');
    }

    const peek = (req, res) => {
      const id = req.params.id;
      etcd.get(`config/applications/${id}`, (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        logger.debug(error, data);
        res.send(flattenEtcdData(data))
      });
    }

    app.get('/v1/config/applications/:id/', peek);
    app.post('/v1/config/applications/:id/generate', generateAppConfig)

    app.listen(port, () => {
      logger.info('Running versiond on port: ' + port);
    });
  }
}


const config = new Config();
const logger = new Logger();
const app = new App(config, logger);

app.start();
