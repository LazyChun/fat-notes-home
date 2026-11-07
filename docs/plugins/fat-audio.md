---
title: 肥音（FatAudio）
sidebar_label: 肥音（FatAudio）
description: "肥音（fat-audio）插件详解：AI 音乐工作室的四个视图（主工作区 / AI 生成 / 乐谱编辑 / 乐器音调）、工程与传输条、8 轨钢琴卷帘与混音台、五线谱编辑、16 件合成乐器与音色参数，以及本地 JSON 存储和 AI 生成的当前占位实现。"
---

# 肥音（FatAudio）

> 装好插件后，左侧活动栏会多出一枚**音频（audio）图标**。点开是一整页的 **AI 音乐工作室（AMS）**：以「音频工程」为单位，把多轨钢琴卷帘、五线谱、混音台、虚拟钢琴和 AI 生成放在同一个工作区里。声音由浏览器的 Web Audio API **实时合成**（不需要音源采样文件），所有工程内容写成工作区 `fatAudio/` 目录下的 JSON，**不上云、不需要联网**。

![肥音首屏：AI 音乐工作室空态与新建入口](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-empty.png)

*第一次进入是「Studio 等你开播」空态：DJ 插画、标题与「新建」按钮；顶部是贯穿全插件的传输条与四个视图标签。本文与英文版都使用中文界面实拍截图。* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-empty.png" target="_blank" rel="noopener">查看大图</a>

它不是音频播放器，也不是录音软件，而是一套**轻量的编曲草稿台**：可以把旋律写进钢琴卷帘、把音符排到五线谱、用推子调各轨音量、随手按虚拟钢琴试听音色，再用 AI 面板生成片段占位。本文按「建工程 → 认识传输条 → 主工作区 → 乐谱 → 乐器与音色 → AI 生成 → 数据存储」的顺序介绍。

## 一、它是什么：一台「四视图」音乐工作台

| 维度 | 说明 |
| --- | --- |
| 插件 id / 版本 | `fat-audio` / `0.1.0`，UI 名称「AI 音乐工作室」，传输条左侧缩写 **AMS** |
| 界面贡献 | 活动栏音频图标、整页工作台、底部状态栏 `[fat-audio] ready`；进入插件时会临时隐藏宿主的次侧栏与底部面板 |
| 组织单位 | **音频工程**（名称、描述），可新建 / 编辑 / 删除 / 切换，并记住上次打开的工程 |
| 四个视图 | **主工作区**（轨道 + 钢琴卷帘 + 混音台）、**AI 生成**、**乐谱编辑**、**乐器音调** |
| 默认工程 | BPM 120 / C Maj / 4/4，固定 8 条轨道（钢琴、鼓组、吉他、贝斯、小提琴、合成器、人声、弦乐），16 小节空白乐谱，8 通道 + Master 混音台 |
| 声音 | Web Audio API：16 件乐器各有独立的振荡器组合与滤波器，叠加 ADSR、截止频率、混响、合唱、延迟与声像；无外部音源文件 |
| 数据与后端 | Python 后端（`backend/main.py`，约 17 个业务 handler），前端统一通过 `sdk.backend.invoke` 调用，数据写入工作区 `fatAudio/` 下的 JSON 文件 |

技术上，前端是 React 18 + antd 6 + Redux 风格的轻量 store（`useSyncExternalStore`），状态分成工程 / 编辑器 / 走带 / AI 四组；播放由 `audioEngine` 把音符调度成 Web Audio 振荡器；后端是宿主拉起的常驻 Python 子进程，用 JSON-RPC 逐行通信，写入采用「临时文件 + 原子替换」。

:::note 界面语言
插件内部菜单、按钮与表单文案随宿主语言切换（内置 `zh_CN` / `en_US` 两套词条），本文以中文界面为例；英文版文档沿用同一批中文界面截图。
:::

## 二、开始使用：工程、传输条与「两种保存」

![新建工程弹窗：名称与描述](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-project-modal-filled.png)

点「**新建**」打开工程弹窗：名称必填（≤64 字）、描述可选（≤256 字）。确定后后端立即创建 `audios/<id>/audio.json` 并写入默认工程，工作台随即切到这个工程。

