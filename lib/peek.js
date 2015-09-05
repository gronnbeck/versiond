import Etcd from 'node-etcd';
import flattenEtcdData from './flatten-etcd-data';

class Peek {
  constructor(config, logger) {
    this.logger = logger;
    this.etcd = new Etcd(config.etcdHost);
  }
  get (req, res) {
    const etcd = this.etcd;
    const logger = this.logger;

    return (req, res) => {
      const id = req.params.id;
      etcd.get(`config/applications/${id}`, (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        logger.debug(error, data);
        res.send(flattenEtcdData(data))
      });
    }
  }
}


module.exports = Peek;
