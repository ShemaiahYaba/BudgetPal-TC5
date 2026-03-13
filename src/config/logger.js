import winston from 'winston';
import settings from './settings.js';

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

const devFormat = combine(
  errors({ stack: true }),
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
  })
);

const prodFormat = combine(
  errors({ stack: true }),
  timestamp(),
  json()
);

const logger = winston.createLogger({
  level: settings.isDev ? 'debug' : 'info',
  format: settings.isDev ? devFormat : prodFormat,
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

// Stream for morgan HTTP request logging
export const morganStream = {
  write: (message) => logger.http(message.trimEnd()),
};

export default logger;
