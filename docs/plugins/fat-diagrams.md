---
title: 关系与流程图（FatDiagrams）
sidebar_label: 关系与流程图（FatDiagrams）
description: "FatDiagrams（关系与流程图）插件详解：关系图、流程图、思维导图 3 种扩展图表块的画布编辑方式、私有显示配置、数据结构与自动保存机制。"
---

# 关系与流程图（FatDiagrams）

> 这是一枚**给仪表盘补「结构绘制」卡片**的扩展插件。装好之后，组件面板会多出「结构绘制」分类，里面有 3 张卡片：**关系图、流程图、思维导图**。和[肥图表（FatCharts）](./fat-charts.md)那种「查数据 → 画图」的块不同，这三张卡**不查数据源**：图形本身就是数据，直接画在卡片里、存在卡片里。本文只讲这 3 张卡**怎么画、怎么配**；标题、外框、关联标签、浮层等所有卡片共用的设置见[公共配置](../guides/system-components/common-config.md)，不再重复。插件已开源，源码见 [LazyChun/fat-diagrams](https://github.com/LazyChun/fat-diagrams)。

## 一、插件提供了什么

在[扩展中心](../guides/extensions.md)安装并启用 `fat-diagrams` 后，打开页面右上角的「组件」面板，会看到新增的 **结构绘制** 分类（排在「过滤」下面）。红框圈出的 3 个就是插件追加的块：

![组件面板的「结构绘制」分类，红框标出 3 个扩展块](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-panel.png)

*「关系图 / 流程图 / 思维导图」按索引顺序排列；分类标题随界面语言切换为 `Structure`。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-panel.png" target="_blank" rel="noopener">查看大图</a>

| 卡片 | 类型标识 | 回答什么问题 | 默认尺寸（列 × 行） | 最小尺寸 | 底层引擎 |
| --- | --- | --- | --- | --- | --- |
| **关系图** | `fat-diagrams.relation` | 谁和谁有关系、关系叫什么 | 12 × 80（半幅） | 4 × 8 | AntV G6 |
| **流程图** | `fat-diagrams.flow` | 事情按什么顺序走、在哪儿分支 | 24 × 80（整幅） | 8 × 40 | 插件内置的 draw.io |
| **思维导图** | `fat-diagrams.mind` | 一个主题能拆成哪些层级 | 24 × 80（整幅） | 8 × 40 | simple-mind-map |

把 3 张卡放在同一张画布上，就是下面这张示例页：上半是 draw.io 流程图，下半是关系图与思维导图。

![三种 FatDiagrams 卡片同屏的示例看板](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-overview.png)

*三张卡互不取数、互不依赖：流程图是一条带「打回」分支的审批流，关系图是 6 个节点组成的插件关系网，思维导图是一棵围绕「FatDiagrams 插件」展开的主题树。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-overview.png" target="_blank" rel="noopener">查看大图</a>

:::info 与内置块、与 FatCharts 的区别
插件**不替换**任何内置组件：内置流程图组件、图表块仍然在。FatCharts 的 6 种图表块靠查询取数（见[肥图表](./fat-charts.md)），这 3 张卡则**关闭了数据配置区**（`dataConfig: false`），配置抽屉里没有「查询」，`reqParams.queries` 始终为空数组；你在画布上画的每一笔都会写进卡片自己的 `options`。所以别去「查询」里找它们的数据来源——没有。
:::

## 二、先弄清：改动存在哪里、什么时候生效

三张卡的共同机制只有两条，但很容易踩坑，先讲清楚再看逐块配置。

### 1. 图形存在卡片里，不存数据库

| 卡片 | 数据落点 | 内容 |
| --- | --- | --- |
| 关系图 | `options.relation` | `layout` + `nodes[]` + `edges[]`，节点含名称、颜色、图片、坐标 |
| 流程图 | `options.flow.xml` | draw.io 的 `mxGraphModel` / `mxfile` XML |
| 思维导图 | `options.mind` | `layout` + `theme` + `root`（节点树）+ `view`（缩放 / 平移） |

也就是说：**打开页面 = 从卡片数据还原图形，改动图形 = 改卡片数据**。图不随数据源刷新，也不会因为时间段筛选而变化。

### 2. 两种修改入口，保存方式不同

| 入口 | 在哪儿 | 生效方式 |
| --- | --- | --- |
| **画布内直接编辑** | 卡片本身（三张卡的主要用法） | **自动落库**，不用手动点保存：关系图改完即写、思维导图防抖 400ms、流程图防抖 500ms |
| **配置抽屉里的显示配置** | 点开块配置，右侧「样式」折叠组 | 先改编辑草稿，**必须点宿主右上角的「保存」**才会写进页面；只改不保存，刷新即回退 |

三张卡都**没有「编辑 / 阅读」模式切换**——卡片渲染出来就始终可编辑，不存在「先点编辑才能改」。配置抽屉里的私有项非常少，一张表就能说完：

| 卡片 | 配置抽屉里的私有项 | 默认值 |
| --- | --- | --- |
| 关系图 | **布局** | 力导向 |
| 思维导图 | **结构**、**主题** | 思维导图 / 默认 |
| 流程图 | **没有私有显示配置项** | — |

流程图卡片的配置抽屉最能说明这一点：除了公共的标题与外框，什么都没有——图形全部在 draw.io 编辑器里改。

![流程图卡片的配置抽屉：样式里只有标题，下面是外框](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-flow.png)

*「样式」分组里只有标题输入框；私有项为零。外框属于公共配置，本文不展开。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-flow.png" target="_blank" rel="noopener">查看大图</a>

---

## 三、关系图 `fat-diagrams.relation`

**做什么**：用圆点节点和带箭头的曲线连线表达对象之间的关系，节点可以改名、染色、贴图片，连线可以写名称。适合人物关系、系统依赖、概念拓扑。

![关系图显示效果：6 个彩色节点与带标签的连线](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-block-relation.png)

*节点默认直径 36px、文字在下方；连线是带箭头的二次曲线，名称画在曲线中点。新建卡片自带 A / B / C 三个示例节点。*

### 3.1 画布内怎么画

卡片顶部有一行提示：「双击空白添加，拖出圆点连线，悬停可删除、改色、设图片和连线名称」。所有编辑都在这块画布上完成，**没有弹窗表单**。

| 操作 | 怎么做 | 结果 |
| --- | --- | --- |
| 新增节点 | **双击空白处** | 在该位置生成一个「新节点」，并立刻打开行内输入框让你改名，Enter 或失焦提交 |
| 改名 | **双击节点 / 双击连线**，或点连线旁的「连线名称」按钮 | 出现行内输入框；节点名存 `nodes[].label`，连线名存 `edges[].label` |
| 连线 | 从节点右侧的**白色圆点**拖到另一个节点 | 自动生成一条 `source → target` 的边；重复的同向边不会再添加，自环会被过滤 |
| 边画边建节点 | 把白色圆点拖到**空白处**（拉开约 28px 以上） | 在落点新建节点，并自动与源节点连一条线 |
| 移动 / 浏览 | 拖节点改位置；拖画布平移；滚轮缩放 | 节点坐标写回 `nodes[].x / y`，之后不会被自动布局覆盖 |
| 删除 | 悬停后点「×」，或选中后按 `Delete` / `Backspace` | 删节点会**级联删掉它的所有连线**；输入框内按键不触发删除 |

![双击空白新增节点后出现的行内改名输入框](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-relation-edit.png)

*蓝框里是行内输入框，默认文字「新节点」；按 Enter 或点击别处即提交。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-relation-edit.png" target="_blank" rel="noopener">查看大图</a>

### 3.2 悬停工具组：节点和连线各自的样式

鼠标悬停在节点或连线上，会出现一组小圆按钮（移开约 220ms 后隐藏）。红框是工具组特写，编号对应下表：

![关系图节点悬停时出现的浮动工具组](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-relation-tools.png)

*① 颜色 ② 删除 ③ 图片 ④ 连线圆点；节点右侧白圆点用于拖出连线。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-relation-tools.png" target="_blank" rel="noopener">查看大图</a>

| 编号 | 按钮 | 作用于 | 说明 |
| --- | --- | --- | --- |
| ① | 颜色选择器 | 节点 / 连线 | 8 个预设色（蓝、绿、橙、红、紫、青、灰、深灰），也可自定义；节点默认 `#1677ff`，连线默认 `#8c8c8c`。拖动取色时实时预览，松手才落库。 |
| ② | 删除「×」 | 节点 / 连线 | 等价于选中后按删除键。 |
| ③ | 设置图片 / 更换图片 / 移除图片 | 节点 | 选本地图片后**统一压缩到最长边 96px**：PNG / WebP / GIF 保留透明输出 PNG，其它格式填白底输出 JPEG（质量 0.86），以 data URL 存进 `nodes[].image`。 |
| ④ | 连线圆点（port） | 节点 | 拖出连线；拖到节点 = 连接，拖到空白 = 新建节点并连接。 |
| — | 连线名称 | 连线 | 悬停连线时出现在工具组里，点开与双击连线效果相同。 |

:::tip 图片别放太多
节点图片以 data URL 直接写进卡片数据（不是单独文件），图片越多、卡片数据越大；插件已经压缩到 96px，但它没有文件大小上限检查，建议只用头像 / 图标类小图。
:::

### 3.3 配置抽屉里的私有项：布局

![关系图配置抽屉：布局下拉展开，含力导向与层级](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-relation.png)

*「样式」分组里除了公共的标题，只有「布局」一个私有下拉；下面是公共的「外框」。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-relation.png" target="_blank" rel="noopener">查看大图</a>

| 值 | 界面名称 | 算法与参数 | 适合 |
| --- | --- | --- | --- |
| `force`（默认） | 力导向 | G6 力导向：`preventOverlap`、`nodeSize 48`、`linkDistance 140` | 关系网、无明确层级的拓扑 |
| `hierarchy` | 层级 | antv-dagre：`rankdir TB`、`nodesep 40`、`ranksep 56` | 依赖树、上下级、分层架构 |

> **布局什么时候会跑**：只在「有节点缺坐标」或「切换布局」时算一次，算完立即停止模拟，并把坐标写回 `options.relation.nodes[].x / y`。所以你手动拖好的位置会被保留；但**切换布局会重新排布并覆盖已有坐标**。想固定版式，先摆好节点再别动布局。

### 3.4 数据结构（脚本 / AI 建卡用）

```json
{
  "relation": {
    "layout": "force",
    "nodes": [
      { "id": "n1", "label": "A", "color": "#1677ff", "image": "", "x": 300, "y": 30 },
      { "id": "n2", "label": "B" }
    ],
    "edges": [
      { "id": "e1", "source": "n1", "target": "n2", "label": "依赖", "color": "" }
    ]
  }
}
```

`source / target` 由拖拽自动生成、界面上不能改；`color / image / label / x / y` 都是可选，留空即用默认值。新建卡片默认是 `force` 布局 + A / B / C 三个节点。

---

## 四、思维导图 `fat-diagrams.mind`

**做什么**：把一棵层级主题树画成导图，支持 8 种结构、10 套主题，节点可增删改、拖拽换层级。适合方案拆解、知识梳理、会议纪要。

![思维导图显示效果：中心主题与左右分支、工具栏](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-block-mind.png)

*工具栏在左上，右侧是操作提示；根节点默认居中，分支向左右展开。卡片底色由公共外框决定，导图自身背景透明。*

### 4.1 画布工具栏与快捷操作

| 按钮 / 操作 | 作用 | 备注 |
| --- | --- | --- |
| **子节点** | 给选中节点加一层子级 | 没选中时加在根节点上；新文字默认「分支主题」（二级）/「子主题」（三级及更深） |
| **同级节点** | 在选中节点后面插一个同级 | 根节点不能插同级 |
| **删除** | 删掉选中节点及其子树 | — |
| **适应** | 根节点回到画布中央 | 只归位，不改缩放 |
| **结构下拉** | 切换 8 种排布结构 | 见 4.2；工具栏与配置抽屉是同一个设置 |
| 双击节点 | 编辑文字 | 输入框内不会触发删除等快捷键 |
| 拖拽节点 | 调整层级 / 挂到别的节点下 | 由拖拽插件提供 |
| 滚轮 | 缩放画布 | 缩放与平移会存进 `options.mind.view` |
| `Tab` / `Enter` | 加子节点 / 加同级 | 插件说明文档给出的键盘操作 |

### 4.2 结构：8 种，两处都能切

![思维导图工具栏的「结构」下拉：8 种结构](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-mind-layouts.png)

*工具栏里切换即时改变画布排布；配置抽屉里的「结构」下拉内容完全相同。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-mind-layouts.png" target="_blank" rel="noopener">查看大图</a>

| 值 | 界面名称 | 典型用途 |
| --- | --- | --- |
| `logicalStructure` | 逻辑结构图 | 向右发散的树形拆解 |
| `logicalStructureLeft` | 向左逻辑结构图 | 同上，方向朝左 |
| `mindMap`（默认） | 思维导图 | 中心主题左右双向展开 |
| `organizationStructure` | 组织结构图 | 部门 / 汇报关系 |
| `catalogOrganization` | 目录组织图 | 目录、章节 |
| `timeline` | 时间轴 | 横向时间线 |
| `verticalTimeline` | 竖向时间轴 | 纵向时间线 |
| `fishbone` | 鱼骨图 | 因果 / 问题归因 |

![配置抽屉里的「结构」下拉](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind-layouts.png)

*配置抽屉里改结构属于显示配置，改完要点「保存」；工具栏里改则由画布自动落库。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind-layouts.png" target="_blank" rel="noopener">查看大图</a>

### 4.3 主题：10 套，只能在配置抽屉里改

![思维导图配置抽屉：结构与主题两个私有项](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind.png)

*「样式」分组里除标题外只有「结构」和「主题」两个下拉。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind.png" target="_blank" rel="noopener">查看大图</a>

![配置抽屉里的「主题」下拉](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind-themes.png)

*下拉可滚动，共 10 套主题；切换后节点配色、连线样式整体改变，节点文字与层级不变。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-config-mind-themes.png" target="_blank" rel="noopener">查看大图</a>

| 值 | 界面名称 | 值 | 界面名称 |
| --- | --- | --- | --- |
| `default`（默认） | 默认 | `minions` | 小黄人 |
| `classic` | 经典 | `simpleBlack` | 简约黑 |
| `mint` | 薄荷 | `dark` | 暗色 |
| `skyGreen` | 天清绿 | `dark2` | 暗色 2 |
| `classicBlue` | 经典蓝 | `coffee` | 咖啡 |

:::caution 主题不在工具栏里
画布工具栏只有「结构」下拉，**没有主题下拉、没有折叠按钮、也没有导出按钮**。要换配色，请打开块配置，在「样式」里改「主题」并保存。
:::

### 4.4 数据结构与自动保存

```json
{
  "mind": {
    "layout": "mindMap",
    "theme": "default",
    "view": null,
    "root": {
      "data": { "text": "中心主题", "expand": true },
      "children": [
        { "data": { "text": "分支主题" }, "children": [] }
      ]
    }
  }
}
```

节点树、结构、主题与视图（缩放 / 平移）合并写进 `options.mind`，画布改动防抖 400ms 后落库。新建卡片自带「中心主题 → 两个分支主题 → 若干子主题」示例树，**文字随新建时的界面语言生成**（中文「中心主题」，英文 `Central topic`）；之后切换语言不会重写已有卡片里的文字。

---

## 五、流程图 `fat-diagrams.flow`

**做什么**：把卡片变成一块内嵌的 draw.io 画板，用来画有先后顺序、判断与分支的流程图。图形以 mxGraph XML 存在卡片里，刷新页面后仍在。

![流程图卡片显示效果：内嵌 draw.io 编辑器](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-block-flow.png)

*示例是一条「开始 → 收集需求 → 绘制草图 → 评审 → 结束」的流程，评审不通过时打回修改。新建卡片的默认图形是「开始 → 处理 → 结束」。*

### 5.1 画布就是 draw.io 编辑器

![draw.io 编辑器的三个区域：形状库、画布、格式面板](pathname:///fat-notes-home/img/instruction/fatDiagrams/zh/fd-flow-editor.png)

*蓝框是左侧形状库（可搜索形状、加载更多图形），橙框是右侧格式面板（网格、页面视图、连线选项、纸张尺寸），中间是绘图画布，顶部是 draw.io 工具栏；底部可增删页面。* · <a href="/fat-notes-home/img/instruction/fatDiagrams/zh/fd-flow-editor.png" target="_blank" rel="noopener">查看大图</a>

- 编辑器是**随插件一起发布的本地文件**，以 iframe 嵌入（`embed=1`、`offline=1`、`ui=simple`、`libs=general;flowchart`），不访问 draw.io 官网，也不需要联网。
- 界面语言（`lang`）与明暗（`dark`）跟随宿主设置；缩放、撤销重做、形状连线、格式调整都由 draw.io 自身提供。
- 为了让它像一块卡片而不是一个独立软件，插件隐藏了 draw.io 的**保存 / 退出按钮**，也没有额外提供导出图片按钮。

### 5.2 私有配置项：没有

图形内容完全在编辑器里改，配置抽屉里只有公共的标题与外框（截图见第二节）。因此本文没有「流程图显示配置表」——需要改的是图，不是配置。

### 5.3 保存机制与数据结构

| 环节 | 行为 |
| --- | --- |
| 打开卡片 | 从 `options.flow.xml` 读出 XML，通过 postMessage 交给 draw.io 加载，并自动适配视图 |
| 编辑图形 | draw.io 发出 `autosave` / `save` 事件，插件防抖 **500ms** 后把 XML 写回 `options.flow.xml` |
| 刷新 / 重开页面 | 图形从卡片数据还原，不需要手动点保存 |
| 旧版数据 | 早期 `options.flow.nodes` 格式会在**首次打开时**临时转成 XML，等编辑器触发自动保存后才正式写入 `xml` |
| 加载失败 | 20 秒内没收到编辑器初始化消息，会显示「流程图编辑器没有打开。」与「重试」按钮 |

```json
{
  "flow": {
    "xml": "<mxGraphModel><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>...</root></mxGraphModel>"
  }
}
```

:::tip 别在配置抽屉里找「图形」
流程图卡片没有「节点列表」「连线设置」这类表单；要加步骤，直接在编辑器里拖形状、连箭头、改文字即可。改完稍等半秒，页面数据就已更新。
:::

---

## 六、配置速查与怎么选卡片

| 卡片 | 决定「长什么样」的私有配置 | 决定「画什么」的操作 | 数据落点 |
| --- | --- | --- | --- |
| 关系图 | 布局（力导向 / 层级） | 双击、拖拽、悬停工具组 | `options.relation` |
| 思维导图 | 结构（8 种）、主题（10 套） | 工具栏、双击编辑、拖拽换层级 | `options.mind` |
| 流程图 | 无 | draw.io 编辑器内全部操作 | `options.flow.xml` |

| 你想表达 | 选它 | 理由 |
| --- | --- | --- |
| 系统 / 人物之间多对多的联系 | 关系图 | 节点与连线可任意连，还能给关系命名、染色 |
| 有先后顺序、判断与回环的流程 | 流程图 | draw.io 提供完整形状库与连线路由 |
| 一个主题逐层拆解成条目 | 思维导图 | 8 种结构可换成时间轴、鱼骨图、组织图等视角 |

三张卡可以放在同一张看板里各说一件事（就像本文总览图），彼此不需要联动配置也能同时工作。

## 七、注意事项

- **画布改动自动保存，配置抽屉改动要手动保存**：在卡片里画完不用点保存；在配置抽屉里改了「布局 / 结构 / 主题」后，务必点右上角「保存」，否则刷新回退。
- **三张卡都没有「导出为图片」按钮**：截图或导出请用宿主 / 系统能力；draw.io 的保存与退出按钮也在嵌入模式里被隐藏了。
- **不查数据源**：`dataConfig` 关闭、`queries` 为空，时间范围筛选对这三张卡没有意义；卡片数据跟着页面一起保存。
- **切换语言只影响新建卡片**：分类标题、卡片名称、思维导图默认示例树会随语言变；已经画好的节点文字不会被翻译。
- **卡片别压得太矮**：默认高度 80 行（约 640px），关系图最小 4 × 8、另两张 8 × 40；高度太小会裁掉导图画布或 draw.io 的形状库。
- **关系图切换布局会重排**：力导向 / 层级只在缺坐标或切换时计算，算完即停并写回坐标；手摆好的版式在切换后会被覆盖。
- **节点图片是 data URL**：已压缩到最长边 96px，但仍占卡片数据体积，别把大图当头像贴。
- **公共配置不在此文**：标题、外框、阴影、关联标签等由宿主统一提供，见[公共配置](../guides/system-components/common-config.md)。

## 相关文档

- [热门插件 · 总览](./index.md) —— 插件清单与项目地址
- [肥图表（FatCharts）](./fat-charts.md) —— 靠查询取数的 6 种扩展图表块
- [扩展中心](../guides/extensions.md) —— 安装、启用与管理扩展
- [系统组件 · 公共配置](../guides/system-components/common-config.md) —— 标题、外框、关联标签等
- [数据看板](../guides/data-dashboard.md) —— 看板搭建与卡片布局
