---
sidebar_position: 3
title: 肥・浏览器控制（FatBrowserUse）
sidebar_label: 肥・浏览器控制（FatBrowserUse）
description: "FatBrowserUse（fat-browser-use）插件详解：13 个浏览器自动化流程节点、元素选择器工具、文件下载上传、Playwright 后端脚本与常驻会话机制，以及安装依赖与常见排错。"
---

# 肥・浏览器控制（FatBrowserUse）

> 装好它之后，界面上不会多出一个「浏览器」窗口，但流程画布的「添加节点」面板里会多出整整 **13 个蓝色节点**：打开网页、点击元素、输入文本、获取元素数据、下载文件……你可以像搭积木一样把它们串成一条自动化流水线。真正驱动浏览器的是后台一个常驻的 Python 子进程（Playwright），而节点、配置面板和「元素选择器」工具都由本插件提供。本文按「**它是什么 → 13 个节点能做什么 → 怎么串成流程 → 背后怎么跑 → 出问题怎么查**」来讲。

## 一、它是什么：能编排的浏览器自动化底座

[热门插件总览](./index.md)里对它的简介是「浏览器自动化（Playwright）」。更准确地说，插件（`fat-browser-use`，Manifest 名 `Fat Browser Use`）把三件事打包在一起：

1. **前端贡献**：向宿主注册 13 个 `browser` 分类的流程节点（画布渲染 + 配置面板），以及节点里的**元素选择器**拾取工具；
2. **后端能力**：一个随宿主启动的 Python 子进程，提供通用 `run_script` 入口和唯一脚本 `playwright_script.py`；
3. **依赖随包分发**：`playwright>=1.40,<2` 以 `depsStrategy: vendor` 打进插件包，安装即可用，不需要像 FatAiBase 那样等待小时级的首次 pip 安装。

插件清单的 `activityBar / primarySidebar / panel / footer / routes / widgetTypes` 全部为 `false`，权限列表为空——**它没有独立的界面入口**，所有能力都嵌在流程编辑器与流程执行器里。

![FatBrowserUse 在 FatNotes 中的分层位置](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-arch.png)

*自上而下：画布里的 13 个节点 → 宿主执行器 → 桥接层按脚本名分发 → 插件后端 `run_script` → `playwright_script.py` 的公开函数 → Playwright 与本机浏览器。* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-arch.png" target="_blank" rel="noopener">查看大图</a>

| 你能看到 / 用到的 | 插件实际提供 | 底层依赖 |
| --- | --- | --- |
| 流程 · **浏览器操作** 13 个节点 | 节点定义、画布卡片、配置面板 | 宿主 flow 引擎 |
| 配置面板里的**瞄准按钮** | 元素选择器弹窗与选择器生成脚本 | Playwright 打开的可见浏览器 |
| 流程运行时的点击、输入、取数、传文件 | `playwright_script.py` 中 20+ 个公开函数 | `playwright` + 本机浏览器 |
| 节点输出变量（`data`、`filePath`、`time_used(ms)` 等） | 执行器整理后的输出参数 | 宿主变量系统 |

:::info 和「肥・Ai基座」是同一套机制
宿主的 `pyBackendBridgeService` 维护一张「脚本名 → 插件 ID」映射表：`playwright_script.py` 归本插件，而 `chromadb_script.py / paddleocr_script.py / opencv_script.py` 等归 [肥・Ai基座（FatAiBase）](./fat-ai-base.md)。两枚插件都是「后端能力型」，差别在于：FatAiBase 靠 `depsStrategy: install` 首次启动再装 1–2 GB 依赖，本插件把约 40 MB 的 Playwright 直接打进包里；此外本插件还额外注册了整套前端节点。
:::

## 二、安装与首次启动

在[扩展中心](../guides/extensions.md)安装并启用 `fat-browser-use`。它的后端配置是 `backend.enabled: true`、`depsStrategy: vendor`、`depsTimeoutSeconds: 3600`——后两个字段是**打包阶段**把依赖 `pip install --target backend/vendor` 时用的，用户安装后不需要再等待依赖下载。

