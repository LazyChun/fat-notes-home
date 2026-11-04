---
sidebar_position: 7
title: Forms
sidebar_label: Forms
description: "FatNotes Form components: 14 input controls, shared options, variable names, validation and event linkage."
---

# Forms

> Form blocks **collect input and trigger actions**. They are the main trigger source on a page: a dropdown, a button or a switch writes a value into the page variable pool, which then drives charts, tables, flows and scene switching.

| Block | Input | Typical use |
| --- | --- | --- |
| **Form** | Container | Lay out multiple controls together |
| **Input** | Single / multi-line / password / number | Keyword, note, numeric value |
| **Button** | Click | Submit, refresh, navigate, switch page |
| **Date Picker** | Date / week / month / quarter / year / time | Statistics date, date range |
| **Switch** | Boolean | Enable / disable a feature |
| **Radio** | Single choice | Dimension, calculation basis |
| **Checkbox** | Multiple choices | Channels, tags |
| **Slider** | Number / range | Threshold, ratio |
| **Select** | Single-select list | Region, category |
| **Multi Select** | Multi-select list | Categories, people |
| **Auto Complete** | Text + suggestions | City or person search |
| **Cascader** | Hierarchical tree | Province / city / district |
| **Rate** | Stars | Satisfaction, rating |
| **Color Picker** | Colour value | Output a theme colour |

![Example page for the Form category: 14 controls](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-form-example.png)

*All 14 controls in three rows. The **red box** marks the Input — the most common source of variables.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-form-example.png" target="_blank" rel="noopener">View full size</a>

## Options shared by every control

| Option | Purpose |
| --- | --- |
| **Variable name `varName`** | Name used when the value is written to the page variable pool; use ASCII letters, digits and underscores, unique per page |
| **Form item label** | Text shown beside the control |
| **Default value / disabled / read only** | Initial state and editability |
| **Placeholder, prefix, suffix** | Guidance for input controls |
| **Validation rules / trigger** | Required, length, regex; fire on change (`onChange`) or on blur (`onBlur`) |
| **Input style** | Background, size, width / height, shadow, radius, border |

![Private options of an Input block](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-form-config.png)

*Right side of the drawer: **variable name** in the Basic group is the key to linkage, followed by validation, style, relation label and frame groups.*

:::tip Variable → query → chart
Controls write values as `$varName`. Set a dropdown's variable name to `region` and put `$region` into a query filter value: choosing "East" filters the chart automatically. See [Filters](./filter.md).
:::

## Events and linkage — the key capability

Form controls are the primary **trigger sources**. Actions are configured per block:

| Action | Supported by | Effect |
| --- | --- | --- |
| **Linkage** | Button, input, select / multi-select, radio, switch, slider, rate… | Pass the current value to a target block to re-query or update |
| **Navigate** | Button, line chart | Open a link, or open content in a **dialog / drawer** |
| **Switch page** | Button, table, charts | Jump to a page of a [Scene](./layout.md) |
| **Filter / drill / update** | Mainly line chart and table | Condition filtering, drill-down, data update |

Triggers vary by control: click, value change, change complete, blur, select, hover change, on output. **Output parameters** depend on the control: a button sends its text and variable name; inputs/selects/switches/sliders/rates send the selected `value` (`values` for multi-select) plus the variable name; every control also sends `triggerDate`. A linkage consists of the visible wire, the output/input mapping and the action itself.

## Block reference

Every control shares the Basic group (variable name, label, default value, validation) and adds its own options. All 14 controls are documented below with a dedicated screenshot; event and payload rules are described earlier.

### 1. Form `form`

**What it does**: Wraps several controls into one laid-out unit with configurable label alignment.

![Form rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-form.png)

*Rendered example: the form container card with consistently aligned child controls.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-form.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Label alignment `labelAlign` | Left / Right; default `Left` (demo uses Right) | Aligns all field labels inside the container. |
| Child box | Created by dragging controls in | The container has no value of its own; values come from child controls. |

### 2. Input `input`

**What it does**: Single-line, multi-line, password or numeric input; the most common variable source.

![Input rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-input.png)

*Rendered example: a "Keyword" field containing "East China" with a clear button.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-input.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Input type `inputType` | Text / Password / Number / Textarea; default `Text` | Password masks characters, Number adds a range, Textarea adds row count. |
| Min / max length, show count | Numbers; unlimited and off by default | Limits input length and shows a character counter. |
| Rows `rows` | Number; textarea only | Visible rows of a textarea. |
| Number range / min / max / step | Numbers; numeric type only | Bounds and increment for numeric input. |
| Allow clear `allowClear` / read-only `readOnly` | On / Off; default `On` / `Off` | A clear button helps re-entry; read-only suits display-only parameters. |

### 3. Button `button`

**What it does**: Triggers actions on click: submit, refresh, jump, page switch — the most common trigger.

![Button rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-button.png)

