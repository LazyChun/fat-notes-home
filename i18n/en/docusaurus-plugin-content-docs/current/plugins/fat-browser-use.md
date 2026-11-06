---
sidebar_position: 3
title: FatBrowserUse
sidebar_label: FatBrowserUse
description: "FatBrowserUse (fat-browser-use) plugin reference: 13 browser-automation flow nodes, the element selector tool, file download/upload, the Playwright backend script with resident sessions, installation and troubleshooting."
---

# FatBrowserUse

> Installing it does not add a "browser" window to the UI. Instead, the flow canvas gains **13 blue nodes** in the Add Node panel: Open Web Page, Click Element, Input Text, Get Element Data, Download File and more — building blocks you can chain into an automation pipeline. A resident Python child process (Playwright) actually drives the browser, while this plugin supplies the nodes, their settings panels and the element selector tool. This page walks through **what it is → what the 13 nodes can do → how to chain them → how it runs → how to fix it**.

## 1. What it is: a composable browser-automation base

The [plugin overview](./index.md) describes it briefly as "Browser automation (Playwright)". More precisely, the plugin (`fat-browser-use`, manifest name `Fat Browser Use`) bundles three things:

1. **Frontend contributions**: 13 flow node types in the `browser` category registered with the host (canvas cards + settings panels), plus the **element selector** picker embedded in those panels;
2. **Backend capabilities**: a Python child process started by the host, exposing one generic `run_script` handler and a single script, `playwright_script.py`;
3. **Vendored dependencies**: `playwright>=1.40,<2` ships inside the package (`depsStrategy: vendor`), so it works right after installation — no hour-long first-run pip install like FatAiBase.

In the manifest, `activityBar / primarySidebar / panel / footer / routes / widgetTypes` are all `false` and the permission list is empty — **it has no UI entry of its own**; everything lives inside the flow editor and the flow executors.

![Where FatBrowserUse fits in FatNotes](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-arch.png)

*Top to bottom: 13 canvas nodes → host executors → bridge dispatch by script name → the plugin's `run_script` → public functions of `playwright_script.py` → Playwright and local browsers.* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/en/fbu-arch.png" target="_blank" rel="noopener">Open full size</a>

| What you see / use | What the plugin provides | Underlying dependency |
| --- | --- | --- |
| Flow · 13 **Browser** nodes | Node definitions, canvas cards, settings panels | Host flow engine |
| The **aim button** in settings panels | Element selector dialog and selector-generation script | A visible browser opened by Playwright |
| Clicking, typing, extracting, transferring files at run time | 20+ public functions in `playwright_script.py` | `playwright` + local browsers |
| Node outputs (`data`, `filePath`, `time_used(ms)`, ...) | Output parameters assembled by the executors | Host variable system |

:::info Same mechanism as FatAiBase
The host's `pyBackendBridgeService` keeps a "script name → plugin ID" map: `playwright_script.py` belongs to this plugin, while `chromadb_script.py / paddleocr_script.py / opencv_script.py` and friends belong to [FatAiBase](./fat-ai-base.md). Both are backend-capability plugins. The differences: FatAiBase uses `depsStrategy: install` and downloads 1–2 GB on first start, while this plugin vendors roughly 40 MB of Playwright; this plugin also registers a full set of frontend nodes.
:::

## 2. Install and first start

Install and enable `fat-browser-use` from the [Extension Center](../guides/extensions.md). Its backend config is `backend.enabled: true`, `depsStrategy: vendor`, `depsTimeoutSeconds: 3600` — the latter two apply at **packaging time**, when `pip install --target backend/vendor` bundles the dependency. End users do not wait for a dependency download.

| Item | Value / note |
| --- | --- |
| Backend entry | `backend/main.py`; no HTTP port, started by the host over stdin/stdout one-line JSON-RPC |
| Python dependency | `playwright>=1.40,<2`, shipped in `dist/backend/vendor/` |
| Browser binary | Prefers local **Microsoft Edge / Google Chrome** (`channel`); falls back to Playwright's bundled chromium |
| Do you need to download a browser? | Usually no. If none of the channels work, run `playwright install chromium` (the script also exposes `install_browsers`) |
| Run mode | Headful by default; "custom browser" offers a **Headless** mode |

