---
sidebar_position: 4
title: Functions
description: "A complete guide to the FatNotes Functions module: the Functions list and read-only function pages, building a Function Panel, search match rules, global-search shortcuts, My Functions, and distribution."
---

# Functions

> A **function** packages a small app you already built on a board into a reusable entry point: arrange inputs, text, charts or flow cards inside a **Function Panel** block, click **Build** once, and it appears in the **Functions** list on the activity bar — ready to open read-only, or to be found from `Ctrl + K` with the search text filled straight into its input.

This page documents the **Functions module** in the activity bar (Functions list + function page). For a tour of everything FatNotes can do, start with the [Feature Overview](./features.md).

---

## 1. What "function" means

The word appears in several places, but each refers to a different thing:

| Term | Where | Role |
| --- | --- | --- |
| **Function Panel block** | Components → **Window** → Function Panel, on a board canvas | The **source**: a container block holding inputs, text, charts, buttons, flow cards, etc. |
| **Function record** | `funcs/funcs.json` in the workspace | The **index**: ID, name, description, tags, source board, size and timestamps |
| **Function page** | Activity bar "Functions" → click a list item | The **result**: a read-only canvas rendered in a tab |
| **"Feature" search result** | `Ctrl + K` global search | A **shortcut**: recalled by a search-match regex; opens the source board and fills an input |
| **func extension package** | Extensions / FatHub | **Distribution**: packaging a built function for other people to install |

The full chain at a glance:

