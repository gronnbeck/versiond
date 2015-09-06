import EtcdBase from './etcd-base';
import FlattenEtcdData from './flatten-etcd-data';
import _ from 'lodash';
import hash from './config-hash';

class Generate extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
    this.flatten = new FlattenEtcdData();
  }

  post() {
    const etcd = this.etcd;
    const logger = this.logger;
    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      etcd.get(this.etcdRoutes.appConfig(env, id), (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }

        const configData = this.flatten.parseAppConfig(data);
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
