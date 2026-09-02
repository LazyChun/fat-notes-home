<!-- FatNotes 官网项目说明与本地开发指南 - By AICode -->

# FatNotes 官网

FatNotes（肥仔笔记）的官网与文档中心，基于 React、TypeScript 和 Docusaurus 构建。

## 本地开发

```bash
npm install
npm start
```

默认打开 `http://localhost:3000/fat-notes-home/`。修改页面或 Markdown 文档后，本地页面会自动刷新。

## 编辑文档

- 中文文档：`docs/`
- 英文文档：`i18n/en/docusaurus-plugin-content-docs/current/`

文档使用 Markdown 或 MDX 编写。新增页面后，请同步添加对应语言的文档。

## 检查生产构建

```bash
npm run typecheck
npm run build
```

## 发布

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并部署到 GitHub Pages。

仓库首次部署前，需要在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中将 Source 设置为 **GitHub Actions**。
