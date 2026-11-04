---
sidebar_position: 5
title: Flow Widgets
sidebar_label: Flow Widgets
description: "FatNotes Flow Widgets: workflow cards, workflow component nodes, manual runs and cron scheduling."
---

# Flow Widgets

> [Flow Automation](../flow-automation.md) explains **how to wire nodes together**. This chapter explains **how to reuse a finished flow as a component** — across pages and inside other flows.

:::note A clarification
"Flow Widgets" is a **documentation chapter**, not a category in the component panel. The panel groups blocks as *Chart / Window / Layout / AI / Data / Filter / Form / Office / Dialog / Other*, see [Overview](./overview.md). In the app, two layers correspond to this chapter.
:::

## Two layers of reuse

| Layer | Where | What | Solves |
| --- | --- | --- | --- |
| **① Workflow cards** | On **dashboard pages**, next to charts and forms | Data Processing `etlDag`, Think `think`, Screen Task `screenTask` | Treat a whole flow canvas as one block with layout and linkage |
| **② Workflow component nodes** | Inside a **flow canvas** | ETL Workflow, Screen Sprite Workflow, Think Workflow | Insert a saved flow as a sub-flow of another flow |

![Example page for Flow Widgets: three workflow cards](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-flow-example.png)

*All three workflow cards on one canvas. The **red box** marks the Data Processing card — an editable ETL flow canvas inside a block.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-flow-example.png" target="_blank" rel="noopener">View full size</a>

## ① Workflow cards

All three cards embed a flow canvas and share configuration for **flow style** (line routing, input/output dot size and colour, card background and shadow) and **toolbar** (visibility, hover vs. always-on, position, appearance). They differ in the node categories available:

| Card | Panel category | Node categories | Typical use |
| --- | --- | --- | --- |
| **Data Processing** `etlDag` | Data | Logic, workflow components, input/output, data fetch, data processing, basic, message, screen/mouse/keyboard… | Collect → clean → load |
| **Think** `think` | AI | Think nodes first (LLM, TTS, ASR, Agent, memory read/write), then the rest | Reasoning, Q&A, generation |
| **Screen Task** `screenTask` | Other | Screen, mouse, keyboard, browser, clipboard, media, system only | UI automation, batch operations |

### Running and scheduling

As soon as a page contains a workflow card, the page tab toolbar shows **Run**:

- **Run now / Stop** — execute the page's workflows manually;
- **Scheduled run** — a Cron expression, or presets such as every 5 minutes, hourly, daily, weekly;
- **Run page** — see which workflow cards exist on the panel, their state and results.

### Linkage with the page

Workflow cards accept **input parameters** (from form variables or chart clicks) and can fire a linkage **on output**, passing results to charts, tables or other blocks. A Think card is often the middle of an "input → reasoning → output" chain.


## Block reference

All three workflow cards share the same private options: **flow data + flow style + toolbar**. They differ in node categories and canvas content. Options and screenshots are listed below; running, scheduling and linkage were explained earlier.

### 1. ETL Workflow `etlDag`

**What it does**: Puts a full collect → clean → load ETL canvas on the dashboard, runnable manually or on a schedule.

![ETL Workflow rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-etlDag.png)

*Rendered example: an embedded canvas with Start → Input nodes and a node palette on the right.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-etlDag.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style / canvas**

| Option | Values / default | Description |
| --- | --- | --- |
| Flow data `etlFlow` | Node/edge JSON; empty by default | Widest palette: business logic, workflow components, I/O, data fetch, data processing, basics, messages, screen / mouse / keyboard. |
| Flow style `flowStyle` | Edge path, port sizes and colours, card background and shadow | Appearance only; logic is edited on the canvas. |
| Toolbar `toolbar` | Visibility (default `On`), hover or always, position and look | Shared by all three workflow cards. |

> **Tip**: Any workflow card adds a Run entry to the tab toolbar: run / stop, scheduled run (Cron or presets), and a run overview.

