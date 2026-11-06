---
sidebar_position: 2
title: 肥Ai基座（FatAiBase）
sidebar_label: 肥Ai基座（FatAiBase）
description: "FatAiBase（fat-ai-base）插件详解：OCR 与知识库两个 AI 配置页签、知识检索流程节点、chromadb / PaddleOCR / OpenCV / PaddlePaddle 后端脚本，以及按需安装的依赖与常见排错。"
---

# 肥Ai基座（FatAiBase）

> 大多数插件会往界面上加按钮、面板或图表；**肥Ai基座不会**。它是一枚「**能力底座**」：装好之后，你在界面上只会看到 AI 配置里多出 **OCR / 知识库** 两个页签、流程画布里多出 **知识检索** 一个节点，而真正的工作发生在后台——一个独立的 Python 子进程替宿主跑向量库、OCR 和图像处理这些重型库。本文按「**能用到什么 → 怎么配 → 背后怎么跑 → 出问题怎么查**」的顺序讲清楚它提供的功能。

## 一、它是什么：一枚看不见的能力底座

[热门插件总览](./index.md)里对它的简介是「AI 重型能力（chromadb 向量库 / PaddleOCR 文字识别 / OpenCV 图像处理）」。更准确地说，插件（`fat-ai-base`，Manifest 名 `Fat AI Base`）把三件事打包到了一起：

1. **前端贡献**：向宿主注册 2 个 AI 配置页签、1 个流程节点；
2. **后端能力**：一个随宿主启动的 Python 子进程，提供 5 类脚本的通用调用入口；
3. **重依赖按需安装**：4 个体积很大的 Python 包从宿主剥离，只在本插件首次启动时安装。

插件清单里 `activityBar / primarySidebar / panel / footer / routes / widgetTypes` 全部为 `false`，权限列表为空——**它没有自己的界面入口**，所有能力都「嵌」在宿主原有功能里。

![FatAiBase 在 FatNotes 中的分层位置](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-arch.png)

*自上而下：界面上用到的功能 → 宿主按脚本名分发 → 插件后端的 `run_script` → `backend/scripts/` 五类脚本 → 首次启动时安装的四个重型依赖。* · <a href="/fat-notes-home/img/instruction/fatAiBase/zh/faib-arch.png" target="_blank" rel="noopener">查看大图</a>

| 你能看到 / 用到的 | 插件实际提供 | 底层依赖 |
| --- | --- | --- |
| AI 配置 · **OCR** 页签 | 页签组件本身（条目增删改、排序、设为默认、语言标签） | — |
| AI 配置 · **知识库** 页签 | 页签组件本身（配置、文档上传入库、状态、重建索引） | `chromadb` |
| 流程 · **知识检索** 节点 | 节点定义、画布渲染与编辑面板 | `chromadb` |
| 截图取词、屏幕找文字、文档提取 | PaddleOCR 识别脚本 | `paddleocr` + `paddlepaddle` + `opencv-python` |
| 图像处理（尺寸、缩放编码） | OpenCV 脚本 | `opencv-python` |
| 自定义 Python 脚本 | `user_script.py` 示例与统一分发入口 | — |

:::info 它和「浏览器控制」插件是同一套机制
宿主的 `pyBackendBridgeService` 维护一张「脚本名 → 插件 ID」映射表：`chromadb_script.py / paddleocr_script.py / paddlepaddle_script.py / opencv_script.py / user_script.py` 归本插件，`playwright_script.py` 归 [肥・浏览器控制（fat-browser-use）](./index.md)。两枚插件都是「后端能力型」，区别只在提供的脚本。
:::

## 二、安装与首次启动

在[扩展中心](../guides/extensions.md)安装并启用 `fat-ai-base`。它属于**按需安装**：安装包里只有脚本和 `requirements.txt`，不含依赖本体。

| 项 | 值 / 说明 |
| --- | --- |
| 后端入口 | `backend/main.py`，`backend.enabled: true` |
| 依赖策略 | `depsStrategy: install` —— 首次启动后端时 `pip install --target backend/vendor` |
| 安装超时 | `depsTimeoutSeconds: 7200`（2 小时；宿主默认仅 120 秒） |
| 依赖清单 | `chromadb==1.5.1`、`paddlepaddle>=2.6,<3`、`paddleocr>=2.7,<3`、`opencv-python>=4.6,<5` |
| 体积 / 耗时 | 约 1–2 GB；源码注释明确提示「耗时可达小时级」 |
| 状态标记 | `backend/.deps_installed`、失败时 `backend/.deps_install_error` |
| 可选项 | `pipIndexUrl`（如清华镜像）、`pipExtraArgs`；强制 `PYTHONUTF8=1` 避免中文路径 / 注释乱码 |

