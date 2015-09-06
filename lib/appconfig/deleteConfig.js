import EtcdBase from '../etcd-base';

class DeleteConfig extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
  }
  everything () {
    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      this.etcd.del(this.etcdRoutes.appConfig(env, id), { recursive: true }, 
      (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send({
          success: true
        });
      });
    }.bind(this)
  }
  oneKey () {
    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      const key = req.params.key;
      const route = this.etcdRoutes.appConfig(env, id);
      this.etcd.del(`${route}/${key}`, (error, data) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.send({
          success: true
        });
      })
    }.bind(this);
  }
}


module.exports = DeleteConfig;
