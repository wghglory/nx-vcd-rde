import { pipe, tap } from 'rxjs';

type LoggerType = 'count' | 'debug' | 'dir' | 'log' | 'table';

const getLoggerByType = (loggerType: LoggerType): ((value: any) => void) => {
  switch (loggerType) {
    case 'count':
      return console.count;
    case 'debug':
      return console.debug;
    case 'dir':
      return console.dir;
    case 'log':
      return console.log;
    case 'table':
      return console.table;
  }
};

export const logger = (loggerType: LoggerType = 'log') => pipe(tap(getLoggerByType(loggerType)));
