---
title: FatPhoto (fat-photo)
sidebar_label: FatPhoto (fat-photo)
description: "FatPhoto (fat-photo) plugin reference: the built-in Canvas image editor's multi-tab document model, layers and blend modes, tools (brush / text / shapes / crop), selection and adjustments, history, plus project files and multi-format export."
---

# FatPhoto (fat-photo)

![Example of image editing achievable with FatPhoto](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-example.jpg)

*Illustration: a flat-style artwork (a cartoon pig typing at a computer) made or edited in an image editor, representing the kind of creation and editing FatPhoto supports; the picture shows typical tool strip, layers, properties, history and status-bar layouts.* · <a href="/fat-notes-home/img/instruction/fatPhoto/zh/fp-example.jpg" target="_blank" rel="noopener">Open full size</a>

> FatPhoto is FatNotes' **built-in Canvas image editor** plugin (`fat-photo`). It brings a whole "image editing workbench" into your notes: a left tool strip + layers panel + history, a multi-tab editing area with a checkerboard canvas in the middle, a context-sensitive properties panel on the right, and a status bar at the bottom. From quickly cropping a screenshot, to composing a poster with brushes, text and shapes, to exporting PNG / JPEG / WebP / SVG — it all happens here, and the project can be saved as an editable `.fpproj` file.

## 1. What It Is: An "Image Editing Workbench"

FatPhoto (`fat-photo`) in the [plugin overview](./index.md) differs from [FatCharts](./fat-charts.md) and [FatTools](./fat-tools.md): it does not add flow nodes or dashboard charts. Instead it **contributes an entire image-editing UI** — an image icon in the activity bar, a primary sidebar, a full workbench page, plus its own file and export flow.

| Aspect | Detail |
| --- | --- |
| UI contributions | Activity-bar image icon, primary sidebar (tool strip + layers + history), full workbench page, bottom status bar |
| Document model | **Multi-tab document**: each tab is one image (or one project); open and edit several independently |
| Layers | Three layer kinds — pixel / text / shape; support opacity, **blend mode**, drag-to-reorder, show/hide and lock |
| Toolset | Move, hand, crop, brush, eraser, paint bucket, text, 7 shapes, eyedropper / color sampler / ruler, clone stamp, 3 lassos, object selection / quick selection / magic wand |
| Adjustments & color | Brightness / contrast / saturation / color temperature, foreground / background color; adjustments can be "baked into pixels" |
| History | Per-step snapshots; undo / redo / jump to any step (keeps up to 40 steps) |
| Files | Open image / import as new layer / new blank document / save `.fpproj` project / export PNG·JPEG·WebP·SVG |
| Backend | `backend/main.py` (`depsStrategy: vendor`), for local persistence of project files and heavier dependencies |

![FatPhoto editor overview](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-overview.png)

*Red boxes, top to bottom: left tool strip + layers panel + history; middle multi-tab canvas (rectangle / ellipse / star / text already drawn); right properties panel switched for the text layer; bottom status bar.* · <a href="/fat-notes-home/img/instruction/fatPhoto/zh/fp-overview.png" target="_blank" rel="noopener">Open full size</a>

:::note Interface language
Tool names and panel titles inside the plugin (Layers, History, Properties, …) are currently **Chinese only**; the host's menus and global search follow the application language. That is why the screenshots in this English article still show the Chinese interface.
:::

## 2. Layout: Three Columns + Tabs + Status Bar

Once you enter FatPhoto, the interface is cleanly split into several regions:

- **Primary sidebar (far left)**: a horizontal **tool strip** at the top (with grouped tool buttons), then the **layers panel** below it, and a draggable **history panel** further down.
- **Center work area**: a **tab bar** at the top (one tab per open image, with a `*` marking unsaved changes), a **context toolbar** underneath that switches with the active tool, and the **canvas** (checkerboard background) as the main body.
- **Right properties panel**: shows different content depending on the current layer kind — text, shape, or a normal pixel layer.
- **Bottom status bar**: left shows the ready state and current tool name; center shows canvas size and cursor coordinates; right shows zoom percentage, color mode and layer count.

