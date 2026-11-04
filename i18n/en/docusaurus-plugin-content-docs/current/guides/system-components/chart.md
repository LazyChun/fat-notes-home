---
sidebar_position: 2
title: Charts
sidebar_label: Charts
description: "FatNotes chart components: line, table, pie, candlestick, radar and heatmap — queries, private options and linkage."
---

# Charts

> Chart blocks turn **query results** into visuals. They store no data themselves: they fetch, draw and react. Learn one query setup and all six built-in charts follow the same pattern.

Open the **Components** panel in the top-right corner of a page and expand **Chart**. Options shared by every block (title, frame, tooltip, legend, number formats) are covered in [Common Configuration](./common-config.md); this chapter focuses on what makes chart blocks special.

## At a glance

| Block | Question it answers | Data shape | Typical use |
| --- | --- | --- | --- |
| **Line** | How does a metric change over time? | Time series, multiple series | Daily revenue, traffic trends |
| **Table** | What does each record look like? | Detail rows, paginated | Order details, metric ledger |
| **Pie** | How big is each part of the whole? | Category + value | Category mix, channel split |
| **Candlestick** | How did open/high/low/close move? | Four query items | Quotes, price ranges |
| **Radar** | Which dimension is stronger? | Multi-metric comparison | Capability scoring |
| **Heatmap** | Where is activity dense? | Time × value | Activity calendar, hourly distribution |

![Example page for the Chart category: all six built-in charts](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-chart-example.png)

*All six charts on one canvas for comparison. The **red box** marks the Line chart — the chart block with the richest set of actions.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-chart-example.png" target="_blank" rel="noopener">View full size</a>

## One workflow: query first, draw second

All six charts share the **data query** panel at the bottom-left of the configuration drawer.

| Concept | Meaning |
| --- | --- |
| **Query item** | One independent data fetch, labelled `A / B / C…`. A chart can stack several items as series. |
| **Metric query** | Aggregate along a time axis: pick a table, dimensions, an aggregation (sum / avg / max / min / count) and filters. The first row is the time axis. |
| **Table query** | Category-based: set a **name column** (X axis), **value column**, aggregation, sorting and row limit. Ideal for pies and lists. |
| **Expression** | Derive new values from existing query items, e.g. `A + B`, without touching the source table. |

The drawer header holds the **time range** (relative presets or absolute dates) plus **Run** and **Save**. Click **Run** to re-query the preview, then **Save** to apply the configuration to the page.

:::tip "No data" is usually a query problem
An empty chart almost always means the query item is incomplete: no table selected, empty name/value column, a time range that misses the data, or missing K-line mappings. Check the query panel before adjusting styles.
:::

## Block reference

All six blocks share the query panel at the bottom left; the differences live in the **Style** group on the right. Each section below lists the **full set of private options**, their defaults, and a **dedicated screenshot**. Shared options such as title, frame, legend and tooltip are covered in [Common Configuration](./common-config.md).

![Private options in the drawer](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-chart-config.png)

*Right-hand side of the drawer: the upper part of **Style** is shared; the lower part (display mode, colour theme, line shape, width…) is private and is expanded in the tables below.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-chart-config.png" target="_blank" rel="noopener">View full image</a>

### 1. Line `line`

**What it does**: Draws trends over time or categories and stacks multiple query items in one chart; ideal for spotting change, comparing levels and finding outliers.

![Line rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-line.png)

*Rendered example: a blue line of daily paid amount, dates on the X axis, values on the Y axis, and a legend built from query aliases.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-line.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style · basics**

| Option | Values / default | Description |
| --- | --- | --- |
| Display mode `graphType` | Line / Area / Bar / Dash / Dot; default `Line` | Sets how the whole series is drawn: bars for discrete comparison, area for volume, dots for distribution only. |
| Colour theme `graphTheme` | Classic / Cool / Vivid; default `Classic` | Switches the whole palette at once; faster than recolouring each series. |
| Line shape `lineType` | Angled / Smooth / Step; default `Angled` | Available for line, dash and area modes; step fits values that change in discrete jumps. |
| Data zoom `showDataZoom` | On / Off; default `Off` | Adds a zoom slider below the chart for long time ranges. |
| Show symbols `showSymbol` | On / Off; default `Off` | Draws a dot at every data point; keep it off for dense series. |
| Line width `lineWidth` | 1–10; default `2` | Stroke thickness for line, area and dash modes; increase it for wall displays. |
| Dot size `dotWidth` | Number; theme default | Only in Dot mode; controls the radius of each point. |

