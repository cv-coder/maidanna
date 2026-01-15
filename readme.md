
## 1. Logger 项目
**定位**：轻量级、可扩展的 TypeScript 通用日志库。

###  核心设计思路：插件化架构
项目采用了 **Core + Plugins (Transports)** 的分离设计，严格遵循了 **单一职责原则 (SRP)** 和 **开闭原则 (OCP)**。



### 🔧 核心模块
1.  **调度中心 (`Logger.ts`)**:
    - 负责 API 暴露 (`info`, `error`)。
    - 负责管理 Transport 列表。
    - 负责日志等级判断。
2.  **契约定义 (`types.ts`)**:
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
**定位**：基于 Vue 3 的图书管理系统演示，重点展示了在 Vue 生态中异构集成 Redux 的架构能力。

###  技术栈
- **框架**: Vue 3 (Script Setup), Vite
- **语言**: TypeScript
- **UI 库**: Ant Design Vue
- **状态管理**: **Redux Toolkit (RTK)**

###  核心设计思路：适配器模式 (Adapter Pattern)
Redux 通常配合 React 使用，适配Vue3

**架构分层**：
1.  **Redux 层 (`src/redux/`)**: 纯净的业务逻辑层。
    - 定义 Slice、Reducer 和 Store，完全不依赖 Vue API。
    - 优势：业务逻辑独立，可以直接移植到 React 或 Angular 项目中。
2.  **适配层 (`src/stores/bookStore.ts`)**: 桥接层。
    - 作用：封装 `useBookStore` Hook，向下屏蔽 Redux 的 `dispatch` 和 `selector` 细节。
    - **亮点**：向组件暴露 Vue 风格的接口（如响应式数据和直接的方法调用），组件只需调用 `bookStore.addBook()`，而无需知道底层是 Redux 在工作。
3.  **UI 层 (`src/components/`)**:
    - 纯展示组件，只负责渲染和触发事件，不包含复杂业务逻辑。

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