*Rendered example: a blue primary "Query" button; icon and size are configurable.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-button.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Text `text` / auto space `autoInsertSpace` | Text; default `Button`; auto space default `On` | Inserts a space between two Chinese characters for readability. |
| Type / colour / variant / size / shape | Default `default` / `outlined` / `middle` / `default` | Combines into primary, outlined, text or round icon buttons. |
| Icon `icon` / placement `iconPlacement` | Icon name or `[icon]name`; start / end | Adds search, save, download and similar icons. |
| HTML type `htmlType` / URL / download name | Default `button`; URL and filename optional | Used with the Jump action for downloads or links. |
| Danger / ghost / full width / loading / disabled | All On / Off; default `Off` | Danger colour for destructive actions; loading state prevents double submits. |

### 4. Switch `switch`

**What it does**: A boolean toggle for enabling a feature or condition.

![Switch rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-switch.png)

*Rendered example: an "Enable linkage" switch in the on position.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-switch.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Size `size` | Small / Middle / Large; default `Middle` | Overall size of the switch. |
| Default `defaultValue` / disabled | On / Off; default `Off` (demo uses On) | Writes `true / false`, usable as a query filter. |

### 5. Radio `radio`

**What it does**: A group of mutually exclusive options producing one value; good for dimension or metric switching.

![Radio rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-radio.png)

*Rendered example: "Dimension" with Daily / Weekly radio options.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-radio.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Options `options` | Array of label / value / disabled; empty by default | The value is written to the variable; the label is display-only. |
| Orientation `orientation` | Horizontal / Vertical; default `Horizontal` | Horizontal for few options, vertical for long labels. |
| Option type / button style | Default / Button; Outline / Solid; default `Default` + `Outline` | Button style works well as a segmented control. |
| Size / full width / use RadioGroup | Default `middle` / off / on | Full width puts one option per row and stretches it. |
| Default `defaultValue` / disabled | Option value; empty by default | If unset the variable is empty; provide a fallback in queries. |

### 6. Checkbox `checkbox`

**What it does**: A group of multi-select options producing an array; good for channels or tags.

![Checkbox rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-checkbox.png)

*Rendered example: "Channel" with Online / Store checkboxes.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-checkbox.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Options `options` | Label / value / disabled; empty by default | Same as Radio: values are stored, labels are shown. |
| Orientation `orientation` | Vertical / Horizontal; default `Vertical` | Vertical reads better with many options. |
| Default `defaultValue` / indeterminate / disabled | Array; default `[]` | Outputs an array usable with an "in" filter. |

### 7. Slider `slider`

**What it does**: Drags a single value or a range; good for thresholds and percentages.

![Slider rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-slider.png)

*Rendered example: a "Threshold (%)" slider at 60 with ticks and a tooltip.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-slider.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Range `range` | On / Off; default `Off` | When on, two handles output a `[min, max]` array. |
| Min `min` / max `max` / step `step` / default | Default `0` / `100` / `1` / `0` | Defines scale and initial value; smaller steps are more precise. |
| Dots only `dots` / included `included` | Default `Off` / `On` | Dots only snaps to marks; included highlights the selected range. |
| Reverse `reverse` / vertical `vertical` | Both `Off` by default | Reverse flips the direction; vertical stands the slider up. |
| Tooltip / marks | Auto / show / hide; 8 placements; custom marks | Shows the current value while dragging; marks can carry words such as Low / Mid / High. |

### 8. Select `select`

**What it does**: Single selection from a dropdown; good for enumerated fields such as region or category.

![Select rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-select.png)

*Rendered example: a "Region" select with a placeholder and three options.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-select.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Options `options` | Label / value / disabled; empty by default | Options can be static or supplied by a data source / variable. |
| Default `defaultValue` / placeholder | Single value; empty by default | Set a sensible default so the page shows data immediately. |
| Allow clear / disabled / read-only | Default `On` / `Off` / `Off` | Allow clear returns to the "all" state. |
| Prefix / suffix | Text or icon; empty by default | Adds units or icons around the input. |

### 9. Multi Select `mulitSelect`

**What it does**: Multiple selection from a dropdown, producing an array; good for categories or people.

![Multi Select rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-mulitSelect.png)

*Rendered example: a "Category" multi-select with a placeholder.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-mulitSelect.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Options `options` | Label / value / disabled; empty by default | Same as Select, but stores several values. |
| Default `defaultValue` | Array; default `[]` | Pre-select several categories; consume the array with an "in" filter. |
| Allow clear / disabled / read-only / prefix / suffix | Same as Select | Clears all selected values at once. |

### 10. Date Picker `datePicker`

**What it does**: Picks date / week / month / quarter / year / time and outputs a formatted value.

![Date Picker rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-datePicker.png)

*Rendered example: a "Stat date" picker with placeholder and calendar icon.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-datePicker.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Picker `picker` | date / week / month / quarter / year / time; default `date` | Sets granularity; month yields `YYYY-MM`. |
| Format `format` / show time `showTime` | Default `YYYY-MM-DD`; default `Off` | Must match the query's time field or the filter may be ignored. |
| Size / allow clear / disabled | Default `middle` / `On` / `Off` | Standard appearance and availability switches. |
| Presets / placement / min & max date / disabled dates / multiple / confirm | Extended options, version dependent | Presets offer Today / This month; Confirm avoids triggering a query on every click. |

