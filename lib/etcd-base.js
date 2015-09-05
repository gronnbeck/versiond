import Etcd from 'node-etcd';

class EtcdBase {
  constructor(config) {
    this.etcd = new Etcd(config.etcdHost);
  }
}


module.exports = EtcdBase;
