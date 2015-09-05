import Etcd from 'node-etcd';
import flattenEtcdData from './flatten-etcd-data';
import _ from 'lodash';
import hash from './config-hash';

class Generate {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.etcd = new Etcd(config.etcdHost);
  }

  post() {
    const etcd = this.etcd;
    const logger = this.logger;
    return (req, res) => {
      const id = req.params.id;
      etcd.get(`config/applications/${id}`, (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }

        const configData = flattenEtcdData(data);
        const configHash = hash(configData)

        logger.info(`Creating config with hash: ${configHash}`)
        _.chain(configData)
         .pairs()
         .forEach((pair) => {
           const key = pair[0];
           const value = pair[1];
           const etcdKey = `config/stored/${configHash}/${key}`;

           etcd.set(etcdKey, value, () => {
             logger.info(` - ${key}: ${value}`);
           });
         })
         .value();


        res.send({
          configHash: configHash,
          status: 'creating'
        });

      });
    }
  }
}

module.exports = Generate;