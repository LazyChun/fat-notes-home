---
title: FatDiagrams (Relation, Flow & Mind Maps)
sidebar_label: FatDiagrams
description: "FatDiagrams plugin reference: the Relation, Flow and Mind map blocks, their in-canvas editing, private display options, data structures and auto-save behavior."
---

# FatDiagrams (Relation, Flow & Mind Maps)

> An extension that **adds diagram blocks to dashboards**. Once installed, a **Structure** category appears in the component panel with three cards: **Relation**, **Flow** and **Mind map**. Unlike the query-driven blocks in [FatCharts](./fat-charts.md), these three do **not query a data source**: the diagram *is* the data, drawn and stored inside the card. This page covers how to draw and configure these three cards. Shared settings such as title, panel frame and relate labels are documented in [Common Configuration](../guides/system-components/common-config.md) and are not repeated here. The plugin is open source: [LazyChun/fat-diagrams](https://github.com/LazyChun/fat-diagrams).

## 1. What the plugin adds

Install and enable `fat-diagrams` from the [Extension Center](../guides/extensions.md), then open the **Components** panel at the top right of a page. A new **Structure** category appears (right after *Filter*). The three red-boxed items below come from the plugin:

![The Structure category, with the three plugin blocks outlined in red](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-panel.png)

*Relation / Flow / Mind map are ordered by registration index; the category title switches with the UI language (Chinese: 结构绘制).* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-panel.png" target="_blank" rel="noopener">Open full size</a>

| Card | Block type | Question it answers | Default size (cols × rows) | Min size | Engine |
| --- | --- | --- | --- | --- | --- |
| **Relation** | `fat-diagrams.relation` | Who is connected to whom, and how | 12 × 80 (half width) | 4 × 8 | AntV G6 |
| **Flow** | `fat-diagrams.flow` | What happens in which order, and where it branches | 24 × 80 (full width) | 8 × 40 | bundled draw.io |
| **Mind map** | `fat-diagrams.mind` | How one topic breaks down into levels | 24 × 80 (full width) | 8 × 40 | simple-mind-map |

Put all three on one canvas and you get the gallery below — a draw.io flow on top, a relation graph and a mind map underneath:

![Example dashboard with all three FatDiagrams blocks](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-overview.png)

*The three cards are independent: the flow is an approval process with a rework branch, the relation graph is a six-node plugin network, and the mind map is a topic tree around "FatDiagrams".* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-overview.png" target="_blank" rel="noopener">Open full size</a>

:::info How this differs from built-in blocks and FatCharts
The plugin **complements** rather than replaces anything: built-in flow widgets and chart blocks remain. FatCharts' six chart blocks render query results (see [FatCharts](./fat-charts.md)); these three cards have their **data configuration area disabled** (`dataConfig: false`), so there is no Query section in the config drawer and `reqParams.queries` is always an empty array. Every stroke you draw is written to the card's own `options`. There is no data source to look for.
:::

## 2. Where edits are stored, and when they take effect

Two shared mechanisms are easy to trip over, so they come before the per-card reference.

### 1. The diagram lives in the card, not in a database

| Card | Stored in | Contents |
| --- | --- | --- |
| Relation | `options.relation` | `layout` + `nodes[]` + `edges[]`; a node holds label, color, image and position |
| Flow | `options.flow.xml` | draw.io `mxGraphModel` / `mxfile` XML |
| Mind map | `options.mind` | `layout` + `theme` + `root` (node tree) + `view` (zoom / pan) |

**Opening a page restores the diagram from card data; editing the diagram changes card data.** Diagrams never refresh with a data source or a time filter.

### 2. Two editing surfaces, two save behaviors

| Surface | Where | How it persists |
| --- | --- | --- |
| **In-canvas editing** | The card itself (the main way to use all three) | **Auto-saved**, no manual save: relation writes immediately, mind map debounces 400ms, flow debounces 500ms |
| **Display options in the config drawer** | Right-hand *Style* group of the block config | Edits a draft — **you must click the host's Save button**; otherwise a reload reverts them |

None of the three cards has an **edit / view mode switch** — a rendered card is always editable. Their private display options are few enough for one table:

| Card | Private options in the drawer | Defaults |
| --- | --- | --- |
| Relation | **Layout** | Force |
| Mind map | **Layout**, **Theme** | Mind map / Default |
| Flow | **No private display options** | — |

The Flow config drawer makes this obvious: apart from the shared title and panel frame, it is empty. Everything about the drawing is changed inside the draw.io editor.

![The Flow config drawer: title only, then the panel frame](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-config-flow.png)

*The Style group contains only the title input. The panel frame below is a shared setting, not covered here.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-config-flow.png" target="_blank" rel="noopener">Open full size</a>

---

## 3. Relation `fat-diagrams.relation`

**What it does**: draws objects as circular nodes and relationships as curved arrows. Nodes can be renamed, colored and given an image; links can carry a label. Good for people networks, system dependencies and concept maps.

![Relation block: six colored nodes with labeled links](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-block-relation.png)

*Nodes are 36px across with their label underneath; links are quadratic curves with arrows and a label at the midpoint. A new card starts with sample nodes A / B / C.*

### 3.1 Drawing on the canvas

A hint sits at the top of the card: *"Double-click empty space to add, drag the dot to link, hover to delete or edit color, image, and link name"*. All editing happens on the canvas — **there is no modal form**.

| Action | How | Result |
| --- | --- | --- |
| Add a node | **Double-click empty space** | Creates a "New node" at that point and immediately opens an inline input; Enter or blur commits |
| Rename | **Double-click a node / link**, or use the *Link name* button | An inline input appears; node text goes to `nodes[].label`, link text to `edges[].label` |
| Add a link | Drag the **white dot** on a node's right side onto another node | Generates a `source → target` edge; duplicate same-direction edges are ignored and self-loops are filtered out |
| Link + node in one gesture | Drag the white dot onto **empty space** (about 28px away or more) | Creates a node at the drop point and links it to the source |
| Move / navigate | Drag a node; drag the canvas to pan; scroll to zoom | Node positions are written back to `nodes[].x / y` and are not overwritten by auto-layout afterwards |
| Delete | Hover and click "×", or select and press `Delete` / `Backspace` | Deleting a node **cascades to all its links**; the keys are ignored inside text inputs |

![The inline rename input after double-clicking empty space](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-relation-edit.png)

*The blue box marks the inline input, prefilled with "New node"; press Enter or click away to commit.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-relation-edit.png" target="_blank" rel="noopener">Open full size</a>

### 3.2 Hover tools: styling nodes and links separately

Hovering over a node or link reveals a group of small round buttons (they fade about 220ms after the pointer leaves). The red box below is a close-up, with numbers matching the table:

![The floating tool group shown when hovering a node](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-relation-tools.png)

*1 color, 2 delete, 3 image, 4 link port; the white dot on the right of a node starts a link.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-relation-tools.png" target="_blank" rel="noopener">Open full size</a>

| # | Button | Applies to | Notes |
| --- | --- | --- | --- |
| 1 | Color picker | Node / link | 8 presets (blue, green, orange, red, purple, cyan, gray, dark) plus custom colors; nodes default to `#1677ff`, links to `#8c8c8c`. Dragging previews live; only releasing the picker persists the change. |
| 2 | Delete "×" | Node / link | Same as selecting and pressing Delete. |
| 3 | Set / replace / remove image | Node | The chosen file is **scaled down to a 96px longest edge**: PNG / WebP / GIF keep transparency as PNG, other formats get a white background and become JPEG (quality 0.86); the data URL is stored in `nodes[].image`. |
| 4 | Link port (white dot) | Node | Drag onto a node to link, onto empty space to create a linked node. |
| — | Link name | Link | Appears in the tool group when hovering a link; same effect as double-clicking it. |

:::tip Keep images small
Node images are embedded as data URLs in the card data (not separate files). They are already downscaled to 96px, but there is no file-size limit check — stick to avatars and icons.
:::

### 3.3 The private option: Layout

![Relation config drawer: the Layout dropdown with Force and Hierarchy](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-config-relation.png)

*Besides the shared title, Style contains exactly one private dropdown: Layout. The panel frame below is shared.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-config-relation.png" target="_blank" rel="noopener">Open full size</a>

| Value | UI label | Algorithm / parameters | Best for |
| --- | --- | --- | --- |
| `force` (default) | Force | G6 force layout: `preventOverlap`, `nodeSize 48`, `linkDistance 140` | Networks without a clear hierarchy |
| `hierarchy` | Hierarchy | antv-dagre: `rankdir TB`, `nodesep 40`, `ranksep 56` | Dependency trees, reporting lines, layered architectures |

> **When layout runs**: only when some nodes lack coordinates, or when you switch layouts. It runs once, stops immediately, and writes the computed coordinates back to `options.relation.nodes[].x / y`. Manually dragged positions are therefore preserved — **but switching layouts re-arranges everything and overwrites them**. Arrange your nodes first, then leave the layout alone.

### 3.4 Data structure (for scripts and AI-built cards)

```json
{
  "relation": {
    "layout": "force",
    "nodes": [
      { "id": "n1", "label": "A", "color": "#1677ff", "image": "", "x": 300, "y": 30 },
      { "id": "n2", "label": "B" }
    ],
    "edges": [
      { "id": "e1", "source": "n1", "target": "n2", "label": "depends on", "color": "" }
    ]
  }
}
```

`source / target` are generated by dragging and cannot be edited in the UI; `color / image / label / x / y` are optional and fall back to defaults. A fresh card uses `force` layout with three sample nodes A / B / C.

---

## 4. Mind map `fat-diagrams.mind`

**What it does**: renders a hierarchical topic tree with 8 layouts and 10 themes. Nodes can be added, edited, deleted and re-parented by dragging. Good for planning, knowledge outlines and meeting notes.

![Mind map block: center topic, branches and toolbar](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-block-mind.png)

*Toolbar at the top left, a hint to its right; the root is centered with branches spreading left and right. The canvas background is transparent — the card frame supplies the color.*

### 4.1 Toolbar and shortcuts

| Button / gesture | Effect | Notes |
| --- | --- | --- |
| **Child** | Add a child to the selected node | With nothing selected, adds to the root; new text defaults to "Branch" (level 2) / "Subtopic" (deeper) |
| **Sibling** | Insert a peer after the selected node | The root cannot have a sibling |
| **Delete** | Remove the selected node and its subtree | — |
| **Fit** | Move the root back to the center | Repositions only, does not change zoom |
| **Layout dropdown** | Switch among 8 structures | See 4.2; the toolbar and the config drawer control the same setting |
| Double-click a node | Edit its text | Shortcuts such as Delete are disabled inside the input |
| Drag a node | Re-parent it under another node | Provided by the drag plugin |
| Scroll | Zoom the canvas | Zoom and pan are stored in `options.mind.view` |
| `Tab` / `Enter` | Add child / add sibling | Keyboard operations documented by the plugin |

### 4.2 Eight layouts, switchable in two places

![The toolbar Layout dropdown: all eight structures](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-mind-layouts.png)

*Switching in the toolbar changes the canvas immediately; the Layout dropdown in the config drawer has the same list.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-mind-layouts.png" target="_blank" rel="noopener">Open full size</a>

| Value | UI label | Typical use |
| --- | --- | --- |
| `logicalStructure` | Logical structure | Right-facing tree breakdown |
| `logicalStructureLeft` | Logical structure left | Same, facing left |
| `mindMap` (default) | Mind map | Center topic with branches on both sides |
| `organizationStructure` | Organization | Departments / reporting lines |
| `catalogOrganization` | Catalog | Tables of contents, chapters |
| `timeline` | Timeline | Horizontal timeline |
| `verticalTimeline` | Vertical timeline | Vertical timeline |
| `fishbone` | Fishbone | Cause-and-effect analysis |

![The Layout dropdown in the config drawer](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind-layouts.png)

*Changing Layout here is a display option and needs Save; changing it in the toolbar is auto-saved by the canvas.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind-layouts.png" target="_blank" rel="noopener">Open full size</a>

### 4.3 Ten themes, only in the config drawer

![Mind map config drawer: Layout and Theme](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind.png)

*Apart from the title, Style contains exactly two dropdowns: Layout and Theme.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind.png" target="_blank" rel="noopener">Open full size</a>

![The Theme dropdown in the config drawer](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind-themes.png)

*The list scrolls and holds 10 themes; switching changes node colors and link styling, never the text or hierarchy.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-config-mind-themes.png" target="_blank" rel="noopener">Open full size</a>

| Value | UI label | Value | UI label |
| --- | --- | --- | --- |
| `default` (default) | Default | `minions` | Minions |
| `classic` | Classic | `simpleBlack` | Simple black |
| `mint` | Mint | `dark` | Dark |
| `skyGreen` | Sky green | `dark2` | Dark 2 |
| `classicBlue` | Classic blue | `coffee` | Coffee |

:::caution Themes are not on the toolbar
The canvas toolbar has a **Layout** dropdown only — no Theme dropdown, no collapse button and no export button. To recolor the map, open the block config, change **Theme** in Style, and save.
:::

### 4.4 Data structure and auto-save

```json
{
  "mind": {
    "layout": "mindMap",
    "theme": "default",
    "view": null,
    "root": {
      "data": { "text": "Central topic", "expand": true },
      "children": [
        { "data": { "text": "Branch" }, "children": [] }
      ]
    }
  }
}
```

The node tree, layout, theme and view (zoom / pan) are merged into `options.mind`; canvas edits are persisted after a 400ms debounce. A new card ships with a sample tree ("Central topic → two Branches → Subtopics"), whose **text is generated in the UI language at creation time**; switching languages later does not rewrite text in existing cards.

---

## 5. Flow `fat-diagrams.flow`

**What it does**: turns the card into an embedded draw.io canvas for processes with order, decisions and branches. The drawing is stored as mxGraph XML in the card and survives reloads.

![Flow block: the embedded draw.io editor](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-block-flow.png)

*The sample is "Start → Collect → Draft → Review → End" with a rework branch. A fresh card starts with "Start → Process → End".*

### 5.1 The canvas is draw.io

![The three areas of draw.io: shape library, canvas, format panel](pathname:///fat-notes-home/img/instruction/fatDiagrams/en/fd-flow-editor.png)

*Blue box: the shape library on the left (searchable, with "More Shapes"); orange box: the format panel on the right (grid, page view, connection options, paper size). The drawing canvas sits in the middle, the draw.io toolbar on top, and pages can be added at the bottom.* · <a href="/fat-notes-home/img/instruction/fatDiagrams/en/fd-flow-editor.png" target="_blank" rel="noopener">Open full size</a>

- The editor is a **local file shipped with the plugin**, embedded as an iframe (`embed=1`, `offline=1`, `ui=simple`, `libs=general;flowchart`). It does not call the draw.io website and needs no internet connection.
- UI language (`lang`) and light/dark mode (`dark`) follow the host. Zoom, undo/redo, shapes, connectors and formatting all come from draw.io itself.
- To make it behave like a card rather than a standalone app, the plugin hides draw.io's **Save / Exit buttons** and adds no export-image button of its own.

### 5.2 No private display options

The drawing is edited entirely inside the editor; the config drawer contains only the shared title and panel frame (screenshot in section 2). There is therefore no "Flow display options" table: change the diagram, not the configuration.

### 5.3 Save behavior and data structure

| Stage | Behavior |
| --- | --- |
| Opening the card | Reads `options.flow.xml` and hands the XML to draw.io via postMessage, then fits the view |
| Editing | draw.io emits `autosave` / `save`; the plugin writes the XML back to `options.flow.xml` after a **500ms** debounce |
| Reloading the page | The diagram is restored from card data — no manual save needed |
| Legacy data | Older `options.flow.nodes` data is converted to XML **when first opened**; it is only written into `xml` once the editor triggers autosave |
| Load failure | If no init message arrives within 20 seconds, an error message and a **Retry** button appear |

```json
{
  "flow": {
    "xml": "<mxGraphModel><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>...</root></mxGraphModel>"
  }
}
```

:::tip Don't look for a shape list in the config drawer
The Flow card has no node or connector forms. Drop shapes, draw arrows and edit labels directly in the editor; half a second later the page data is up to date.
:::

---

## 6. Quick reference and choosing a card

| Card | Private options controlling appearance | What you edit to change content | Stored in |
| --- | --- | --- | --- |
| Relation | Layout (Force / Hierarchy) | Double-click, drag, hover tools | `options.relation` |
| Mind map | Layout (8), Theme (10) | Toolbar, inline text editing, drag to re-parent | `options.mind` |
| Flow | None | Everything inside draw.io | `options.flow.xml` |

| What you want to express | Use | Why |
| --- | --- | --- |
| Many-to-many links between systems or people | Relation | Free-form connections, named and colored links |
| A sequence with decisions and loops | Flow | Full shape library and connector routing from draw.io |
| One topic broken into levels | Mind map | 8 layouts, including timeline, fishbone and organization views |

All three can sit on the same board and tell different parts of one story (as in the gallery above) without any linkage setup.

## 7. Notes and gotchas

- **Canvas edits auto-save; drawer edits need Save.** Drawing on a card needs no click; changing Layout / Structure / Theme in the config drawer requires the host's Save button, or a reload reverts it.
- **None of the three cards has an "export as image" button.** Use host or OS capabilities for screenshots; draw.io's Save and Exit buttons are hidden in embed mode.
- **No data queries.** `dataConfig` is off and `queries` is empty, so time-range filters have no effect on these cards; their data is saved with the page.
- **Switching language only affects new cards.** Category titles, card names and the sample mind map follow the language; existing node text is not translated.
- **Don't make the cards too short.** They default to 80 rows (about 640px); the Relation card can go down to 4 × 8, the other two to 8 × 40. A shorter card clips the mind map canvas or draw.io's shape library.
- **Switching Relation layouts re-arranges nodes.** Force / Hierarchy only run when coordinates are missing or the layout changes, then stop and write coordinates back; a manual arrangement is overwritten by a switch.
- **Node images are data URLs.** They are downscaled to 96px but still add to the card's data size — don't paste large photos as avatars.
- **Shared settings are elsewhere.** Title, panel frame, shadow and relate labels come from the host; see [Common Configuration](../guides/system-components/common-config.md).

## Related pages

- [Popular Plugins · Overview](./index.md) — plugin list and project links
- [FatCharts](./fat-charts.md) — six query-driven chart blocks
- [Extension Center](../guides/extensions.md) — install, enable and manage extensions
- [System Components · Common Configuration](../guides/system-components/common-config.md) — title, panel frame, relate labels
- [Data Dashboard](../guides/data-dashboard.md) — building boards and laying out cards
