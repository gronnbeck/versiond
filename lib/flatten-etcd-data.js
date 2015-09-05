import _ from 'lodash';

const stripNamespace = (key) => {
  const expr = /\/config\/(applications|stored)\/(\w+)\/(\w+)/;
  const match = key.match(expr);
  return match[3];
}

const flattenEtcdData = (etcData) => {
  const nodes = etcData.node.nodes;
  return _.chain(nodes)
    .map((node) => [stripNamespace(node.key), node.value])
    .zipObject()
    .value();
}

module.exports = flattenEtcdData;
