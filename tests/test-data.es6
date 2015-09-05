import Etcd from 'node-etcd';

const etcd = new Etcd();
const baseKey = 'config/applications/testApp';
const key = (name) => `${baseKey}/${name}`;

etcd.set(key('etcdHost'), 'http://localhost:4001');
etcd.set(key('environment'), 'localtest');
etcd.set(key('tag'), 'label');
