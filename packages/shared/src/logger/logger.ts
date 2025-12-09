import { Logger } from 'tslog';

export interface CreateLoggerOptions {
  name?: string;
  minLevel?: number; // 0 = silly, 1 = trace, 2 = debug, 3 = info…
}

export const createLogger = (options: CreateLoggerOptions = {}) => {
  return new Logger({
    name: options.name ?? 'app',
    minLevel: options.minLevel ?? 3, // default INFO in shared
    type: 'pretty',
    prettyLogTemplate:
      '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} | {{logLevelName}} |',
    prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\n{{errorStack}}\n',
    hideLogPositionForProduction: true,
  });
};

// Default shared logger instance
export const logger = createLogger({ name: 'shared' });