![How a function is built and used](pathname:///fat-notes-home/img/instruction/functions/en/funcs-mechanism.svg)

:::info The list starts empty
FatNotes ships **no built-in functions and no default groups**. Every entry comes from your own **Build** or from an installed func package. The "自动化工作区" (Automation Workspace) item in the screenshots below is one function record from the demo workspace — a name, not a group — used here as the running example.
:::

---

## 2. The Functions workspace

### Where it sits in the workbench

The activity bar has seven modules by default, top to bottom:

| # | Activity bar | Opens | Purpose |
| --- | --- | --- | --- |
| 1 | Files | Explorer | Notebooks, page tree and page content |
| 2 | Search | Search sidebar | Search by name / content |
| 3 | Database | Databases | Data sources, schemas and data browsing |
| 4 | Extensions | Extensions | Catalog of plugins, functions, workflows, skills, etc. |
| 5 | **Functions** | **Functions list + function page** | **This guide: open the mini-apps you built** |
| 6 | Assets | Assets | Images, audio and video resources |
| 7 | Run | Run panel | Running / Completed / Schedule Rules |

Activity bar icons can be **dragged to reorder** and **hidden from the right-click menu** (the order and hidden state are persisted), so the positions on your machine may differ.

Opening "Functions" splits the screen into three parts: the **Functions list** on the left, the **function page** on the right, and the **global search box** across the top. With nothing selected, the right side shows an empty-state illustration and the hint "Select a function on the left to view its content".

![The Functions workspace; red boxes mark the activity bar icon, sidebar search, list item and empty-state hint](pathname:///fat-notes-home/img/instruction/functions/en/funcs-overview.png)

*Red boxes, top to bottom: the wrench "Functions" icon on the activity bar, the sidebar search box (with the tag filter button on its right), the function item, and the empty-state hint.*

### Parts of the Functions list

| Part | Description |
| --- | --- |
| Title | "Functions" (功能列表 in Chinese) |
| Search box | Placeholder "Please enter search content"; filters on **name + description**, with **pinyin fuzzy matching** |
| Tag filter | The **pencil-looking icon** to the right of the search box; tooltip "选择标签进行过滤" ("filter by tags"). Opens a multi-select tag panel with its own search |
| List item | Function icon + name + up to 2 tag badges + description; sorted by last update, newest first |
| Empty state | "No Data" when no tags exist; "No Results" when a search matches nothing |

![The tag filter popover; red boxes mark the tag button and the panel](pathname:///fat-notes-home/img/instruction/functions/en/funcs-tag-filter.png)

*This icon is **not an edit button** — it only filters. Tags come from the system tag definitions, and selecting several tags uses AND logic. With no tags assigned to any function, the panel is empty. Note also that this tooltip is hard-coded in Chinese and stays Chinese even in the English UI.*

---

## 3. Opening and using a function

| Action | Result |
| --- | --- |
| **Single-click** a list item | Opens the function in the **current tab** (a ~300 ms delay distinguishes it from a double-click) |
| **Double-click** a list item | Opens the function in a **new tab** |
| Reorder / close tabs | Tabs can be dragged and closed; at most 10 function tabs are cached |
| Work inside the page | Inputs, buttons, charts and linked events still work; the **canvas itself is read-only** — no dragging, resizing, adding blocks or editing configs |

![An opened function page; red boxes mark the tab, the input and the result text](pathname:///fat-notes-home/img/instruction/functions/en/funcs-page.png)

*The "自动化工作区" example: a tab, a panel title, an input with the placeholder "请输入 Unix 时间戳" (Enter a Unix timestamp), and a text block showing `转换结果：$value`. The page renders at the size captured at build time; `$value` is a variable placeholder replaced at runtime.*

:::tip Want to change something?
A function page is a **snapshot taken at build time**. To change blocks, styles or configuration, edit the source board and click **Build** again; only then do the list and the function page update.
:::

---

## 4. Build your first function

### Steps

1. **Add the container**: open (or create) a board and drag a **Function Panel** block from the **Window** category of the component panel (24 × 64 grid cells by default, freely resizable).
2. **Fill it**: drag the blocks you need inside the panel — inputs, text, buttons, data tables, charts, flow cards, etc. **Blocks supplied by plugins cannot be placed inside a Function Panel.**
3. **Configure display**: in the Function Panel display settings, set the block name (which becomes the function name), the Logo, the **description** and **tags** under AI marks, plus background and border styling.
4. **Set up search match** (optional): bind a regex to an input inside the panel — see the next section.
5. **Save, then Build**: save the board first, then click **Build** in the top-right corner of the block. The index, board copy and icon are written, and the function appears immediately in the Functions list.

![The Function Panel on its source board; red boxes mark Export directory, Search match and Build](pathname:///fat-notes-home/img/instruction/functions/en/funcs-build.png)

*Red boxes, left to right: "Export directory" (showing "Not set. Build will not export"), "Search match" and "Build". The input below already contains `1790000000` filled by a search match, and the text block on the right shows the converted result.*

### What Build produces

| Output | Contents |
| --- | --- |
| `funcs/funcs.json` | The main index, a JSON array; one record added or updated by `funcId` |
| `funcs/<funcId>/boards/<boardId>.json` | A copy of the source board; the function page reads its child blocks from here |
| `funcs/<funcId>/icons/logo.*` | Function icon (copied when a Logo is set in the display settings) |
| A func package in the export directory | **Optional**; produced only when an export directory is configured (initial version `0.0.1`) |

### Index field reference

| Field | Description |
| --- | --- |
| `funcId` | Function ID — **the id of the Function Panel block** and also the folder name; deleting and re-adding the block creates a new ID |
| `funcName` | Function name, taken from the Function Panel block title |
| `description` / `tags` | From the block's AI marks; used for the list description and tag filtering |
| `boardId` / `bookId` | Source board ID and owning notebook |
| `panelW` / `panelH` | Width and height of the Function Panel block; they define the function page canvas size |
| `createTime` / `lastUpdatedTime` | Creation / last build time; the list sorts on the latter, newest first |

---

## 5. Reach it from global search

**Search match** is what connects a function to `Ctrl + K`: bind one regex to **each input** inside the Function Panel. When global search text matches a regex, the function appears as a **Feature** result; pressing Enter **opens the source board tab and fills the matching input with the search text**.

![The Search match dialog; red boxes mark the input selector and the regex field](pathname:///fat-notes-home/img/instruction/functions/en/funcs-search-match.png)

*One rule = "which input" + "search regex". Use **Add** for more rules, the trash icon to delete one, and **Ok** to save.*

| What to search | Regex | Example input |
| --- | --- | --- |
| 10-digit Unix timestamp | `^\d{10}$` | `1790000000` |
| Order number | `^SO\d{8}$` | `SO20261105` |
| Mobile number | `^1[3-9]\d{9}$` | `13800138000` |

:::warning About the example in the dialog
The hint displays `^\d{'10'}$` because of template escaping — **the regex you should actually enter is `^\d{10}$`** (verified in this example). Invalid regexes are rejected with "Invalid regular expression", and rules cannot be added while the Function Panel contains no inputs.
:::

### What a result looks like

Global search covers **10 result types** — File, Extension, Feature, Workflow, Skill, MCP Tool, MCP Server, Plugin, Collection and Plugin Item — mixed and ranked by relevance, with a type tag on the right of each row. Use `↑/↓` to select, `Enter` to open, `Esc` to close.

![Global search matching a function; red boxes mark the result and its Feature tag](pathname:///fat-notes-home/img/instruction/functions/en/funcs-global-search.png)

*Typing `1790000000` matches `^\d{10}$`. The result title is the function name "自动化工作区"; the subtitle shows the bound input's placeholder plus the search text, and the tag on the right reads "Feature".*

Pressing Enter opens the **source board** (not the read-only function page) with the input already filled. Flow cards on that board then run, and the text block substitutes its variable with the result:

![The source board after pressing Enter; red boxes mark the filled input and the converted result](pathname:///fat-notes-home/img/instruction/functions/en/funcs-search-hit.png)

*`1790000000` is filled automatically and the text block shows `转换结果：2026-09-21 22:13:20`. That is the full "type a term → get an answer" loop.*

![Workflow automation running](pathname:///fat-notes-home/img/features/flow-run.gif)

*A screen recording of the same timestamp conversion flow; compare it with the automation section in the [Feature Overview](./features.md).*

---

## 6. Manage and distribute

### My Functions

**Extensions → My Functions** shows all built functions as cards:

![My Functions in Extensions; red boxes mark the card and the export directory](pathname:///fat-notes-home/img/instruction/functions/en/funcs-my-funcs.png)

*A card shows the icon, name, description, tags, **Export directory** and last update time; the top bar searches by name / description / tags. The highlighted row reads "Export directory — Not set. Build will not export".*

| Card field | Description |
| --- | --- |
| Name / description / tags | From the Function Panel block and its AI marks |
| Export directory | When set, every **Build** also exports the function as a func package |
| Last updated at | Time of the most recent build |

### Distribution and personalization

- **FatHub → Functions**: the "Functions" category in Extensions browses installable function packages; the workspace Functions list always reflects the records in `funcs/funcs.json`.
- **Activity bar**: drag icons to reorder or hide them from the context menu, keeping Functions within easy reach.
- **Function tabs**: closable and draggable; functions have no standalone URL or deep link, and tabs are session-only UI state that is not restored after restart.
- **Settings → Components → Add block bar**: here you can reorder and hide entries in the **Functions** category of the **add-block bar** — not the Functions list sidebar. Don't mix the two up.

---

## 7. Typical combinations

1. **A pocket tool (timestamp converter)**: Function Panel with an input + text, an ETL DAG below it on the source board, and a `^\d{10}$` search match. Then `Ctrl + K` + a 10-digit timestamp yields a formatted date in one step.
2. **A business lookup console**: Function Panel with an input + query button + data table / chart, and an order-number regex. Searching an order number opens the board with the number pre-filled — handy for support and ops.
3. **Team reuse**: set an export directory in My Functions → **Build** again to produce a func package → share it with colleagues to install from Extensions, turning a one-off mini-app into a team tool.

---

## 8. Caveats

- **The list starts empty** — no built-in functions or default groups; if `funcs.json` is missing the list returns nothing. A name like "自动化工作区" is one function record in the workspace.
- **Rebuild after editing the source**: the function page, icon, description and tags are a snapshot and do not follow source-board edits automatically.
- **Save the board before Build**: Build reads the board file from disk, so unsaved edits are not included.
- **Function pages are read-only**: you can type, click and see linked results, but not change the structure; edit on the source board.
- **Search match only accepts inputs inside the Function Panel**: deleting an input leaves a "input deleted" warning on its rule; keep regexes narrow so unrelated searches are not recalled.
- **Tag filtering uses AND**: selecting several tags narrows to their intersection. The pencil-looking icon is a filter, not a create / edit button.
- **No URL deep links**: functions are opened from the activity bar, the list and tabs; a "Feature" result from `Ctrl + K` opens the source board.
- **Scheduling targets workspace boards**: [Scheduled Tasks](./scheduled-tasks.md) dispatches flow cards on boards, not function tabs. Keep flow cards on the source board if you want them scheduled.
- **Build can have side effects**: with an export directory configured, Build writes files / produces a package; check the directory and version before distributing.

---

## Related docs

- [Feature Overview](./features.md) — a tour of all FatNotes capabilities.
- [Workflow Automation](./flow-automation.md) — ETL DAG / Think / Screen Task flows that pair well with functions.
- [Data Dashboards](./data-dashboard.md) — boards that host Function Panel blocks and charts.
- [Window Components](./system-components/window.md) — Function Panel, Code, Terminal and other window blocks.
- [Scheduled Tasks](./scheduled-tasks.md) — schedule rules and run records.
- [Plugin Development](../plugin-dev/index.md) — func packages and the `funcs.json` capability manifest.
