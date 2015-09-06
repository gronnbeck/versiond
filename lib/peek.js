import EtcdBase from './etcd-base';
import FlattenEtcdData from './flatten-etcd-data';


class Peek extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
    this.flatten = new FlattenEtcdData();
  }
  get (req, res) {
    const etcd = this.etcd;
    const logger = this.logger;

    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      etcd.get(this.etcdRoutes.appConfig(env, id), (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        logger.debug(error, data);
        res.send(this.flatten.parseAppConfig(data))
      });
    }
  }
}


module.exports = Peek;