| 项 | 值 / 说明 |
| --- | --- |
| 后端入口 | `backend/main.py`，不监听 HTTP 端口，由宿主以 stdin/stdout 单行 JSON-RPC 拉起 |
| Python 依赖 | `playwright>=1.40,<2`，已随插件包 `dist/backend/vendor/` 分发 |
| 浏览器内核 | 优先复用本机 **Microsoft Edge / Google Chrome**（`channel`）；都没有时才回退到 Playwright 自带 chromium |
| 需要额外下载内核吗 | 一般不需要；若三种通道都不可用，执行 `playwright install chromium`（脚本里也提供 `install_browsers` 函数） |
| 运行模式 | 默认有头（可见浏览器）；「自定义浏览器」里可选**无头（Headless）** |

:::caution 会话是「进程内常驻」的
插件用 `_sessions[session_id]` 保存浏览器、上下文和当前页，**应用或插件后端一重启，会话就没了**。因此每条浏览器流程都应以「打开网页」开头；只放一个「点击元素」节点直接运行，会收到「未找到浏览器会话，请先执行打开网页节点」之类的错误。登录态、Cookie、多页签只在同一流程的一次运行内保持。
:::

插件未安装 / 未启用时，宿主不会静默失败：调用浏览器脚本会抛出带指引的错误，例如「功能需要插件 fat-browser-use 支持（执行 playwright_script.py）。请在扩展中心安装并启用该插件后重试」。

## 三、13 个节点：一张功能地图

在流程画布点「添加节点」，搜索「浏览器」即可看到红框中的完整清单——它们同属**浏览器操作**分类，蓝色图标，默认宽度 360、高度 100。

![添加节点面板中搜索「浏览器」得到的 13 个节点](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-node-panel.png)

*红框内即本插件注册的全部节点；卸载插件后，画布上已有的这些节点会显示带安装指引的占位。* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-node-panel.png" target="_blank" rel="noopener">查看大图</a>

| 分组 | 节点 | 能做什么 | 主要输出 |
| --- | --- | --- | --- |
| 页面导航 | **打开网页** | 启动/复用浏览器会话并访问 URL，可选浏览器、模式与等待条件 | `url`、`web_page_title` |
| 页面导航 | **刷新网页** | 默认刷新，或强制刷新 / 重新访问 URL / 执行 `location.reload()`；可按范围匹配 | `refresh_urls` |
| 页面导航 | **关闭网页** | 关闭全部或按 URL / 标题 / 关键字匹配关闭，最后释放会话 | `closed_urls` |
| 元素交互 | **点击元素** | 点击、双击、按下、松开；可设次数、间隔、按下时长、组合键 | `time_used(ms)` |
| 元素交互 | **输入文本** | 向输入框填字，支持变量；`fill` 失败时回退「点击 + 全选 + 键盘输入」 | `time_used(ms)` |
| 元素交互 | **下拉选择** | 按值 / 按文本 / 按索引选中 `<select>` 选项 | `time_used(ms)` |
| 元素交互 | **勾选元素** | 勾选 / 取消勾选复选框，先判断当前状态避免重复操作 | — |
| 元素交互 | **悬停元素** | 鼠标悬停并可保持指定时长，用于触发下拉菜单、提示框 | `time_used(ms)` |
| 元素交互 | **拖拽元素** | 从「源元素」拖到「目标元素」，可带组合键与拖拽时长 | `time_used(ms)` |
| 元素交互 | **滚动元素** | 鼠标滚轮滚动，可选垂直/水平、上/下/左/右、持续时长 | `time_used(ms)` |
| 数据读取 | **获取元素数据** | 读取元素的文本、HTML、全部属性或链接 URL | `data` |
| 文件传输 | **下载文件** | 点击触发下载，或直接按 URL 下载到本地目录 | `filePath`、`fileName`、`downloadPath` |
| 文件传输 | **上传文件** | 触发页面文件选择框，或按 URL 以 POST/PUT 上传本地文件 | `ok`、`statusCode`、`respText` 等 |

