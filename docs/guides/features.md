---
sidebar_position: 0
title: 功能总览
description: FatNotes（肥仔笔记）完整功能介绍：块级画布、数据看板、流程自动化、AI 能力、插件生态与插件开发。
---
<!-- FatNotes 完整功能介绍 -->

# FatNotes 功能总览

FatNotes（肥仔笔记）是一款**本地优先的桌面级知识工作台**，运行于 Windows。它把笔记、数据看板、流程自动化和 AI 助手装进同一个专业界面——像一个「懂数据的 Notion + 懂自动化的 IDE」。

![FatNotes 数据看板](pathname:///fat-notes-home/img/features/dashboard.png)

## 它解决什么问题？

| 常见痛点 | FatNotes 的回答 |
| --- | --- |
| 笔记软件记了就沉睡，数据永远躺在 Excel 里 | 块级画布上，笔记、表格、图表、表单可以放在**同一页**并联动 |
| 做个报表要开数据库客户端 + Excel + 截图粘贴 | 直连 SQLite / MySQL / PostgreSQL 等数据源，查询结果直接变成看板组件 |
| 重复的数据整理工作靠人肉 | 可视化流程引擎把「查询 → 转换 → 通知 → 写入」串成自动执行的工作流 |
| AI 回答不结合自己的资料 | 内置知识库（RAG）、记忆、Agent，AI 直接读你的笔记和数据 |

## 五分钟看懂 FatNotes

- **块级画布**：60+ 种块类型，拖拽布局，所见即所得
- **数据看板**：多数据源接入，图表组件丰富，支持筛选联动
- **流程自动化**：节点式编排，支持定时、条件、循环、外部调用
- **AI 全家桶**：大模型对话、知识库检索、OCR / TTS / ASR、MCP 协议
- **插件生态**：Module Federation 运行时加载，一条命令开发自己的插件

下面逐个展开。

---

## 一、块级画布：60+ 种块自由拼装

FatNotes 以「块（Block）」为基本单位搭建页面，基于拖拽网格布局，块可以自由缩放、嵌套、分组。

### 块类型一览

| 分类 | 代表块类型 |
| --- | --- |
| **文档** | 文本、Markdown、富文本（Slate）、代码（Monaco）、Excel（Univer）、Word、PPT、PDF |
| **图表** | 折线、饼图、雷达、热力、K 线、树图、矩形树图、桑基、漏斗、象形柱、主题河流（ECharts） |
| **媒体** | 图片、视频、音频、走马灯、IFrame、二维码 |
| **表单与控件** | 输入框、日期、开关、单选、多选、下拉、滑块、颜色选择器、上传、穿梭框、级联选择 |
| **布局** | 分组、面板、页签、分割面板、主面板 / 侧栏 / 状态栏 / 菜单栏 |
| **数据** | 数据源、表格、过滤器、时间过滤器、爬虫、ETL DAG |
| **其他** | 终端（xterm）、拓扑图、流程图、泳道图、思维卡片、屏幕任务、时钟任务、变量、弹框 / 抽屉 / 通知 |

### 布局容器示例

分组、面板、页签、分割面板可以任意嵌套，搭建出接近专业软件的操作界面：

![画布布局：分组 + 主面板 + 页签组合](pathname:///fat-notes-home/img/features/canvas-layout.png)

### 图表组件

同一页面上组合数据表格、仪表盘、热力分布、趋势图等多种图表：

![图表组件页：表格 + 仪表盘 + 热力图 + 趋势](pathname:///fat-notes-home/img/features/chart-components.png)

「图表类型展廊」在一页内集合 10 种图表块——数字卡、趋势图（line / bar / area）、排行榜、蜂群图、仪表盘、饼图、数据表格等，全部由同一份销售订单数据驱动：

![图表类型展廊：10 种图表块合集](pathname:///fat-notes-home/img/features/charts-display.png)

### 时间过滤器联动

每个看板都可以绑定时间过滤器，快捷区间（今天 / 最近 N 分钟 / 最近 N 小时）与绝对时间随意切换，所有图表随之刷新：

![时间过滤器联动演示](pathname:///fat-notes-home/img/features/time-filter.gif)

---

## 二、数据能力：从连接到呈现

### 多数据源管理

内置数据库管理器，支持 SQLite、MySQL、PostgreSQL、MariaDB、TimescaleDB 等数据源，可视化浏览表结构与数据：

![数据库管理器](pathname:///fat-notes-home/img/features/db-manager.png)

### 电子表格（Univer 引擎）

内置类 Excel 的电子表格块，支持公式、样式、多页签，费用明细、报价单这类业务表格可以直接在笔记里维护：

![Univer 电子表格：营销费用明细表](pathname:///fat-notes-home/img/features/univer-sheet.png)

### 文档解析

依托 pandas、openpyxl、python-docx、python-pptx、pypdf，Excel / Word / PPT / PDF 都能被解析成结构化数据，喂给看板或 AI。

### 演示看板实况

以下看板全部来自 FatNotes 演示工作空间，由内置 SQLite 数据驱动，可以直接对照学习搭建思路：

**销售经营驾驶舱**——销售额、订单量、客单价与退货趋势一屏总览：

![销售经营驾驶舱](pathname:///fat-notes-home/img/features/charts-sell.png)

**流量增长观测**——PV / UV、停留时长、渠道来源与增长对比：

![流量增长观测](pathname:///fat-notes-home/img/features/charts-hot.png)

**设备运维监控**——多设备温度曲线、告警计数与全站平均温度仪表盘：

![设备运维监控](pathname:///fat-notes-home/img/features/charts-monitor.png)

**健康打卡追踪**——体重、步数、睡眠时长与心率长期追踪：

![健康打卡追踪](pathname:///fat-notes-home/img/features/charts-heath.png)

**电商业务分析**——订单金额、转化趋势、热销 TOP 与每日交易类型分布：

![电商业务分析](pathname:///fat-notes-home/img/features/charts-eshop.png)

---

## 三、流程自动化：把重复工作交给引擎

流程编辑器将任务拆分为可连接的节点，画布上拖拽连线即可编排执行顺序。内置节点覆盖：

- **逻辑控制**：条件分支、循环、迭代、等待、变量
- **数据**：数据源查询 / 增删改、表达式、代码执行
- **AI**：大模型调用、知识库检索、Agent
- **外部交互**：HTTP 请求、屏幕自动化（鼠标 / 键盘 / 找图 / 找色 / 截图）、浏览器自动化（Playwright）
- **媒体**：音频 / 视频转码、TTS、ASR、OCR

### 完整流程画布示例

下面是一条真实的完整流程——「异常报告智能决策流」，从开始节点、分支判断到 HTTP 调用、代码执行、结果通知，全部在画布上节点化编排：

![流程画布：异常报告智能决策流](pathname:///fat-notes-home/img/features/flow.png)

### 实际运行演示

下面这个例子：在输入块填入 Unix 时间戳 → 点击「构建」→ 流程引擎执行「时间离线转换」节点 → 结果自动回填到文本块并弹出通知：

![流程自动化运行演示](pathname:///fat-notes-home/img/features/flow-run.gif)

运行完成后，「转换结果」块自动从 `$value` 变为格式化后的时间：

![流程运行结果：1790000000 → 2026-09-21 22:13:20](pathname:///fat-notes-home/img/features/flow-result.png)

### 流程与看板联动

流程不止能单独运行——ETL DAG 也是画布上的一种块，可以和输入框、图表放在同一页，构成「输入 → 处理 → 可视化」的交互式小应用。

---

## 四、图形与思维工具

流程图、思维导图、关系图开箱即用，双击节点即可编辑，适合梳理系统架构、业务流程和知识关联：

![关系与流程图：流程图 + 思维导图 + 关系图](pathname:///fat-notes-home/img/features/diagrams.png)

笔记与图表可以互相连线，形成「数据 → 结论」的显式关联：

![笔记与图表联动](pathname:///fat-notes-home/img/features/notes-charts.png)
![笔记与图表联动](pathname:///fat-notes-home/img/features/relate.png)

---

## 五、AI 能力：让知识工作台长出大脑

AI 配置中心统一管理所有 AI 能力：

![AI 配置：大模型 / OCR / 知识库 / 记忆 / MCP / TTS / ASR / Agent 策略](pathname:///fat-notes-home/img/features/ai-settings.png)

| 能力 | 说明 |
| --- | --- |
| **大模型对话** | 次级侧栏为 Chat 保留，随时唤起对话，支持 DeepSeek 等模型 |
| **知识库（RAG）** | 把笔记、文档向量化，AI 回答基于你自己的上下文 |
| **记忆** | 跨会话记住偏好与事实 |
| **Agent 与技能** | 任务拆解、工具调用、自定义 Agent 策略 |
| **OCR / TTS / ASR** | 图片转文字、文字转语音、语音转文字 |
| **MCP 协议** | 标准 Model Context Protocol 服务接入，扩展 AI 的工具边界 |

按 `Ctrl + K` 打开命令面板，可直接「打开 Chat」进入 AI 对话：

![命令面板：打开 Chat / 命令面板](pathname:///fat-notes-home/img/features/command-palette.png)

---

## 六、全局搜索与效率细节

- **全局搜索**：内置 ripgrep，文件、功能、工作流秒搜（`Ctrl + K`）

![全局搜索：按名称搜文件与插件](pathname:///fat-notes-home/img/features/global-search.png)

- **内置终端块**：PowerShell / CMD / Bash 直接嵌在看板里，命令输出可以驱动其他块

![终端块：PowerShell / CMD / Bash](pathname:///fat-notes-home/img/features/terminal.png)

- **中英双语**（zh_CN / en_US）、**应用内自动更新**、**资源仓库**（图片 / 音视频素材统一管理）

---

## 七、使用场景（含演示数据）

以下场景全部来自 FatNotes 演示工作空间的真实运行数据。

### 场景 1：个人学习与目标追踪

把学习打卡数据放进内置 SQLite，看板自动汇总。

**示例数据**（`test_db.goodman` 表）：

| ID | name | age | createDate | score | lastName |
| --- | --- | --- | --- | --- | --- |
| 3 | 子轩 | 20 | 2026-10-01 | 90 | 张 |
| 5 | 雨桐 | 18 | 2026-09-30 | 80 | 李 |
| 4 | 文静 | 70 | 2026-09-17 | 70 | 孟 |
| 6 | 泽宇 | 6 | 2026-09-04 | 50 | 张 |
| 7 | 诗涵 | 2 | 2026-10-01 | 20 | 王 |
| 8 | 俊杰 | 5 | 2026-09-17 | 60 | 李 |

**看板呈现**：核心指标趋势（score 走势）、渠道占比饼图、完成度仪表盘自动生成，改数据即改图表。

### 场景 2：采购与进销存管理

用电子表格块维护「询价采购表」，替代散落各处的 Excel：

| 序号 | 材料名称 | 规格型号 | 计量单位 | 数量 | 到货时间 |
| --- | --- | --- | --- | --- | --- |
| 1 | 冷却塔皮带 | SHPB3700-KS4 | 套 | 2 | 2025-09-28 |
| 5 | 风机皮带 | SPB2500 | 套 | 6 | 2025-09-28 |
| 8 | 空调过滤网 | 铝合金,活性炭490\*490\*46 | 套 | 40 | 2025-09-28 |

配合数据块做到货统计，配合流程节点做超期提醒——表格不再只是「死文档」。

### 场景 3：数据格式自动化

接手别人系统里最常见的脏数据：Unix 时间戳。编排一条流程：

```
输入块(Unix 时间戳) → 时间离线转换 → 转换结果文本块 + 系统通知
```

输入 `1790000000`，一键得到 `2026-09-21 22:13:20`（见上文运行演示）。同样的模式可以套用在日志清洗、编码转换、定时抓取等任务上。

### 场景 4：经营分析与 AI 周报

笔记与图表同屏：左侧放「经营分析周报」笔记，右侧放业务图表并连线关联。写周报时让 AI 读取知识库与本页数据，生成基于真实数据的总结——**分析结论和支撑数据永远在同一页面上**。

### 场景 5：团队工具箱

用插件把 FatNotes 变成团队门户：IT 面试题库、游戏箱、3D 展示……见下一节。

---

## 八、插件系统与第三方插件生态

### 插件机制

FatNotes 插件基于 **Module Federation** 在运行时加载（类比 VSCode 扩展模型）。插件可以贡献：

- 活动栏图标、主侧栏视图、面板页签、底部栏状态
- 全页路由、工作台页面、设置页
- **自定义块类型**、块显示配置、添加块菜单分类
- **流程节点类型**（画布渲染 + 抽屉编辑）
- 全局搜索提供者、AI 设置页、右键菜单、命令

宿主保持零重型依赖——chromadb、PaddleOCR、Playwright 等重量级能力都由插件按需安装。

### 生态里的第三方插件实况

**人体图谱**（fat-dissect）：2,234 个建模部件的可交互 3D 人体，支持系统筛选与拆卸：

![第三方插件：人体图谱 3D](pathname:///fat-notes-home/img/features/plugin-body3d.png)

**Fat Games 游戏箱**：内置 31 款小游戏（2048、俄罗斯方块、贪吃蛇、扫雷、五子棋……）：

![第三方插件：游戏箱](pathname:///fat-notes-home/img/features/plugin-games.png)

**工具箱**（fat-tools）：Tesla Model X 3D 展示与部件爆炸拆解：

![第三方插件：Tesla Model X 3D](pathname:///fat-notes-home/img/features/plugin-tesla.png)

**IT 面试题库**（fat-it-interview）：364 道题，覆盖前端 / Java / 后端 / 运维 / 算法 / 数据库，支持刷题记录：

![第三方插件：IT 面试题库](pathname:///fat-notes-home/img/features/plugin-interview.png)

**轻型写作**（fat-pen）：项目制写作工作区：

![第三方插件：轻型写作](pathname:///fat-notes-home/img/features/plugin-pen.png)

官方维护的插件还包括：

| 插件 | 说明 |
| --- | --- |
| fat-ai-base | AI 重型能力（chromadb / PaddleOCR / OpenCV） |
| fat-browser-use | 浏览器自动化（Playwright） |

---

## 九、插件开发：一条命令起步

### 快速开始

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

### 插件入口

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

### SDK 能力一览

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

### 开发与发布

```bash
fn-ext dev     # watch 模式开发
fn-ext build   # 构建
fn-ext pack    # 产出 release/<code>_v<version>.zip
```

打包出的 zip 在应用内「设置 → 高级插件」直接安装。开发调试时也可以把插件 `dist` 目录以 devMode 注册进宿主，改完即生效。

> 完整 SDK 文档与模板见脚手架仓库：`fat-notes-extension-cli`。

---

## 十、开始使用

- 下载与安装：见 [快速开始](../getting-started/quick-start.md)
- 系统要求：Windows 10+（WebView2 运行时），安装即用
- 开源协议：AGPLv3，仓库地址 [LazyChun/fat-notes](https://github.com/LazyChun/fat-notes)

:::tip 持续进化
FatNotes 仍在快速迭代，本文截图来自当前最新版本，界面可能随版本略有变化。
:::
