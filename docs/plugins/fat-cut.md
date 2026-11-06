---
title: 肥剪（FatCut）
sidebar_label: 肥剪（FatCut）
description: "FatCut（fat-cut）插件详解：剪映式多轨视频剪辑工作区——工程管理、素材库与文本/贴纸/特效/转场/字幕/滤镜创作面板、多轨时间线与片段属性、AI 剪辑编排（LiteGraph 节点图）、AI 模型配置，以及本地导出 MP4/MOV/WebM。"
---

# 肥剪（FatCut）

![FatCut 视频剪辑工作台总览](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png)

*红框自上而下、自左而右：最左活动栏（视频图标）、左功能面板（素材库）、中间预览、右侧属性面板、底部多轨时间线。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png" target="_blank" rel="noopener">查看大图</a>

> 肥剪是 FatNotes 的**剪映式视频剪辑**插件（`fat-cut`）。它把一整块「视频剪辑工作台」搬进笔记里：最左活动栏的视频图标进入，左侧是素材与创作面板（素材 / 文本 / 贴纸 / 特效 / 转场 / 字幕 / 滤镜），中间是预览，右侧是随上下文变化的属性面板，底部是多轨时间线。从导入素材、排版字幕与贴纸，到用 AI 一键生成剪辑编排并铺到时间线，再到本地导出 MP4 / MOV / WebM，都能在这里完成；工程可随时保存、再次打开继续编辑。

## 一、它是什么：一块「视频剪辑工作台」

[热门插件总览](./index.md)里的肥剪（`fat-cut`）和[肥图](./fat-photo.md)、[肥图表](./fat-charts.md)、[工具箱](./fat-tools.md)不同：它不直接贡献图片编辑或仪表盘图表，而是**贡献一整块剪映式视频剪辑界面**——活动栏的视频图标、整页工作台，以及自己的工程、导出与 AI 编排流程。

| 维度 | 说明 |
| --- | --- |
| 界面贡献 | 活动栏视频图标、整页剪辑工作台（功能面板 + 预览 + 属性面板 + 多轨时间线） |
| 工程模型 | **工程（Project）**：保存为可再次打开编辑的剪辑工程，含素材、轨道与时间线 |
| 功能面板 | 素材 / 文本 / 贴纸 / 特效 / 转场 / 字幕 / 滤镜 七个创作标签 |
| 时间线 | 多视频轨 + 多音频轨，支持缩放 / 吸附 / 分割 / 左右剪切 / 关键帧 |
| 片段属性 | 源入点 / 时长 / 音量 / 不透明度 / 速度 / 变换（缩放 · 旋转） |
| AI 剪辑 | 提示词 → 生成 LiteGraph 剪辑编排图 → 一键生成时间线；节点编辑器可微调每段素材 / 转场 / 滤镜 |
| AI 配置 | 素材识别模型 + 视频剪辑模型（来自 FatNotes 宿主配置） |
| 导出 | 输出路径 / 格式（MP4·H.264 / MOV / WebM）/ 分辨率 / 帧率，本地 ffmpeg 合成 |

![剪辑工作台总览（带区域标注）](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png)

*红框：活动栏、功能面板、预览、属性面板、时间线五块。功能面板当前停在「素材」标签。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png" target="_blank" rel="noopener">查看大图</a>

:::note 界面语言
插件内部的标签名、面板标题（素材、文本、特效、工程属性等）目前**固定为中文**；宿主的菜单、全局搜索等外壳文案跟随应用语言设置。因此英文版文档里配图仍是中文界面。
:::

## 二、界面布局：功能面板 + 预览 + 属性 + 时间线

进入肥剪后，界面被切成四块（外加最左活动栏）：

- **功能面板（左）**：顶部一排标签——素材 / 文本 / 贴纸 / 特效 / 转场 / 字幕 / 滤镜，下面是该标签的创作内容（素材库、样式预设、特效列表等）。
- **预览（中）**：播放器，显示当前时间线位置的画面，带播放 / 暂停与基础控制。
- **属性面板（右）**：随上下文变化——选工程时显示「工程属性」，选片段时显示「片段属性」。
- **时间线（底）**：多轨编辑区，上方是时间线工具栏（缩放 / 吸附 / 分割 / 剪切 / 关键帧 / 加轨），下方是轨道。
- **顶部工具栏**：返回、工程下拉（文件夹图标 + 工程名）、新建、保存、导出、AI 配置（设置图标）。

![工程下拉：切换 / 新建 / 删除工程](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-projects.png)

*点顶部文件夹按钮展开工程列表：列出已有工程（如「剪辑测试」）与「+ 新建工程」，每项可删除。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-projects.png" target="_blank" rel="noopener">查看大图</a>

## 三、工程管理

肥剪以「工程」为工作单位，顶部工具栏提供完整的工程生命周期：