:::caution Sessions live inside the process
The plugin keeps browsers, contexts and the current page in `_sessions[session_id]`. **Restarting the app or the plugin backend clears them.** Every browser flow should therefore start with Open Web Page; running a lone Click Element node fails with an error like "browser session not found, please run an Open Web Page node first". Login state, cookies and tabs persist only within one run of a flow.
:::

The host never fails silently: when the plugin is missing or disabled, script calls raise a guided error such as "This feature requires the plugin fat-browser-use (running playwright_script.py). Install and enable the plugin in the Extension Center, then retry".

## 3. The 13 nodes: a feature map

Click **Add node** on a flow canvas and search for "Browser" to see the complete list outlined in red below. They share the **Browser** category, blue icons and a default size of 360 × 100.

![All 13 nodes found by searching "Browser" in the Add Node panel](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-node-panel.png)

*The red box contains every node registered by this plugin; after uninstalling, existing nodes on the canvas show a placeholder with install guidance.* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/en/fbu-node-panel.png" target="_blank" rel="noopener">Open full size</a>

| Group | Node | What it does | Main outputs |
| --- | --- | --- | --- |
| Navigation | **Open Web Page** | Starts/reuses a browser session and visits a URL; browser, mode and wait condition are configurable | `url`, `web_page_title` |
| Navigation | **Refresh Web Page** | Normal reload, or hard reload / revisit URL / `location.reload()`, optionally scoped by matching rules | `refresh_urls` |
| Navigation | **Close Web Page** | Closes all pages or those matching URL / title / keyword; releases the session at the end | `closed_urls` |
| Interaction | **Click Element** | Click, double click, press, release; count, interval, press duration and modifiers | `time_used(ms)` |
| Interaction | **Input Text** | Fills a field, variables allowed; falls back to click + select-all + keyboard typing | `time_used(ms)` |
| Interaction | **Select Element** | Selects a `<select>` option by value / visible text / index | `time_used(ms)` |
| Interaction | **Check Element** | Checks / unchecks a box after reading its current state | — |
| Interaction | **Hover Element** | Hovers and optionally holds, for menus and tooltips | `time_used(ms)` |
| Interaction | **Drag Element** | Drags from a source selector to a target selector, with modifiers and duration | `time_used(ms)` |
| Interaction | **Scroll Element** | Mouse-wheel scrolling: vertical/horizontal, up/down/left/right, duration | `time_used(ms)` |
| Data | **Get Element Data** | Reads text, HTML, all attributes or a link URL from an element | `data` |
| Files | **Download File** | Triggered download via a click, or a direct URL download to a local folder | `filePath`, `fileName`, `downloadPath` |
| Files | **Upload File** | Triggers a page file input, or POSTs/PUTs a local file to a URL | `ok`, `statusCode`, `respText`, ... |

:::tip Three things shared by almost every node
An **element selector** (CSS, or `xpath:` / `css:` prefixes and XPath starting with `//`), **modifier keys** (Ctrl / Shift / Alt / Meta) and **Delay after action (ms)** (default 0). All inputs accept variables — for example, feed a `data` output into the next node's download URL. Timeout, retries and error handling are provided by the host, not configured in the plugin.
:::

### 3.1 Navigation: open, refresh, close

Open Web Page is the starting point of a flow and the only node that **creates a browser session**.

![Settings drawer of the Open Web Page node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-open.png)

*The red box marks "Open Type"; browser and mode (normal / headless) appear only when "Custom Browser" is selected.* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-open.png" target="_blank" rel="noopener">Open full size</a>

| Setting | Values / default | Notes |
| --- | --- | --- |
| URL | Required, variables allowed | Only `http` / `https`; the node's `input` can be substituted into the URL as `$input` |
| Open Type | Default Browser / Custom Browser | Custom mode lists installed browsers (from `app/flow/installedBrowsers`) |
| Mode (custom) | Normal / Headless | Use headless for unattended or server-side runs |
| Wait Condition | Load Complete / DOM Complete / Custom Time | Playwright `load` / `domcontentloaded`; custom mode adds a wait in seconds |
| Delay after action (ms) | 0 | Leave a buffer for client-side rendering before the next node |

Under the hood it calls `ensure_page` (reuse or launch by session ID) → `goto` (navigation) → `page_info` (actual URL and title), and writes `browser_session_id` into the execution context for all later nodes.

