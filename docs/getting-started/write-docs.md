# 官网文档编辑指南，说明本地写作与发布流程 - By AICode
---
sidebar_position: 2
title: 编辑本站文档
description: 在本地编辑 Markdown，并通过 GitHub 自动发布文档。
---

# 编辑本站文档

本站使用 Docusaurus 构建。文档以 Markdown 文件保存在仓库中，无需维护数据库或在后台录入内容。

## 本地启动

克隆官网仓库后安装依赖并启动开发服务器：

```bash
npm install
npm start
```

浏览器会打开本地预览页面。保存文件后，页面会自动刷新。

## 文档目录

```text
docs/                                           # 中文文档
├── intro.md
├── getting-started/
└── guides/

i18n/en/docusaurus-plugin-content-docs/current/ # 英文文档
├── intro.md
├── getting-started/
└── guides/
```

在 `docs/` 中新建 `.md` 或 `.mdx` 文件即可添加中文页面。英文页面需要在英文文档目录中建立对应文件。

## 文档元数据

每篇文档可以用 Front Matter 配置标题、排序和描述：

```yaml
---
sidebar_position: 3
title: 页面标题
description: 用于搜索和分享的页面描述。
---
```

## 发布更新

提交内容并推送到 `main` 分支后，GitHub Actions 会自动执行生产构建并部署到 GitHub Pages。

```bash
git add .
git commit -m "docs: update user guide"
git push
```

:::warning 发布前检查
建议先运行 `npm run build`。无效链接或构建错误会阻止发布，避免线上出现不可访问的页面。
:::