- **工程下拉（文件夹图标）**：展开后列出全部工程并可直接切换；每项带删除按钮，底部是「+ 新建工程」。
- **新建工程**：新建空白剪辑工程，可设名称。
- **保存**：把当前素材、轨道与时间线写入工程，未保存时工程名旁有提示。
- **打开 / 删除**：在工程下拉里切换或删除已有工程。

新建或打开工程后，右侧属性面板显示**工程属性**：

| 工程属性 | 说明 |
| --- | --- |
| 帧率 | 24 / 25 / 30 / 50 / 60 fps 预设可选（也支持自定义） |
| 宽度 / 高度 | 视频分辨率，如 1920 × 1080 |
| 背景色 | 画布背景色（如 #000000） |

## 四、素材与创作面板

左侧功能面板有七个标签，覆盖从原始素材到成品包装的全部创作。

### 素材

素材库是剪辑的起点：导入本地视频 / 图片 / 音频，列表化展示，可拖入时间线。每个素材可用 **AI 识别** 自动生成内容描述，供后续 AI 编排参考。

![素材库](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-materials.png)

*素材库列出工程内的视频 / 图片 / 音频文件（如 logo.jpg、关注图.png、read_me2.py 等）。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-materials.png" target="_blank" rel="noopener">查看大图</a>

### 文本

文本标签提供一组**文字样式预设**，点击或拖拽即可落到预览区：

- 预设：标题、副标题、正文、字幕、斜体、霓虹、描边、横幅

![文本样式预设](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-text.png)

*点击或拖拽文本样式到视频预览区；含标题 / 副标题 / 正文 / 字幕 / 斜体 / 霓虹 / 描边 / 横幅等预设。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-text.png" target="_blank" rel="noopener">查看大图</a>

### 贴纸

贴纸标签提供分类图库与搜索：

- 分类：表情、手势、动物、美食、运动、旅行、符号、自然、物品、人脸
- 顶部带搜索框，可按关键字过滤

![贴纸库](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-stickers.png)

*贴纸库含表情 / 手势 / 动物 / 美食 / 运动 / 旅行等分类，主区为表情网格。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-stickers.png" target="_blank" rel="noopener">查看大图</a>

### 特效

特效标签按类组织，覆盖画面调节与氛围效果：

- 分类：基础、动感、画面、RGB、边框、自然
- 效果示例：黑白 / 复古 / 反相 / 镜像 / 模糊 / 亮度 / 对比度 / 饱和度 / 抖动 / 心跳 / 闪烁 / 故障 / RGB 分离 / 色相旋转 / 霓虹；边框（胶片 / 拍立得 / VHS）；自然（飘雪 / 下雨 / 雾气 / 火焰 / 水波）

![特效库](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-effects.png)

*特效按基础 / 动感 / 画面 / RGB / 边框 / 自然分组，主区列出各类效果。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-effects.png" target="_blank" rel="noopener">查看大图</a>

### 转场

转场标签提供片段之间的过渡效果：

- 分类：基础、滑动、擦除、缩放、特效
- 效果示例：淡入淡出、黑场过渡、白场过渡、溶解、闪黑、闪白

![转场库](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-transitions.png)

*转场按基础 / 滑动 / 擦除 / 缩放 / 特效分组，主区列出各类过渡。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-transitions.png" target="_blank" rel="noopener">查看大图</a>

### 字幕

字幕标签可快速添加与批量编辑字幕：

- 字幕样式预设：经典、粗体、描边、暗底、霓虹、卡拉OK
- 「+ 添加字幕」新建一条；字幕列表支持批量编辑文本与时间

![字幕样式与列表](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-subtitles.png)

*点击样式添加字幕，或在列表中批量编辑文本与时间；含经典 / 粗体 / 描边 / 暗底 / 霓虹 / 卡拉OK 六种样式。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-subtitles.png" target="_blank" rel="noopener">查看大图</a>

### 滤镜

滤镜标签提供成片的色彩风格：

- 分类：现代、电影、复古、黑白、人像、风景、美食、胶片
- 效果示例：鲜艳 / 自然 / 青橙 / 电影橙 / HDR / 黑色电影 / 柯达 / 富士 / 拍立得 / VHS

![滤镜库](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-filters.png)

*滤镜按现代 / 电影 / 复古 / 黑白 / 人像 / 风景 / 美食 / 胶片分组，主区列出各风格。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-filters.png" target="_blank" rel="noopener">查看大图</a>

## 五、时间线

底部时间线是剪辑的核心。多视频轨 + 多音频轨，支持：