![Left sidebar: tool strip / layers / history](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-leftsidebar.png)

*Three sections of the primary sidebar: the tool strip (icons), the layers panel (new / duplicate / delete + opacity + blend-mode dropdown), and history (steps listed, current step highlighted).* · <a href="/fat-notes-home/img/instruction/fatPhoto/zh/fp-leftsidebar.png" target="_blank" rel="noopener">Open full size</a>

![Bottom status bar](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-statusbar.png)

*Example status bar: Ready / Text tool · 128 × 80 px · 100% · RGB / 8bit · 5 layers.*

## 3. The Toolbox

Tools are arranged in **groups**: each group shares one button slot on the tool strip; long-press / right-click / the small down-arrow reveals the other tools in the group; pressing the shortcut key also cycles within the group. Full list:

| Tool | Shortcut | Purpose |
| --- | --- | --- |
| Move tool | `V` | Drag the current layer; `Space` / middle-button / hand to pan, wheel to zoom |
| Hand tool | `H` | Pan the canvas, wheel to zoom |
| Crop tool | `C` | Drag the handle to frame a region, then click "Apply crop" to cut the outside |
| Brush tool | `B` | Soft brush (size / hardness / opacity / flow / mode) with a live tip preview |
| Eraser | `E` | Same parameters as the brush, erases pixels on the current layer directly |
| Paint bucket | `G` | Fill an area by color tolerance (contiguous / all layers / opacity) |
| Text tool | `T` | Edit in place on the canvas; `Ctrl+Enter` or blur to commit, `Esc` to cancel |
| Shape group (rectangle / ellipse / circle / triangle / polygon / star / line) | `U` | Drag to draw, toggle fill; polygon / star support 3–12 sides |
| Eyedropper group (eyedropper / color sampler / ruler) | `I` | Eyedropper picks the foreground color; sampler places up to 4 monitor points; ruler measures distance / angle / width-height |
| Clone stamp | `S` | `Alt+click` to set the source, then drag to clone; size / hardness / opacity / flow / align / sample-all-layers supported |
| Lasso group (lasso / polygonal lasso / magnetic lasso) | `L` | Free path, point-by-point, or auto-snap along edges |
| Object selection group (object selection / quick selection / magic wand) | `W` | Rectangular / free-lasso marquee, brush-to-add selection, flood-fill same-color regions |

:::tip Shortcut cycling
Repeating the same key on a grouped tool **cycles through the group**: for example, pressing `U` repeatedly rotates  rectangle → ellipse → circle → triangle → polygon → star → line; `L`, `W` and `I` work the same way.
:::

When a different tool is active, the **context toolbar** above the center work area shows the corresponding parameters. For the brush, for instance, it shows size / hardness / opacity / flow / mode:

![Context toolbar for the brush tool](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-toolbar.png)

*Toolbar when the brush / eraser is active: size, hardness, opacity, flow; the brush also has a "mode" dropdown (Normal / Darken / Lighten / Hue / Saturation / Color / Luminosity).*

## 4. Layer System

FatPhoto has three layer kinds, which decide **how far you can edit**:

- **Pixel layer**: an ordinary bitmap; brush, eraser and paint bucket act directly on it.
- **Text layer**: editable again — double-click the text layer in the layers panel to retype or change font size / font / color, no redrawing needed.
- **Shape layer**: rectangle / ellipse / circle / triangle / polygon / star / line, editable geometry with stroke / fill / color.

The layers panel supports: new, duplicate, delete, drag-to-reorder, **show/hide** (eye icon), **lock** (lock icon), an **opacity** slider, and **5 blend modes** (Normal / Multiply / Screen / Overlay / Soft Light).

![Properties panel that switches with layer kind](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-rightsidebar.png)

*With a text layer selected, the right properties panel shows "Text" (font / size / style / color + RGB·HSL) plus "Transform" and "Info"; a normal layer additionally shows "Adjust" and "Color".*

## 5. Properties Panel (Layer-Sensitive)

The right panel is context-sensitive and sections itself by the current layer kind:

