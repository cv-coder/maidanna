import { Logger } from './src/Logger';
import { LogLevel } from './src/types';
import { FileTransport } from './src/transports/FileTransport';

// 1. 默认使用 ConsoleTransport
const logger = new Logger({
  level: LogLevel.Verbose // 设置最低日志等级
});

logger.info('这是一个 Info 消息');
logger.warn('这是一个 Warning 消息', { code: 404 });

// 2. 扩展：添加文件输出 (模拟)
console.log('\n--- 添加文件输出支持 ---\n');

const fileLogger = new Logger({
  level: LogLevel.Info,
  transports: [
    // 同时支持 Console 和 File
    // new ConsoleTransport(), // 如果需要也可以加上
    new FileTransport('/var/logs/app.log')
  ]
});

fileLogger.info('这条日志会写入文件');
fileLogger.error('这是一条错误日志', new Error('Database connection failed'));

// 3. 动态添加 Transport
console.log('\n--- 动态添加 Transport ---\n');
logger.addTransport(new FileTransport('/var/logs/secondary.log'));
logger.warn('这条日志会出现在 Console 和 secondary.log 中');
