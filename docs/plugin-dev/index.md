---
sidebar_position: 0
title: 高级插件
description: FatNotes（肥宅笔记）高级插件开发指南：脚手架创建、工程结构、activate 入口、SDK 能力一览、开发调试与打包发布。
---

# 高级插件

FatNotes 插件基于 **Module Federation** 在运行时加载，一条命令即可起步。插件几乎可以扩展宿主的一切：活动栏图标、侧栏视图、全页路由、自定义块类型、流程节点、全局搜索提供者、命令、AI 设置页……

## 快速开始

```bash
npx fat-notes-extension-cli create my-plugin
```

脚手架生成的工程结构：

```
my-plugin/
├── plugin.json              # 插件清单（安装器读取）
├── funcs.json               # 能力目录声明
├── package.json
├── webpack.config.js        # Module Federation 构建
├── src/
│   ├── bootstrap.ts         # MF 异步入口
│   ├── index.tsx            # 导出 activate(sdk) / deactivate()
│   └── PluginView.tsx       # 示例贡献组件
└── types/
    └── fat-notes-sdk.d.ts   # SDK 类型定义
```

## 插件入口

每个插件导出一对生命周期函数：

```tsx
export async function activate(sdk: FatNotesPluginSDK): Promise<void> {
  // 注册一个活动栏图标 + 主侧栏视图
  sdk.contributions.registerActivityBarItem({ /* icon, id ... */ });
  sdk.contributions.registerPrimarySidebar({ /* view definition ... */ });

  // 或者注册一个自定义块类型 / 流程节点
  sdk.contributions.registerBlockType({ /* defaultOptions, dataConfig ... */ });
}

export function deactivate(): void {
  // 清理注册
}
```

## 插件能贡献什么

- **UI 贡献点**：活动栏图标、主侧栏视图、面板页签、底部栏状态、全页路由、工作台页面、设置页
- **块体系**：自定义块类型、块显示配置、添加块菜单分类
- **流程引擎**：自定义流程节点类型（画布渲染 + 抽屉编辑）
- **其他**：全局搜索提供者、AI 设置页、右键菜单、命令

## SDK 能力一览

| 命名空间 | 用途 |
| --- | --- |
| `sdk.host` | 宿主版本与运行模式 |
| `sdk.dataSource` | 数据源枚举与读取 |
| `sdk.query` / `sdk.mutation` | 执行保存的查询 / 变更，或裸 SQL、插入行 |
| `sdk.ui` | toast、modal、主题、i18n |
| `sdk.commands` | 注册并执行命令 |
| `sdk.store` | 只读访问宿主 Redux 状态 |
| `sdk.config` | 读写插件运行时配置 |
| `sdk.contributions` | 注册全部 UI 贡献点 |
| `sdk.events` | 插件 / 宿主事件总线 |
| `sdk.flow` | 列举、读取、执行宿主工作流 |
| `sdk.ai` | 调用宿主 AI 模型与对话补全 |
| `sdk.asset` | 资源仓库：列出 / 上传 / 重命名 / 移动文件 |
| `sdk.boards` | 插件独立的看板配置 |
| `sdk.remoteComponents` | 复用宿主组件（块容器、流程编辑器、时间 / Cron 选择器） |

## 开发与发布

```bash
fn-ext dev     # watch 模式开发
fn-ext build   # 构建
fn-ext pack    # 产出 release/<code>_v<version>.zip
```

打包出的 zip 在应用内「设置 → 高级插件」直接安装。开发调试时也可以把插件 `dist` 目录以 devMode 注册进宿主，改完即生效。

:::tip 下一步
先逛一圈[插件总览](../plugins/index.md)看看别人做了什么，再用脚手架做你自己的。
:::

> 完整 SDK 文档与模板见脚手架仓库：`fat-notes-extension-cli`。
