
## 1. Logger 项目
**定位**：轻量级、可扩展的 TypeScript 通用日志库。

###  核心设计思路：策略模式

### 🔧 核心模块
1.  **调度中心 (`Logger.ts`)**:
    - 负责 API 暴露 (`info`, `error`)。
    - 负责管理 Transport 列表。
    - 负责日志等级判断。
2.  **类型定义 (`types.ts`)**:
    - 定义了 `ILogTransport` 接口，保证了扩展的规范性。
3.  **传输层 (`src/transports/`)**:
    - `ConsoleTransport`: 开发环境用，带颜色区分。
    - `FileTransport`: 生产环境用，模拟文件写入与序列化。

###  目录结构 
```text
Logger/
├── src/
│   ├── transports/      # 具体日志实现 (Console, File)
│   ├── Logger.ts        # 核心类
│   └── types.ts         # 接口定义 (ILogTransport)
├── doc/                 # 文档目录
│   └── usage.md         # 详细使用指南
└── example.ts           # 使用演示
```
---

## 2. Book Store 项目

### 访问链接 
🔗 [https://cv-coder.github.io/maidanna/](https://cv-coder.github.io/maidanna/)

###  技术栈
- **框架**: Vue 3 (Script Setup), Vite
- **语言**: TypeScript
- **UI 库**: Ant Design Vue
- **状态管理**: **Redux Toolkit (RTK)**

### 描述
Redux 通常配合 React 使用，适配Vue3


###  目录结构
```text
book-store/
├── src/
│   ├── redux/           # 标准 Redux 实现 (Slice, Store)
│   ├── stores/          # Vue Adapter (将 Redux 桥接为 Composable)
│   ├── components/      # 业务组件 (BookList, BookForm)
│   └── types.ts         # 类型定义
```

---



