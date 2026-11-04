---
sidebar_position: 3
title: Windows
sidebar_label: Windows
description: "FatNotes Window components: Function Panel, Code and Terminal — containers, configuration and use cases."
---

# Windows

> Charts answer "what does the data look like"; Windows answer "what else can live on this page". A Window block hosts **one standalone view or tool** — a composable panel, a code editor, a terminal — right next to your dashboards.

| Block | Role | Container | Typical use |
| --- | --- | --- | --- |
| **Function Panel** | Titled panel with a logo and shortcuts | ✅ | Workbench home, action group, tool set |
| **Code** | Embedded code editor | ❌ | Technical notes, scripts, config samples |
| **Terminal** | Embedded command line | ❌ | Ops dashboards, debugging, command reference |

![Example page for the Window category](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-window-example.png)

*The three Window blocks side by side. The **red box** marks the Terminal — a real, executable shell rather than a screenshot.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-window-example.png" target="_blank" rel="noopener">View full size</a>

## How Windows differ from Layout and Charts

| | Window | [Layout](./layout.md) | [Chart](./chart.md) |
| --- | --- | --- | --- |
| Purpose | Embed a **tool / view** | Organise **blocks** | Show **data** |
| Needs a query | No | No | Yes |
| Interaction | Inside the block | Switching, collapsing, dragging | Hover, click, linkage |
| Configuration | Title, content path, inner tool | Arrangement, pages, splits | Queries and styles |

:::note Child blocks
A Function Panel can contain child blocks, just like a [Layout](./layout.md) container: place the panel first, then drag buttons, text or notes into it. Child block actions still work, so "panel + button → linked chart" is a common pattern.
:::

## Block reference

Window blocks have very few private options: the function panel is a container, while Code and Terminal do their work **inside** the block. Each section lists what can be changed in the drawer and what is available at runtime.

### 1. Function Panel `functionPanel`

**What it does**: Packages shortcuts, buttons and notes into a titled panel that can be moved as a unit; a container block.

![Function Panel rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-functionPanel.png)

*Rendered example: the panel in edit mode with a title bar and inner controls such as export directory and Build.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-functionPanel.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic / container**

| Option | Values / default | Description |
| --- | --- | --- |
| Title | Text; defaults to the component name | Shown at the top of the panel; describe what the group of actions does. |
| Logo path | Image path or icon name | Icon at the top left; leave empty for a title-only header. |
| Build | Button action | Packages the current panel as a reusable function panel, with success / failure / network feedback. |
| Child box `box` | Maintained by dragged-in child blocks | Not listed item by item: place the panel first, then drag buttons or text into it. |

> **Tip**: Put [form](./form.md) buttons inside and drive charts with linkage actions; child blocks move with the panel.

### 2. Code `code`

**What it does**: Embeds a code editor for displaying or writing snippets, with language switching and direct execution.

![Code rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-code.png)

*Rendered example: the code block in edit mode with JavaScript / Python language tabs and a content area.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-code.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Runtime controls**

| Option | Values / default | Description |
| --- | --- | --- |
| Language / content | Chosen and edited inside the block | There is no private form in the drawer; the content is the point, and appearance comes from [Common Configuration](./common-config.md). |
| Linkage output | Determined by in-block run / event settings | To feed results into charts, output structured data from a flow or a data source. |

### 3. Terminal `terminal`

**What it does**: An embedded shell that switches between PowerShell / CMD / Bash and runs commands with output shown in the page.

![Terminal rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-terminal.png)

*Rendered example: PowerShell / CMD / Bash tabs above the command output area.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-terminal.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Runtime controls**

| Option | Values / default | Description |
| --- | --- | --- |
| Shell | PowerShell / CMD / Bash | Switched at the top of the block; subsequent commands use that interpreter. |
| Command input / output | Typed directly in the block | No private form on the right; working directory and fonts come from the environment and [Common Configuration](./common-config.md). |
| Linkage hint | Can receive linkage | The demo page shows "no linked variable yet"; a button or form can pass variables in. |

> **Tip**: The terminal runs local commands with the app's privileges; avoid destructive commands on shared pages.

## Configuration cheat sheet

Window blocks have very few private options; appearance lives in [Common Configuration](./common-config.md):

| Need | Where |
| --- | --- |
| Panel title, logo | Function Panel → Style / Basic |
| Background, border, shadow, radius | Common → Frame |
| Title font, alignment, highlight | Common → Frame |
| Inner spacing | Common → Padding |
| Hide event labels | Common → Event labels |

## Typical setups

1. **Workbench home** — Function Panel with buttons + Terminal pinned to a project folder + a Markdown note from [Others](./misc.md).
2. **Ops dashboard** — metrics on top, a persistent Terminal below: investigate without switching windows.
3. **Technical doc page** — Code block for the script, Markdown card for parameters, [IFrame](./misc.md) for the reference docs.

## Notes

- Window blocks need no query; the drawer usually has no data panel.
- Availability of Code / Terminal may vary with the installed version and plugins — trust your local component panel.
- The Function Panel is a container: place it first, then drag children in. Changing a child's canvas coordinates does not change ownership.

## Related

- [Overview](./overview.md) · [Common Configuration](./common-config.md) · [Layout](./layout.md) · [Forms](./form.md)
