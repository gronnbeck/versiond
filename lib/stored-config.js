import EtcdBase from './etcd-base';
import FlattenEtcdData from './flatten-etcd-data';

class StoredConfig extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
    this.flatten = new FlattenEtcdData();
  }

  get() {
    return (req, res) => {
      const hash = req.params.hash;
      this.etcd.get(`config/stored/${hash}`, (error, data) => {
        res.send(this.flatten.parseStoredConfig(data));
      });
    }.bind(this);
  }
}

module.exports = StoredConfig;