:::tip 几乎所有节点都共用三样东西
**元素选择器**（CSS，或 `xpath:` / `css:` 前缀、以 `//` 开头的 XPath）、**组合键**（Ctrl / Shift / Alt / Meta）与**动作后等待(ms)**（默认 0）。输入项都支持变量，例如把上游输出的 `data` 作为下一步的下载 URL。异常处理（超时、重试次数、处理方式）由宿主统一提供，不在插件里配置。
:::

### 3.1 页面导航：打开、刷新、关闭

「打开网页」是整条流程的起点，也是唯一会**创建浏览器会话**的节点。

![打开网页节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-open.png)

*红框为「打开方式」；选择「自定义浏览器」后才会出现浏览器与模式（普通 / 无头）。* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-open.png" target="_blank" rel="noopener">查看大图</a>

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| URL | 必填，支持变量 | 只允许 `http` / `https`；节点的 `input` 输入可用 `$input` 形式替换到 URL 里 |
| 打开方式 | 默认浏览器 / 自定义浏览器 | 自定义时可指定已安装的浏览器（下拉来自 `app/flow/installedBrowsers`） |
| 模式（自定义时） | 普通 / 无头（Headless） | 无人值守、服务器上跑流程时选无头 |
| 等待条件 | 加载完成 / DOM加载完成 / 自定义时间 | 前两者对应 Playwright 的 `load` / `domcontentloaded`；自定义时再填等待秒数 |
| 动作后等待(ms) | 默认 0 | 页面脚本异步渲染时，给后续节点留缓冲 |

底层依次调用 `ensure_page`（按会话 ID 复用或新建浏览器）→ `goto`（导航）→ `page_info`（回填实际 URL 与标题），并把 `browser_session_id` 写进执行上下文供后续节点共用。

![刷新网页节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-refresh.png)

*「刷新方式」切到自定义后，才会展开强制刷新、重新访问 URL、执行 `location.reload()` 等选项与作用范围。*

刷新与关闭共用一套**匹配规则**：作用范围可选当前页签、所有页签、匹配 URL、匹配标题、自动匹配；「精确匹配」把包含匹配改为完全相等；匹配值支持变量。底层分别是 `refresh` 与 `close_all / close_by_rule / close_current`，没有匹配到页面时会明确报错，而不是悄悄跳过。

### 3.2 元素交互：从点击到滚动

![点击元素节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-click.png)

*红框标出「元素选择器」；右侧瞄准按钮打开元素选择器工具，见 3.3。* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-click.png" target="_blank" rel="noopener">查看大图</a>

| 配置项 | 可选值 / 默认 | 说明 |
| --- | --- | --- |
| 元素选择器 | 必填 | CSS 选择器为主；也支持 `xpath:`、`css:` 前缀和以 `//` 开头的 XPath |
| 动作 | 点击 / 双击 / 按下 / 松开 | 「按下」「松开」直接派发 `mousedown` / `mouseup`，适合拖拽式控件 |
| 组合键 | Ctrl / Shift / Alt / Meta（可多选） | 执行动作期间按住，结束后自动释放 |
| 按下时长 | 默认 0 ms | 大于 0 时作为 Playwright 的 `delay` |
| 点击次数 / 点击间隔(ms) | 1 / 0 | 多次点击时按间隔逐次执行；双击动作会自动把次数补到 2 |
| 动作后等待(ms) | 默认 0 | 等待页面跳转或异步渲染 |

其余交互节点沿用同一套范式，只是动作维度不同：

| 节点 | 特有配置 | 底层行为 |
| --- | --- | --- |
| 输入文本 | 输入文本（支持变量） | `locator.fill` 优先；失败则点击 → 全选 → `keyboard.type` |
| 下拉选择 | 选中方式：按值 / 按文本 / 按索引 + 选中值 | `select_option` 的 `value` / `label` / `index` |
| 勾选元素 | 动作：勾选 / 取消勾选 | 先读 `is_checked()`，只在状态不符时 `check()` / `uncheck()` |
| 悬停元素 | 悬停时长 | `locator.hover()` 后按设定等待 |
| 拖拽元素 | 源元素选择器 + 目标元素选择器 + 拖拽时长 | `locator.drag_to()` |
| 滚动元素 | 滚动方式、轴向（垂直/水平）、方向（上/下/左/右）、持续时长 | 悬停到目标后 `mouse.wheel`，有持续时长时按 50 ms 分步滚动 |

