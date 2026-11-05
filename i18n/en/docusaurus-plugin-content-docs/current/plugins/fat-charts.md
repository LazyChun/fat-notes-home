---
sidebar_position: 1
title: FatCharts
sidebar_label: FatCharts
description: "FatCharts plugin reference: six extra chart blocks — time series, number, distribution, rank, honeycomb and dial — their queries, private display options, examples and typical combinations."
---

# FatCharts

> FatCharts is an extension that **adds chart blocks to dashboards**. Once installed, six new cards appear in the **Chart** category of the component panel. They store no data themselves: they turn **query results** into configurable visuals. This page covers how these six cards fetch data and how to configure them. Shared settings such as title, panel frame, relate labels, tooltip and legend are documented in [Common Configuration](../guides/system-components/common-config.md) and are not repeated here.

## 1. What the plugin adds

Install and enable `fat-charts` from the [Extension Center](../guides/extensions.md), then open the **Components** panel at the top right of a page and expand **Chart**. The six red-boxed items below come from the plugin; the others (Line, Table, Pie, Candlestick, Radar, Heat Map) are built into the app.

![The Chart category, with six plugin blocks outlined in red](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-panel.png)

*Time Series / Number / Distribution / Rank / Honeycomb / Dial are interleaved with the built-in blocks in this order: Time Series → Number → Table → Distribution → Pie → Rank → Honeycomb → Dial → Candlestick → Radar → Heat Map.* · <a href="/fat-notes-home/img/instruction/fatCharts/en/fc-panel.png" target="_blank" rel="noopener">Open full size</a>

| Card | Block type | Question it answers | Default size (cols × rows) |
| --- | --- | --- | --- |
| **Time Series** | `fat-charts.trend` | How a metric changes over time; how series compare | 8 × 32 |
| **Number** | `fat-charts.number` | What the current value is | 4 × 20 |
| **Distribution** | `fat-charts.distribution` | Which ranges values fall into, and how many | 8 × 32 |
| **Rank** | `fat-charts.rank` | Who is on top, and by how much | 8 × 32 |
| **Honeycomb** | `fat-charts.honey` | The status of many objects at a glance | 8 × 32 |
| **Dial** | `fat-charts.dial` | How close a value is to its limit | 8 × 32 |

Put all six on one canvas and you get the gallery below — the first four rows are plugin blocks, the last row is built-in charts:

![Example dashboard with all six plugin chart blocks](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-overview.png)

*Top to bottom: number cards; time series (line / bar / area); rank cards (text / horizontal bar / vertical bar); distribution, honeycomb and dial. Every card reads the same sample order data — only the display configuration differs.* · <a href="/fat-notes-home/img/instruction/fatCharts/en/fc-overview.png" target="_blank" rel="noopener">Open full size</a>

:::info Built-in charts still work
The plugin **complements** rather than replaces them: built-in line, pie, table, candlestick, radar and heat map remain, as described in [System Components · Chart](../guides/system-components/chart.md). Time Series uses a lightweight time-axis renderer (uPlot); distribution, rank and dial are ECharts-based; honeycomb is drawn as hexagons. The same query can feed both a built-in and a plugin chart.
:::

## 2. Query first, draw second

All six cards share the same **query configuration** in the lower-left of the config drawer. The drawer has three areas: **time range plus Run / Save** at the top, **Query** at the lower left, and **Display** settings on the right — the focus of this page.

![The Query area at the lower left of the config drawer](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-query.png)

*Each query item is one data-fetching rule, labeled `A / B / C`. Switch between metric and table queries, add filters and options, or add an expression that computes from existing queries.*

| Concept | Where | What it does |
| --- | --- | --- |
| Query item | Query area, `+ Query` / `+ Expression` | One item produces one series / data set. The plugin generates series-style and value-color rows from these items. |
| Data source & data item | First row of a query item | Pick the data source (`dbSource`) and the table or metric (`dsTableId`). An empty selection renders "No data". |
| Metric query `metric` | Query mode switch | Aggregates along the time axis: metric, aggregation (sum / avg / max / min / count), filters, minimum step, Range or Instant. Best for trends and monitoring. |
| Table query `table` | Query mode switch | Reads categories: **name column** (X axis / category), **value column**, aggregation, sorting, row limit. Best for rank, distribution, honeycomb and dial. |
| Expression | `+ Expression` | Computes from existing items, e.g. `A + B`, without touching the data source. |
| Time range | Top of drawer | "This year", last N days, or a custom interval. Click **Run** to re-query the preview, then **Save** to persist. |
| Data format | "Data format" group on the right | Precision, unit conversion, per-query display name and color — a shared host feature, not covered here. |

:::tip Three common causes of "No data"
1. The data source or data item is empty, or a filter removes every row.
2. The time range does not cover the data (e.g. data ends last month but "Today" is selected).
3. A table query has no **name column / value column**, or its row limit is 0.