![Settings drawer of the Refresh Web Page node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-refresh.png)

*Switching "Refresh Type" to custom reveals hard reload, revisit URL, `location.reload()` and the scope options.*

Refresh and Close share one **matching rule set**: scope can be current tab, all tabs, match URL, match title or auto match; "Exact match" turns substring matching into equality; the match value accepts variables. The backing calls are `refresh` and `close_all / close_by_rule / close_current` — if nothing matches, they raise an explicit error instead of silently doing nothing.

### 3.2 Interaction: from clicking to scrolling

![Settings drawer of the Click Element node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-click.png)

*The red box marks "Selector"; the aim button on the right opens the element selector tool (see 3.3).* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-click.png" target="_blank" rel="noopener">Open full size</a>

| Setting | Values / default | Notes |
| --- | --- | --- |
| Selector | Required | CSS by default; also `xpath:` / `css:` prefixes and XPath starting with `//` |
| Action | Click / Double Click / Press / Release | Press and Release dispatch `mousedown` / `mouseup`, useful for drag-like widgets |
| Modifiers | Ctrl / Shift / Alt / Meta (multi-select) | Held during the action and released afterwards |
| Press duration | 0 ms | When > 0, passed to Playwright as `delay` |
| Click Count / Interval (ms) | 1 / 0 | Multiple clicks are executed one by one with the interval; double click forces a count of 2 |
| Delay after action (ms) | 0 | Waits for navigation or async rendering |

The other interaction nodes follow the same pattern with different action dimensions:

| Node | Specific settings | Underlying behavior |
| --- | --- | --- |
| Input Text | Text (variables allowed) | `locator.fill` first; on failure click → select all → `keyboard.type` |
| Select Element | Select by value / visible text / index + value | `select_option` with `value` / `label` / `index` |
| Check Element | Action: check / uncheck | Reads `is_checked()` and only calls `check()` / `uncheck()` when needed |
| Hover Element | Hover duration | `locator.hover()` followed by the configured wait |
| Drag Element | Source selector + target selector + drag duration | `locator.drag_to()` |
| Scroll Element | Scroll type, orientation (vertical/horizontal), direction, duration | `mouse.wheel` after hovering the target; with a duration it scrolls in 50 ms steps |

![Settings drawer of the Input Text node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-input.png)

*Both selector and text accept variables — the workhorse of "type a keyword → click search" combinations.*

### 3.3 Element selector tool: no hand-written CSS

Every selector field has an **aim button** next to it. It opens the dialog below: leave the URL empty to reuse the already-open page, or enter one to navigate and reuse the matching browser window. Clicking "Start Selector" opens a visible browser and injects an instruction bar into its top-right corner.

![Select Element dialog: optional URL and Ctrl / Shift instructions](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-selector.png)

| Gesture | Result |
| --- | --- |
| **Ctrl + click** | Generates a CSS path from the root to that single element (an `id` shortens it to `#id`) |
| **Shift + click two similar elements** | Compares both DOM paths and extracts shared tags, ids and classes into a selector matching a whole group |
| After selection | The result is returned via `on_element_selected`, the dialog closes and the selector field is filled automatically |

:::caution This step needs a human
`run_selector_tool` **blocks** until you pick an element in the browser, which is why the bridge allows a 3600-second script timeout. Plain clicks without Ctrl / Shift behave like normal page clicks and produce nothing; the blue highlight while moving the mouse is the current candidate. Do not leave the dialog hanging once a flow is waiting on it.
:::

### 3.4 Get Element Data: bring web content into the flow

![Settings drawer of the Get Element Data node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-data.png)

*The red box marks the "Data Type" dropdown, which determines the type of the `data` output.*

| Data Type | Output `data` | Typical use |
| --- | --- | --- |
| Text `text` | `inner_text()` | Titles, prices, status labels |
| HTML `html` | `inner_html()` | Keep inner structure for downstream text processing |
| Attributes `attributes` | An object of attribute name → value | Grab `class`, `data-*` and other metadata at once |
| URL `url` | First non-empty `href` / `src` / `data-url` / `url` | Extract a link or image address and feed Download File |

Failed reads return an empty string / object instead of raising, so a condition node can branch on the result. `data` can then be written into a table or referenced by the next node.