![输入文本节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-input.png)

*选择器与文本都支持变量；这是「搜索框输入关键词 → 点击搜索」这类组合里最常用的一步。*

### 3.3 元素选择器工具：不用手写 CSS

每个带选择器的配置项右侧都有一个**瞄准按钮**。点开后是下图弹窗：可留空复用当前已打开的页面，也可填 URL 让工具自动导航并复用同页面的浏览器窗口；点「启动选择器」后会打开一个可见浏览器，并在页面右上角注入操作提示条。

![选择元素弹窗：URL 与 Ctrl / Shift 选取说明](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-selector.png)

| 操作 | 结果 |
| --- | --- |
| **Ctrl + 点击** | 为单个元素生成从根节点到它的 CSS 路径（遇到 `id` 会用 `#id` 截断） |
| **Shift + 依次点击两个相似元素** | 比较两条 DOM 路径，抽取共同标签、`id` 与共同 class，生成能匹配一整组元素的 CSS 选择器 |
| 选中后 | 结果通过 `on_element_selected` 回传，弹窗关闭并自动回填到选择器输入框 |

:::caution 这一步需要人参与
`run_selector_tool` 会**阻塞等待**你在浏览器里点选元素，因此桥接层把脚本超时放宽到 3600 秒。启动后若不按 Ctrl / Shift 直接点击，页面按普通点击处理，不会生成选择器；鼠标移动时的蓝色高亮框就是当前候选元素。选完记得让流程继续，别把弹窗挂在那里。
:::

### 3.4 获取元素数据：把网页内容带回流程

![获取元素数据节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-data.png)

*红框标出「获取内容」下拉，决定 `data` 输出的类型。*

| 获取内容 | 输出 `data` | 典型用途 |
| --- | --- | --- |
| 文本 `text` | `inner_text()` | 抓标题、价格、状态文字 |
| HTML `html` | `inner_html()` | 保留内部结构，交给后续文本处理节点 |
| 属性 `attributes` | 属性名 → 值的对象 | 一次拿齐 `class`、`data-*` 等元信息 |
| URL `url` | 第一个非空的 `href` / `src` / `data-url` / `url` | 抓链接或图片地址，接「下载文件」 |

取数失败时返回空字符串 / 空对象而不是抛错，便于在流程里用条件节点判断。拿到 `data` 后可以接[数据写入节点](../guides/flow-automation.md)，或作为下一步的输入变量。

### 3.5 下载与上传文件

两个节点都提供「触发」和「URL」两条路径，区别在于**是否需要浏览器会话**。

![下载文件节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-download.png)

*红框为「下载方式」；切到「URL下载」后显示文件 URL，切到「触发下载」则显示触发选择器。*

| 下载方式 | 关键配置 | 底层行为 | 输出 |
| --- | --- | --- | --- |
| 触发下载（默认） | 触发选择器、下载路径、文件名（可选） | 用 `playwright_script.py` 的 `click` 点击元素（失败自动 force 重试），宿主监测目录里新增的文件，必要时改名 | `filePath`、`fileName`、`downloadPath` |
| URL 下载 | 文件 URL、下载路径、文件名（可选） | 宿主用 `requests` 流式下载，按响应头 / URL 猜文件名，先写 `.part` 再原子替换 | 同上 |

![上传文件节点的配置抽屉](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-config-upload.png)

*红框为「上传方式」；URL 上传时会出现请求方式、上传参数与上传地址。*

| 上传方式 | 关键配置 | 底层行为 | 输出 |
| --- | --- | --- | --- |
| 触发上传（默认） | 触发选择器、本地文件路径 | 调用 `upload_file`，用 Playwright 的 `set_input_files` 直接把文件塞给 `<input type="file">` | `ok`、`uploadType`、`filePath`、`fileName` |
| URL 上传 | 文件 URL / 本地文件、请求方式 POST 或 PUT、上传地址、上传参数 | 宿主先把远端文件取到本地临时文件，再用 `requests` 以 multipart 提交 | `ok`、`statusCode`、`respText`、`filePath`、`fileName` |

