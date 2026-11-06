---
title: Toolbox (FatTools)
sidebar_label: Toolbox (FatTools)
description: "FatTools (fat-tools) plugin reference: the three-part UI of 100 local tools, how to find and use them, shared conventions across tool pages (search, routing, two execution modes, copy/export, usage history), dashboard blocks and troubleshooting."
---

# Toolbox (FatTools)

> Once FatTools is installed, a **wrench icon** appears in the activity bar. Click it and you get a two-pane workbench: a tool menu on the left, one tool page on the right, with "100 tools" at the top of the sidebar. Text diff, JSON formatting, hashing, QR codes, invoice archiving... the tools do very different things, but they are **all used the same way**: find it → open it → type something → copy or export the result → a restorable usage record is written automatically. This article focuses on **how to use the toolbox** and the **mechanisms shared by every tool**; only a handful of tools are described individually.

## 1. What It Is: A UI-Oriented Plugin

FatTools (`fat-tools`, manifest name `Fat Tools`) in the [plugin overview](./index.md) is different from [FatCharts](./fat-charts.md) or [FatAiBase](./fat-ai-base.md): it adds no flow nodes and no chart blocks. It contributes **an entire piece of UI** — an activity bar entry, a primary sidebar menu, a full workbench page, and one route page per tool.

| Aspect | Detail |
| --- | --- |
| Tool count | **100 tools** in the current version, organised into 11 categories; trust the "N tools" counter in the sidebar |
| UI contributions | Activity bar wrench, primary sidebar menu, workbench page, `/tools/<toolId>` route pages, settings page, global-search items |
| Where computation happens | Almost all tools are **pure frontend**: text, encodings, images and PDFs are processed locally in the browser, never uploaded |
| Plugin backend | Only usage history (`history.db`) and a few format conversions; no business HTTP port, no part in ordinary tool computation |
| Extra contributions | 2 dashboard block types, 2 commands, a display config panel; `panel` / `footer` are `false` in plugin.json |

![Where FatTools fits in FatNotes](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-arch.png)

*Top to bottom: the three-part layout → the four sections of a tool page → shared mechanisms such as routing, search and history → dashboard blocks, commands and settings page.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-arch.png" target="_blank" rel="noopener">Open full size</a>

:::note Interface language
Tool names, buttons and hints inside the plugin are currently **Chinese only**; host menus, global search and other shell text follow the application language. That is why the screenshots in this English article show English host menus but a Chinese toolbox.
:::

## 2. Getting Started in Three Steps

### 2.1 Install, Entry Point and Layout

Install and enable `fat-tools` in the [Extensions center](../guides/extensions.md), and a wrench icon appears in the activity bar. Clicking it splits the window into three areas (red boxes below): the thin **activity bar** on the far left, the **tool menu** in the middle (search box + tool cards), and the **tool workbench** on the right. While the plugin is active it hides the secondary sidebar and bottom panel so the tool page gets more room.

![The three-part toolbox layout](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-layout.png)

*Red boxes, left to right: the wrench in the activity bar, the tool menu (search box + cards), and the tool page. The tool's own history panel is visible at the bottom of the workbench.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-layout.png" target="_blank" rel="noopener">Open full size</a>

### 2.2 Four Ways to Find a Tool

You never need to scroll through 100 cards. The search box at the top of the menu matches **title, description, category and tool id**, and understands Chinese, English, full pinyin and pinyin initials:

| Method | How | Best for |
| --- | --- | --- |
| Sidebar search | Type `json` to get the JSON tool, data-format conversion, JSON-to-type and other related cards | You only remember a keyword or rough purpose |
| Pinyin initials | Type `zstj` to jump straight to Word Count (zi shu tong ji) | A Chinese IME is not convenient |
| Global search shortcut | Press `Ctrl + K` and type an expression, timestamp, JSON text or color value | The content is already on the clipboard and you want to skip "find tool + paste" |
| Command / route | Run the `fat-tools.openTool` command with a tool id, or open `/tools/<toolId>` directly | Jumping from a flow, another extension or a script |

![Searching json in the sidebar](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-search.png)

*Red boxes mark the search field and the first matching card. Cards below also match `json` in their descriptions; the gray tag on each card is its category.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-search.png" target="_blank" rel="noopener">Open full size</a>

![Pinyin initials zstj match Word Count](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-search-pinyin.png)

