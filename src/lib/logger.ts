type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private log(level: LogLevel, message: string, ...args: Array<unknown>) {
    if (process.env.NODE_ENV !== 'production' || level === 'error') {
      const timestamp = new Date().toISOString();
      const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

      switch (level) {
        case 'debug':
          // eslint-disable-next-line no-console
          console.debug(prefix, message, ...args);
          break;
        case 'info':
          // eslint-disable-next-line no-console
          console.info(prefix, message, ...args);
          break;
        case 'warn':
          console.warn(prefix, message, ...args);
          break;
        case 'error':
          console.error(prefix, message, ...args);
          break;
      }
    }
  }

  debug(message: string, ...args: Array<unknown>) {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: Array<unknown>) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: Array<unknown>) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: Array<unknown>) {
    this.log('error', message, ...args);
  }
}

export const logger = new Logger();
