import Etcd from 'node-etcd';

class EtcdBase {
  constructor(config) {
    this.etcd = new Etcd(config.etcdHost);
    this.etcdRoutes = {
      appConfig: (env, id) => `env/${env}/applications/${id}`
    }
  }
}


module.exports = EtcdBase;