*Four initials narrow the list to a single result; full pinyin (e.g. `zishutongji`) works too.*

The cleverest route is **content shortcut**: the plugin registers an input pattern for a group of tools. Type the expression `1+2*3` into global search and it lists Calculator and Scientific Calculator directly; selecting a result not only opens the tool but also pastes that text into its input.

![Typing an expression in global search jumps to Calculator](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-global-search.png)

*Results carry a "tool" tag on the right; press `Enter` to open, and the typed content comes along.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-global-search.png" target="_blank" rel="noopener">Open full size</a>

### 2.3 Opening and Remembering

Click any card → the plugin calls `sdk.router.navigate` with `/tools/<toolId>` → the workbench page renders that tool immediately. Switching tools never reloads the app or disturbs your current page. The chosen tool is also stored in `localStorage`, so **the next time you open the toolbox (or restart the app) you land on the last tool you used**. On first use, or when that memory is missing, it falls back to the first tool in the registry.

:::tip Seeing "Opening toolbox..." forever?
That is the placeholder shown while the route is not under `/tools/*`. Click the wrench again, or simply click any card; no plugin restart is needed.
:::

## 3. Shared Features: One Convention for Every Tool

![One complete tool run and the shared-feature cheat sheet](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-common.png)

*The six steps "find → open → compute → take → record → reuse" are largely identical across all 100 tools; every row in the table gives an example you can reproduce.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-common.png" target="_blank" rel="noopener">Open full size</a>

### 3.1 The Four Sections of a Tool Page

Most tool pages are assembled from the same components: **header + actions**, **input**, **output**, **history**. A full run with the JSON tool: paste minified JSON into the input → click Format in the top right (with indent 2 / 4 and Minify beside it) → the output shows a "valid JSON" tag and formatted text → click Copy result. When parsing fails, the output points at the text near the error offset instead of just saying "invalid JSON".

![Formatted output of the JSON tool](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-tool-json.png)

*Red boxes mark the Format button (top right) and Copy result above the output; the strip at the bottom is this tool's history panel.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-tool-json.png" target="_blank" rel="noopener">Open full size</a>

| Section | Shared convention | In practice |
| --- | --- | --- |
| Header + actions | Tool name, optional Back, and this tool's actions on the right | Format, Generate, Clear, Compare, Export... |
| Input | Text area / file upload / option groups; some tools accept text fed from global search | Algorithm multi-select, indent, color format, grid rows and columns |
| Output | Stat rows, previews or error hints, always with a copy button | The copy button briefly shows a success state; QR codes, barcodes and grid images export to PNG / SVG / ZIP |
| History | Latest 15 records for this tool, with refresh / collapse / clear | Hidden entirely when there are no records, so it wastes no space |

### 3.2 Two Execution Modes: Live vs Button-Driven

The biggest difference between tools is simply **when results appear**:

| Mode | Trigger | Examples | When a record is written |
| --- | --- | --- | --- |
| **Live** | Recomputes automatically after input changes (the hash tool waits about 150 ms) | Hash, regex tester, word count, color conversion, radix conversion, timestamp | About **1.5 s** after you stop typing (debounced), so every keystroke does not create a record |
| **Button-driven** | Runs only when you click an action | JSON format / minify, encode / decode, password / QR generation, PDF merge, invoice archiving | Immediately on a successful action |

Hash is a typical live tool: type `FatNotes fat-tools`, keep MD5 and SHA-256 selected, and both digests appear with their own copy buttons. Above them you can switch between Text hash and File hash; file mode reads in streamed chunks and shows progress with a cancel option.

![Live results of the Hash tool](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-tool-hash.png)

*The red box contains the MD5 and SHA-256 rows; output can be lower-case HEX, upper-case HEX or Base64, and a known digest can be pasted in for comparison.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-tool-hash.png" target="_blank" rel="noopener">Open full size</a>

### 3.3 Output, Theme and Locality

- **Taking results away**: a shared copy button (1.5 s success state), stat rows, and each tool's own export buttons (PNG / SVG / ZIP / CSV). Text tools often put results in a read-only text area for easy select-all.
- **Theme**: the plugin shell follows the host light/dark theme; cards, borders and text colors switch with it, with no separate setting.
- **Local computation**: PDF merge / split, invoice parsing and image splitting all happen in the browser; invoice contents are never uploaded to a server. That is why the File category is safe for sensitive material.
- **A few networked tools**: DNS lookup (DoH), online exchange-rate updates and AI-assisted naming do access the network; the rest work offline.
- **Language**: as noted above, plugin labels are Chinese while the host shell follows the application language.