**Series style `queryGraphs` (per query item)**

| Option | Values / default | Description |
| --- | --- | --- |
| Display mode / line width | Inherit or override the global setting | Lets query A render as bars and query B as a line in one chart. |
| Custom colour / fill / area opacity | Colour value, opacity 0–1 | Colours each series individually; area opacity prevents overlapping fills from hiding each other. |
| Right Y axis / mark lines / area bands | Per query item or value | Put metrics with a different scale on the right axis; mark lines show thresholds and bands highlight ranges. |

> **Tip**: The line chart supports **every action type**: linkage, drill-down, update, filter, jump and scene switching. Clicking a point passes time, dimension and value to other blocks.

### 2. Pie `pie`

**What it does**: Shows composition. Three shapes are available (pie, ring, rose) and the Label switch controls text on sectors.

![Pie rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-pie.png)

*Rendered example: a pie split by category with theme colours and a legend below.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-pie.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Shape `graphType` | Pie / Ring / Rose; default `Pie` | A ring leaves room for a total in the middle; a rose amplifies differences through radius. |
| Rose mode `roseType` | Radius / Equal area; default `Radius` | Rose only: `Radius` scales sector radius by value, `Equal area` varies the angle only. |
| Label `showLabel` | On / Off; default `On` | Shows names or percentages on sectors; turn off when there are many categories. |
| Query items (bottom left) | Table query: name / value / row limit | Put the category in Name and the measure in Value; a row limit of about 6 keeps the legend short. |

> **Tip**: A sector can trigger a scene switch. Pies do not merge frames on a time axis, so category names are safe here.

### 3. Table `table`

**What it does**: Renders detail rows with paging, sorting and frozen columns. Column settings can even turn a cell into an editable control that writes back.

![Table rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-table.png)

*Rendered example: Time and sum(amount) columns with a pager in the bottom-right corner.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-table.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Table**

| Option | Values / default | Description |
| --- | --- | --- |
| Table size `tableSize` | Small / Middle / Large; default `Small` | Controls row height and font size: small for dense ledgers, large for presentations. |
| Paging `paging` / `pageSize` | On / Off; default `On`, `10` rows | Turning paging off renders every row at once, which slows down large tables. |
| Alignment `colAlign` | Left / Centre / Right; default `Left` | Default alignment for all cells; numeric columns usually look better right-aligned. |
| Frozen columns `frozenLeft` / `frozenRight` | First N / last N columns; default none | Keeps key columns visible while scrolling; action columns are often frozen on the right. |

**Column settings `tableCols` (per column)**

| Option | Values / default | Description |
| --- | --- | --- |
| Width / alignment / sort | px or auto; left / centre / right; sortable | Overrides the table defaults per column; give long text more width and enable sorting on measures. |
| Display type `displayType` | Text / Link / Colour background / Bar / Pie / Editable text / Select / Switch / Button / Dropdown button | Turns a cell into a graphic or a control; the last four are editable and can write back via actions. |
| Value mapping `displayValue` | Threshold-based colour or text rules | Example: amount > 5000 gets a red background, status = done gets green. |

> **Tip**: Clicking a row can delete it or switch a scene page — the most common way to drill from overview to detail.

### 4. Candlestick `candlestick`

**What it does**: Draws candles from open, close, low and high values, with optional moving-average lines. Red = up, green = down, following the A-share convention.

![Candlestick rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-candlestick.png)

*Rendered example: red/green candles with a blue custom line, dates on X and prices on Y.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-candlestick.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Data mapping**

| Option | Values / default | Description |
| --- | --- | --- |
| Open / Close / Low / High | Each bound to one of four query items | All four are required or the block shows "no data"; create four query items, e.g. with different aggregations of one measure. |

**Colours**

| Option | Values / default | Description |
| --- | --- | --- |
| Up colour `upColor` / border `upBorderColor` | Colour; default `#ec0000` / `#8A0000` | Fill and stroke of rising candles. |
| Down colour `downColor` / border `downBorderColor` | Colour; default `#00da3c` / `#008F28` | Fill and stroke of falling candles. |

