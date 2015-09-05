class Config {
  constructor() {
    this.port = 8001 || process.env.PORT;
    this.etcdHost = null;
  }
}

module.exports = Config;
