import test from 'tape';
import testData from './unit-flatten-etcd-test-data.json';
import flattenEtcdData from '../lib/flatten-etcd-data';

test('flatten etcd v2 data as expected', (t) => {
  t.plan(3);
  var data = flattenEtcdData(testData);

  t.equal(typeof data, 'object');
  t.notEqual(data.etcdHost, undefined, 'etcdHost should be set');
  t.equal(data.etcdHost, 'http://localhost:4001', 'etcdHost should match test data');
});
