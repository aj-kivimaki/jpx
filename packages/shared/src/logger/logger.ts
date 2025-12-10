import { Logger } from 'tslog';

export type LogLevel =
  | 0 // silly
  | 1 // trace
  | 2 // debug
  | 3 // info
  | 4 // warn
  | 5 // error
  | 6 // fatal
  | 7; // hidden

export interface CreateLoggerOptions {
  name?: string;
  minLevel?: LogLevel;
}

export const createLogger = (options: CreateLoggerOptions = {}) => {
  return new Logger({
    name: options.name ?? 'app',
    minLevel: options.minLevel ?? 3, // default INFO
    type: 'pretty',
    prettyLogTemplate:
      '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} | {{logLevelName}} |',
    prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\n{{errorStack}}\n',
    hideLogPositionForProduction: true,
  });
};

export const logger = createLogger({ name: 'shared' });
