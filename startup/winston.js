const { createLogger, format, transports } = require("winston");
const { combine, timestamp } = format;

class Logger {
  static getLogger() {
    return this._log;
  }

  static createLogger() {
    if (this._log) {
      return Logger.getLogger();
    }

    this._log = createLogger({
      format: combine(timestamp(), format.json()),
      transports: [
        new transports.Console({ colorize: true, prettyPrint: true }),
        new transports.File({ filename: "AllExceptions.log" })
      ]
    });

    return this._log;
  }
}

module.exports.info = log => {
  const loggerWinston = Logger.createLogger();
  loggerWinston.info(log);
};

module.exports.error = log => {
  const loggerWinston = Logger.createLogger();
  loggerWinston.error(log);
};

module.exports.handlePromiseRejection = () => {
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
