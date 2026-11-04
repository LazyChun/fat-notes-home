---
sidebar_position: 4
title: Layout
sidebar_label: Layout
description: "FatNotes Layout components: Group, Block Panel, Tabs, Scene, Splitter and Carousel — containers and linkage."
---

# Layout

> Layout blocks **do not display data**. They decide which blocks belong together, how they are arranged, and when they appear. With containers, one canvas can hold a multi-level, multi-view workspace instead of a wall of charts.

| Block | Organises by | Visible switch | Typical use |
| --- | --- | --- | --- |
| **Group** | Collapsible section | Chevron | Hide secondary information |
| **Block Panel** | Framed, titled container | None | Visual grouping |
| **Tabs** | Visible tab pages | Tab bar | Compare views on one page |
| **Scene** | Hidden pages | Optional navigator | Wizards, event-driven pages |
| **Splitter** | Draggable panes | Divider | Side-by-side comparison |
| **Carousel** | Rotating cards | Arrows / dots | Banners, rotating reports |

![Example page for the Layout category: five containers](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-example.png)

*Each container holds a small text child so its boundary is visible. The **red box** marks the Tabs block with its visible "Tab 1 / Tab 2" bar.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-example.png" target="_blank" rel="noopener">View full size</a>

## Core mechanism: containers and child blocks

A layout block keeps one or more **boxes**, each holding a list of child block ids.

1. Place the container on the canvas and size it.
2. Drag other blocks **into** the container — they become children.
3. Arrangement and switching options appear in the container's drawer.
4. Moving or resizing the container moves its children; move children out before deleting the container.

:::tip Tabs vs. Scene
Both are multi-page containers; the difference is **who switches**. Tabs show a bar for the user to click. A Scene hides the navigator by default and is switched by actions (button click, table row click, chart point click). Use Scenes for wizards and drill-downs, Tabs for view comparison.
:::

## Block reference

Private options here are almost all about what a container holds and how it switches. Each block is listed below; Carousel, which varies by installation, is explained at the end.

![Private options in the drawer](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-config.png)

*The **Style** group of Tabs holds position, size and type, followed by the tab list and performance groups.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-config.png" target="_blank" rel="noopener">View full image</a>

### 1. Group `group`

**What it does**: Collapses a group of blocks into a header; expanding reveals the contents.

![Group rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-group.png)

*Rendered example: collapsed state shows only the header; expanding reveals the child area.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-group.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Expanded by default `expand` | On / Off; default `Off` | Keep low-frequency content such as advanced settings collapsed. |
| Expanded height `expandedH` | Number of grid rows; `16` in the demo | Controls how tall the expanded container is; too large stretches the page. |
| Header style `headerStyle` | Background / radius / border; default borderless | Visually separates the header from the content area. |
| Child box `box` | Created by dragging children in | Deleting the group also removes its child blocks. |

### 2. Block Panel `blockPanel`

**What it does**: A bordered, titled container that groups related blocks without any switching logic.

![Block Panel rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-blockPanel.png)

*Rendered example: a bordered container with a title and one text child showing its bounds.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-blockPanel.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Container and common frame**

| Option | Values / default | Description |
| --- | --- | --- |
| Child box `panel.box` | Created by dragging children in | Like Group, children follow the container when moved or resized. |
| Frame (common options) | Background / border / radius / shadow / padding | No dedicated private form; all visual tuning lives in [Common Configuration → Frame](./common-config.md). |

### 3. Tabs `tabs`

**What it does**: Switches between groups of content with a visible tab bar; each tab owns an independent child box.

![Tabs rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-tabs.png)

*Rendered example: two tabs, with the active one showing a text child.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-tabs.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Position `tabsPosition` | Top / Bottom / Left / Right; default `Top` | Side tabs suit navigation, top tabs suit view switching. |
| Type `tabsType` | Line / Card; default `Line` | Card tabs are visually heavier and fit clearly separated sections. |
| Size `tabsSize` | Small / Middle / Large; default `Middle` | Font size and spacing of the tab bar. |
| Centred tabs `tabsCentered` | On / Off; default `Off` | Centring looks better with fewer than three tabs. |
| Content margin `contentMargin` | Number; default `4` | Space between the tab bar and content. |

**Tab items / performance**