![工程列表：名称、描述、更新时间与编辑 / 删除](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-projects.png)

点传输条最左的返回箭头可以回到工程列表：每行显示名称、描述与更新时间，悬停出现编辑（铅笔）和删除（垃圾桶）按钮；删除会**级联删除整个工程目录且不可恢复**。顶部工程名是个下拉，可以直接切换工程或就地新建，右边还有一个小圆点标记「未保存」。

![工程切换下拉：已有工程与「新建」](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-project-switch.png)

插件把「上次打开的工程 id」写进插件级配置，下次打开 FatNotes 会自动载入这个工程，不必每次从列表重新点。

:::tip 保存分三种，别只记一个「保存」按钮
- **手动保存**：钢琴卷帘与五线谱的音符增删改只会把工程标记为「脏」（工程名旁出现小圆点、保存按钮高亮），需要点传输条右侧的保存按钮或按音色面板的「保存到工程」；
- **自动防抖保存**：轨道音量、M/S、混音推子拖动后 300ms 自动写盘；
- **元数据即时保存**：新建 / 改名 / 删除工程直接改 `audios.json`，与工程内容分开。
:::

### 贯穿全插件的传输条

![传输条左段：返回、工程名与四个视图标签](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-transport-left.png)

![传输条右段：系统状态、保存、缩放、吸附、撤销重做与节拍器](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-transport-right.png)

| 区域 | 控件 | 作用 |
| --- | --- | --- |
| 左侧 | 返回 / 工程名下拉 / 四个标签 | 回工程列表、切换或新建工程、在四个视图间切换（未打开工程时标签禁用） |
| 中部 | 回到开头 · 上一标记 · 播放/停止 · 下一标记 · 快进结尾 | 走带控制；「上一 / 下一标记」实际是播放位置 ±5 秒 |
| 中部 | `HH:MM:SS.mmm` / BPM / 调式 / 拍号 | 当前播放位置与工程级乐曲参数（默认 120 BPM、C Maj、4/4） |
| 右侧 | CPU / MEM / WASAPI | 状态读数，目前是**静态占位显示**，不采集真实性能数据 |
| 右侧 | 缩放 25%–400% | 改变钢琴卷帘每拍宽度，谱面不受影响 |
| 右侧 | 吸附网格 / 撤销 / 重做 / 节拍器 | 吸附开启按 1/4 拍、关闭按 1/8 拍；**撤销 / 重做只在乐谱编辑视图可用**；节拍器为开关态 |

:::tip 播放的是哪份音符
按下播放时，若当前在**乐谱编辑**视图，`audioEngine` 调度 `score.notes`；在其他视图则调度**所有轨道**的钢琴卷帘音符，并按工程 BPM 换算节拍、套用当前音色参数。两种音符数据彼此独立，见下一节与第四节。
:::

## 三、主工作区：轨道、钢琴卷帘与混音台

![主工作区全貌：左轨道列表、中钢琴卷帘、右混音台](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-workspace.png)

*三栏布局：Tracks 负责选轨与静音， Piano Roll 负责写音符，Mixer 负责调音量与声像；截图中的彩色音符块与高低不一的推子都是演示数据。* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-workspace.png" target="_blank" rel="noopener">查看大图</a>

### 轨道列表（Tracks）

![轨道面板：8 条默认轨道与 M / S / 音量滑块](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-tracks.png)

新建工程自带 8 条轨道，各有固定配色：钢琴、鼓组、吉他、贝斯、小提琴、合成器、人声、弦乐。点轨道行即选中，钢琴卷帘只显示当前轨道的音符；每行有 **M（静音）/ S（独奏）** 按钮与音量滑块，改动 300ms 后自动保存。轨道数量是固定的，**不能新增、删除或改名**。

### 钢琴卷帘（Piano Roll）

![钢琴卷帘：49 个半音键、小节标尺与彩色音符块](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-piano-roll.png)

左侧键盘覆盖 49 个半音（C2–C6），C 音位置标出音名；右侧网格按小节 / 拍划分，音符块按**音级着色**（C–B 七种颜色）。常用操作：