:::caution 首次安装请留足时间和磁盘
应用启动时会在后台预热 OCR 引擎，这可能触发本插件首次启动与依赖安装。期间扩展中心显示「正在安装依赖…」，**知识库、OCR、知识检索节点都尚不可用**；失败时可点「重试」或复制界面给出的 **pip 命令** 手动安装。建议在联网、磁盘充足时完成首次安装，不要中途强杀进程。
:::

插件未安装或依赖未就绪时，宿主不会静默失败：AI 配置里的两个页签会保留占位并提示「该项由插件提供，请先安装并启用对应插件」；调用底层脚本则会抛出带指引的错误，例如「功能需要插件 fat-ai-base 支持（执行 chromadb_script.py）。请在扩展中心安装并启用该插件后重试」。

## 三、AI 配置：两个由插件提供的页签

点击左下角的 **AI** 图标进入 AI 配置。红框圈出的 **OCR** 与 **知识库** 两个页签完全由本插件注册；其余（大模型、记忆、MCP、TTS、ASR、Agent 策略）是宿主内置的。

![AI 配置左侧菜单，红框标出插件提供的 OCR 与知识库页签](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-tabs.png)

*菜单按权重排序：OCR 在前、知识库在后；插件卸载后菜单会保留占位条目并显示安装指引，避免配置「凭空消失」。* · <a href="/fat-notes-home/img/instruction/fatAiBase/zh/faib-tabs.png" target="_blank" rel="noopener">查看大图</a>

### 3.1 OCR 配置：管理识别条目

![OCR 配置列表，展开内置 Windows OCR 条目](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-ocr-list.png)

*列表支持拖拽排序；展开后可见 ID 与语言标签。内置的 `windows_ocr` 带「默认」标记，且不可编辑、不可删除。* · <a href="/fat-notes-home/img/instruction/fatAiBase/zh/faib-ocr-list.png" target="_blank" rel="noopener">查看大图</a>

![添加 OCR 弹窗：名称与语言](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-ocr-modal.png)

*新建 / 编辑表单只有「名称」「语言」两项，语言支持输入回车或逗号分隔的自由标签。*

| 操作 | 说明 |
| --- | --- |
| 添加 OCR / 编辑 / 删除 | 维护 OCR 条目；`windows_ocr` 为系统内置项，只能设为默认，不能改删 |
| 设为默认 | 非默认条目右上角的对勾按钮，写入 `isDefault` |
| 拖拽排序 | 右侧手柄拖动；失败会回滚并提示 |
| 语言标签 | 如 `zh-CN`、`en-US`，仅作为条目元信息展示 |

:::tip 这里不配识别参数，也不做「测试识别」
页面管理的是**条目清单**，没有识别语言下拉、GPU 开关或测试按钮。真正的识别由宿主的 `/app/ocr/*` 接口调用插件的 `paddleocr_script.py` 完成：Windows 上优先使用系统 `Windows OCR API`，不可用时回退到 PaddleOCR；屏幕取词、屏幕找文字、文档提取节点都走这条链路。换句话说，**PaddleOCR 是否可用，取决于本插件及其依赖是否装好**，而不是这里填了什么。
:::

### 3.2 知识库配置：从文档到向量检索

知识库页签是插件最完整的一块界面，覆盖「**建库 → 配参数 → 传文档 → 看状态 / 重建索引**」全流程。

![知识库配置列表，展开一条知识库的完整参数](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-kb-list.png)

*卡片副标题显示「Embedding 模型 · 索引名」；展开后的 7 行详情即这条知识库的全部关键参数，右上角依次是文档管理、编辑、删除、拖拽手柄。* · <a href="/fat-notes-home/img/instruction/fatAiBase/zh/faib-kb-list.png" target="_blank" rel="noopener">查看大图</a>

| 详情字段 | 含义 |
| --- | --- |
| ID | 知识库唯一标识，流程节点、文档接口都按它引用 |
| Embedding 模型 | 把文本片段转成向量所用的模型，**必填** |
| 索引 / 集合名 | chromadb 集合名；留空默认使用知识库 ID |
| 存储路径 | 向量库与文档目录；留空默认位于书籍目录下的 `kbs` |
| 切分（大小 / 重叠） | `chunkSize / chunkOverlap`，决定文档切多细、重叠多少 |
| 检索（topK / 阈值） | `topK / scoreThreshold`（0–1），决定召回几条、过滤多松 |
| 描述 | 备注，便于区分用途 |

![添加知识库弹窗：完整配置字段](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-kb-modal.png)

*除上表字段外，还能填描述、标签、语言；带红点的是必填项（名称、Embedding 模型）。*

