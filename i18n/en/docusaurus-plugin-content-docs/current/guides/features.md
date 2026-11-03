---
sidebar_position: 0
title: Feature Overview
description: "The complete FatNotes feature tour: block canvas, data dashboards, workflow automation, AI capabilities, plugin ecosystem, and plugin development."
---
<!-- FatNotes full feature tour -->

# FatNotes Feature Overview

FatNotes is a **local-first desktop knowledge workspace** for Windows. It puts notes, data dashboards, workflow automation, and an AI assistant into one professional interface — like "Notion that understands data" combined with "an IDE that understands automation".

![FatNotes dashboard](pathname:///fat-notes-home/img/features/dashboard.png)

## What problems does it solve?

| Common pain point | FatNotes answer |
| --- | --- |
| Notes go to sleep; data stays trapped in Excel | On the block canvas, notes, tables, charts, and forms live on the **same page** and react to each other |
| Building a report means a DB client + Excel + pasted screenshots | Connect to SQLite / MySQL / PostgreSQL and more; query results turn straight into dashboard widgets |
| Repetitive data chores done by hand | The visual flow engine chains "query → transform → notify → write" into automated workflows |
| AI answers ignore your own material | Built-in knowledge base (RAG), memory, and agents let AI read your notes and data |

## FatNotes in five minutes

- **Block canvas**: 60+ block types, drag-and-drop layout, WYSIWYG
- **Data dashboards**: multiple data sources, rich chart widgets, linked filters
- **Workflow automation**: node-based orchestration with schedules, conditions, loops, and external calls
- **AI suite**: LLM chat, knowledge retrieval, OCR / TTS / ASR, MCP protocol
- **Plugin ecosystem**: loaded at runtime via Module Federation; build your own with one command

Let's walk through each of them.

---

## 1. Block canvas: 60+ block types

FatNotes builds pages out of "blocks" on a drag-and-drop grid. Blocks can be resized, nested, and grouped freely.

### Block types at a glance

| Category | Representative blocks |
| --- | --- |
| **Documents** | Text, Markdown, rich text (Slate), code (Monaco), spreadsheet (Univer), Word, PPT, PDF |
| **Charts** | Line, pie, radar, heatmap, candlestick, tree, treemap, sankey, funnel, pictorial bar, theme river (ECharts) |
| **Media** | Image, video, audio, carousel, IFrame, QR code |
| **Forms & controls** | Input, date, switch, radio, checkbox, select, slider, color picker, upload, transfer, cascader |
| **Layout** | Group, panel, tabs, split pane, main panel / sidebar / status bar / menu bar |
| **Data** | Data source, table, filter, time filter, spider, ETL DAG |
| **Others** | Terminal (xterm), topology, flowchart, swimlane, mind card, screen task, clock task, variable, modal / drawer / notification |

### Layout containers

Groups, panels, tabs, and split panes nest freely to build near-professional app UIs:

![Canvas layout: group + main panel + tabs](pathname:///fat-notes-home/img/features/canvas-layout.png)

### Chart widgets

Combine data tables, gauges, heatmaps, and trend charts on one page:

![Chart widgets: table + gauges + heatmap + trend](pathname:///fat-notes-home/img/features/chart-components.png)

### Linked time filter

Every dashboard can bind a time filter. Quick ranges (today / last N minutes / last N hours) and absolute time switch freely, and all charts refresh:

![Time filter demo](pathname:///fat-notes-home/img/features/time-filter.gif)

---

## 2. Data: from connection to presentation

### Multi-source management

The built-in database manager supports SQLite, MySQL, PostgreSQL, MariaDB, TimescaleDB and more, with visual table browsing:

![Database manager](pathname:///fat-notes-home/img/features/db-manager.png)

### Spreadsheet (Univer engine)

An Excel-like spreadsheet block with formulas, styling, and multiple sheets — business sheets such as purchase lists live right inside your notes:

![Univer spreadsheet: marketing expense sheet](pathname:///fat-notes-home/img/features/univer-sheet.png)

### Document parsing

Powered by pandas, openpyxl, python-docx, python-pptx, and pypdf, Excel / Word / PPT / PDF files can be parsed into structured data for dashboards or AI.

---

## 3. Workflow automation: let the engine do the repeats

The flow editor splits a task into connectable nodes. Drag nodes on the canvas and wire them up. Built-in node families:

- **Logic**: conditions, loops, iteration, wait, variables
- **Data**: source query / insert / update / delete, expressions, code execution
- **AI**: LLM calls, knowledge retrieval, agents
- **External**: HTTP requests, screen automation (mouse / keyboard / find image / find color / screenshot), browser automation (Playwright)
- **Media**: audio / video transcode, TTS, ASR, OCR

### A real run

In this demo: type a Unix timestamp into the input block → click "Build" → the engine runs the "time offline conversion" node → the result is written back to the text block with a toast:

![Flow automation run demo](pathname:///fat-notes-home/img/features/flow-run.gif)

When the run finishes, the result block turns `$value` into the formatted time:

![Flow result: 1790000000 → 2026-09-21 22:13:20](pathname:///fat-notes-home/img/features/flow-result.png)

### Flows and dashboards together

Flows are not isolated — the ETL DAG is itself a block on the canvas and can sit beside inputs and charts, forming interactive mini-apps of "input → process → visualize".

---

## 4. Diagrams and thinking tools

Flowcharts, mind maps, and relation diagrams work out of the box — double-click to edit, ideal for system architecture, business processes, and knowledge links:

![Diagrams: flowchart + mind map + relation graph](pathname:///fat-notes-home/img/features/diagrams.png)

Notes and charts can be linked explicitly, making the "data → conclusion" relation visible:

![Notes linked with charts](pathname:///fat-notes-home/img/features/notes-charts.png)
![Notes linked with charts](pathname:///fat-notes-home/img/features/relate.png)

---

## 5. AI: give the workspace a brain

The AI settings hub manages every AI capability:

![AI settings: models / OCR / knowledge base / memory / MCP / TTS / ASR / agent strategy](pathname:///fat-notes-home/img/features/ai-settings.png)

| Capability | Description |
| --- | --- |
| **LLM chat** | The secondary sidebar is reserved for chat; DeepSeek and other models supported |
| **Knowledge base (RAG)** | Vectorize your notes and documents so AI answers are grounded in your context |
| **Memory** | Remember preferences and facts across sessions |
| **Agents & skills** | Task decomposition, tool calling, custom agent strategies |
| **OCR / TTS / ASR** | Image to text, text to speech, speech to text |
| **MCP** | Standard Model Context Protocol servers extend the AI's tool boundary |

Press `Ctrl + K` to open the command palette and jump straight into chat:

![Command palette: open Chat / command panel](pathname:///fat-notes-home/img/features/command-palette.png)

---

## 6. Global search and productivity details

- **Global search**: built on ripgrep — files, features, and workflows found instantly (`Ctrl + K`)

![Global search](pathname:///fat-notes-home/img/features/global-search.png)

- **Terminal block**: PowerShell / CMD / Bash embedded in dashboards; command output can drive other blocks

![Terminal block: PowerShell / CMD / Bash](pathname:///fat-notes-home/img/features/terminal.png)

- **Bilingual UI** (zh_CN / en_US), **in-app auto update**, and an **asset repository** that centralizes images and media

---

## 7. Usage scenarios (with demo data)

All scenarios below come from the demo workspace shipped with FatNotes.

### Scenario 1: Personal learning tracker

Put study logs into the built-in SQLite database and let the dashboard aggregate them.

**Sample data** (`test_db.goodman` table):

| ID | name | age | createDate | score | lastName |
| --- | --- | --- | --- | --- | --- |
| 3 | Zixuan | 20 | 2026-10-01 | 90 | Zhang |
| 5 | Yutong | 18 | 2026-09-30 | 80 | Li |
| 4 | Wenjing | 70 | 2026-09-17 | 70 | Meng |
| 6 | Zeyu | 6 | 2026-09-04 | 50 | Zhang |
| 7 | Shihan | 2 | 2026-10-01 | 20 | Wang |
| 8 | Junjie | 5 | 2026-09-17 | 60 | Li |

**Presentation**: score trend, channel-share pie, and completion gauges are generated automatically — change the data and the charts follow.

### Scenario 2: Procurement and inventory

Maintain an "RFQ sheet" with the spreadsheet block instead of scattered Excel files:

| No. | Material | Spec | Unit | Qty | Arrival |
| --- | --- | --- | --- | --- | --- |
| 1 | Cooling tower belt | SHPB3700-KS4 | set | 2 | 2025-09-28 |
| 5 | Fan belt | SPB2500 | set | 6 | 2025-09-28 |
| 8 | AC filter | aluminum alloy, activated carbon 490\*490\*46 | set | 40 | 2025-09-28 |

Combine data blocks for arrival statistics and flow nodes for overdue reminders — sheets stop being "dead documents".

### Scenario 3: Data format automation

The dirtiest data in every handover: Unix timestamps. Orchestrate one flow:

```
Input block (Unix timestamp) → time offline conversion → result text block + notification
```

Type `1790000000`, get `2026-09-21 22:13:20` in one click (see the run demo above). The same pattern applies to log cleaning, encoding conversion, scheduled scraping, and more.

### Scenario 4: Business analysis with AI weekly reports

Notes and charts share the screen: the weekly analysis note on the left, live charts on the right, linked with lines. Ask AI to read the knowledge base and the on-page data to draft a report based on real numbers — **conclusions and supporting data always live on the same page**.

### Scenario 5: Team toolbox

Plugins turn FatNotes into a team portal: IT interview bank, game box, 3D showcases… see the next section.

---

## 8. Plugin system and the third-party ecosystem

### How plugins work

FatNotes plugins load at runtime via **Module Federation** (think VSCode extension model). A plugin can contribute:

- Activity bar items, primary sidebar views, panel tabs, footer status
- Full-page routes, workbench pages, settings pages
- **Custom block types**, display configs, add-block menu categories
- **Flow node types** (canvas render + drawer edit)
- Global search providers, AI settings sections, context menus, commands

The host stays zero-heavy-dependency — chromadb, PaddleOCR, Playwright and other heavyweight capabilities are installed on demand by plugins.

### Third-party plugins in the wild

**Body Map** (fat-dissect): an interactive 3D human body with 2,234 modeled parts, system filters and peeling:

![Third-party plugin: Body Map 3D](pathname:///fat-notes-home/img/features/plugin-body3d.png)

**Fat Games**: 31 mini games built in (2048, Tetris, Snake, Minesweeper, Gomoku…):

![Third-party plugin: game box](pathname:///fat-notes-home/img/features/plugin-games.png)

**Toolbox** (fat-tools): Tesla Model X 3D showcase with exploded parts:

![Third-party plugin: Tesla Model X 3D](pathname:///fat-notes-home/img/features/plugin-tesla.png)

**IT Interview Bank** (fat-it-interview): 364 questions across frontend / Java / backend / ops / algorithm / database, with study tracking:

![Third-party plugin: IT interview bank](pathname:///fat-notes-home/img/features/plugin-interview.png)

**Light Writing** (fat-pen): a project-based writing workspace:

![Third-party plugin: light writing](pathname:///fat-notes-home/img/features/plugin-pen.png)

Official plugins also include:

| Plugin | Description |
| --- | --- |
| fat-ai-base | Heavy AI capabilities (chromadb / PaddleOCR / OpenCV) |
| fat-browser-use | Browser automation (Playwright) |

---

## 9. Plugin development: one command to start

### Quick start

```bash
npx fat-notes-extension-cli create my-plugin
```

The scaffolded project:

```
my-plugin/
├── plugin.json              # manifest read by the installer
├── funcs.json               # capability catalog
├── package.json
├── webpack.config.js        # Module Federation build
├── src/
│   ├── bootstrap.ts         # async MF entry
│   ├── index.tsx            # exports activate(sdk) / deactivate()
│   └── PluginView.tsx       # example contribution component
└── types/
    └── fat-notes-sdk.d.ts   # SDK type definitions
```

### Plugin entry

```tsx
export async function activate(sdk: FatNotesPluginSDK): Promise<void> {
  // register an activity bar item + primary sidebar view
  sdk.contributions.registerActivityBarItem({ /* icon, id ... */ });
  sdk.contributions.registerPrimarySidebar({ /* view definition ... */ });

  // or register a custom block type / flow node
  sdk.contributions.registerBlockType({ /* defaultOptions, dataConfig ... */ });
}

export function deactivate(): void {
  // clean up registrations
}
```

### SDK surface

| Namespace | Purpose |
| --- | --- |
| `sdk.host` | Host version and mode |
| `sdk.dataSource` | Enumerate and read data sources |
| `sdk.query` / `sdk.mutation` | Run saved queries / mutations, raw SQL, insert rows |
| `sdk.ui` | Toast, modal, theme, i18n |
| `sdk.commands` | Register and execute commands |
| `sdk.store` | Read-only access to host Redux state |
| `sdk.config` | Read / write plugin runtime config |
| `sdk.contributions` | Register all UI contributions |
| `sdk.events` | Plugin / host event bus |
| `sdk.flow` | List, read, execute host workflows |
| `sdk.ai` | Host AI models and chat completion |
| `sdk.asset` | Asset repository: list / upload / rename / move files |
| `sdk.boards` | Per-plugin board config |
| `sdk.remoteComponents` | Reuse host components (block box, flow editor, time / cron selectors) |

### Develop and publish

```bash
fn-ext dev     # watch mode
fn-ext build   # build
fn-ext pack    # produce release/<code>_v<version>.zip
```

Install the zip in-app under "Settings → Advanced plugins". For development, register the plugin `dist` folder with devMode and changes apply immediately.

> Full SDK docs and templates live in the `fat-notes-extension-cli` repository.

---

## 10. Get started

- Download and install: see the [Quick Start](../getting-started/quick-start.md)
- Requirements: Windows 10+ (WebView2 runtime), install and go
- License: AGPLv3 — repository at [LazyChun/fat-notes](https://github.com/LazyChun/fat-notes)

:::tip Always evolving
FatNotes iterates fast. Screenshots in this document come from the latest release; the UI may change slightly between versions.
:::