## 4. Usage History: A Shared Undo Button

History is not a feature of one tool — it is a plugin-wide mechanism. Most tool pages have the same panel at the bottom: **refresh, clear, collapse/expand**; each row carries an action tag, a summary and a relative time. **Clicking a row restores the complete input from that moment**, and restoring does not create yet another record.

![The history panel at the bottom of a tool page](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-history-panel.png)

*The red box is the history panel of Text Diff: all three rows can be clicked to restore their inputs. Refresh, clear and collapse are on the right.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-history-panel.png" target="_blank" rel="noopener">Open full size</a>

For a global view, open the **Operation History** tool in the menu: it shows the total record count and the database file path, lets you filter by tool, refresh or clear, and jumps back to the corresponding tool when you click a row.

![Operation History: totals and the full record list](pathname:///fat-notes-home/img/instruction/fatTools/en/ft-history-tool.png)

*The top strip shows the total and the `history.db` path; the top right filters by tool. The list is newest first, with tags distinguishing calculate, format, encode and other actions.* · <a href="/fat-notes-home/img/instruction/fatTools/en/ft-history-tool.png" target="_blank" rel="noopener">Open full size</a>

| Mechanism | Behavior |
| --- | --- |
| Storage | `fatTools/history.db` inside the workspace, maintained by the plugin's Python backend with the standard-library `sqlite3` module |
| Backend handlers | `history.add` / `history.list` / `history.clear` / `history.stats` / `history.dbPath` |
| Retention | Only the latest **500 records per tool**; long fields are truncated automatically |
| Fallback | If the backend is unavailable, browser `localStorage` takes over (up to 200 records) with no loss of tool functionality |
| Debounce | Live tools write only after 1.5 s of inactivity, so typing does not flood the database |
| Restore | Most records keep the original input; clicking one fills it back in without generating a new record |

:::caution Records contain your input
History includes pasted text, expressions, JSON and similar content. After working with passwords, ID numbers or contract excerpts, clear the corresponding records from the tool panel or Operation History. Records stay on this machine only (database or browser storage) and are **not synced across devices**; they will not follow you to another computer.
:::

## 5. A Quick Look at the Tools

The 100 tools are grouped into 11 categories. The table below is a map, not a complete inventory:

| Category | Count | Representative tools |
| --- | --- | --- |
| Text | 16 | Text Diff, Regex Tester, Markdown Preview, Data Masking |
| Encoding | 12 | Base64, URL Encode/Decode, Color Converter, Contrast Checker |
| Dev | 24 | JSON Tool, Hash, Timestamp Converter, cURL Parser |
| Numbers | 13 | Calculator, Radix Converter, Unit Converter, Loan Calculator |
| Drawing | 2 | Canvas, Meme Maker |
| Generators | 8 | Password Generator, QR Code, Lucky Wheel, Dice |
| Time | 5 | Stopwatch / Countdown, Holiday Calendar, Lunar Converter |
| Life | 10 | Kinship Graph, Website Navigator, After-tax Salary, Luhn Check |
| Files | 7 | PDF Merge / Split, Invoice Tool, Grid Split, Screenshot |
| History | 1 | Chinese Dynasties |
| Records | 2 | Todo List, Operation History |

A few tools that best show "when would I need this":

| Tool | What it does | Typical use |
| --- | --- | --- |
| Text Diff | Line-level diff of two texts, side by side with additions / deletions | Comparing config files or API responses |
| Regex Tester | Live match highlighting, capture groups and named groups | Building a log-parsing rule while verifying it |
| JSON Tool | Format / minify / validate with error positions | Debugging a long JSON response |
| Hash | Text and file hashing, 12 algorithms including MD5 / SHA-1/2/3 / SM3 / CRC-32 | Verifying downloads, generating digests |
| Timestamp Converter | Timestamp ↔ date in both directions, with the current value live | Decoding time fields in logs |
| QR Code | Generate (error correction / size / color) and read QR codes from images; export PNG / SVG | Making share cards, decoding a QR from a picture |
| Invoice Tool | Merge e-invoices, extract fields, batch rename with a template, archive into ZIP by month / party | Tidying a pile of PDF invoices before reimbursement |
| Grid Split | Split an image into PNG tiles by rows and columns, 3×3 by default, ZIP download | Preparing a nine-tile social media post |
| Unit Converter | Length / area / mass / data / time / temperature conversions | Reading imperial units in documentation |
| Todo List | Lightweight todos persisted locally, with actions written to global history | Jotting down a few tasks without another app |

:::tip The list changes
Tool counts, names and categories may change between plugin versions. To see exactly what is installed, check the "N tools" counter and the card descriptions in the sidebar — they are more reliable than any static list.
:::

## 6. Beyond the Toolbox: Advanced Entry Points

Tools are not confined to the toolbox. The plugin also registers two **dashboard block types** that can be dragged onto a dashboard like any other component:

| Block type | Category / default size | Purpose | Private options |
| --- | --- | --- | --- |
| `fat-tools.calcCard` (Calculator) | `tools` / 4×10 | A compact calculator card on a dashboard | None; no data query (`dataConfig: false`) |
| `fat-tools.toolSwitcher` (Tool) | `other` / 6×24 | Switch between several frequently used tools inside one card | See below; ships with a display config panel |

Private options of `fat-tools.toolSwitcher` live under `options.toolSwitcher`:

| Field | Default | Meaning |
| --- | --- | --- |
| `tools` | `calculator`, `json`, `timestamp`, `uuid` | Tool ids available in the switcher |
| `defaultTool` | `calculator` | Tool shown when the card opens |
| `showSwitch` | `true` | Whether to display the switch control |
| `switchStyle` | `segmented` | `segmented` button group or `select` drop-down |
| `switchPosition` | `top` | Switch control at `top` or `bottom` |

Three more low-profile but useful entry points: the `fat-tools.openTool(toolId)` command (jump to a tool from a flow or another extension), `fat-tools.ping` (check that the plugin is loaded), and the settings page listing **every tool name with its route**. For plugin authors: this "activity bar + primary sidebar + workbench page" layout is built from `registerActivityBarItem`, `registerPrimarySidebar` and `registerWorkbenchPage` — the activity bar item id must match the workbench page id. See [Plugin development](../plugin-dev/index.md).

## 7. Troubleshooting and Boundaries

| Symptom | Check first |
| --- | --- |
| No wrench in the activity bar | Is the plugin installed and enabled in the [Extensions center](../guides/extensions.md)? Menu and workbench page are not registered otherwise |
| Workbench keeps showing "Opening toolbox..." | The current route is not under `/tools/*`; click the wrench again or any tool card |
| A tool cannot be found | Try another keyword: Chinese name, tool id, full pinyin or initials. Search matches title / description / category |
| A live tool left no record | Records are debounced by 1.5 s after you stop typing; also, the whole history panel is hidden when empty |
| Copy button does nothing | Clipboard permission in the browser; the plugin falls back to a temporary textarea, and you can still select the output manually |
| File tools are slow | Large PDFs / images are parsed in the browser and depend on local performance; files are never uploaded and consume no server resources |
| History disappeared on another computer | Records live only in the local `history.db` or browser storage; there is no cloud sync |
| Tool names are still Chinese in the English UI | Expected: plugin labels are currently Chinese; the host shell follows the application language |

A few boundaries worth keeping in mind:

- **It is a UI plugin, not a data-source plugin**: tools are not bound to books, tables or dashboard queries; ordinary tool pages need no data-source configuration.
- **The backend is not a computation engine**: a Python backend is enabled in the manifest, but it mainly serves usage history and a few conversions. Most tools keep working when the backend is down — records simply fall back to browser storage.
- **Records stay local**: they contain input content, so clear them after sensitive work; backing up the workspace also copies `fatTools/history.db`.
- **Version differences**: tool counts, categories and some button labels may change between plugin versions; trust the interface of the installed version.

## Related docs

- [Popular plugins · Overview](./index.md) — the full plugin list and project links
- [FatCharts](./fat-charts.md) — dashboard chart blocks in the same sidebar category
- [Extensions center](../guides/extensions.md) — installing, enabling and plugin status
- [Data dashboard](../guides/data-dashboard.md) — dragging in Calculator / Tool Switcher cards
- [Flow automation](../guides/flow-automation.md) — calling tools with commands and variables
- [Plugin development](../plugin-dev/index.md) — activity bar, sidebar and workbench page contributions