| 表单项 | 控件 / 默认 | 说明 |
| --- | --- | --- |
| 名称 | 输入框，必填 | 列表与流程选择器里显示的名字 |
| 描述 / 标签 / 语言 | 文本域 / 自由标签 | 便于归类；语言为可选项 |
| Embedding 模型 | 下拉搜索，必填 | 从已配置的[大模型](../guides/ai-assistant.md)里选，需支持向量输出 |
| 索引 / 集合名 | 输入框，可选 | 默认使用知识库 ID |
| 存储路径 | 输入框，可选 | 默认书籍目录下 `kbs/<ID>` |
| 切分参数 | 两个数字框：`chunkSize` / `chunkOverlap` | 建议长文档 500 / 50 起步 |
| 检索参数 | 两个数字框：`topK` / `scoreThreshold`（步长 0.01） | 例如 5 / 0.35；阈值越高结果越少越准 |

点卡片右上角的**文档管理**图标，进入文档弹窗：

![知识库文档弹窗：上传区与文档表格](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-kb-docs.png)

*拖拽或点选即可批量上传；表格给出文件名、状态、片段数、更新时间与操作（打开 / 重建索引 / 删除）。存在排队或处理中的文档时每 2 秒自动刷新。*

| 状态 | 含义 |
| --- | --- |
| 已入库 `ready` | 切分、向量化、写入集合都已完成，可被检索 |
| 处理中 `processing` | 正在切分与向量化，此时「重建索引」按钮禁用 |
| 排队中 `queued` | 已上传，等待后台任务处理 |
| 失败 `error` | 行可展开查看红色错误信息，删除后重传或重建索引 |

**一次检索的数据链路**：上传文档 → 按切分参数切片 → 用 Embedding 模型转向量 → 由 `chromadb_script.py` 写入集合 → 流程节点或 AI 助手按 `topK / scoreThreshold` 召回片段。这条链路上的向量存取全部落在本插件后端，宿主只负责业务编排。

## 四、流程自动化：知识检索节点

插件向流程画布贡献了唯一一个节点 **`knowledgeRetrieval`（知识检索）**，归在「思维」分类，洋红色图标。在流程画布点「添加节点」，搜索节点名即可找到它：