**Lines and zoom**

| Option | Values / default | Description |
| --- | --- | --- |
| Show data zoom `showDataZoom` | On / Off; default `On` | Shows the range zoom slider at the bottom. |
| Show line `showLine` / colour `lineColor` | On / Off (default `On`); default `#1677ff` | Connects closes (or another series) as a line over the candles. |
| Custom lines `customLines` | Multiple entries: name / query item / width / colour / visibility | Adds MA5, MA10 and similar lines; each line needs its own query item. |

> **Tip**: The only built-in chart that needs four queries. Create A/B/C/D first, then bind each mapping on the right.

### 5. Radar `radar`

**What it does**: Compares a set of indicators across dimensions, with basic / AQI shapes and single / multiple radar layouts.

![Radar rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-radar.png)

*Rendered example: a coloured data area over a polygon grid with a per-query legend below.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-radar.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Shape `graphType` | Basic radar / AQI radar; default `Basic` | The AQI variant colours by level bands, useful for graded scores. |
| Display mode `displayMode` | Single / Multiple; default `Single` | Multiple mode gives each query item its own small radar when there are many series. |
| Max values `maxValues` | Per query item, value + unit; empty = auto scale | Fixing the maximum keeps several radars on the same scale. |
| Level colour rules | Threshold-based colours | Colours value bands, e.g. red below 60, yellow 60–80, green above 80. |

> **Tip**: Use short query aliases when there are many dimensions; the shape can trigger a scene switch.

### 6. Heatmap `heat`

**What it does**: Encodes density or intensity as colour, with a basic heatmap and a calendar heatmap (horizontal / vertical, unsplit / by year / by month).

![Heatmap rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-heat.png)

*Rendered example: calendar cells arranged by date with a 0–1 colour scale; darker means larger.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-heat.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Shape `graphType` | Basic / Calendar; default `Basic` | Calendar mode lays cells out by date for activity, check-in or submission records. |
| Calendar orientation `calendarOrient` | Horizontal / Vertical; default `Horizontal` | Calendar mode only; controls how weeks and dates are laid out. |
| Split calendar `calendarSplitType` | None / By year / By month; default `None` | Splits long ranges into small multiples instead of one long strip. |
| Label `showLabel` | On / Off; default `On` | Shows the value or date label inside each cell. |
| Colour range `colorRangeType` / gradient `gradientType` / reverse `gradirentReverse` | Gradient / Custom; default gradient + blue; reversible | Controls the low-to-high colour ramp; reverse makes dark mean small values. |
| Level rules `displayValues` | Threshold rules with fill, font colour and display type; one default rule initially | Example: > 100 deep red, 10–100 orange, otherwise light grey. |

## Configuration cheat sheet

| Group | Key items | Controls |
| --- | --- | --- |
| Query (bottom-left) | Query items, table, dimensions, filters, aggregation, expressions | What is drawn |
| Style (right) | Display mode, geometry, series styles | How it is drawn |
| Number format | Decimals, unit scaling, units, query/metric aliases | How values read |
| Tooltip / Legend | Tooltip type, position, marker, layout, legend value | Reading experience |
| Frame | Background, title, shadow, borders, radius | Card appearance |

> The last three groups are [common configuration](./common-config.md) shared by all blocks.

## Typical setup

1. **Connect data** — register a table under *Data → Data Source*.
2. **Add a chart** — drag a Line block, create a query item, choose a style, save.
3. **Add filters** — place a [Time Filter](./filter.md) and link it to the chart so the whole page refreshes together.
4. **Enable drill-down** — Table row click → switch a [Scene](./layout.md) page or open a [Dialog](./dialog.md).
5. **Standardise formats** — set units and decimal places once in Number format.

## Notes

- Charts are data **consumers**, not sources; data comes from Data Source / Data Processing.
- For trend charts use a time column as the name column — non-time categories can produce `Invalid Date` / `NaN` when frames merge.
- Long query labels clutter legends and tooltips; shorten them with query aliases.
- The panel also lists plugin charts (time series, number, rank, honeycomb, gauge…). Their options differ; see [Popular Plugins](../../plugins/index.md).

## Related

- [Overview](./overview.md) · [Common Configuration](./common-config.md) · [Data Dashboards](../data-dashboard.md) · [Filters](./filter.md)
