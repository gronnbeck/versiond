import _ from 'lodash';

const stripAppConfigNamespace = (key) => {
  const expr = /\/env\/(\w+)\/(applications)\/(\w+)\/(\w+)/;
  const match = key.match(expr);
  return match[4];
}

const stripStoredConfigNamespace = (key) => {
  const expr = /\/config\/stored\/(\w+)\/(\w+)/;
  const match = key.match(expr);
  return match[2];
}

class FlattenEtcdData {

  flattenEtcdData (etcData, stripNamespace) {
    const nodes = etcData.node.nodes;
    return _.chain(nodes)
      .map((node) => [stripNamespace(node.key), node.value])
      .zipObject()
      .value();
  }

  parseAppConfig (etcData) {
    return this.flattenEtcdData(etcData, stripAppConfigNamespace);
  }

  parseStoredConfig (etcData) {
    return this.flattenEtcdData(etcData, stripStoredConfigNamespace);
  }
}


module.exports = FlattenEtcdData;