| 操作 | 效果 |
| --- | --- |
| 在网格空白处单击 | 在该音高、该拍位添加一个 1 拍音符，并立即试听 |
| 拖动音符块 | 同时改音高与起始拍，按吸附网格对齐 |
| 单击音符块 | 选中并试听；选中后方向键 ↑↓ 改半音、←→ 移动 1/4 拍、`Delete` 删除 |
| 单击或拖动顶部小节标尺 | 移动播放头（走带位置） |
| 传输条缩放 | 25%–400% 调整每拍宽度，长曲可横向滚动 |

### 混音台（Mixer）

![混音台：8 条通道推子与 Master](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-mixer.png)

每条轨道对应一条通道条，最后是 **Master** 总输出：拖动推子改音量（双击重置为 100），底部显示 dB 读数与声像标签（C / L / R）。面板左边缘可以拖拽调整宽度（260–600px，宽度记在浏览器 localStorage），窄时横向滚动，宽时 8 条通道与 Master 一屏看全。

:::warning 这里是「草稿」，不是成品 DAW
当前版本没有音频文件 / MIDI 导入导出、没有录音、没有效果器插件链、没有波形音频片段，轨道也不会真正输出 WAV/MP3；钢琴卷帘与混音台写的是**音符与参数数据**，播放时才由浏览器合成声音。
:::

## 四、乐谱编辑：能点、能拖、能敲键盘的五线谱

![乐谱编辑器全貌：顶部工具条、左侧控制、谱面与底部属性](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score.png)

*从上到下是时值 / 变音 / 工具条，中间左侧是乐谱设置、右侧是五线谱画布，底部是选中音符的属性面板。* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-score.png" target="_blank" rel="noopener">查看大图</a>

| 区域 | 可选项 |
| --- | --- |
| 顶部工具条 | 6 种时值（全 / 二分 / 四分 / 八分 / 十六分 / 附点）、变音记号（无 / 升 / 降 / 还原）、5 种工具（选择 / 橡皮擦 / 连线 / 力度 / 休止符）、输入八度 0–7 |
| 左侧控制 | 乐器（16 件）、调号（10 个大小调）、拍号（4/4 · 3/4 · 6/8）、谱号（高音 / 低音 / 中音）、小节数 4–64、每行小节 2–8、显示音符名称 / 指法 / 力度记号 |
| 底部属性 | 选中音符的音高（± 半音）、时值、力度（pp–fff 七档）、连音开关、变音记号；休止符只显示时值 |

![五线谱局部：彩色音符、小节号、力度与指法标记](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score-staff.png)

谱面支持鼠标与键盘两套输入：**点击添加**、**A–G 键输入音符**、**1–6 键选时值**、拖拽移动音符、`Delete` 删除、`Ctrl+Z` 撤销、↑↓ 改音高、←→ 改拍位。切到「橡皮擦」后点击音符即删除；「连线」点击音符切换连音；「力度」点击音符循环 pp→fff；「休止符」在谱面点击放置休止符。传输条上的撤销 / 重做也只在这个视图生效。

![音符属性面板：音高、时值、力度、连音与变音记号](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score-props.png)

:::note 两套音符，互不互通
乐谱的 `score.notes`（带小节、拍位、时值、变音、力度）与轨道的 `tracks[].notes`（MIDI 音高 + 起始拍 + 时值）是工程里两个独立数组：在五线谱上写旋律不会自动出现在钢琴卷帘里，反之亦然。播放时会按当前视图选择其中一套。
:::

## 五、乐器音调：16 件乐器、音色参数与虚拟钢琴

![乐器音调页全貌：乐器库、音色参数面板与底部虚拟钢琴](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-instruments.png)

*左列是乐器库，右侧大面板是音调与音色参数，底部横贯一条 C3–B4 的虚拟钢琴。* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-instruments.png" target="_blank" rel="noopener">查看大图</a>

![乐器库：7 个分类与 16 件乐器卡片](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-instrument-library.png)

