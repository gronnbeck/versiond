import sha256 from 'sha256';
import _ from 'lodash';

const stringified = (config) => {
  return _.chain(config)
    .pairs()
    .sortBy((pair) => pair[0])
    .map((pair) => `${pair[0]}${pair[1]}`)
    .reduce((res, current) => res + current, '')
    .value();
}

const configHash = (config) => {
  return sha256(stringified(config));
}

module.exports = configHash;