| Option | Values / default | Description |
| --- | --- | --- |
| Tab items `boxs` | Add / delete / rename tabs; 1 by default | Deleting a tab also deletes the components inside it. |
| Force render `forceRender` | On / Off; default `Off` | Pre-renders hidden tabs: faster switching, heavier first paint. |
| Destroy on hidden `destroyOnHidden` | On / Off; default `Off` | Destroys content when a tab is left; useful for heavy charts. |

### 4. Splitter `splitter`

**What it does**: Splits an area into two or more resizable panes with a draggable divider.

![Splitter rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-splitter.png)

*Rendered example: two panes with a draggable divider, each holding a text child.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-splitter.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Direction `direction` | Horizontal / Vertical; default `Horizontal` | Horizontal = left/right panes, vertical = top/bottom panes. |
| Lazy render `lazy` | On / Off; default `Off` | Updates pane sizes only on mouse-up; helpful for heavy content. |
| Quick collapse `collapsibleEnable` / `collapsible` | Default `Off`; start/end collapse and icon | Adds arrows that collapse a pane with one click. |

**Panel settings `panels`**

| Option | Values / default | Description |
| --- | --- | --- |
| Default / min / max size | Percent or pixels; `%` split by default | Constrains dragging so a pane cannot disappear. |
| Resizable `resizable` | Per pane On / Off; default `On` | Locks a pane's size; useful for a filter form. |
| Add / delete pane | Buttons; 2 panes by default | Deleting a pane also deletes its child blocks. |

### 5. Scene `scene`

**What it does**: A multi-page container showing only the active page; actions switch pages, making it a linkage target.

![Scene rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-scene.png)

*Rendered example: page 1 and its content; the navigator can be hidden in preview.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-scene.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Style**

| Option | Values / default | Description |
| --- | --- | --- |
| Initial page `selectedBox` | Pick an existing page; first page by default | Which page is visible when the dashboard opens. |
| Page list `boxs` | Add / rename / delete pages; 1 by default | Actions reference a page id, so renaming does not break them. |
| Show navigator `showNavigator` | On / Off; default `Off` | When on, users can switch pages themselves; when off, only events can. |

> **Tip**: Buttons, tables, line, pie, radar and candlestick can all trigger a page switch — a pure front-end action with no requery.

### 6. Carousel `carousel`

**What it does**: Rotates several content cards for announcements, covers or report rotation. It has no dedicated private form; available options vary by installation.

![Carousel rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-example.png)

*This block is not placed individually on the demo page; the image shows the category overview. The actual rendering follows your installation.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-layout-example.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Version-dependent options**

| Option | Values / default | Description |
| --- | --- | --- |
| Interval / autoplay / indicators | As shown in the component panel | This type is not in the built-in defaults table; if a drawer exists, use the fields shown there. |
| Content boxes | One child box per slide | Like Tabs: place the block first, then drag content into each slide. |

> **Tip**: If Carousel is missing on your installation, combine Scene with a clock task or buttons to switch pages.

## Cheat sheet

| Need | Block | Key options |
| --- | --- | --- |
| Hide secondary content | Group | Default expand, expanded height, header style |
| Frame a group of blocks | Block Panel | Common → Frame |
| User-switched views | Tabs | Position / type / tab configuration |
| Button-switched pages | Scene | Initial page + "switch page" action |
| Resizable columns | Splitter | Direction / panel sizes / quick collapse |
| Autoplay rotation | Carousel | Interval, indicators |

## Typical setups

1. **Partition** — Block Panels for "metrics" and "details", plus a Group for debug info.
2. **Comparison** — Splitter with a [Form](./form.md) on the left and a [Chart](./chart.md) on the right.
3. **Multiple views** — Tab 1 shows a trend, Tab 2 a table, both from the same query.
4. **Wizard** — a 3-page Scene with buttons configured to "switch page"; a table row click jumps to the detail page.
5. **Nesting** — Tabs containing Groups containing Charts, for a layered dashboard.

## Notes

- Layout blocks do not emit actions, but **Scene** is a frequent action target.
- Child ownership is recorded by the container; changing canvas coordinates does not reassign a child.
- "Force render" renders every tab at once — turn it off for heavy pages, or use "destroy on hide".
- Deleting a container also removes its children.

## Related

- [Overview](./overview.md) · [Common Configuration](./common-config.md) · [Forms](./form.md) · [Dialogs](./dialog.md)
