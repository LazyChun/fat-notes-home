---
sidebar_position: 10
title: Others
sidebar_label: Others
description: "FatNotes Other components: Text, Markdown, Rich Text, Image, Video, IFrame, QR Code, Clock Task and Screen Task."
---

# Others

> "Others" is not a junk drawer — it is the home of **content display and automation**. Write explanations with the three text blocks, place media with Image / Video / IFrame / QR Code, and automate with Clock Task and Screen Task. Almost every page's headings, tips and background material come from this category.

| Block | Kind | Typical use |
| --- | --- | --- |
| **Text** | Content | Banner, tip bar, short label |
| **Markdown** | Content | Structured long text, tables, lists, code |
| **Rich Text** | Content | WYSIWYG fine typography |
| **Image** | Media | Screenshots, diagrams, covers |
| **Video** | Media | Demos, tutorials |
| **IFrame** | Embed | External pages or internal systems |
| **QR Code** | Generated | Encode a link or text |
| **Clock Task** | Automation | Trigger refreshes, notices, linkages on a schedule |
| **Screen Task** | Automation | Orchestrate screen, mouse and keyboard actions |

![Example page for the Other category](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png)

*Content blocks on the top row, QR Code / IFrame / Clock Task below. The **red box** marks the QR Code generated from a URL.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png" target="_blank" rel="noopener">View full size</a>

## Choosing a text block

| | Text `text` | Markdown `markdown` | Rich Text `richText` |
| --- | --- | --- | --- |
| Editing | Plain text + style options | Markdown syntax | WYSIWYG toolbar |
| Length | One to a few lines | Medium / long, structured | Short, finely styled |
| Typography | Font size, bold / italic, colour, horizontal & vertical alignment, wrapping, highlighted words | Headings, lists, tables, quotes, code blocks, links | Bold, italic, underline, inline code, text colour, headings, quotes, lists |
| Use | Banners, tips, labels | Guides, templates, notes | Summaries, profiles, coloured highlights |

**Options**: Text — content, font size, bold/italic, colour, alignment, auto wrap, text highlights. Markdown — content, font size and colour, line height, scroll, open links in a new tab. Rich Text — a Slate node array; select text to open the style toolbar (strikethrough is not supported).

:::tip A reliable page header
Start a page with a **Text banner** (chapter name + one-line purpose), a **Markdown card** (key points and steps), then several [Charts](./chart.md), and finish with a **Text tip bar**. Every example page in this documentation set follows that layout.
:::




## Block reference

This category has three groups: text blocks for writing, media / embed blocks for assets, and automation blocks for scheduling and operations. All nine blocks are listed below with private options and screenshots; blocks without a private form say where their settings actually live.

### 1. Text `text`

**What it does**: Plain text plus style options; ideal for banners, hint bars and short captions.

![Text rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-text.png)

*Rendered example: one bold dark line, centred horizontally and vertically.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-text.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Content `content` | Plain text; empty by default | Short content only; use Markdown for long text. |
| Font size / bold / italic / colour | Auto / `Off` / `Off` / `#172634` | Basic typography; banners usually use a large bold size. |
| Horizontal / vertical alignment | Default `Centre` / `Centre` | Positions the text inside the card; hint bars are usually left-aligned. |
| Auto wrap / background colour | Default `On` / inherited frame background | Wraps long lines; the background colour can make a hint bar. |
| Highlight `textHighLight` | Keyword + colour rules; empty by default | Colours chosen words, e.g. "Warning" in red. |

### 2. Markdown `markdown`

**What it does**: Renders structured long-form Markdown: headings, lists, tables, quotes, code blocks and links.

![Markdown rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-markdown.png)

*Rendered example: a Markdown card showing a heading, bold text and a list.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-markdown.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Content `content` | Markdown text; empty by default | Standard syntax; the demo pages use it for all note cards. |
| Font size / bold / italic / colour | Auto / `Off` / `Off` / `#172634` | Card-wide typography; use Markdown syntax for local emphasis. |
| Line height `lineHeight` | Number; default `1.6` | 1.6–1.8 is comfortable for long text. |
| Scroll `scroll` | On / Off; default `On` | Keeps overflow inside the block instead of stretching the canvas. |
| Open links in new tab | On / Off; default `On` | Keeps the dashboard open when a reference link is clicked. |

### 3. Rich Text `richText`

**What it does**: WYSIWYG formatting: select text and use the toolbar for bold, italic, underline, inline code and colour.

![Rich Text rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-richText.png)

*Rendered example: one paragraph mixing bold, coloured and underlined spans.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-richText.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Content and toolbar**

| Option | Values / default | Description |
| --- | --- | --- |
| Content `richText.content` | Slate node array; one sample paragraph by default | Generated by the editor; editing the JSON by hand is not recommended. |
| Supported styles | Bold / italic / underline / inline code / colour / heading / quote / list | Unsupported styles such as strikethrough are ignored. |

### 4. Picture `pic`

**What it does**: Displays an image and doubles as a **trigger**: a click event can turn it into a link or hotspot.

![Picture rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png)

*This block is not placed individually on the demo page; the image shows the category overview. The actual rendering follows your installation.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Asset and events**

| Option | Values / default | Description |
| --- | --- | --- |
| Image source | Picked or pasted inside the block | The drawer has no private form beyond the shared "relate label"; the asset is set inside the block. |
| Click event | Linkage / Jump / Switch page | Click to open a [drawer](./dialog.md) caption or jump to another page. |

### 5. Video `video`

