import { ILogTransport, LogLevel } from '../types';

// 模拟的文件写入函数
function NativeFileWriteSync(filePath: string, buffer: string) {
  console.log(`[File IO ${filePath}] ${buffer}`);
}

export class FileTransport implements ILogTransport {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level].toUpperCase();
    
    // 序列化 meta 数据
    const metaStr = meta ? JSON.stringify(meta) : '';
    const logLine = `${timestamp} [${levelName}] ${message} ${metaStr}\n`;
    
    // 写入模拟文件
    NativeFileWriteSync(this.filePath, logLine.trim());
  }
}
