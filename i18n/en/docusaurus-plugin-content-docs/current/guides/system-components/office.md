---
sidebar_position: 8
title: Office
sidebar_label: Office
description: "FatNotes Office components: Excel, Word, PPT and PDF — content sources, file formats and inline reading."
---

# Office

> Office blocks embed **existing documents** into a page. They are not charts and take no part in queries: spreadsheets, specifications, slide decks and PDF reports can all sit next to a dashboard so readers can check the source material without leaving the page.

| Block | Formats | View | Typical use |
| --- | --- | --- | --- |
| **Excel** | `xlsx` / `csv` (JSON for local storage) | Spreadsheet view, dark mode | Expense details, raw ledger |
| **Word** | `docx` | Document preview | Policies, meeting material |
| **PPT** | `pptx` | Presentation with paging | Reports, proposals |
| **PDF** | `pdf` | Reader | Reports, contracts, archives |

![Example page for the Office category](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-office-example.png)

*A real expense spreadsheet on the left. The **red box** marks the Excel block, which keeps its toolbar, sheets and editable cells.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-office-example.png" target="_blank" rel="noopener">View full size</a>

## Two content sources

| Storage type | Meaning | Best for |
| --- | --- | --- |
| **File storage** | Pick or drag a local file; the block records its path | Existing reports, official documents, originals to keep |
| **Local storage** | Store content as JSON / text inside the page | Lightweight tables, self-contained examples |

:::note An empty block is normal
A newly added Office block shows a blank placeholder or "No data" until a file is selected. That means **no file chosen yet**, not a broken component.
:::

![Private options of an Excel block](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-office-config.png)

*Right side of the drawer: title, file path and the "Select file" button in **Basic**, plus a dark-mode switch for Excel.*

## Block reference

All four office blocks keep their private options in the right-hand **Basic** group, centred on the same "where does the content come from" fields. Options and defaults are listed below; appearance comes from [Common Configuration](./common-config.md).

### 1. Excel `excel`

**What it does**: Embeds a viewable / editable spreadsheet with its toolbar, formulas, sheet tabs and zoom controls.

![Excel rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-excel.png)

*Rendered example: a real Q3 marketing expense sheet with ribbon, worksheet tabs and grid cells.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-excel.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Storage `storageType` | File / Local; default `File` | File stores a path (device dependent); Local embeds the content in the page. |
| File type `fileType` | `xlsx` / `csv` / JSON; default `xlsx` | Re-pick the file after switching formats. |
| File path `filePath` / select file | Empty by default; pick or drag an Excel / CSV / JSON file | An empty path shows a placeholder — normal, not a broken block. |
| Dark mode `darkMode` | On / Off; default `Off` | Affects the inner sheet only, not the card frame. |
| Content `content` | JSON string for Local storage | Paste JSON for a small table without an external file. |

> **Tip**: To chart data from Excel, register it under Data → Data Source first, then query it with a [chart](./chart.md); this block only displays the original.

### 2. Word `word`

**What it does**: Embeds a Word document preview for policies, notes or meeting minutes next to your data.

![Word rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-word.png)

*Rendered example: a Word preview with Home / Insert ribbon, body text and 100% zoom.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-word.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Storage / file type | File / Local; default `File` + `docx` | Legacy `.doc` is not supported. |
| File path / select / drag | Empty by default | The document appears as soon as a `.docx` is chosen. |
| Dark mode / content | On / Off; text for Local storage | Same as Excel. |

### 3. PPT `ppt`

**What it does**: Embeds and plays a presentation with previous / next controls and a page counter.

![PPT rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-ppt.png)

*Rendered example: an editable FatPPT canvas with a "1 / n" page indicator.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-ppt.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Storage / file type | Default `File` + `md` (FatPPT text) | `.pptx` is supported; legacy binary `.ppt` is not. |
| File path / select file | Empty by default | Moving or deleting the file makes the block blank again. |
| Dark mode / content | Default `Off` / empty | Dark mode applies to the slide canvas only. |
| Paging (runtime) | Previous / Next / page N of M | Operated inside the block, not in the drawer. |

### 4. PDF `pdf`

**What it does**: An embedded PDF reader for reports, contracts and archives; the smallest option set.

![PDF rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-pdf.png)

*Rendered example: "No data" placeholder before a file is chosen; the reader takes over afterwards.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-pdf.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| File path / select file | Empty by default | Pick or drag a `.pdf`; a stale path leaves the block empty. |
| Content `content` | Content for Local storage; empty by default | PDF has no file-type or dark-mode switches. |

## Office blocks vs. Data Source

| | Office block | Data Source / Data Processing |
| --- | --- | --- |
| Goal | **Humans read** the original document | **Machines compute** from it |
| Part of queries | ❌ | ✅ |
| Can drive charts | ❌ | ✅ |
| Output | Spreadsheet / document view | Tables, fields, metrics |

> To chart data from an Excel file, register the table under *Data → Data Source* and query it with a [Chart](./chart.md). The Excel block only displays the original.

## Typical setups

1. **Data + evidence** — dashboard on top, Excel with raw details below.
2. **Report page** — a centred PPT with Markdown talking points beside it and the full PDF underneath.
3. **Policy board** — a flow page with the Word policy document alongside.
4. **Project space** — [Tabs](./layout.md) splitting Excel / Word / PPT / PDF into four pages.

## Notes

- Office blocks have no query panel; the drawer shows no data section.
- File storage depends on path availability — prefer local storage or a shared location for cross-device pages.
- Large files slow down page load; combine with tab "destroy on hide" or a collapsible [Group](./layout.md).
- Dark mode affects the inner viewer only, not the card's [common configuration](./common-config.md).

## Related

- [Overview](./overview.md) · [Common Configuration](./common-config.md) · [Charts](./chart.md) · [Layout](./layout.md)
