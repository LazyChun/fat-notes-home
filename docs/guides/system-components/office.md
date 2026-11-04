---
sidebar_position: 8
title: 办公
sidebar_label: 办公
description: "FatNotes 办公类系统组件详解：Excel、Word、PPT、PDF 的内容来源、文件格式与页面内阅读方式。"
---

# 办公

> 办公类组件把**现成的办公文档**直接嵌进页面。它们不是数据图表，也不参与查询：报表、说明书、演示稿、PDF 报告，都可以和看板放在同一张画布上，边看数据边查原始材料。

## 分类速览

| 组件 | 支持格式 | 查看方式 | 典型场景 |
| --- | --- | --- | --- |
| **Excel** | `xlsx` / `csv`（本地存储可用 JSON） | 表格视图，可切换暗黑模式 | 费用明细、原始台账 |
| **Word** | `docx` | 文档预览 | 制度说明、会议材料 |
| **PPT** | `pptx` | 演示播放，带翻页与页码 | 汇报材料、方案展示 |
| **PDF** | `pdf` | 阅读器 | 报告、合同、归档文件 |

![办公分类的示例页面：四种办公文档块](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-office-example.png)

*示例页左上是真实的市场部费用明细表；**红框**标出的是 Excel 块——它保留了工具栏、工作表和单元格编辑体验。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-office-example.png" target="_blank" rel="noopener">查看大图</a>

## 两种内容来源

四个办公块都围绕同一组配置：**内容从哪来**。

| 存储类型 | 说明 | 适合 |
| --- | --- | --- |
| **文件存储** | 通过「选择文件」或拖拽把本地文件交给块，块记录文件路径 | 已有报表、正式文档、需要长期保留的原件 |
| **本地存储** | 把内容以 JSON / 文本形式直接保存在页面里 | 轻量表格、随页示例、不依赖外部文件的演示 |

:::note 路径为空时是正常状态
新建的办公块里通常显示空白占位或「暂无数据」，这表示**还没有选择文件**，不是组件异常。选好文件后内容会直接出现在块内。
:::

![Excel 块的私有配置：文件路径、选择文件、暗黑模式](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-office-config.png)

*配置抽屉右侧：**基础**分组提供标题、文件路径与「选择文件」按钮，Excel 另有「暗黑模式」开关。*

## 逐个组件详解

4 个办公块的私有配置都在配置抽屉右侧「基础」分组，核心是同一组「内容从哪来」的字段。下面逐块列出可配项与默认值；外观仍走[公共配置](./common-config.md)。

### 1. Excel `excel`

**做什么**：在页面中嵌入一张可查看 / 编辑的电子表格，保留工具栏、公式、工作表标签与缩放控件。

![Excel显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-excel.png)

*显示效果：真实的「市场部 Q3 营销费用明细表」，可见开始 / 公式 / 数据菜单、工作表与单元格区域。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-excel.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 存储类型 `storageType` | 文件存储 / 本地存储；默认 `文件存储` | 文件存路径、跨设备依赖路径可用；本地存储把内容直接写进页面。 |
| 文件格式 `fileType` | `xlsx` / `csv` / JSON；默认 `xlsx` | 切换格式后请重新选择对应文件。 |
| 文件路径 `filePath` / 选择文件 `selectFile` | 默认空；支持选择或拖拽 Excel / CSV / JSON | 路径为空时块内是空白占位，属正常状态而非组件异常。 |
| 暗黑模式 `darkMode` | 开 / 关；默认 `关` | 只影响块内表格视图，不改变卡片外框。 |
| 内容 `content` | 本地存储时的 JSON 字符串 | 轻量表格可直接粘一段 JSON，不必依赖外部文件。 |

> **提示**：要用 Excel 里的数据画图，请先在「数据 → 数据源」注册表，再用[图表](./chart.md)查询；Excel 块只负责展示原件。

### 2. Word `word`