**Text layer** — font (29 built-in faces including system default / SimSun / SimHei / Microsoft YaHei / KaiTi, both Chinese and Latin), size (8–200px), style (bold / italic / underline / strikethrough), color (color picker + hex, live RGB and HSL readouts).

**Shape layer** — type switch, polygon / star **side count** (3–12), stroke width (1–100px), whether to fill, color.

**Normal pixel layer** — four groups:
- **Transform**: X / Y / width / height / rotation (with aspect lock);
- **Adjust**: brightness / contrast / saturation / color temperature (−100~+100), can "apply to pixels" to bake in;
- **Color**: foreground / background color (swappable), RGB and HSL readouts;
- **Info**: file, size, layer count, history steps, color mode, original size.

## 6. Selection Tools

FatPhoto offers complete selection capabilities, all supporting **modifier-key combos**: `Shift` to add, `Alt` to subtract, `Shift+Alt` for intersection; and one-click **select all / deselect / invert** in the toolbar (`Ctrl+A` / `Ctrl+D` / `Ctrl+Shift+I`).

| Tool | Behavior |
| --- | --- |
| Lasso | Free drag path, auto-closes on release |
| Polygonal lasso | Click point by point, double-click / `Enter` / return to start to close, `Backspace` removes the last point |
| Magnetic lasso | Snaps along edges while dragging, with adjustable width / contrast / frequency |
| Object selection | Rectangular or free-lasso marquee (can switch to "lasso mode") |
| Quick selection | Brush to paint-add selection, brush size adjustable |
| Magic wand | Click a same-color region to flood-select, tolerance and "contiguous" adjustable |

![Rectangular selection (marching ants) drawn by the object selection tool](pathname:///fat-notes-home/img/instruction/fatPhoto/zh/fp-selection.png)

*The rectangular selection dragged out by the object selection tool shows as marching ants, with a semi-transparent blue mask outside the selection.*

## 7. Adjustments, History and Files

**Adjustments**: in the "Adjust" section of the properties panel, drag brightness / contrast / saturation / color temperature for a live preview; when satisfied, click "Apply to pixels" to bake the adjustment into the background layer, or "Reset" to clear.

**History**: every operation (new layer, draw shape, move, adjust…) is written to the history panel on the left. Click any step to **jump back to that state**; undo / redo buttons (`Ctrl+Z` / `Ctrl+Shift+Z`) also work, keeping up to 40 steps.

**File operations** (buttons to the right of the tab bar):

- **Open image**: pick one or more local images, each becomes a new tab.
- **Open project (`.fpproj`)**: rebuilds the full project with layers / history / selection; an ordinary image goes through the open flow instead.
- **Import as new layer**: add an image into the current document (drag-drop or `Ctrl+V` paste also work).
- **New blank document**: a 1920×1280 blank canvas by default.
- **Save project**: store as `.fpproj` (layers, adjustments, full history, selection — the equivalent of a PSD); with `Ctrl+S` and a valid handle it silently writes back to the original location.
- **Export**: PNG / JPEG / WebP / SVG, bringing up the system save dialog to choose format and file name.

## 8. Shortcut Cheat Sheet

| Key | Function | Key | Function |
| --- | --- | --- | --- |
| `V` | Move | `H` | Hand |
| `C` | Crop | `B` | Brush |
| `E` | Eraser | `G` | Paint bucket |
| `T` | Text | `U` | Shape group (cycle) |
| `S` | Clone stamp | `L` | Lasso group (cycle) |
| `W` | Object selection group (cycle) | `I` | Eyedropper group (cycle) |
| `[` / `]` | Brush smaller / larger | `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo | `Ctrl+S` | Save project |
| `Ctrl+A` | Select all | `Ctrl+D` | Deselect |
| `Ctrl+Shift+I` | Invert selection | `Esc` | Cancel current edit |

## Related Documents

- [Plugin Overview](./index.md)
- [Toolbox (FatTools)](./fat-tools.md)
- [FatCharts](./fat-charts.md)
- [FatAiBase](./fat-ai-base.md)
- [FatBrowserUse](./fat-browser-use.md)
- [FatGames](./fat-games.md)
- Project repo: [LazyChun/fat-photo](https://github.com/LazyChun/fat-photo)
