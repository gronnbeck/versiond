import EtcdBase from '../etcd-base';

class Peek extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
  }
  get (req, res) {
    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      this.etcd.get(this.etcdRoutes.appConfig(env, id), (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        this.logger.debug(error, data);
        res.send(this.flatten.parseAppConfig(data))
      });
    }.bind(this)
  }
}


module.exports = Peek;
