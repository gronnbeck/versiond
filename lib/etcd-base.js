import Etcd from 'node-etcd';
import FlattenEtcdData from './flatten-etcd-data';

class EtcdBase {
  constructor(config) {
    this.etcd = new Etcd(config.etcdHost);
    this.flatten = new FlattenEtcdData();
    this.etcdRoutes = {
      appConfig: (env, id) => `env/${env}/applications/${id}`
    }
  }
}


module.exports = EtcdBase;
