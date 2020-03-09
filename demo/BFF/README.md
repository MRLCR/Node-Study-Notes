# 安装依赖

```bash
npm install
```

# 启动

```bash
npm run start
```

# 页面介绍

## 登录页

http://localhost/login

登录页面主要是实践 Node.js 静态服务的支持。

## 个人中心页

http://localhost/home?peopleId={101 | 102 | 103}

个人中心页主要实践 Node.js 的 Graphql 支持和 RPC 的调用。

# 目录结构

```
├── SSR                 服务端渲染
├── client              RPC 客户端
├── protocols           RPC 协议内容
├── schema              graphql 接口模型
├── server              用 Node.js 模拟的后端
├── static              静态资源
└── views               视图
```