Check the Query area before touching display options — styling cannot create data.
:::

:::caution Prefer a time column as the name column
The query engine **merges frames along a time axis**. Using a pure category column (product, channel) as the name column can produce `Invalid Date` or `NaN` labels across frames. For frame-based cards such as time series, distribution and honeycomb, use a time column; if you must group by category, use a table query limited to a single frame.
:::

## 3. Two rules shared by all six cards

### 1. Value color mapping

Number, distribution, rank, honeycomb and dial all have a **Value color mapping** group; Time Series achieves the same with **Series style**. It is a rule list matched **top down**:

| Field | Values / default | Notes |
| --- | --- | --- |
| Operator | Default, Equal, Not equal, Greater than, Less than, Greater or equal, Less or equal, Contains, Not contains; new rules default to "Greater than" | "Default" needs no compare value and acts as the fallback rule — usually keep it last. |
| Compare value | Number or text | Used with the operator, e.g. "Greater than 1000". |
| Background / font color | Color values; blue on white by default | Applied to the matched number, bar, cell or dial segment. |
| Display value | Text | Optionally replaces the raw value with readable text such as "OK" or "Alert". |
| Add rule / delete | Buttons | Rules are matched in order and stop at the first hit; new cards ship with one Default rule. |

![Value color mapping rules in the Number card config](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-number.png)

*Both "Text Prefix" and "Value color mapping" are expanded: one default rule contains operator, colors, display value and an "Add rule" button.*

### 2. Click actions

Each card registers a trigger and a set of actions, selectable in the block's action editor (action wiring itself is a shared feature):

| Card | Trigger | Actions |
| --- | --- | --- |
| Time Series | Click data point, click line | Relate, drill, update, filter, link to (the most complete) |
| Number / Distribution | Click card | Relate, link to |
| Rank | Click row | Relate, link to |
| Honeycomb | Click cell | Relate, link to |
| Dial | Click dial | Relate, link to |

---

## 4. Block reference

Each section gives a **single-card example**, the **private groups in the config drawer**, and the full list of private options. Shared items (title, panel, relate label, tooltip, legend) are omitted.

### 4.1 Time Series `fat-charts.trend`

**What it does**: draws one or more queries along a time axis as line, area, bar, scatter or dash. Use it for trends, comparisons and anomaly spotting. It has the richest configuration of the six.

![Time Series example: daily sales line](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-trend.png)

*X axis is the date, Y axis the amount; the legend at the bottom comes from the query item. Several queries can be overlaid.*

![Private options of Time Series: Style and Right Y axis](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-trend.png)

*"Style" and "Right Y axis" are open by default; "Marks", "Area fill" and "Series style" are collapsed private groups — click the arrow on the left to expand them.*

**Style**

| Option | Values / default | Notes |
| --- | --- | --- |
| Display | Line / Area / Bar / Scatter / Dash; default `Line` | Sets the drawing mode for the whole chart. Bar suits discrete comparison, area emphasizes accumulation, scatter shows distribution only. |
| Color theme | Classic / Cold / Hot; default `Classic` | Switches the whole palette at once. For precise per-series control use "Series style → custom color". |
| Line | Default (angled) / Smooth / Step; default `Default` | Only shown for Line, Area and Dash. Step suits tiered changes. |

**Right Y axis**

| Option | Values / default | Notes |
| --- | --- | --- |
| Enable | On / Off; default `Off` | Shows a second Y axis on the right. |
| Metric | Multi-select query items `A / B / C` | Selected queries use the right-hand scale — ideal for mixing amounts with counts. |

**Marks** (collapsed group)

| Option | Values / default | Notes |
| --- | --- | --- |
| Type / value | Horizontal / Vertical + number | Horizontal lines mark thresholds, vertical lines mark points in time. |
| Color / line style / bold | Color, Solid / Dash, `B` button | Keeps reference lines visible among dense curves. |
| Mark name | Checkbox + custom text | Adds a label such as "Target" or "Campaign start". |

**Area fill** (collapsed group)

| Option | Values / default | Notes |
| --- | --- | --- |
| Y range / X range | Min and max; X can be entered as Time or Number | Highlights a rectangle — an anomalous band or a campaign window. |
| Fill color / line color / opacity | Color, 0–1 | Fill only, recolor the line only, or both (at least one must stay enabled). |

**Series style** (collapsed group, one row per query item)

| Option | Values / default | Notes |
| --- | --- | --- |
| Chart type | The five graph types; empty inherits the global Display | Lets query A draw bars while query B draws a line, for combo charts. |
| Line width / dot width | 0–100, commonly 1 / 2 / 4 / 6 / 8 / 10 | In Scatter mode this controls dot radius. |
| Theme / custom color | Classic / Cold / Hot; any color value | **Custom color wins over the theme** — the recommended way to color multiple series precisely. |
| Line type / fill alpha / fill color | Default / Smooth / Step; 0–1; color value | Lower alpha in Area mode keeps overlapping areas readable. |

