import { ILogObject, Logger } from 'tslog';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const logName = path.join('log', 'log-api.txt');

const logToTransport = (logObject: ILogObject): void => {
  if (!existsSync(path.dirname(logName))) {
    mkdirSync(path.dirname(logName));
  }

  appendFileSync(logName, `${JSON.stringify(logObject)}\n`);
};

const logger: Logger = new Logger();
logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  'debug',
);

export default logger;