### 2. Thinking Workflow `think`

**What it does**: AI reasoning card: thinking nodes (LLM, TTS, ASR, Agent, memory read/write) come first, plus the ETL palette.

![Thinking Workflow rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-think.png)

*Rendered example: the same canvas layout, with thinking nodes first in the palette.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-think.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style / canvas**

| Option | Values / default | Description |
| --- | --- | --- |
| Flow data `thinkFlow` | Node/edge JSON; empty by default | Fits input → reasoning → output: take form variables as input, write results back or trigger linkage. |
| Flow style / toolbar | Same as ETL Workflow | Edges, ports, card colours and toolbar visibility. |

### 3. Screen Task `screenTask`

**What it does**: UI automation card whose palette is limited to screen, mouse, keyboard, browser, clipboard, media and system.

![Screen Task rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-screenTask.png)

*Rendered example: a wide automation canvas with visible nodes and edges.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-screenTask.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style / canvas**

| Option | Values / default | Description |
| --- | --- | --- |
| Flow data `screenFlow` | Node/edge JSON; empty by default | Typical nodes: find image / colour / text, click, move, scroll, key press, clipboard, launch program. |
| Flow style / toolbar | Same as ETL Workflow | Shared across the three cards; only the node palette differs. |

> **Tip**: Workflow cards accept inputs (form variables, chart clicks) and can trigger linkage on output, passing results to charts or tables.

## ② Workflow component nodes

Open the node panel inside any flow canvas and look for the **Workflow Components** category:

| Node | Reuses |
| --- | --- |
| **ETL Workflow** | A saved Data Processing flow |
| **Screen Sprite Workflow** | A saved Screen Task flow |
| **Think Workflow** | A saved Think flow |

Dropping one opens the **flow selector**: search by name or description, filter by flow type, then load that flow's canvas data into the current one. A tuned flow becomes a callable function for many other flows.

:::tip Card or node?
Need visible results, scheduling, or chart linkage on a page → workflow **card**. Need to reuse logic inside another flow → workflow component **node**. Both reference the same set of saved flows.
:::

## Node categories at a glance

| Category | Representative nodes |
| --- | --- |
| Flow control | Start, End |
| Business logic | Code, If, Loop, Expression, Iteration, List variable |
| **Workflow components** | ETL / Screen Sprite / Think workflow |
| Input & Output | In, Out |
| Data fetch | HTTP request |
| Data processing | Add / delete / update / query data |
| Basic | Variable groups, text, log, wait, JSON conversion |
| Message | Send / receive message |
| Static | Annotation, rich text, backdrop, drawing board |
| Screen / Mouse / Keyboard | Find image / colour / text, click, move, scroll, key press |
| Clipboard / System / Media | Read / write clipboard, launch app, performance info, media transcoding |
| Think | LLM, TTS, ASR, Agent, question classification, document extraction, memory |
| Browser | Open page, click element (partly plugin-provided) |

## Typical setups

1. **Scheduled pipeline** — a Data Processing card runs "fetch → clean → write table" daily at 08:00; [charts](./chart.md) query the processed table.
2. **AI Q&A dashboard** — an [input](./form.md) variable feeds a Think card; the result is written back to a variable and shown by a [text](./misc.md) block with title highlighting.
3. **Flow reuse** — save a "login + export" screen flow, then call it from several automations via the Screen Sprite Workflow node.
4. **Failure notice** — the error branch fires a [notification](./dialog.md) when the flow ends.

## Notes

- Configuration of a workflow card is mostly about the **canvas content**; the style panel only covers canvas and toolbar appearance.
- Scheduled runs belong to the **current page's cards**; removing the page or card removes the schedule.
- The flow selector lists only **saved** flows of the matching type.
- The AI and Data categories in the component panel contain the Think card, Data Source and Data Processing — the same capabilities from a different angle.

## Related

- [Flow Automation](../flow-automation.md) · [Overview](./overview.md) · [Forms](./form.md) · [Others](./misc.md)