![添加节点面板中搜索到的知识检索节点](pathname:///fat-notes-home/img/instruction/fatAiBase/zh/faib-flow-node.png)

*红框为插件注册的节点；宿主内置节点清单里已不含该类型，卸载插件后画布会显示带安装指引的占位。*

| 位置 | 字段 | 说明 |
| --- | --- | --- |
| 输入 | `input`（string） | 通常接上游节点的问题文本 |
| 配置 | `knowledgeBaseIds` | 多选知识库，来自知识库页签里的条目 |
| 配置 | `queryText` | 查询文本，支持变量引用；未填时使用输入变量 |
| 配置 | `delayAfterAction` | 执行后等待时间，默认 0 |
| 输出 | `passages` | 召回的片段数组（含文本与相似度等字段） |
| 输出 | `content` | 拼接后的文本，适合直接喂给大模型节点 |
| 输出 | `raw` | 原始返回对象 |
| 输出 | `time_used(ms)` | 本次检索耗时 |

一条典型的问答流程：

| 步骤 | 节点 | 关键配置 |
| --- | --- | --- |
| 1 | 开始 | 定义问题变量，例如 `question` |
| 2 | **知识检索** | 选中知识库；查询文本写 `$start_001.question` |
| 3 | 大模型 | 提示词里引用上一步的 `content`，要求基于资料作答 |
| 4 | 输出 / 文本块 | 展示答案与引用片段 |

:::tip 变量怎么写
查询文本支持 `$var.xxx` 引用子变量、`$var[idx]&` 引用数组下标，例如输入框里的 `$start_001.question`。宿主执行器会先解析变量，再调用知识库服务按 `topK`（限制 1–50）检索；因此**先确认文档已「已入库」**，再调 topK 和阈值，否则再大的 topK 也召不回内容。
:::

## 五、后端能力一览（进阶）

插件后端**不监听 HTTP 端口**，而是由宿主拉起的子进程，用 stdin / stdout 单行 JSON 通信。它对外只有两个业务 handler：

| Handler | 作用 |
| --- | --- |
| `run_script` | 入参 `{script, func, args, kwargs}`，按文件名从 `backend/scripts/` 加载模块并调用指定函数，返回 JSON 可序列化结果 |
| `list_scripts` | 列出全部脚本及其公开函数名 |

调用范式（宿主 `pyBackendBridgeService` 正是这样做的）：

```json
{
  "id": "req-1",
  "handler": "run_script",
  "params": {
    "script": "chromadb_script.py",
    "func": "query_embeddings",
    "args": [],
    "kwargs": { "collection_name": "kb_chunks", "query_embeddings": [[0.1, 0.2]], "n_results": 5 }
  }
}
```

模块与 PaddleOCR 实例在进程内**常驻缓存**，避免每次调用重新加载重型库；请求由 8 线程池并发处理。子进程还能通过 `hostCall` 反向调用宿主（读写插件配置、取系统路径、AI 对话、执行流程等），因此插件开发者不必自己开服务。

| 脚本 | 主要函数 | 上层用途 |
| --- | --- | --- |
| `chromadb_script.py` | `get_version` / `create_collection` / `get_or_create_collection` / `add` / `add_documents` / `query` / `query_embeddings` / `delete` | 知识库集合、写入、按文本或向量检索 |
| `paddleocr_script.py` | `get_version` / `warmup` / `ocr_image_base64` | OCR 识别，返回每行文字、置信度与坐标框 |
| `opencv_script.py` | `get_version` / `image_info_base64` / `resize_base64` | 读取图片尺寸、缩放并重新编码为 PNG / JPG |
| `paddlepaddle_script.py` | `get_version` / `device_info` | 深度学习运行时版本、CUDA 与设备信息 |
| `user_script.py` | `hello` / `add` | 自定义脚本示例；替换或新增脚本即可扩展能力 |

:::note 给插件开发者
`run_script` 会校验脚本路径必须位于 `backend/scripts/` 内，找不到脚本或函数时返回明确错误；脚本调用默认超时 3600 秒。若只是想调用已有能力，直接用宿主的 `execute_script_sync(script, func, ...)` 即可，不必自己处理子进程协议。更多约定见[插件开发](../plugin-dev/index.md)。
:::

## 六、典型组合与排错

| 场景 | 用到的插件能力 |
| --- | --- |
| 把产品手册喂给 AI 助手 | 知识库页签 → 文档入库 → Agent 技能绑定该知识库 |
| 流程里做「带资料来源的问答」 | 知识检索节点 → 大模型节点 → 输出块 |
| 截图取词 / 表单自动填字 | PaddleOCR 脚本（宿主屏幕取词、屏幕找文字节点） |
| 批量图片预处理 | OpenCV 脚本（`image_info_base64` / `resize_base64`） |
| 自动化操作网页 | 另装 `fat-browser-use`；本插件不提供 Playwright |

| 现象 | 优先检查 |
| --- | --- |
| AI 配置里没有 OCR / 知识库页签内容，只有安装指引 | 插件未安装或未启用；或后端依赖仍在安装中 |
| 报「功能需要插件 fat-ai-base 支持（执行 xxx_script.py）」 | 宿主按脚本名找不到插件；到扩展中心启用并等待依赖完成 |
| 依赖安装失败 / 超时 | 用界面「重试」，或复制 pip 命令手动装；弱网可配 `pipIndexUrl` 镜像 |
| 文档一直是「处理中」或变「失败」 | 展开失败行看错误；先确认 Embedding 模型可用，再重建索引或删除重传 |
| 知识检索节点返回空 | 文档是否已「已入库」、知识库是否选对、`scoreThreshold` 是否设得过高 |
| 文字识别没走 PaddleOCR | Windows 上系统 OCR 优先；这是宿主的既定回退策略，不是插件故障 |
| 节点 / 页签在升级后消失 | 查看扩展中心的插件状态；插件卸载后宿主会保留占位条目并显示安装指引 |

## 七、注意事项

- **它是底座，不是工具箱**：没有活动栏、侧边栏或独立页面，别在界面里找「FatAiBase」入口；从 AI 配置、流程节点和扩展中心三处观察它。
- **依赖很重**：约 1–2 GB、首次安装可能以小时计；`depsTimeoutSeconds: 7200` 就是为此设置的，不要改成宿主默认的 120 秒。
- **配置数据仍属于宿主**：OCR / 知识库条目写在宿主的 AI 配置里，插件只提供界面与执行能力；卸载插件不会删除已有配置，页签会保留占位。
- **OCR 页签不等于识别设置**：这里只管理条目；识别引擎选择、参数与识别接口在宿主侧。
- **知识库要选对 Embedding 模型**：它决定切片能否向量化入库，也是「文档上传成功但检索不到」最常见的原因。
- **版本差异**：脚本函数、表单字段可能随插件版本调整；以当前安装版本的界面与 `list_scripts` 返回为准。

## 相关文档

- [热门插件 · 总览](./index.md) —— 全部插件清单与项目地址
- [扩展中心](../guides/extensions.md) —— 安装、启用、依赖状态与重试
- [AI 助手](../guides/ai-assistant.md) —— 模型配置与 Agent 技能
- [流程自动化](../guides/flow-automation.md) —— 节点编排与变量传递
- [插件开发](../plugin-dev/index.md) —— 扩展点与插件结构