### 3.5 Download and upload files

Both nodes offer a "trigger" and a "URL" path; the difference is **whether a browser session is needed**.

![Settings drawer of the Download File node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-download.png)

*The red box marks "Download Type"; URL mode shows a file URL, trigger mode shows a trigger selector.*

| Download Type | Key settings | Underlying behavior | Outputs |
| --- | --- | --- | --- |
| Trigger (default) | Trigger selector, download path, optional filename | `click` from `playwright_script.py` (auto-retries with `force`), then the host watches the folder for a new file and renames it if needed | `filePath`, `fileName`, `downloadPath` |
| URL | File URL, download path, optional filename | Host streams the file with `requests`, infers the name from headers / URL, writes a `.part` file then atomically replaces it | Same as above |

![Settings drawer of the Upload File node](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-config-upload.png)

*The red box marks "Upload Type"; URL mode adds request method, upload params and upload address.*

| Upload Type | Key settings | Underlying behavior | Outputs |
| --- | --- | --- | --- |
| Trigger (default) | Trigger selector, local file path | Calls `upload_file`, using Playwright `set_input_files` on an `<input type="file">` | `ok`, `uploadType`, `filePath`, `fileName` |
| URL | File URL / local file, POST or PUT, upload address, upload params | Host downloads the remote file to a temp path first, then submits it as multipart with `requests` | `ok`, `statusCode`, `respText`, `filePath`, `fileName` |

:::tip Which one to pick
A page has an Export / Download button → use **trigger** (carries login state and cookies). You already have a direct link or need to call an API → use **URL** (no browser session, faster). URL upload forwards a fetched file to your own service; trigger upload fills in a web form.
:::

## 4. Chaining nodes: one complete automation

A typical chain is shown below, with the script function and outputs of each step:

![A typical browser automation flow](pathname:///fat-notes-home/img/instruction/fatBrowserUse/en/fbu-flow.png)

*Open Web Page creates the session; data extraction, download and cleanup follow; `browser_session_id` is shared throughout.* · <a href="/fat-notes-home/img/instruction/fatBrowserUse/en/fbu-flow.png" target="_blank" rel="noopener">Open full size</a>

| Step | Node | Key settings |
| --- | --- | --- |
| 1 | Start | Define `url`, `keyword`, ... |
| 2 | **Open Web Page** | URL = `$start_001.url`; Wait Condition = Load Complete |
| 3 | **Input Text** | Pick the search box with the selector tool; Text = `$start_001.keyword` |
| 4 | **Click Element** | Click the search button; delay after action 800 ms for results to render |
| 5 | **Get Element Data** | Selector points at the result list; Data Type = text or attributes |
| 6 | **Download File** | Trigger or URL download; `filePath` feeds the archiving step |
| 7 | **Close Web Page** | Close all pages and release the browser session |

Four shared mechanisms are worth remembering:

- **Session**: only Open Web Page creates `browser_session_id`; later nodes reuse one browser context, so login state, cookies and tabs carry over.
- **Waiting**: wait conditions handle loading, delay-after-action handles rendering; dynamic pages almost always need a few hundred milliseconds somewhere.
- **Variables**: inputs accept `$var.xxx` references to upstream outputs; selectors, text, URLs and download/upload paths can all be parameterized, and loops make batch processing possible.
- **Errors**: timeout (60 s by default), retry count and handling strategy come from the host; a failed browser action returns `FAILED` with the concrete reason.

| Scenario | Suggested chain |
| --- | --- |
| Scrape multiple pages after login | Open Web Page → Input Text ×2 → Click Element → loop (Get Element Data → Add Data) → Close Web Page |
| Scheduled report download | [Scheduled task](../guides/scheduled-tasks.md) → Open Web Page → Click Element → Download File → write to a table |
| Batch form filling / submission | Open Web Page → Input Text / Select Element / Check Element → Click Element → Get Element Data (verify) |
| Extract a link then download it | Get Element Data (`url`) → Download File (URL mode) |
| Unattended runs | Open Web Page with "Custom Browser + Headless" to avoid a visible window |

## 5. Backend capabilities (advanced)

The plugin backend **does not listen on an HTTP port**. It is a child process started by the host, communicating over stdin/stdout with one JSON object per line, and exposes a single business handler:

| Handler | Purpose |
| --- | --- |
| `run_script` | Takes `{script, func, args, kwargs}`, loads a module from `backend/scripts/` by filename and calls the named function |

Typical call (exactly what the host executors do):

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

Loaded modules are cached inside the process. The script maintains a background asyncio event loop thread, the `_sessions` dictionary and a selector event, so **consecutive nodes do not relaunch the browser**. RPC dispatch uses an 8-thread pool and the default call timeout is 3600 seconds.

| Function group | Main functions | Used by |
| --- | --- | --- |
| Session & navigation | `ensure_page` / `goto` / `page_info` | Open Web Page |
| Element actions | `click` / `input_text` / `hover` / `check` / `drag_to` / `scroll` / `select` | 7 interaction nodes |
| Page management | `refresh` / `close_current` / `close_by_rule` / `close_all` | Refresh / Close Web Page |
| Data & files | `get_element_data` / `upload_file` | Get Element Data, trigger upload |
| Selector tool | `run_selector_tool` | Element picker in settings panels |
| Standalone | `get_version` / `install_browsers` / `fetch_html` / `screenshot_base64` | Version check, browser install, HTML / full-page screenshot without a session |

:::note About screenshots and raw HTML
The script does provide `fetch_html` (headless fetch returning full HTML) and `screenshot_base64` (full-page PNG as base64), but **none of the 13 nodes is a "screenshot" or "get page source" node** — those functions are available to host features or plugin developers calling the backend directly. To capture page content, use Get Element Data. For plugin authors: `run_script` verifies that the script path stays inside `backend/scripts/` and returns clear errors for missing scripts or functions; see [Plugin development](../plugin-dev/index.md) for the conventions.
:::

## 6. Troubleshooting and caveats

| Symptom | Check first |
| --- | --- |
| "This feature requires the plugin fat-browser-use (running playwright_script.py)" | Plugin not installed / disabled; enable it in the Extension Center |
| "browser session not found, please run an Open Web Page node first" | Flow does not start with Open Web Page, or a previous step closed all pages |
| Browser fails to launch | No Edge / Chrome and no Playwright chromium installed; run `playwright install chromium` |
| Selector not found / timeout | Page not loaded, delay too short, element inside an iframe or rendered dynamically; re-pick it with the selector tool |
| Click / typing has no effect | Element covered or off-screen; shorten the chain, add a wait, or use a more stable selector (`#id`, attribute selectors) |
| Element picker keeps spinning | It is waiting for a human: Ctrl+click one element, or Shift+click two similar ones |
| No file appears in the download folder | Does the path exist, is the name conflicting, does the button really start a download? Try URL mode to verify the link |
| Upload fails | Is the `<input type="file">` selector right? For URL mode, check the address, method and params |
| Login is required again on every run | Sessions live only in the plugin child process and are cleared on restart; add explicit login steps if you need it each time |
| Nodes / settings disappear after an upgrade | Check the plugin status in the Extension Center; after uninstall the canvas keeps placeholders with install guidance |

- **It is a node pack, not a browser**: no window, sidebar or settings page of its own; look for it in Add Node and the Extension Center.
- **Open Web Page must come first**: the other 12 nodes all depend on the session and are useless on their own.
- **Do not share a session concurrently**: one `session_id` maps to one browser context; run parallel flows as separate runs so they do not fight over pages.
- **Selectors are the fragile part**: prefer `id` or stable `data-*` attributes; the "similar elements" selector from Shift+click is a good fit for list extraction.
- **Configuration still belongs to the host**: flows and node parameters are stored in pages; the plugin only supplies definitions and execution. Uninstalling does not delete existing flows.
- **Version differences**: function lists and form fields may change between releases; trust the UI of the version you have installed.

## Related docs

- [Popular Plugins · Overview](./index.md) — full plugin list and repositories
- [FatAiBase](./fat-ai-base.md) — the other capability plugin using the same backend bridge
- [Extension Center](../guides/extensions.md) — install, enable and dependency status
- [Flow Automation](../guides/flow-automation.md) — node orchestration, variables and error handling
- [Scheduled Tasks](../guides/scheduled-tasks.md) — run browser flows on a schedule
- [Plugin Development](../plugin-dev/index.md) — extension points and plugin structure