左侧按 **全部 / 键盘 / 弦乐 / 管乐 / 打击 / 人声 / 电子** 七类筛选 16 件乐器（钢琴、电钢琴、管风琴、合成器、吉他、电吉他、贝斯、小提琴、大提琴、长笛、萨克斯、小号、鼓组、弦乐合奏、人声、铜管合奏）。点选卡片即把它设为当前试听音色；卡片上的 `+` 与选中态等价，**不会往工程里新增轨道**。

![音调控制与音色参数：ADSR、滤波、效果、8 个内置预设](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-tone.png)

右侧面板分三块：

| 分组 | 参数 |
| --- | --- |
| **音调控制** | 八度 −2…+2、微调 ±50 音分、主音高 A4 = 440 Hz、弯音范围 1 / 2 / 3 / 6 / 12 半音 |
| **音色参数** | 起始 / 衰减 / 延音 / 释放（ADSR）、截止频率 20–20000 Hz、共鸣、混响、合唱、延迟、声像（10 项） |
| **预设** | 8 个内置预设（温暖钢琴、明亮电钢、深沉管风琴、柔和弦乐、清脆吉他、爵士贝斯、电影铜管、电子脉冲），另有「保存预设」把当前参数命名存到 `presets.json`；底部可「重置参数」「保存到工程」 |

![虚拟钢琴：C3–B4 的 14 个白键与 10 个黑键，C4 按下时高亮](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-virtual-piano.png)

底部虚拟钢琴可直接点击试听：按键按下的 0.5 秒内高亮，声音使用**当前选中乐器 + 当前音色参数**，所以调完 ADSR 或混响立刻能听出差别，不必回到主工作区播放整段。

声音本身来自 `audioEngine`：每件乐器由 1–3 个振荡器（正弦 / 三角 / 锯齿 / 方波）按不同权重与失谐混合，再过低通或带通滤波，叠加 ADSR 包络、卷积混响、延迟与立体声声像。换句话说，这 16 件乐器是**合成音色**而非采样音色，胜在零依赖、可即时调制。

## 六、AI 生成：从提示词到片段（当前为占位实现）

![AI 生成页全貌：左侧表单、右侧结果与历史](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-overview.png)

*左栏填生成条件，右栏列出片段与 AI 历史；未生成时右栏给出空态提示。* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-ai-overview.png" target="_blank" rel="noopener">查看大图</a>

![AI 生成表单：提示词、流派、参数、乐器与情绪](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-form-filled.png)

| 参数 | 取值 |
| --- | --- |
| 提示词 | 自由文本，**必填**（描述风格、情绪、节奏） |
| 流派 | 10 项多选：流行 / 摇滚 / 爵士 / 古典 / 电子 / 嘻哈 / R&B / 民谣 / 乡村 / 蓝调 |
| 曲速 / 调式 / 拍号 | BPM 40–240；10 个大小调；4/4 · 3/4 · 6/8 |
| 时长 | 30 秒 / 1 分钟 / 2 分钟 / 5 分钟 |
| 乐器 | 7 项多选：钢琴 / 鼓组 / 吉他 / 贝斯 / 弦乐 / 合成器 / 人声 |
| 情绪 | 欢快 / 忧伤 / 激昂 / 平静 / 浪漫 / 神秘 |

点「**开始生成**」后，右栏出现 1–3 张片段卡片（标题按流派命名、时长、迷你波形），卡片上可播放预览、添加到工作区、下载、删除。

![生成结果：片段卡片、时长与操作按钮](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-results.png)

![波形预览态：双色进度、时间读数与后退 / 播放 / 前进](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-preview.png)

点播放进入预览态：卡片展开成大幅波形，紫色表示已播放、橙色表示未播放，顶端是进度条与 `0:26 / 1:00` 时间读数，底部三个按钮可后退 / 播放 / 前进（每次 ±1 秒）。

![AI 历史：生成时间、提示词摘要与片段数](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-history.png)

右下角「AI 历史」是可折叠面板，记录每次生成的时间、提示词摘要与片段数，可一键清空；记录落盘在工程的 `aiHistory.json`，切换工程时各自独立。

