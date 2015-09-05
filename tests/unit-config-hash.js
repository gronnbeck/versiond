import test from 'tape';
import configHash from '../lib/config-hash';

test('should have the same hash independent of the property order', (t) => {
  t.plan(1);
  const config1 = {
    etcdHost: 'localhost',
    etcdPort: '4001'
  }

  const config2 = {
    etcdPort: '4001',
    etcdHost: 'localhost'
  }

  const data1 = configHash(config1);
  const data2 = configHash(config2);

  t.equal(data1, data2, 'the hash should match');

});
