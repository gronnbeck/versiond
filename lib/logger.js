class Logger {
  debug(message) {
    console.log(message);
  }
  info(message) {
    console.log(message);
  }
  warning(message) {
    console.log(message);
  }
  error(message, error) {
    console.log(message);
    if (error != null) {
      console.log(error);
    }
  }
}

module.exports = Logger;
