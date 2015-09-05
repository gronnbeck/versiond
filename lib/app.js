import flattenEtcdData from './flatten-etcd-data';
import express from 'express';
import Etcd from 'node-etcd';

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

    const etcd = new Etcd(this.config.etcdHost);
    const generateAppConfig = (req, res) => {
      res.status(500).send('Not impl');
    }

    const peek = (req, res) => {
      const id = req.params.id;
      etcd.get(`config/applications/${id}`, (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        this.logger.debug(error, data);
        res.send(flattenEtcdData(data))
      });
    }

    app.get('/v1/config/applications/:id/', peek);
    app.post('/v1/config/applications/:id/generate', generateAppConfig)

    app.listen(port, () => {
      this.logger.info('Running versiond on port: ' + port);
    });
  }
}

module.exports = App;
