---
sidebar_position: 10
title: 其他
sidebar_label: 其他
description: "FatNotes 其他类系统组件详解：文本、Markdown、富文本、图片、视频、IFrame、二维码、时钟任务与屏幕操作。"
---

# 其他

> 「其他」不是杂物间，而是**内容展示与自动化**的合集：写说明用文本三兄弟，放媒体用图片 / 视频 / IFrame / 二维码，做自动化用时钟任务与屏幕操作。几乎所有页面的说明文字、提示条和背景材料，都出自这一类。

## 分类速览

| 组件 | 类别 | 典型场景 |
| --- | --- | --- |
| **文本** | 内容 | 标题横幅、提示条、简短说明 |
| **Markdown** | 内容 | 结构化长文、表格、清单、代码块 |
| **富文本** | 内容 | 所见即所得的精细排版 |
| **图片** | 媒体 | 截图、示意图、封面 |
| **视频** | 媒体 | 演示录像、教程 |
| **IFrame** | 嵌入 | 嵌入外部网页或内部系统 |
| **二维码** | 生成 | 把链接 / 文本生成码 |
| **时钟任务** | 自动化 | 定时触发刷新、通知、联动 |
| **屏幕操作** | 自动化 | 编排屏幕、鼠标、键盘完成界面任务 |

![其他分类的示例页面：内容块与自动化块](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png)

*示例页上排是三种内容块，下排是二维码、IFrame 与时钟任务；**红框**标出的是二维码块，内容由一段 URL 直接生成。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png" target="_blank" rel="noopener">查看大图</a>

## 内容三兄弟怎么选

| 对比 | 文本 `text` | Markdown `markdown` | 富文本 `richText` |
| --- | --- | --- | --- |
| 编辑方式 | 纯文本 + 样式选项 | 写 Markdown 语法 | 所见即所得工具栏 |
| 适合长度 | 一行到几行 | 中长篇、结构化 | 短篇、精细排版 |
| 排版能力 | 字体大小、粗斜体、颜色、水平 / 垂直对齐、自动换行、高亮文字 | 标题、列表、表格、引用、代码块、链接 | 粗体、斜体、下划线、行内代码、文字颜色、标题、引用、列表 |
| 典型用途 | 横幅、提示条、标签 | 使用说明、模板、笔记 | 摘要、人物介绍、带重点色的段落 |

**配置差异**：

- **文本** — 内容、字体大小、加粗 / 斜体、字体颜色、水平 / 垂直对齐、自动换行、高亮文字（可给关键词配色）。
- **Markdown** — 内容、字体大小与颜色、行高、允许滚动、链接在新窗口打开。
- **富文本** — 内容为 Slate 节点数组；选中文字即可调出工具栏设置样式（不支持删除线）。

:::tip 说明卡的最佳搭档
一个页面通常这样开头：**文本横幅**（写章节名 + 一句话定位）+ **Markdown 卡**（写要点与步骤）+ 若干[图表](./chart.md)，最后用一条**文本提示条**收尾。本套文档的每个示例页都是这么排的。
:::




## 逐个组件详解

「其他」分三组：文本三兄弟负责写内容，媒体与嵌入负责放资源，自动化负责定时与操作。下面 9 个块逐个列出私有配置与显示效果；没有独立私有表单的块会注明配置实际所在位置。

### 1. 文本 `text`

**做什么**：纯文本 + 样式选项，适合标题横幅、提示条与简短说明。

![文本显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-text.png)

*显示效果：文本块内一行加粗深色文字，水平居中、垂直居中。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-text.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**样式**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 文本内容 `content` | 纯文本；默认空 | 单行或几行短内容，长文请用 Markdown。 |
| 字体大小 `fontSize` / 加粗 `bold` / 斜体 `italic` / 字体颜色 `fontColor` | 默认自动 / `关` / `关` / `#172634` | 一组基础排版项，横幅常用大字号 + 加粗。 |
| 水平对齐 `hAlign` / 垂直对齐 `vAlign` | 默认 `居中` / `居中` | 决定文字在块内的位置；提示条常用左对齐。 |
| 自动换行 `autoNewline` / 背景颜色 | 默认 `开` / 由外框背景决定 | 长句自动折行，背景色可做提示条底色。 |
| 高亮文字 `textHighLight` | 关键词 + 颜色规则；默认空 | 给指定词单独配色，例如把「注意」标成红色。 |

### 2. Markdown `markdown`

**做什么**：写 Markdown 语法展示结构化长文：标题、列表、表格、引用、代码块、链接。

