---
sidebar_position: 1
title: Overview
sidebar_label: Overview
description: "An overview of FatNotes system components: every built-in block grouped by the component panel, with a short description."
---

# System Components Overview

FatNotes pages are built from **blocks**; the blocks shipped with the app are called **system components**. Open the **Components** panel in the top-right corner of a page to browse by category or search by name, then add a component to the current page.

FatNotes provides **52 system components in 10 categories**. Below they are listed in the same order as the component panel, each with a short description of what it does. Linked category headings lead to the corresponding chapter. Components in the *Plugin* category come from installed plugins and are not included here.

## Component panel

![Component panel (top): Charts, Window, Layout, AI, Data, Filter, Form, Office](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-overview-1.png)

*Top of the component panel: Charts, Window, Layout, AI, Data, Filter, Form, Office*

![Component panel (bottom): Dialog, Other](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-overview-2.png)

*Bottom of the component panel: Dialog, Other*

## Component list

### [Charts](./chart.md)

Visualize query results; these are the building blocks of data dashboards.

- **Line** — Show trends over time or across categories, with line, area, and bar display modes.
- **Table** — Present records as a table for row-by-row inspection.
- **Pie** — Show how each category contributes to the whole.
- **Candlestick** — Display open, close, high, and low market data.
- **Radar** — Compare a set of metrics across multiple dimensions.
- **Heat Map** — Use color intensity to show data density or distribution.

### [Window](./window.md)

Host standalone views and containers for code, commands, and shortcuts.

- **Function Panel** — A panel that groups frequently used actions and shortcuts.
- **Code** — Display or edit code snippets inside a page.
- **Terminal** — An embedded command line for running commands directly in the page.

### [Layout](./layout.md)

Control how blocks are arranged and switched on a page.

- **Group** — Combine several blocks into one unit that can be moved together.
- **Block Panel** — A bordered, titled container that wraps other components.
- **Tabs** — Switch between groups of content using tabs.
- **Scene** — A multi-page container with a configurable initial page and navigation.
- **Splitter** — Split an area into two panes with a draggable divider.
- **Carousel** — Display content cards in a rotating slideshow.

### AI

- **Thinking** — Exposes AI reasoning, showing model inference results on a page and serving as a thinking node in flows.

### Data

Connect to raw data and prepare it for charts and other components.

- **Data Source** — Connect and manage databases and tables for queries on the page.
- **Data Processing** — Arrange cleaning, transformation, and ETL steps in a visual flow.

### [Filter](./filter.md)

Filter data by conditions or time ranges and pass the result to other components on the same page.

- **Common Filter** — Filter data by fields and condition combinations.
- **Time Filter** — Filter by time range, with commonly used presets.
- **Variable** — Define reusable parameters referenced by queries, components, and flows.

### [Form](./form.md)

Input, selection, and interaction controls for collecting parameters or triggering actions.

- **Form** — A container that groups multiple inputs for a single submission.
- **Input** — Single-line text entry.
- **Button** — Trigger a submission or a custom action.
- **Date Picker** — Pick a date or a date range.
- **Switch** — Toggle between on and off.
- **Radio** — Select one option from a group.
- **Checkbox** — Select multiple options at once.
- **Slider** — Drag to choose a value or a value range.
- **Select** — Pick one option from a dropdown.
- **Multi Select** — Pick several options from a dropdown.
- **Auto Complete** — Suggest matching values while typing.
- **Cascader** — Select across linked levels, such as province / city / district.
- **Rate** — Star-based scoring.
- **Color Picker** — Pick a color value for use in other settings.

### [Office](./office.md)

View and work with common office documents directly on a page.

- **Excel** — Embed a spreadsheet to view and edit tabular data.
- **Word** — Embed and preview Word documents.
- **PPT** — Embed and play presentations.
- **PDF** — Embed and read PDF files.

### [Dialog](./dialog.md)

Modal interactions and lightweight feedback.

- **Modal** — A centered dialog for confirmations or form interactions.
- **Drawer** — A side panel that slides in from the edge of the page.
- **Message** — A lightweight global toast that reports the result of an action.
- **Notification** — A notification card with a title and body.

### [Other](./misc.md)

Content display and automation components that do not fit the categories above.

- **Text** — A plain text block.
- **Markdown** — Write structured content with Markdown syntax.
- **Rich Text** — A WYSIWYG editor supporting bold, italic, colors, and more.
- **Image** — Display an image.
- **Video** — Play a video file or video link.
- **IFrame** — Embed an external web page.
- **QR Code** — Generate a QR code from text or a link.
- **Clock Task** — Trigger events at scheduled times and drive other blocks.
- **Screen Task** — Arrange screen, mouse, and keyboard actions for UI automation.

## Related docs

- [Flow Components](./flow-widget.md) — Reusable components for the flow canvas, used with flow automation nodes.
- [Popular Plugins](../../plugins/index.md) — Extra components and capabilities provided by plugins.
