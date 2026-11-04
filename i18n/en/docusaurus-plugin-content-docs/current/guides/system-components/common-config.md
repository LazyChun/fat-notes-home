---
sidebar_position: 1.5
title: Common Configuration
sidebar_label: Common Configuration
description: "Common configuration shared by all FatNotes blocks: title & style, data formats, frame, tooltip, legend, and display options."
---

# Block Common Configuration

FatNotes pages are built from **blocks**. Besides each block's own private options, every block shares a set of **common configuration** — line charts, forms, and text blocks alike all use the same panels for title, data formats, frame, tooltip, and legend. Master this chapter and you can configure any block with confidence.

## Opening the configuration panel

Hover over a block's title bar; a dropdown arrow appears on the right. Click it to open the actions menu and choose **Edit** (shortcut `e`):

![Block actions menu: Edit, Clone, Delete](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-1.png)

*Hover the block title → dropdown menu → Edit*

The configuration drawer opens with a **live preview** and **data query** settings on the left, and the **display configuration** panel on the right. A search box at the top helps you locate any option quickly; matching groups expand automatically:

![Configuration drawer: preview & query on the left, display config on the right](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-2.png)

*Configuration drawer: preview & query on the left, display configuration on the right*

The display configuration consists of collapsible groups: Style, Series Style, Data Format, Relate Label, Frame, Tooltip, Legend, and Display. "Series Style" belongs to the block's private options (per-query styling); all the other groups are common configuration shared by every block. Chart blocks expose the fullest set of groups; text, form, and dialog blocks only keep the groups relevant to them.

## Style

The first item in the **Style** group is **Title**: name the block and check "Show" to display it on the title bar; leave it empty to keep the default name.

Below the title are the **block-specific style options**, which vary by block type. A line chart, for example, offers display mode (line / smooth / step), color theme (Classic / Cold / Hot), line type, data zoom, mark points, and line width:

![Style group: title and block-specific styles](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-3.png)

*Style group: title + block-specific styles*

## Data Format

The **Data Format** group controls how values are displayed:

- **Custom precision** — Set decimal places for all metrics; leave empty for the default.
- **Number conversion** — When enabled, values are converted automatically, e.g. `10000` shows as `10K`.
- **Per-query settings** — Configure each query item separately:
  - **Unit** — Append a unit to the metric (e.g. `%`);
  - **English units / Auto carry-over** — Use English unit abbreviations (K, M) with automatic scaling;
  - **Custom precision / Number conversion** — Override the global settings for this query only;
  - **Query alias / Metric alias** — Rename the query item and metric in tooltips and legends.

![Data Format group: precision, conversion, and per-query settings](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-5.png)

*Data Format group: global settings + per-query configuration*

## Relate Label

When blocks are linked for interaction, a relate label appears on the title bar to indicate the linkage. Turn on **Hide** in this group if you don't want to show it.

## Frame

The **Frame** group controls the appearance of the whole card:

- **Background color** — Card background.
- **Title align** — Left / center / right, plus bold, italic, and font color.
- **Title highlight** — Enter a keyword to highlight matching text in the title; you can also **add a link** to it, often combined with variables for dynamic titles.
- **Shadow** — Card drop shadow.
- **Padding** — Space between content and border (top / right / bottom / left, in px).
- **Border width** — Border thickness per side (all / top / right / bottom / left) with a color picker.
- **Border radius** — Card rounding, globally or per corner.
- **Event tags** — Choose which event tag types (trigger / receive) to hide.

![Frame group: background, title, shadow, padding, border, and radius](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-4.png)

*Frame group: from background color to event tags*

## Tooltip

The **Tooltip** group configures the popup shown when hovering over chart data points:

- **Show** — Toggle the tooltip.
- **Type** — Show all (list every series at the current point) or show current (only the hovered series).
- **Key font / Font** — Font, bold, italic, and color for series names and values.
- **Shadow / Padding / Border width / Border radius** — Appearance of the tooltip box itself.

## Legend

The **Legend** group controls the chart legend:

- **Position** — Top / bottom / left / right, including corners (e.g. bottom-left, top-right), or hidden.
- **Mark** — Alignment between mark and text (left / right / auto) and mark shape (dot, circle, square, rectangle, …).
- **Orient** — Horizontal or vertical layout.
- **Text** — Legend text color, bold, italic, or hide the text entirely.
- **Value** — Which value or aggregate to show in the legend (First, Last, Avg, Min, Max, Sum).

## Display

The **Display** group hides **metric names**: separately in the tooltip, data labels, and legend — useful when metric names are long or redundant.

![Tooltip and Legend groups](pathname:///fat-notes-home/img/instruction/sysBlocks/zh/sys-blocks-common-6.png)

*Tooltip and Legend groups*

## Saving

The preview on the left updates as you edit; click **Save** in the top-right corner to apply the configuration to the block on the page. Click **Run** to re-query with the current configuration if the preview data is stale.

## Related documents

- [Overview](./overview.md) — All system components at a glance.
- [Charts](./chart.md) — Chart-specific private options (data queries, series styles).