![Markdown显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-markdown.png)

*显示效果：Markdown 卡片内显示标题、加粗文字与列表等排版结果。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-markdown.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**样式**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 内容 `content` | Markdown 文本；默认空 | 支持标准语法；示例页的说明卡都由它生成。 |
| 字体大小 / 加粗 / 斜体 / 字体颜色 | 默认自动 / `关` / `关` / `#172634` | 整卡基础排版；局部强调请用 Markdown 语法。 |
| 行高 `lineHeight` | 数值；默认 `1.6` | 长文建议 1.6–1.8，阅读更轻松。 |
| 允许滚动 `scroll` | 开 / 关；默认 `开` | 内容超出块高度时在块内滚动，不撑高画布。 |
| 链接新窗口打开 `openLinksInNewTab` | 开 / 关；默认 `开` | 避免点参考链接时离开当前看板。 |

### 3. 富文本 `richText`

**做什么**：所见即所得的精细排版：选中文字即可调工具栏设粗体、斜体、下划线、行内代码、颜色等。

![富文本显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-richText.png)

*显示效果：一段文字里同时出现加粗、改色与下划线等局部样式。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-richText.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**内容与工具栏**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 内容 `richText.content` | Slate 节点数组；默认一段示例文本 | 由编辑器自动生成，不建议直接改 JSON；样式以工具栏支持的范围为准。 |
| 可用样式 | 粗体 / 斜体 / 下划线 / 行内代码 / 文字颜色 / 标题 / 引用 / 列表 | 删除线等未支持样式会被忽略。 |

### 4. 图片 `pic`

**做什么**：展示图片资源，同时是**触发类块**：可给图片配置点击事件，做成可点击的入口或示意图。

![图片显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png)

*该块未单独放置于示例页，图中为本分类示例页总览；实际显示以本机组件面板为准。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**资源与事件**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 图片资源 | 在块内选择 / 粘贴图片 | 配置抽屉没有独立的私有表单，只有公共的「关联标签」；资源在块内设置。 |
| 点击事件 | 联动 / 跳转 / 切换页面 | 点击图片打开[抽屉](./dialog.md)图注，或跳转到另一个页面。 |

### 5. 视频 `video`

**做什么**：播放视频文件或视频链接，适合放操作演示；具体可用项随安装版本与插件变化。

![视频显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png)

*该块未单独放置于示例页，图中为本分类示例页总览；实际显示以本机组件面板为准。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-misc-example.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**版本相关配置**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 视频地址 / 文件 | 在块内或配置抽屉设置 | 该类型不在内置默认配置表里，以本机组件面板显示为准。 |
| 自动播放 / 循环 / 控件 | 开 / 关 | 演示页面建议关闭自动播放，避免多个视频同时出声。 |

### 6. IFrame `iframe`

**做什么**：填 URL 即可嵌入外部网页；左侧还有**自定义数据配置**，可从接口或网页取数后展示。

![IFrame显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-iframe.png)

*显示效果：示例页未设置 URL 时显示「暂无数据」占位；填入 URL 后由目标页面接管。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-iframe.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础 / 数据**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| URL | 网页地址；默认空 | 目标站点需允许被嵌入；设置了 `X-Frame-Options` 的网站会显示空白。 |
| 自定义数据配置 | 接口请求 / 网页、GET / POST、请求入参、出参取值转换 | IFrame 是除图表外少数会显示「数据」配置区的原生块，可作轻量数据入口。 |
| Cron 执行时间 | 表达式或预设；默认不定时 | 与数据获取块相同，可周期性重新取数。 |

### 7. 二维码 `qrcode`

**做什么**：把文本或链接生成二维码，可设渲染方式、尺寸、颜色与中间图标。

![二维码显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-qrcode.png)

*显示效果：黑白二维码方块，中间可放图标，尺寸由「二维码大小」控制。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-qrcode.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**基础**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 内容 `value` | 文本或 URL；默认空 | 内容越长码越密，建议用短链接。 |
| 渲染类型 `renderType` | Canvas / SVG；默认 `canvas` | 需要矢量导出或高分辨率打印时选 SVG。 |
| 中间图标 `icon` / 图标大小 `iconSize` | 图标 URL 或 `[icon]名称`；默认空 / `40` | 图标过大会影响识别，建议不超过码的 20%。 |
| 二维码大小 `size` | 像素；默认 `160` | 投屏或打印时适当调大。 |
| 二维码颜色 `color` / 背景颜色 `backgroundColor` | 默认 `#000000` / `#ffffff` | 需保持足够对比度，浅色前景容易扫不出来。 |

