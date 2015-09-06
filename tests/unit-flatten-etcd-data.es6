import test from 'tape';
import testData from './unit-flatten-etcd-test-data.json';
import FlattenEtcdData from '../lib/flatten-etcd-data';

test('flatten etcd v2 data for appConfig as expected', (t) => {
  t.plan(3);
  var flatten = new FlattenEtcdData();
  var data = flatten.parseAppConfig(testData);

  t.equal(typeof data, 'object');
  t.notEqual(data.etcdHost, undefined, 'etcdHost should be set');
  t.equal(data.etcdHost, 'http://localhost:4001', 'etcdHost should match test data');
});