**做什么**：嵌入并预览 Word 文档，适合把制度、说明、会议纪要放在数据旁边。

![Word显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-word.png)

*显示效果：Word 预览界面，可见开始 / 插入菜单、正文与 100% 缩放。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-word.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 存储类型 / 文件格式 | 文件 / 本地；默认 `文件` + `docx` | 旧版 `.doc` 不受支持。 |
| 文件路径 / 选择文件 / 拖拽文件 | 默认空 | 选好 `.docx` 后内容直接出现在块内。 |
| 暗黑模式 / 内容 | 开 / 关；本地存储时的文本 | 与 Excel 一致。 |

### 3. PPT `ppt`

**做什么**：嵌入演示文稿并播放，块内自带上一页 / 下一页操作与「第 N / M 页」页码。

![PPT显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-ppt.png)

*显示效果：FatPPT 可编辑演示画布，底部显示「编辑演示 1 / n」页码。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-ppt.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 存储类型 / 文件格式 | 默认 `文件` + `md`（FatPPT 文本） | 也支持 `.pptx`；旧版二进制 `.ppt` 不受支持。 |
| 文件路径 / 选择文件 | 默认空 | 外部文件被移动或删除后，块内会重新变为空白。 |
| 暗黑模式 `darkMode` / 内容 `content` | 默认 `关` / 空 | 暗黑模式只作用于演示画布。 |
| 翻页与页码（运行态） | 上一页 / 下一页 / 第 N / M 页 | 在块内直接操作，不是配置抽屉里的字段。 |

### 4. PDF `pdf`

**做什么**：内嵌 PDF 阅读器，用来读报告、合同与归档件；配置项最少，专注阅读。

![PDF显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-pdf.png)

*显示效果：未选择文件时显示「暂无数据」占位，选好文件后由阅读器接管。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-pdf.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 文件路径 `filePath` / 选择文件 | 默认空 | 支持选择或拖拽 `.pdf`；路径失效后块会变空。 |
| 内容 `content` | 本地存储时的内容；默认空 | PDF 没有文件格式、暗黑模式等开关。 |

## 与「数据源」的区别

这是最容易混淆的一点：

| 对比 | 办公块 | 数据源 / 数据加工 |
| --- | --- | --- |
| 目的 | **给人看**原始文档 | **给机器算**，供查询使用 |
| 是否参与查询 | ❌ | ✅ |
| 能否驱动图表 | ❌ | ✅ |
| 典型输出 | 表格视图、文档预览 | 数据表、字段、指标 |

> 如果目标是「用 Excel 里的数据画一张趋势图」，正确做法是先在「数据 → 数据源」注册这张表，再用[图表](./chart.md)查询它；Excel 块只负责展示原件。

## 典型组合

1. **数据 + 依据** — 上方是销售看板，下方 Excel 块放原始明细，结论可随时回溯。
2. **汇报页** — PPT 块居中播放，右侧 Markdown 卡写讲解要点，下方 PDF 附完整报告。
3. **制度看板** — 流程页面旁放 Word 制度文档，操作与规范同屏。
4. **项目空间** — 用[页签](./layout.md)把 Excel / Word / PPT / PDF 分成四个标签页，一个页面装下全部材料。

## 注意事项

- 办公块没有查询配置，配置抽屉左侧不会出现「查询」区。
- 文件存储依赖路径可用性；跨设备打开同一页面时，建议改用本地存储或先把文件放到共享位置。
- 大文件会拖慢页面加载，可以配合页签的「失活销毁」或[分组](./layout.md)折叠。
- 暗黑模式只影响块内视图，不改变[公共配置](./common-config.md)里的卡片外观。

## 相关文档

- [总览](./overview.md) — 全部系统组件的分类清单
- [公共配置](./common-config.md) — 卡片外框与标题
- [图表](./chart.md) — 把数据画成图
- [布局](./layout.md) — 用页签组织多份材料