**What it does**: Plays a local video file or a video URL for demos; available options vary by installation and plugins.

![Video rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png)

*This block is not placed individually on the demo page; the image shows the category overview. The actual rendering follows your installation.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-misc-example.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Version-dependent options**

| Option | Values / default | Description |
| --- | --- | --- |
| Source URL / file | Set inside the block or in the drawer | Not in the built-in defaults table; follow the panel on your installation. |
| Autoplay / loop / controls | On / Off | Turn autoplay off on demo pages to avoid several videos playing at once. |

### 6. IFrame `iframe`

**What it does**: Embeds an external page by URL; a **custom data config** on the left can fetch data from APIs or web pages.

![IFrame rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-iframe.png)

*Rendered example: "No data" placeholder before a URL is set; the target page takes over afterwards.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-iframe.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic / data**

| Option | Values / default | Description |
| --- | --- | --- |
| URL | Page URL; empty by default | The target must allow embedding; sites sending `X-Frame-Options` render blank. |
| Custom data config | API / web page, GET / POST, request params, output mapping | One of the few native blocks with a Data section; a lightweight data entry point. |
| Cron schedule | Expression or preset; off by default | Like the data-fetch block, it can re-fetch on a schedule. |

### 7. QR Code `qrcode`

**What it does**: Generates a QR code from text or a URL, with render mode, size, colours and a centre icon.

![QR Code rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-qrcode.png)

*Rendered example: a black-and-white QR square, optionally with a centre icon.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-qrcode.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Value `value` | Text or URL; empty by default | Longer content makes a denser code; prefer short links. |
| Render type `renderType` | Canvas / SVG; default `canvas` | Choose SVG for vector export or high-resolution printing. |
| Centre icon / size | Icon URL or `[icon]name`; empty / `40` | Keep the icon under ~20% of the code to stay scannable. |
| Size `size` | Pixels; default `160` | Increase for projection or print. |
| Foreground / background colour | Default `#000000` / `#ffffff` | Keep enough contrast; light foregrounds are hard to scan. |

### 8. Clock Task `clock`

**What it does**: Fires events on a schedule; at runtime it shows status, a countdown and pause / trigger-now controls.

![Clock Task rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-clock.png)

*Rendered example: running state, current time and a countdown to the next trigger.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-clock.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Schedule and runtime**

| Option | Values / default | Description |
| --- | --- | --- |
| Trigger time | Cron expression or interval preset | For daily 9am refreshes or scheduled notifications. |
| Status / countdown / pause / trigger now | In-block runtime controls | Verify the schedule without opening the drawer. |
| Linkage action | Output trigger with target blocks | Can trigger [flows](./flow-widget.md), [messages](./dialog.md) or chart refreshes. |

> **Tip**: A clock task is tied to the page and stops when it closes; use a scheduled flow for continuous runs.

### 9. Screen Task `screenTask`

**What it does**: Orchestrates screen, mouse and keyboard actions; it is a workflow card with a fixed node palette.

![Screen Task rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-screenTask.png)

*Rendered example: an embedded flow canvas with Start → Input nodes and a node palette.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-screenTask.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style / canvas**

| Option | Values / default | Description |
| --- | --- | --- |
| Flow data `screenFlow` | Node/edge JSON; empty canvas by default | Categories: screen, mouse, keyboard, browser, clipboard, media, system. |
| Flow style `flowStyle` | Edge path, port sizes and colours, card background and shadow | Appearance only; it does not change node logic. |
| Toolbar `toolbar` | Visibility (default `On`), hover or always, position and look | Use hover-to-show on demo pages for a cleaner canvas. |

> **Tip**: See [Flow Widgets](./flow-widget.md): all three workflow cards share running, scheduling and linkage.

## Cheat sheet

| Need | Block | Key options |
| --- | --- | --- |
| Page title / tip bar | Text | Content, size, alignment, colour, highlight |
| Long guide or template | Markdown | Content, line height, scroll, link target |
| Styled short paragraph | Rich Text | Select text → toolbar |
| Clickable diagram | Image | Resource + Event → Linkage / Navigate |
| Embed an external system | IFrame | URL / custom data |
| Share a link | QR Code | Value, size, colours, centre icon |
| Scheduled refresh | Clock Task | Trigger time + linked action |
| UI automation | Screen Task | Flow node wiring |

## Typical setups

1. **Document page** — Text banner + Markdown guide + Rich Text summary, split with a [Block Panel](./layout.md).
2. **Illustrated dashboard** — an IFrame with the help centre beside charts, and a QR Code in the footer for mobile.
3. **Scheduled briefing** — a Clock Task starts a flow at 09:00 → result written to a variable → [Notification](./dialog.md) → Text block shows the update time.
4. **Interactive diagram** — an Image click opens a [Drawer](./dialog.md) with captions and instructions.

## Notes

- Rich Text supports only the styles offered by its toolbar; unsupported styles such as strikethrough are ignored.
- IFrame depends on the target site allowing embedding; `X-Frame-Options` can produce a blank area.
- Longer QR values and smaller sizes are harder to scan — keep values short and the size generous.
- Clock Tasks belong to the page and stop firing when it closes; for continuous scheduling use [Flow Widget](./flow-widget.md) scheduled runs.
- Availability of Image, Video, Code, Terminal and similar blocks can vary with the installed version and plugins — trust your local component panel.

## Related

- [Overview](./overview.md) · [Common Configuration](./common-config.md) · [Windows](./window.md) · [Flow Widgets](./flow-widget.md)