### 8. 时钟任务 `clock`

**做什么**：按设定时间触发事件，联动其他块；运行时块上能看到状态、下次触发倒计时与「暂停 / 立即触发」。

![时钟任务显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-clock.png)

*显示效果：运行中状态、当前时间与距下次触发的倒计时。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-clock.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**调度与运行态**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 触发时间 | Cron 表达式或间隔预设 | 每天 9 点刷新查询、定时推送消息等场景。 |
| 状态 / 倒计时 / 暂停 / 立即触发 | 运行时块内操作 | 无需打开配置抽屉即可验证调度是否生效。 |
| 联动动作 | 输出时触发，联动目标块 | 可触发[Flow组件](./flow-widget.md)、[消息 / 通知](./dialog.md)或刷新图表。 |

> **提示**：时钟任务与页面绑定，页面关闭后不再触发；需要持续运行请改用 Flow 工作流的定时运行。

### 9. 屏幕操作 `screenTask`

**做什么**：编排屏幕、鼠标、键盘操作完成界面自动化；它是一张流程卡片，节点面板分类固定。

![屏幕操作显示效果](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-block-screenTask.png)

*显示效果：内嵌流程画布，含「开始 → 输入」等节点与节点面板。* · <a href="/fat-notes-home/img/instruction/sysBlocks/zh/sys-block-screenTask.png" target="_blank" rel="noopener">查看大图</a>

**私有配置**：

**样式 / 画布**

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 流程数据 `screenFlow` | 节点与连线 JSON；默认空画布 | 节点分类固定为屏幕、鼠标、键盘、浏览器、剪切板、媒体、系统。 |
| 流程图样式 `flowStyle` | 连线路径 / 输出点 / 输入点大小与颜色 / 卡片背景与阴影 | 只影响画布外观，不改变节点逻辑。 |
| 工具栏 `toolbar` | 是否显示（默认 `开`）、悬停或常态化、位置与外观 | 演示页可设为「鼠标移入显示」，让画布更干净。 |

> **提示**：详见 [Flow组件](./flow-widget.md)：三张工作流卡片共用运行、定时运行与联动机制。

## 配置速查

| 需求 | 用哪个块 | 关键配置 |
| --- | --- | --- |
| 页面标题 / 提示条 | 文本 | 内容、字号、对齐、颜色、高亮 |
| 长篇说明、模板 | Markdown | 内容、行高、允许滚动、新窗口打开链接 |
| 带样式的短段落 | 富文本 | 选中文字调工具栏 |
| 可点击的示意图 | 图片 | 资源 + 事件 → 联动 / 跳转 |
| 嵌入外部系统 | IFrame | URL / 自定义数据配置 |
| 分享链接 | 二维码 | 内容、尺寸、颜色、中间图标 |
| 定时刷新 | 时钟任务 | 触发时间 + 联动动作 |
| 界面自动化 | 屏幕操作 | 流程节点编排 |

## 典型组合

1. **文档型页面** — 文本横幅 + Markdown 说明 + 富文本重点摘要，配合[块面板](./layout.md)分区。
2. **图文看板** — 图表旁放 IFrame 嵌入帮助中心，页脚用二维码给出手机端链接。
3. **定时播报** — 时钟任务每天 9 点触发流程 → 结果写入变量 → [通知](./dialog.md)卡片提示 → 文本块显示更新时间。
4. **交互示意图** — 图片配置点击事件 → [抽屉](./dialog.md)展开图注与操作说明。

## 注意事项

- 富文本样式以工具栏支持的范围为准，删除线等未支持样式会被忽略。
- IFrame 依赖目标站点允许被嵌入；部分网站设置了 `X-Frame-Options`，会显示空白。
- 二维码内容越长、尺寸越小越难扫；建议控制长度并保持足够尺寸。
- 时钟任务与页面绑定的自动化块在页面关闭后不再触发；需要持续运行请改用[Flow组件](./flow-widget.md)的定时运行。
- 图片、视频、代码、终端等块的具体可用性会随安装版本与插件变化，以本机组件面板为准。

## 相关文档

- [总览](./overview.md) — 全部系统组件的分类清单
- [公共配置](./common-config.md) — 标题高亮、外框与内边距
- [窗口](./window.md) — 代码与终端块
- [Flow组件](./flow-widget.md) — 屏幕操作与定时调度
