import { ILogTransport, LogLevel } from './types';
import { ConsoleTransport } from './transports/ConsoleTransport';

export class Logger {
  private level: LogLevel;
  private transports: ILogTransport[];

  constructor(options?: { level?: LogLevel; transports?: ILogTransport[] }) {
    this.level = options?.level ?? LogLevel.Info;
    this.transports = options?.transports ?? [new ConsoleTransport()];
  }

  /**
   * 设置日志等级
   */
  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * 添加日志传输方式
   */
  public addTransport(transport: ILogTransport): void {
    this.transports.push(transport);
  }

  /**
   * 记录 Verbose 级别日志
   */
  public verbose(message: string, meta?: any): void {
    this.log(LogLevel.Verbose, message, meta);
  }

  /**
   * 记录 Info 级别日志
   */
  public info(message: string, meta?: any): void {
    this.log(LogLevel.Info, message, meta);
  }

  /**
   * 记录 Warning 级别日志
   */
  public warn(message: string, meta?: any): void {
    this.log(LogLevel.Warning, message, meta);
  }

  /**
   * 记录 Error 级别日志
   */
  public error(message: string, meta?: any): void {
    this.log(LogLevel.Error, message, meta);
  }

  /**
   * 核心日志处理方法
   */
  private log(level: LogLevel, message: string, meta?: any): void {
    // 如果当前消息等级低于设定的过滤等级，则忽略
    if (level < this.level) {
      return;
    }

    // 分发给所有 registered transports
    for (const transport of this.transports) {
      transport.log(level, message, meta);
    }
  }
}
