# Logger 设计文档

## 1. 使用示例

### 基础用法 (Console 输出)
默认情况下，Logger 使用 `ConsoleTransport` 将日志输出到控制台。

```typescript
import { Logger, LogLevel } from '../src';

const logger = new Logger({
    level: LogLevel.Info // 设置日志过滤等级
});

logger.info('系统启动中...');
logger.error('发生未知错误', { errorId: 1001 });
```

### 扩展用法 (文件写入)
可以通过配置 `transports` 来指定日志输出目标。

```typescript
import { Logger, LogLevel, FileTransport, ConsoleTransport } from '../src';

const logger = new Logger({
    level: LogLevel.Warning,
    transports: [
        new ConsoleTransport(),               // 输出到控制台
        new FileTransport('/logs/error.log')  // 同时输出到模拟文件
    ]
});

logger.warn('内存占用过高'); 
// 控制台: [ISO-Date] [WARNING] 内存占用过高
// 文件: [File IO /logs/error.log] ...
```

## 2. 设计理念

本 Logger 模块采用了 **策略模式 (Strategy Pattern)** 进行设计。

*   **单一职责原则**：`Logger` 类只负责日志的等级过滤和分发，不关心具体的输出方式。具体的输出逻辑由 `Transports` (传输器) 负责。
*   **开闭原则**：对扩展开放，对修改关闭。当需要新增一种日志输出方式（如发送到远程服务器）时，无需修改 `Logger` 类的代码，只需新增一个实现了 `ILogTransport` 接口的类即可。

### 核心组件
1.  **Logger**: 核心控制器，管理日志等级和 Transport 列表。
2.  **ILogTransport (Interface)**: 定义了日志输出的标准接口。
3.  **Transports**: 具体实现，如 `ConsoleTransport`, `FileTransport`。

## 3. 如何支持未来扩展

要支持新的输出方式（例如：写入真实文件系统、发送 HTTP 请求到日志收集服务），只需遵循以下步骤：

1.  创建一个新的类，实现 `ILogTransport` 接口。
2.  实现 `log` 方法。

例如，实现一个 HTTP 远程日志：

```typescript
import { ILogTransport, LogLevel } from './types';

class HttpTransport implements ILogTransport {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    log(level: LogLevel, message: string, meta?: any): void {
        // 模拟 HTTP 请求
        const payload = { level, message, meta, timestamp: new Date() };
        console.log(`POST ${this.endpoint}`, JSON.stringify(payload));
    }
}

// 使用
logger.addTransport(new HttpTransport('https://api.logs.com'));
```