> **Tip**: Series-style rows follow the query items and sync automatically when queries are added or removed. A query alias is not consumed as a chart label; legend text comes from the display name in "Data format".

### 4.2 Number `fat-charts.number`

**What it does**: shows one or several current values as large digits — the KPI row at the top of a cockpit. Multiple query items render as multiple values.

![Number example: large sales total](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-number.png)

*The metric name sits under the title and the value in the middle; the color comes from the default value-color rule.*

![Private options of Number: Text Prefix and Value color mapping](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-number.png)

*"Style" contains only Display; the other private options live in the collapsed "Text Prefix" and "Value color mapping" groups.*

| Option | Values / default | Notes |
| --- | --- | --- |
| Display | Basic / Bg trend / Trend; default `Basic` | The latter two draw a sparkline behind or beside the number and need a query that returns multiple time frames. |
| Prefix | Any text; empty by default | Text before the number, e.g. `¥` or "Today". |
| Position | Top / Left; default `Top` | Where the prefix sits relative to the number. |
| Color | Auto / Custom; default `Auto` | Choosing Custom reveals a color picker for the prefix text. |
| Value color mapping | Rule list; one Default rule by default | See [section 3](#1-value-color-mapping); color overruns or alerts per range. |

> **Tip**: The card is 20 rows high by default; shrinking it too much clips the digits. Trend-style displays depend on newer front-end components and enough frames — if the sparkline is blank, switch back to Basic and check that the query has a time column.

### 4.3 Distribution `fat-charts.distribution`

**What it does**: buckets the values returned by a query into ranges and counts them (or computes percentages) as a histogram.

![Distribution example: daily sales ranges](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-distribution.png)

*X axis holds the range boundaries; Y axis shows the count per range by default. In this sample, sales cluster in the low ranges.*

![Private options of Distribution: ranges and value colors](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-distribution.png)

*"Style" holds the Y-axis meaning and the label switch; "Distribution ranges" controls the bucketing.*

| Option | Values / default | Notes |
| --- | --- | --- |
| Y-axis meaning | Distribution value (count) / Distribution ratio; default `Distribution value` | Ratio mode converts each bar to a percentage, useful when sample sizes differ. |
| Display label | On / Off; default `Off` | When on, choose Inside / Outside / Top / Bottom. Turn it off when there are many bars. |
| Range type | Auto / Custom; default `Auto` | Auto splits the value span evenly; Custom uses explicit split points. |
| Equal split count | 1–20; default `5` | Only in Auto mode; how many buckets to create. |
| Range | List of split values, add / remove | Only in Custom mode; `100, 500, 1000` produces four ranges. |
| Value color mapping | Rule list; one Default rule by default | Colors bars by range. |

> **Tip**: Buckets are built from the **values returned by the query** (e.g. one sales total per day), not from raw detail rows. To change the sample, edit the query's aggregation, sorting and row limit.

### 4.4 Rank `fat-charts.rank`

**What it does**: orders items by a metric as a text leaderboard, horizontal bars or vertical bars.

![Rank example: horizontal bar chart](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-rank.png)

*Names on the left, bar length for the value. The long labels come from using a time column as the name column in the table query.*

![Another rank shape: vertical bars](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-rank-vbar.png)

![Private options of Rank: Display and Value color mapping](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-rank.png)

*Display in "Style" selects the three shapes; "Y axis" only appears for bar shapes.*

| Option | Values / default | Notes |
| --- | --- | --- |
| Display | Text / Horizontal bar / Vertical bar; default `Text` | Text suits long names, horizontal bars suit size comparison, vertical bars show shape of the distribution. |
| Y axis | Left / Right; default `Left` | Only for bar shapes; controls which side carries the name labels. |
| Value color mapping | Rule list; one Default rule by default | Highlight the top three or out-of-range items; in Text mode it colors the text background. |

> **Tip**: Who ranks first and how many rows appear are **not card options** — they come from the query's `orderBy` and `limit`. Prefer a short category column as the name column; full timestamps like the sample produce very long bar labels.

### 4.5 Honeycomb `fat-charts.honey`

**What it does**: draws many objects as hexagonal cells and uses color depth for their values, so highs and lows stand out at a glance.

![Honeycomb example: daily order counts](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-honey.png)

*Each cell is one query result; darker means larger. The value-to-color legend sits at the lower left.*

![Private options of Honeycomb: color field, sort and color](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-honey.png)

*"Style" chooses the color field and sort order; the "Color" group is expanded by default for gradient / custom switching.*

| Option | Values / default | Notes |
| --- | --- | --- |
| Color field | Query item `A / B / C`; first item by default | Decides **which query colors the cells**. With several queries, pick one or all cells may share a single color. |
| Sort | Descending / Ascending; default `Descending` | Cell order only; values are unchanged. |
| Show dimensions | On / Off; default `On` | Whether to print the dimension text inside cells. Turn it off for many cells or long labels. |
| Gradient range | Auto / Custom; default `Auto` | Auto builds a scale from the value range; Custom uses the rules in Value color mapping. |
| Gradient palette | Preset palettes (blue, violet, …) | Swaps the whole color scale at once. |
| Reverse colors | On / Off; default `Off` | Flips the scale so a larger value can appear lighter. |
| Value color mapping | Rule list | In Custom mode, assigns colors to value ranges by rule. |

> **Tip**: The number of cells follows the query's row limit. The color field corresponds to `commonOptions.coloration` in the card data — when creating cards by script or with AI, point it at a query item id, or the honeycomb degrades to a uniform color.

### 4.6 Dial `fat-charts.dial`

**What it does**: places one current value on a gauge between a minimum and a maximum — ideal for completion rate, temperature or load.

![Dial example: speed gauge](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-block-dial.png)

*The green arc shows progress; metric name and current value sit in the center.*

![Private options of Dial: Range and Value color mapping](pathname:///fat-notes-home/img/instruction/fatCharts/en/fc-config-dial.png)

*"Range" sets the scale; "Value color mapping" defines the colored segments.*

| Option | Values / default | Notes |
| --- | --- | --- |
| Display | Speed / Stage speed / Basic; default `Speed` | Speed is the full arc; Stage speed colors segments; Basic is a simplified gauge. |
| Min value / Max value | Numbers; default `0 / 100` | Pointer position is `(value - min) / (max - min)`; out-of-range values are clamped to the ends. |
| Value color mapping | Rule list; one Default rule by default | Rules become gauge segments, e.g. red below 30, yellow 30–70, green above 70. |

> **Tip**: Bind **one query** that returns a single aggregate. Keep the card at least 30 rows tall; in shorter cards Stage speed and Basic degrade to a simple pointer. For segmented effects use Speed plus Value color mapping.

---

## 5. Quick reference

| Card | Options that shape the look | Options that shape the data |
| --- | --- | --- |
| Time Series | Display, color theme, line, right Y axis, marks, area fill, series style | Multiple query items + time range + data format |
| Number | Display, prefix / position / color, value color mapping | One or more aggregate queries + time range |
| Distribution | Y-axis meaning, display label, range type / split count, value color mapping | Name / value columns and row limit of a table query |
| Rank | Display, Y axis, value color mapping | Query sorting + row limit + name column |
| Honeycomb | Color field, sort, show dimensions, gradient / custom colors | Query item id + row limit |
| Dial | Display, min / max, value color mapping | One aggregate query |

## 6. Typical combinations

| Scenario | Cards | Key settings |
| --- | --- | --- |
| Business cockpit | 4 Number cards + area Time Series + bar Time Series + horizontal Rank | Color negative growth with Number value rules; put two queries on one Time Series and move the differently-scaled one to the right Y axis. |
| Device / service monitoring | Multi-series Time Series + Dial + Honeycomb | Add a horizontal mark (alert threshold) and an area fill (incident window) to Time Series; set the Dial range to the alert bounds; lay out devices in Honeycomb. |
| Distribution & composition | Distribution + Text Rank + built-in Pie | Use Distribution ratio for ranges, Rank with descending sort and a limit of 10 for the top items, Pie for category share; share one set of query filters. |

## 7. Notes and troubleshooting

- **Always Run → Save**: without Run you see stale data; without Save the configuration is lost on reload.
- **Shared settings are elsewhere**: title, panel frame, shadow, relate label, tooltip, legend and data format come from the host — see [Common Configuration](../guides/system-components/common-config.md).
- **Series colors**: for multiple series, set a custom color per query in Series style rather than switching the global theme; query aliases do not automatically become legend labels.
- **Version differences**: Number trend / bg trend and Dial stage speed / basic depend on newer front-end components and sufficient card height. If they render empty or degrade, fall back to the basic shape and check the installed plugin version.
- **Upgrades**: card settings live in the page data (`options` / `reqParams` / `commonOptions`) and normally survive plugin upgrades, but newly added graph types or fields fall back to defaults on older pages.

## Related docs

- [Popular Plugins · Overview](./index.md) — plugin list and project links
- [Extension Center](../guides/extensions.md) — install, enable and manage extensions
- [System Components · Chart](../guides/system-components/chart.md) — built-in line / pie / table / candlestick / radar / heat map
- [System Components · Common Configuration](../guides/system-components/common-config.md) — title, panel, relate label, tooltip, legend
- [Data Dashboard](../guides/data-dashboard.md) — data sources and dashboard workflow