### 11. Auto Complete `autoComplete`

**What it does**: Suggests candidates while typing; good for cities or names.

![Auto Complete rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-autoComplete.png)

*Rendered example: a "City" field that suggests Shanghai / Shenzhen.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-autoComplete.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Options `options` | Label / value array; empty by default | Suggestion source; can come from a data source. |
| Filter `filterOption` / backfill `backfill` | Default `On` / `Off` | Filter narrows candidates; backfill writes the highlighted item into the field. |
| Highlight first / open by default | Default `On` / `Off` | Initial focus when the dropdown opens. |
| Popup width / size / clear / disabled | Control width; `middle`; `On`; `Off` | Widen the popup for long candidate labels. |

### 12. Cascader `cascader`

**What it does**: Tree-shaped hierarchical selection (province / city / district), outputting a path array.

![Cascader rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-cascader.png)

*Rendered example: a "Region" cascader with expandable submenus.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-cascader.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Tree options `options` | JSON array; 2-level example by default | Each node has label / value / children; static or from an API. |
| Multiple `multiple` / change on select | Both `Off` by default | Multiple yields several paths; change-on-select writes a value even at an intermediate level. |
| Expand trigger / search | Click / Hover; default `Click`; search default `Off` | Enable search for deep trees. |
| Checked strategy / max tags | Default `SHOW_PARENT` / `responsive` | Controls whether parents or children are shown and how many tags collapse. |
| Placement / size / status / variant | Default `bottomLeft` / `middle` / normal / `outlined` | Appearance and validation-state styling. |
| Clear / auto clear search / default open / disabled / icons | Standard switches; clear default `On` | Icons accept `[icon]name` values. |

### 13. Rate `rate`

**What it does**: Star rating producing a number; good for satisfaction or grading.

![Rate rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-rate.png)

*Rendered example: a five-star "Satisfaction" rating showing 4 stars.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-rate.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Count `count` / allow half `allowHalf` | Default `5` / `Off` | Half stars allow values such as `4.5`. |
| Default / size / disabled | Empty / `middle` / `Off` | Initial value, star size and editability. |
| Custom character / tooltips | Text, icon, or one tooltip per line | Replace stars with hearts or letters, and label each level. |
| Active / inactive colour | Default `#faad14` / `rgba(0,0,0,0.06)` | Match the selected state to your brand colour. |

### 14. Color Picker `colorPicker`

**What it does**: Outputs a colour value (hex / rgb / hsb) that other blocks can reference.

![Color Picker rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-colorPicker.png)

*Rendered example: a "Theme colour" picker showing the current swatch and value.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-colorPicker.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic (shared by all controls)**

| Option | Values / default | Description |
| --- | --- | --- |
| Variable name `varName` | Custom; letters, digits, underscore | The key used in the page variable pool; queries, titles and flows read it as `$name`. |
| Field label `formItemLabel` | Text; empty by default | Caption on the left of the control, e.g. "Keyword" or "Date". |
| Default `defaultValue` / disabled / read-only | Type dependent; empty / off / off | Initial state and whether the user can change it. |
| Placeholder / prefix / suffix | Text or icon | Hints and adornments for input controls. |
| Validation rules / trigger | Required, length, regex; `onChange` / `onBlur` | Validate on change or on blur; use blur or a submit button for heavy queries. |
| Input style | Background, size, width/height, shadow, radius, border | Appearance of the control itself, separate from the [common frame](./common-config.md). |

**Control-specific options**

| Option | Values / default | Description |
| --- | --- | --- |
| Format `format` / solid or gradient | hex / rgb / hsb; default hex | Output string format; keep it consistent where referenced. |
| Default `defaultValue` | Colour; default `#1677ff` | Initial colour when the page opens. |
| Trigger / presets / disable alpha & format switch / show text | Hover or click; show text default `Off` | Presets offer brand colours; show text prints the value next to the control. |
| Size / allow clear / disabled | Default `middle` / `On` / `Off` | Standard appearance and availability. |

## Typical setups

1. **Parameterised dashboard** — Form with a region select, date picker and query button → button linkage refreshes charts and tables.
2. **Filter as you type** — an Input writes `$keyword`; the query filter reads it — no button needed.
3. **Wizard** — a [Scene](./layout.md) with 3 pages, buttons configured to "switch page".
4. **Detail overlay** — table row click or button → Navigate → open in a [dialog / drawer](./dialog.md).
5. **Theme switching** — a Color Picker outputs a colour value used by other block styles.

## Notes

- Keep variable names unique and ASCII-only; duplicates overwrite each other.
- "Value change" can fire on every keystroke — for heavy queries prefer "change complete", "blur", or a submit button.
- A linkage needs both an **action** and a **wire with input/output mapping**; a variable name alone does not send anything.
- Add an extra confirmation step for actions that write to a database.

## Related

- [Overview](./overview.md) · [Filters](./filter.md) · [Common Configuration](./common-config.md) · [Dialogs](./dialog.md) · [Flow Widgets](./flow-widget.md)