:::tip 怎么选
页面上有「导出」「下载」按钮 → 用**触发**方式（能带上登录态与 Cookie）；已知直链或要对接接口 → 用 **URL** 方式（不依赖浏览器会话，也更快）。URL 上传适合把抓到的文件转发到自己的服务，触发上传适合填网页表单。
:::

## 四、把节点串成流程：一次完整自动化

下面是一条典型链路，图中每一步都标了对应的脚本函数与输出变量：

![一条典型的浏览器自动化流程](pathname:///fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-flow.png)

*从「打开网页」创建会话，到取数、下载、关闭释放资源；`browser_session_id` 贯穿全程。* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/zh/fbu-flow.png" target="_blank" rel="noopener">查看大图</a>

| 步骤 | 节点 | 关键配置 |
| --- | --- | --- |
| 1 | 开始 | 定义 `url`、`keyword` 等变量 |
| 2 | **打开网页** | URL 写 `$start_001.url`；等待条件选「加载完成」 |
| 3 | **输入文本** | 选择器用元素选择器工具拾取搜索框；文本写 `$start_001.keyword` |
| 4 | **点击元素** | 点击搜索按钮；动作后等待 800 ms 让结果渲染 |
| 5 | **获取元素数据** | 选择器指向结果列表；获取内容选「文本」或「属性」 |
| 6 | **下载文件** | 触发下载或 URL 下载，输出 `filePath` 供后续归档 |
| 7 | **关闭网页** | 关闭所有网页，释放浏览器会话 |

四条公共机制值得单独记住：

- **会话**：只有「打开网页」创建 `browser_session_id`；后续节点共用同一个浏览器上下文，登录态、Cookie、页签得以延续。
- **等待**：等待条件管加载，动作后等待管渲染；动态页面几乎总要给某个节点加几百毫秒。
- **变量**：输入框支持 `$var.xxx` 引用上游输出，选择器、文本、URL、下载/上传路径都可以参数化；配合循环节点可批量处理。
- **异常**：超时（默认 60 s）、重试次数与处理方式由宿主统一配置；浏览器动作失败时节点返回 `FAILED` 并带上具体错误。

| 场景 | 建议组合 |
| --- | --- |
| 登录后抓多页数据 | 打开网页 → 输入文本 ×2 → 点击元素 → 循环（获取元素数据 → 新增数据）→ 关闭网页 |
| 定时下载日报并归档 | [定时任务](../guides/scheduled-tasks.md) → 打开网页 → 点击元素 → 下载文件 → 写入数据表 |
| 批量填表 / 提交 | 打开网页 → 输入文本 / 下拉选择 / 勾选元素 → 点击元素 → 获取元素数据（校验结果） |
| 抓链接再下载 | 获取元素数据（`url`） → 下载文件（URL 下载） |
| 无人值守运行 | 打开网页选「自定义浏览器 + 无头」，避免弹出可见窗口 |

## 五、后端能力一览（进阶）

插件后端**不监听 HTTP 端口**，而是由宿主拉起的子进程，用 stdin / stdout 单行 JSON 通信。它对外只暴露一个业务 handler：

| Handler | 作用 |
| --- | --- |
| `run_script` | 入参 `{script, func, args, kwargs}`，按文件名从 `backend/scripts/` 加载模块并调用指定函数 |

调用范式（宿主的执行器正是这样做的）：

```json
{
  "handler": "run_script",
  "params": {
    "script": "playwright_script.py",
    "func": "click",
    "args": [],
    "kwargs": {
      "session_id": "flow-run-001",
      "selector": "#submit",
      "action": "click",
      "click_count": 1
    }
  }
}
```

模块加载后有进程内缓存；脚本自己维护一个后台 asyncio 事件循环线程、`_sessions` 会话字典和选择器事件，因此**连续多个节点之间不会重新启动浏览器**。子进程的 RPC 分发使用 8 线程池，默认调用超时 3600 秒。

| 函数组 | 主要函数 | 上层用途 |
| --- | --- | --- |
| 会话与导航 | `ensure_page` / `goto` / `page_info` | 打开网页节点 |
| 元素动作 | `click` / `input_text` / `hover` / `check` / `drag_to` / `scroll` / `select` | 7 个交互节点 |
| 页面管理 | `refresh` / `close_current` / `close_by_rule` / `close_all` | 刷新、关闭网页节点 |
| 数据与文件 | `get_element_data` / `upload_file` | 获取元素数据、触发上传 |
| 选择器工具 | `run_selector_tool` | 配置面板里的元素拾取 |
| 独立能力 | `get_version` / `install_browsers` / `fetch_html` / `screenshot_base64` | 版本自检、安装内核、无会话直接取 HTML / 整页截图 |

:::note 关于截图与取 HTML
脚本里确实有 `fetch_html`（无头打开 URL 返回完整 HTML）和 `screenshot_base64`（整页 PNG 的 base64），但**当前 13 个节点里没有「网页截图」或「取网页源码」节点**；它们是留给宿主功能或插件开发者直接调用的能力。想抓页面内容，请用「获取元素数据」。给插件开发者：`run_script` 会校验脚本路径必须在 `backend/scripts/` 内，找不到脚本或函数时返回明确错误；更多约定见[插件开发](../plugin-dev/index.md)。
:::

## 六、排错与注意事项

| 现象 | 优先检查 |
| --- | --- |
| 报「功能需要插件 fat-browser-use 支持（执行 playwright_script.py）」 | 插件未安装 / 未启用；到扩展中心启用后重试 |
| 报「未找到浏览器会话，请先执行打开网页节点」 | 流程没有以「打开网页」开头，或上一步已关闭全部网页 |
| 浏览器启动失败 | 本机既无 Edge / Chrome，也没装 Playwright chromium；执行 `playwright install chromium` |
| 选择器找不到元素 / 超时 | 页面未加载完成、动作后等待太短、元素在 iframe 或动态生成；用元素选择器工具重新拾取 |
| 点击 / 输入没反应 | 元素被遮挡或不在视口；缩短链路、加等待，或换更稳定的选择器（`#id`、属性选择器） |
| 元素选择器弹窗一直转圈 | 它在等人工点选：按住 Ctrl 点单个，或 Shift 依次点两个相似元素 |
| 下载目录里没文件 | 下载路径是否存在、文件名是否冲突、触发按钮是否真的产生下载；可改 URL 下载验证直链 |
| 上传返回失败 | 触发上传的 `<input type="file">` 是否选对；URL 上传检查地址、请求方式与参数 |
| 流程重跑要重新登录 | 会话只常驻在插件子进程里，应用 / 后端重启即清空；需要持久化登录态请自行在流程里补登录步骤 |
| 节点 / 配置面板在升级后消失 | 查看扩展中心插件状态；卸载后画布会保留占位并显示安装指引 |

- **它是节点包，不是浏览器**：没有独立窗口、侧边栏或设置页；从流程画布的「添加节点」和扩展中心两处观察它。
- **第一步必须是打开网页**：其余 12 个节点都依赖会话，单独运行没有意义。
- **会话不要并发共用**：同一 `session_id` 对应一个浏览器上下文，并行跑多个流程实例请拆成不同流程运行，避免互相抢页面。
- **选择器是脆弱环节**：优先 `id`、稳定的 `data-*` 属性；用 Shift 生成的「相似元素」选择器适合列表批量取数。
- **配置数据仍属于宿主**：流程与节点参数写在页面里，插件只提供节点定义和执行能力；卸载不会删除已有流程。
- **版本差异**：函数清单、表单字段可能随插件版本调整；以当前安装版本的界面为准。

## 相关文档

- [热门插件 · 总览](./index.md) —— 全部插件清单与项目地址
- [肥・Ai基座（FatAiBase）](./fat-ai-base.md) —— 同一套后端桥接机制的另一枚能力插件
- [扩展中心](../guides/extensions.md) —— 安装、启用与依赖状态
- [流程自动化](../guides/flow-automation.md) —— 节点编排、变量与异常处理
- [定时任务](../guides/scheduled-tasks.md) —— 让浏览器流程按计划自动运行
- [插件开发](../plugin-dev/index.md) —— 扩展点与插件结构
