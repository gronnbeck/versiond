import EtcdBase from './etcd-base';
import flattenEtcdData from './flatten-etcd-data';

class StoredConfig extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
  }

  get() {
    return (req, res) => {
      const hash = req.params.hash;
      this.etcd.get(`config/stored/${hash}`, (error, data) => {
        res.send(flattenEtcdData(data));
      });
    }.bind(this);
  }
}

module.exports = StoredConfig;
