import EtcdBase from './etcd-base';

class StoredConfig extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
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