| 时间线工具栏 | 作用 |
| --- | --- |
| 放大 / 缩小 / 适应 | 调整时间轴缩放，适应可一键全览 |
| 吸附 | 拖动片段时自动对齐相邻片段 / 播放头 |
| 添加视频轨 / 添加音频轨 | 新增一条轨道 |
| 分割 | 在播放头处切开当前片段 |
| 向左剪切 / 向右剪切 | 以播放头为界，裁掉片段左 / 右部分 |
| 关键帧 | 为属性（如变换 / 不透明度）打关键帧做动画 |

每条轨道支持静音（喇叭）、显隐（眼睛）、锁定（锁）与删除（垃圾桶）；底部还有播放头与时间标尺。

![多轨时间线](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-timeline.png)

*时间线含 主视频（锁定）+ Video 1 / 2 / 3 + Audio 1 等轨道，片段落在 Video 1（如 fqft_zimu3.mp4），上方为时间线工具栏与标尺。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-timeline.png" target="_blank" rel="noopener">查看大图</a>

## 六、片段属性

在时间线选中某段片段后，右侧属性面板切换为**片段属性**，可精确控制该片段：

| 片段属性 | 说明 |
| --- | --- |
| 源入点 | 素材自身的时间入点（裁剪素材头尾） |
| 时长 | 该片段在时间线上的长度 |
| 音量 | 音频音量（对视频 / 音频轨片段有效） |
| 不透明度 | 画面透明度，可配合关键帧做淡入淡出 |
| 速度 | 播放速度（快放 / 慢放） |
| 变换 | 缩放（scale）与旋转（rotate） |

## 七、AI 剪辑编排

肥剪的 AI 能力集中在底部时间线工具栏的「AI 剪辑」入口，打开后是 **AI 剪辑编排** 抽屉：

- **提示词**：用自然语言描述想要的成片（如「根据当前素材生成一个节奏明快的混剪」），点「生成编排」由模型（或内置规则）产出剪辑方案。
- **生成时间线**：把编排一键铺到时间线，自动排布素材 / 转场 / 滤镜。
- **编排列表**：保存 / 加载 / 备份多份编排（草稿会自动保存）。
- **LiteGraph 编排图**：中间画布以节点图表达剪辑结构，节点类型含 开始 / 片段 / 转场 / 滤镜 / 结束。
- **节点编辑器**：选中图中节点后，在右侧面板微调——绑定素材、排序、轨道类型 / 序号、时间线起点、时长、素材入点，转场类型 / 绑定片段，滤镜类型等；也可新增 / 删除节点。
- **AI 识别**：在素材库对单个素材做 AI 识别，自动生成描述，供编排参考。

![AI 剪辑编排抽屉](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-ai.png)

*AI 剪辑编排抽屉：提示词 + 生成编排、生成时间线、编排列表（加载 / 备份）、LiteGraph 编排图与节点编辑器。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-ai.png" target="_blank" rel="noopener">查看大图</a>

## 八、AI 配置

点顶部设置（齿轮）图标打开 **AI 配置** 对话框，为剪辑编排指定默认模型：

- **素材识别模型**：用于自动识别素材内容并生成描述，需支持图像识别。
- **视频剪辑模型**：用于 AI 剪辑编排，根据提示词与素材自动生成时间线。

模型列表来自 FatNotes 宿主配置；若未配置对应能力，对话框会提示先到 FatNotes 中配置。

![AI 配置对话框](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-aiconfig.png)

*AI 配置：素材识别模型 + 视频剪辑模型两个下拉，模型来自 FatNotes 宿主。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-aiconfig.png" target="_blank" rel="noopener">查看大图</a>

## 九、导出

点顶部导出（导出图标）打开 **导出** 对话框，把时间线合成成视频文件：

| 导出项 | 说明 |
| --- | --- |
| 输出路径 | 本地保存路径，默认 `exports/<工程名>_时间戳.mp4`，可浏览选择（`<工程名>` 为当前工程名） |
| 格式 | MP4（H.264）/ MOV / WebM |
| 分辨率 | 跟随工程宽高（如 1920 × 1080） |
| 帧率 | 跟随工程帧率（如 30fps） |
| 时长 | 时间线总时长（只读，如 26.9 秒） |

点「开始导出」由本地 ffmpeg 合成，进度可在对话框内查看。

![导出对话框](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-export.png)

*导出：输出路径 / 格式 / 分辨率 / 帧率 / 时长，按钮为 取消 / 开始导出。* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-export.png" target="_blank" rel="noopener">查看大图</a>

## 相关文档

- [热门插件总览](./index.md)
- [工具箱（FatTools）](./fat-tools.md)
- [肥图表（FatCharts）](./fat-charts.md)
- [肥 Ai 基座（FatAIBase）](./fat-ai-base.md)
- [肥·浏览器控制（FatBrowserUse）](./fat-browser-use.md)
- [肥游（FatGames）](./fat-games.md)
- [肥图（FatPhoto）](./fat-photo.md)
- 项目地址：[LazyChun/fat-cut](https://github.com/LazyChun/fat-cut)