:::warning 请先看这一条：AI 生成目前是 mock
`backend/service/aiService` 是**桩实现**：它只校验提示词、BPM（40–240）、时长（30/60/120/300 秒）与流派，随机等 1–2 秒，然后构造 1–3 个**随机波形占位片段**，不调用任何模型、不产生可听音频。因此：
- 卡片波形是占位数据（截图里呈条状色块），预览只是进度动画；
- 「添加到工作区」目前只弹一条成功提示，「下载」提示「下载功能开发中」；
- 插件配置里预留了 `realAi` 开关与 `sdk.ai.chat` 接入点，但当前版本未接通。

换句话说，AI 面板现在演示的是**交互流程与数据结构**，真正的作曲 / 音频生成要等后续接入模型。
:::

## 七、数据与存储：全部留在本机

后端以工作区根目录的 `fatAudio/` 作为数据仓库：

```text
<工作区>/fatAudio/
├── audios.json                  # 工程列表：id / 名称 / 描述 / 创建与更新时间
└── audios/<工程 id>/
    ├── audio.json               # 工程主体：BPM、调式、拍号、8 轨道与音符、乐谱、混音台、设置
    ├── settings.json            # 工程级设置（音色参数等）
    ├── presets.json             # 自定义音色预设
    └── aiHistory.json           # 该工程的 AI 生成历史
```

文件都是 UTF-8 JSON，写入用「临时文件 + 原子替换」，中途退出不易写坏整个工程。前端通过 `sdk.backend.invoke` 调用的后端 handler 包括：工程列表 `listAudios` / `createAudio` / `updateAudio` / `deleteAudio` / `reorderAudios`，工程详情 `getAudio` / `saveAudio`，设置 `getAudioSettings` / `saveAudioSettings` / `updateAudioSettings`，预设 `listPresets` / `savePreset` / `deletePreset`，历史 `listAiHistory` / `appendAiHistory` / `clearAiHistory`，以及 `generateAudio`；另有 4 个宿主配置 handler（登录信息、插件配置、系统路径）。

插件级配置（上次工程 id、工作区根目录、默认参数、`realAi` 开关）由宿主的 `sdk.config` 保存，不在 `fatAudio/` 目录内。

## 八、使用前请留意

- **删除工程会级联删除整个工程目录**，且没有整工程导出 / 备份功能，重要草稿请先自行复制 `audios/<工程 id>/`；
- 没有 WAV / MP3 / MIDI / 工程包的导入导出，也没有录音；声音只在浏览器里实时合成；
- 轨道固定 8 条，不能增删；乐谱音符与轨道音符互不互通；
- 音符类改动需手动点保存，只有音量 / 推子类是自动防抖保存；
- 传输条上的 CPU / MEM / WASAPI 是静态占位读数；
- AI 生成是 mock 桩实现（见第六节），片段不能下载，也不能真正加入工程播放；
- 插件仍保留脚手架痕迹（入口注册里还写着 `Puzzle` 图标名，宿主实际渲染为音频图标；底部状态栏 `[fat-audio] ready`、仓库 README 未定制），功能以本文与插件实际界面为准。

## 九、小结

肥音把「写一段旋律」拆成了四个可切换的视角：**主工作区**用多轨钢琴卷帘与混音台摆音符和音量，**乐谱编辑**用五线谱按小节谱曲，**乐器音调**用 16 件合成乐器与 ADSR 参数试音色，**AI 生成**用结构化表单演示未来的生成流程。它们共享一个工程、一条传输条和一份本地 JSON：适合快速记下动机、给学生演示音高与时值、或在没有 DAW 的环境里做编曲草图——但请记住它目前是**草稿台 + 占位 AI**，不是成品音频生产工具。

## 相关文档

- [热门插件总览](./index.md)
- [肥图（FatPhoto）](./fat-photo.md)
- [肥笔（FatPen）](./fat-pen.md)
- [肥・Ai基座（FatAiBase）](./fat-ai-base.md)
- [插件开发](../plugin-dev/index.md)
- 项目地址：[LazyChun/fat-audio](https://github.com/LazyChun/fat-audio)
