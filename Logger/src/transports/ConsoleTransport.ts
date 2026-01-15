import { ILogTransport, LogLevel } from '../types';

export class ConsoleTransport implements ILogTransport {
  log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level].toUpperCase();
    
    // 简单的日志格式：[时间] [等级] 内容 [元数据]
    const logMsg = `[${timestamp}] [${levelName}] ${message}`;
    
    // 根据等级使用不同的 console 方法
    switch (level) {
      case LogLevel.Error:
        console.error(logMsg, meta || '');
        break;
      case LogLevel.Warning:
        console.warn(logMsg, meta || '');
        break;
      case LogLevel.Info:
        console.info(logMsg, meta || '');
        break;
      case LogLevel.Verbose:
      default:
        console.log(logMsg, meta || '');
        break;
    }
  }
}
