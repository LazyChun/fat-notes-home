---
sidebar_position: 3
title: Quick Input
description: "A complete guide to FatNotes Quick Input: double-click to open, plain text to Markdown cards, $ command syntax, data sources and metrics, option keywords, suggestions and shortcuts, with a syntax diagram, animated demos and error reference."
---

# Quick Input

> **Double-click** a blank area of a board and a small input box appears. Type any text and press `Enter` to create a Markdown card; type a command starting with `$` and press `Enter` to create a widget of a chosen type, bound to a chosen query and style. It collapses "open the components panel → find a widget → drag it in → open the settings drawer" into a single keyboard action.

![The Quick Input popover opened by double-clicking a blank area; the red box marks the input and the shortcut hint](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-overview.png)

*The red box is the Quick Input popover: a text area on top (its placeholder already explains both modes) and a shortcut hint below. It appears near the point you double-clicked.*

---

## 1. How to open it

| Situation | Action | Result |
| --- | --- | --- |
| Blank area of a board | **Double-click** | Popover opens; the new card is appended to the bottom of that board |
| Blank area inside a container (group, block panel, ...) | **Double-click** | Popover opens; the card is appended to **that container** |
| Double-click on an existing card | — | No popover; the normal board editing behavior applies |
| Preview / read-only / configuration mode, function pages | Double-click | Not available, to prevent accidental edits |
| Click outside the popover / blur the input | — | Closes without creating anything |

