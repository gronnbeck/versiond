import EtcdBase from '../etcd-base';
import _ from 'lodash';

class NewConfig extends EtcdBase {
  constructor(config, logger) {
    super(config);
    this.logger = logger;
  }

  etcdKey(env, id, key) {
    const path = `env/${env}/applications/${id}`;
    return `${path}/${key}`;
  }

  addKv(env, id) {
    return (kv) => {
      const key = kv[0];
      const value = kv[1];
      this.etcd.set(this.etcdKey(env, id, key), value);
    }
  }
  
  post(req, res) {
    return (req, res) => {
      const env = req.params.env;
      const id = req.params.id;
      const body = req.body;

      var kvs = _.pairs(body);
      var add = this.addKv(env, id);
      kvs.forEach(add);

      res.send({
        id,
        status: 'creating'
      });

    }.bind(this)
  }
}


module.exports = NewConfig;
