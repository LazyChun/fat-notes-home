---
sidebar_position: 6
title: Filters
sidebar_label: Filters
description: "FatNotes Filter components: General Filter, Time Filter and Variable — conditions, variable syntax and linkage."
---

# Filters

> Filter blocks draw nothing and store nothing. They emit **conditions and parameters** that make charts, tables and flows on the same page re-query. They are what turns a static report into an explorable tool.

| Block | Output | Consumed by | Typical use |
| --- | --- | --- | --- |
| **General Filter** | Field + operator + value | Chart queries, tables, flows | Filter by region, category, status |
| **Time Filter** | `startTime` / `endTime` | Global page time range | Switch week / month / custom range |
| **Variable** | Named page parameter | Query conditions, block titles, flow inputs | Reuse a threshold or keyword |

![Example page for the Filter category](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-filter-example.png)

*Three filter blocks on top, a linked line chart below. The **red box** marks the Time Filter, which drives the page-wide time range.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-filter-example.png" target="_blank" rel="noopener">View full size</a>

## How a condition reaches a chart

```
Filter / Variable  ── condition or parameter ──▶  Query (WHERE / time range)
                                                   │
                                                   ▼
                                  Charts, tables and flows re-query
```

A reliable three-step order:

1. **Place the filter blocks** on the canvas.
2. **Reference them** in query conditions, or let the Time Filter own the page time range.
3. **Wire the linkage** in the block's Events → Linkage, mapping outputs to inputs.

:::tip Variables are the shared bridge
[Form](./form.md) controls also have a "variable name" and write into the **same page variable pool**. A dropdown selection can therefore serve as a query condition, appear in a block title and feed a flow input — no conversion block needed.
:::

## Block reference

The three filter blocks are **not configured in the right-hand Style group**: General Filter and Variable use the left panel or the block itself, and Time Filter is operated directly on the block. Each section below lists the options, defaults and how to reference them.

![Private options in the drawer](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-filter-config.png)

*The Variable block has a very small private form; its value lies in what it writes into the page variable pool.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-filter-config.png" target="_blank" rel="noopener">View full image</a>

### 1. General Filter `filter`

**What it does**: Combines one or more field conditions that users change at runtime and that drive other blocks on the page.

![General Filter rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-filter.png)

*Rendered example: the filter card prompting you to pick a data source and tick dimensions or measures.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-filter.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Condition row (three parts)**

| Option | Values / default | Description |
| --- | --- | --- |
| Field `keyword` | Pick a data source column or query key; empty by default | Use the physical column name or query key; a display label will not work. |
| Operator | eq / ne / gt / gte / lt / lte / contains / not contains / between | Between suits amount or date ranges; contains suits text and multi-select. |
| Value | Text / search / number / range / date / date range / single / multiple | The control follows the field type; a `$variable` reference is also accepted. |

**Per-field options**

| Option | Values / default | Description |
| --- | --- | --- |
| Display name | Text; defaults to the field name | User-facing label; make it clearer than the physical column name. |
| Allowed operators | Tick from the 9 operators | Restrict to type-appropriate operators to avoid invalid conditions. |
| Candidate values | Static list / data source column / variable | Provide candidates for enumerated fields so users do not type values. |
| Paging | On / Off; default `Off` | Turn on for large candidate lists. |

> **Tip**: Wire the block via Events → Linkage and check the output/input parameters; conditions alone do nothing.

### 2. Time Filter `timeFilter`

**What it does**: Outputs `startTime / endTime` for the page-wide range; every time-based query follows it.

![Time Filter rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-timeFilter.png)

*Rendered example: the filter showing "This year"; clicking opens other presets or absolute time.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-timeFilter.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Range settings**

| Option | Values / default | Description |
| --- | --- | --- |
| Quick ranges | Today; last 15s / 1m / 5m / 1h / 1d / 7d / 30d … 1y; this week / month / year | Usually placed at the top of a dashboard; switching requeries the page. |
| Absolute time | Pick start and end manually | For fixed review windows; quick-range linkage appears inactive while absolute time is used. |
| Refresh interval | Off / seconds / minutes / hours; default `Off` | Enable for live dashboards together with relative ranges. |
| Default value / show clear | Initial range on load; clear switch | Set a default range so charts are not empty on first load. |

### 3. Variable `variable`

**What it does**: Central page-level parameters such as thresholds, current region or metric definitions, referenced from many places.

![Variable rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-variable.png)

*Rendered example: the variable card prompting you to add variables and explaining `$name` references.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-variable.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Variable definition**

| Option | Values / default | Description |
| --- | --- | --- |
| Name | Text; letters, digits, underscore; unique on the page | Duplicate names overwrite each other; system and user variables share the syntax. |
| Value | Text / number / JSON | Match the type at the reference site; text in a numeric filter is ignored. |
| Description | Text; empty by default | Explains the purpose for collaborators. |
| Show clear | On / Off; default `Off` | Lets users reset the variable at runtime. |

**Reference syntax**

| Option | Values / default | Description |
| --- | --- | --- |
| `$name` | Current value | Works in query filters, title highlights, flow inputs and action URLs. |
| `$name.sub` | Object field | For JSON object values. |
| `$name[index]&` | Array item | For array values. |

## Cheat sheet

| Need | Block | Where |
| --- | --- | --- |
| Field-based filtering | General Filter | Field, operator, candidate values |
| Time range switching | Time Filter | Presets, absolute time, refresh interval |
| Reuse one parameter | Variable | Name / value / description |
| Pass results to charts | Linkage | Events → Linkage: wires, outputs / inputs |
| Show the current value in a title | Variable + title highlight | Common → Frame → Title highlight |

## Typical setups

1. **Standard dashboard** — Time Filter + General Filter (region / category) + line chart and table; one change refreshes everything.
2. **Parameterised query** — a `threshold` variable used as a query value, written by a [Slider](./form.md).
3. **Dynamic title** — `region` plus title highlighting renders "`{region}` Sales Overview".
4. **Flow input** — variables passed to a [Flow Widget](./flow-widget.md) when a button starts the run.

## Notes

- Filters are **linkage sources**; changing a value has no effect until a linkage or a query reference exists.
- A query pinned to an absolute range may appear to ignore the Time Filter.
- Use unique, ASCII-only variable names — duplicates overwrite each other.
- Keep value types consistent with the target field; text in a numeric condition will be ignored or rejected.

## Related

- [Overview](./overview.md) · [Charts](./chart.md) · [Forms](./form.md) · [Common Configuration](./common-config.md)