There is no menu item and no activity-bar icon for Quick Input — **double-clicking a blank area is the only way** to open it. Pressing `Enter` with empty input just closes the popover too.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Enter` | **With suggestions**: insert the highlighted suggestion; **without suggestions**: parse the input and create the card |
| `↑` / `↓` | Cycle through suggestions (hovering with the mouse also changes the highlight) |
| `Tab` | Accept the highlighted suggestion |
| `Shift + Enter` | Insert a line break, for multi-line Markdown text |
| `Esc` | Cancel and close |

:::tip Enter wears two hats
While a command is half-written and suggestions are visible, `Enter` only **completes** them. Once the type name is complete, or the option block is closed with `}`, the suggestion list disappears — and only then does `Enter` **create** the card. This is the most common source of confusion.
:::

---

## 2. Two input modes

| Input | Creates | Best for |
| --- | --- | --- |
| Any text not starting with `$` | A **Markdown card** whose content is exactly that text | Quick notes, checklists, meeting minutes, section headings |
| A command starting with `$` | A **widget card** of the given type, optionally with a query and styling | Charts, numbers, tables, forms, containers and all other blocks |

---

## 3. Plain text: one line, one card

Multi-line Markdown is supported; press `Enter` when you are done.

![Animated demo: type multi-line Markdown and press Enter to create a card](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-markdown.gif)

*Double-click a blank area → type a heading and a list → press Enter → a Markdown card appears on the canvas.*

The card uses the default Markdown block size and is appended below the existing content of the target container. Its content is exactly what you typed, and it stays fully editable in the settings drawer.

---

## 4. The `$` command syntax

A complete command looks like this (using the demo data source `test_dog` and the metric table `销售订单`):

```text
$Time Series:test_dog-销售订单{agg:sum title:SalesTrend}
```

![The four segments of a Quick Input command](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-syntax-map.svg)

In one line:

```text
$widgetType[:dataSource-metric][{option option ...}]
```

| Segment | Example | Meaning | Required |
| --- | --- | --- | --- |
| Widget type | `$Line`, `$Number`, `$Time Series`, `$line` | Accepts a **display name**, **type id** or **id**; exact match wins, then substring and pinyin matching | Yes |
| Data source | `:test_dog` | Introduced by `:`; matches a data source name. Required for query options | No |
| Metric | `-销售订单` | Joined by `-`; matches a metric table of that source | No |
| Options | `{agg:sum title:SalesTrend}` | Space-separated `key:value` pairs inside braces for query and appearance | No |

Type names containing spaces work as long as you write them in full (for example `$Time Series` on the English UI), but **values inside the option block must not contain spaces**, because spaces separate options.

### Suggestions follow the syntax

After typing `$`, the popover shows candidates for whatever segment the cursor is in — you never have to memorize names:

![Widget type suggestions after typing $](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-types.png)

*All widget types available for quick creation, with their type ids on the right. Built-in types and loaded plugin types (e.g. Time Series, Number) are included; layout and frame-level system blocks are excluded.*

![Data source suggestions after the colon](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-source.png)

*Typing `:` lists data sources with their metric counts; picking one automatically appends `-` and moves on to the metric.*

![Metric suggestions after the dash](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-metric.png)

*Typing `-` lists the metric tables of that source; picking one automatically appends `{` and moves into the option block.*

---

## 5. The option block: query + style

Every keyword inside the braces brings its own next-level suggestions:

![Keyword suggestions in the option block](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-options.png)

*After `{`, all available keywords are listed. Continue with `agg:`, `groupBy:`, `filters:{` or `bgColor:` to get aggregate functions, dimension columns, filter columns and recommended colors respectively.*

### Option reference

| Keyword | Values / format | Effect | Needs `source-metric` |
| --- | --- | --- | --- |
| `agg:` | `sum` `avg` `min` `max` `count` `topk` `bottomk` | Aggregate function for the metric query | **Yes** |
| `groupBy:` | Dimension column names, comma-separated, e.g. `groupBy:地区,产品类别` | Group the query by dimensions | **Yes** |
| `filters:{...}` | `column=value`, comma-separated, e.g. `filters:{地区=华东,状态=完成}` | Equality filters | **Yes** |
| `title:` / `name:` | Text without spaces | Card title; defaults to the widget type display name | No |
| `bgColor:` | `#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa` | Card background color | No |
| `padding:` | Integer `0`–`100` | Padding on all four sides (px) | No |
| `theme:` | `classic` / `cold` / `hot` | Chart color theme | No |
| `graphType:` | Heat Map: `basic` / `calendar`; Radar: `basic` / `aqi` | Switches the shape of these two chart types; unsupported for others | No |

Styling without a query is perfectly valid:

```text
$Number{title:SalesTotal bgColor:#e6f4ff padding:16}
```

In the other direction, using any of `agg`, `groupBy` or `filters` requires a complete `:source-metric` header, otherwise you get "Specify source-metric before configuring query conditions".

### A complete command

![A complete command in the input](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-syntax.png)

*`$Time Series:test_dog-销售订单{agg:sum title:SalesTrend}` creates a Time Series card that sums 金额 from 销售订单 and titles it SalesTrend.*

![The cards created by both input modes](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-result.png)

*The canvas after creating one card with each mode: a Markdown card and a Time Series chart with data.*

The whole flow, animated:

![Animated demo: create a chart card with a $ command](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-command.gif)

*Double-click a blank area → `$` for type suggestions → complete type, source, metric and options → Enter → the chart card appears.*

:::info Quick Input creates a default-configured card
It builds the card and fills in exactly the options listed above. Time ranges, linked events, axes, legends and color mapping are still configured in the card's settings drawer; edit it afterwards as usual.
:::

---

## 6. Ready-to-use examples

Replace `test_dog` and `销售订单` with the names in your own workspace.

| Goal | Input |
| --- | --- |
| Jot down a note | `This week: check reports, schedule review` |
| An empty chart to configure later | `$Line` |
| A number card with a title and background | `$Number{title:SalesTotal bgColor:#e6f4ff padding:16}` |
| A time series of summed sales | `$Time Series:test_dog-销售订单{agg:sum title:SalesTrend}` |
| A pie chart grouped by region | `$Pie:test_dog-销售订单{agg:sum groupBy:地区 title:RegionShare}` |
| Only the East region | `$Number:test_dog-销售订单{agg:sum filters:{地区=华东} title:EastSales}` |
| A cold color theme | `$Line:test_dog-销售订单{agg:avg theme:cold}` |
| A calendar-style heat map | `$Heat Map:test_dog-销售订单{graphType:calendar}` |

---

## 7. Errors and caveats

When parsing fails the popover stays open and the error appears right below the input — fix the text and press `Enter` again.

![Unknown widget type error](pathname:///fat-notes-home/img/instruction/quick-input/en/qi-error.png)

| Message | Typical cause |
| --- | --- |
| `Unknown widget type: X` | The name after `$` matched nothing, or its plugin has not loaded; pick one from the suggestions |
| `Data source not found` / `Metric not found` | Wrong `:source-metric` name, or the `-` between them is missing |
| `Specify source-metric before configuring query conditions` | `agg` / `groupBy` / `filters` used without a complete header |
| `Dimension not found` / `Filter format error` / `Unrecognized option` | `groupBy` only accepts dimension columns; filters must be `column=value`; a keyword is misspelled or a value contains a space |
| `Invalid color` / `Invalid padding` / `Unknown chart theme` / `Option not supported` | A value outside the table above, or `graphType` used on an unsupported type |
| `Failed to create widget` | The backend did not return a new block; retry or check the application log |

A few boundaries worth knowing:

- **No spaces in option values**: `title:Sales Trend` is split into two options and the second half triggers "Unrecognized option". Use `title:SalesTrend` or a hyphen instead.
- **Delimiters inside names are ambiguous**: if a source, metric or column name contains `:`, `-`, `{` or `}`, the parser will split on it — prefer names without those characters.
- **The card does not appear where you double-clicked**: it is appended at the **bottom** of the target container (`x=0`) using the type's default size; drag and resize it afterwards.
- **Plugin types depend on your machine**: the suggestion list combines built-in types with the plugins currently loaded, so it differs across installations.
- **Double-clicking a card does nothing**: only blank grid space triggers Quick Input.

---

## Related docs

- [Data Dashboard](./data-dashboard.md) — the canvas, time ranges and board configuration.
- [System Components Overview](./system-components/overview.md) — what each component category can do.
- [Common Configuration](./system-components/common-config.md) — refine appearance, query formats and borders afterwards.
- [Chart Components](./system-components/chart.md) — detailed configuration of chart cards.
- [Database](./database.md) — where data sources and metric tables come from.
