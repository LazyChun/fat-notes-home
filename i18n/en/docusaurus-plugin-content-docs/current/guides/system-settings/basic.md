---
sidebar_position: 2
title: Basic Settings
sidebar_label: Basic Settings
description: "FatNotes Basic Settings explained: server ports, interface language, recommended colors, default card styles, big-screen preview and carousel, and file export."
---

# Basic Settings

> Basic Settings decides **how FatNotes runs, how it looks, and how results are presented**: two service ports, the UI language, global color palettes, default appearance of new cards, plus big-screen and export switches. The six pages are independent of each other.

| Page | Purpose | Takes effect |
| --- | --- | --- |
| Server Ports | Fixed or auto-assigned backend / UI ports | After restart |
| Language | Simplified Chinese / English | Immediately |
| Colors | Recommended palettes for frames and tooltips | Immediately after saving |
| Component Style | Default frame and tooltip styles for new cards | New cards only |
| Big Screen | Full-screen preview, carousel and carousel list | Immediately (icons appear at top right) |
| File Export | PDF / PNG export switches | Immediately (icon appears at top right) |

---

## Server Ports

FatNotes runs two local services: the **backend API** (default 8022) and the **UI service** (default 8888, the address you open in a browser). This page manages both.

![Server Ports page; red boxes mark the backend port section and the Save button](pathname:///fat-notes-home/img/instruction/settings/settings-basic-port.png)

*Top: backend service port. Bottom: UI server port. Red boxes highlight the backend section and the Save button.*

### Fields

| Section | Field | Control / values | Description |
| --- | --- | --- | --- |
| Backend service port | Auto-assign port | Switch (on by default) | Uses the default port **8022**; automatically switches to an available port if occupied |
| Backend service port | Custom port | Input (required) | Enabled after turning auto-assign off; shows the configured value, e.g. 8022 |
| Backend service port | Current port | Read-only | The port actually used by this run, e.g. 8022 |
| UI server port | Auto-assign port | Switch (on by default) | Uses the default port **8888**; switches automatically if occupied |
| UI server port | Custom port | Input (required) | Enabled after turning auto-assign off |
| UI server port | Current port | Read-only | The port actually used by this run, e.g. 8888 |
| Bottom | Save | Button | Writes the configuration; disabled when nothing changed |

### Steps and notes

1. Check "Current port" to see what this run actually uses.
2. To fix a port, turn off "Auto-assign port" and enter a value in "Custom port".
3. Click "Save". The page hints that the change applies after restarting.
4. Restart FatNotes and open the new UI address, for example `http://127.0.0.1:9000/`.

- Ports are **startup parameters**: saving only writes the config, no restart means no change. The two ports are configured separately.
- If a port is occupied, the app reports "port XXXX is occupied, this run automatically used YYYY (config value unchanged)" — a protection mechanism of auto-assignment.
- Changing the UI port invalidates browser bookmarks and hard-coded URLs in scripts/plugins; changing the backend port affects direct API integrations.
- For single-machine use, keeping "Auto-assign port" on avoids port conflicts entirely.

---

## Language

![Language page; red box marks the language switch](pathname:///fat-notes-home/img/instruction/settings/settings-basic-language.png)

*Red box: Simplified Chinese (selected) and English, plus the note "applies immediately to the interface and system texts".*

| Field | Values | Description |
| --- | --- | --- |
| Interface language | Simplified Chinese / English | Click to switch; the highlighted button is the active language |
| Note | Read-only | Switching applies immediately to both the interface and system texts |

- Applies **immediately**, no restart and no Save button.
- Covers UI controls and built-in system texts (menus, hints, error messages). Your own notes are not translated.
- The choice is stored locally and reused on the next launch; an invalid or missing value falls back to Simplified Chinese.
- Works together with **System Data → I18n Texts**, which holds your own bilingual entries.

---

## Colors

Colors maintains the **recommended palettes** used by every color picker in the app: candidate colors for frame and tooltip parts. Changes apply immediately after saving.

![Recommended colors (top): three frame groups and the first tooltip group](pathname:///fat-notes-home/img/instruction/settings/settings-basic-colors-1.png)

*Top: page description plus the frame-background palette (red box). Each group has swatches, an add button, a counter and "Restore Defaults".*

![Recommended colors (bottom): remaining tooltip groups and the Save button](pathname:///fat-notes-home/img/instruction/settings/settings-basic-colors-2.png)

*Bottom: tooltip key font, tooltip font, tooltip border, and the Save button (red box, disabled gray when unchanged).*

### Seven palettes

| Palette | Used for | Example count |
| --- | --- | --- |
| Frame - background | Candidate card frame backgrounds | 21 / 64 |
| Frame - title | Candidate title text colors | 18 / 64 |
| Frame - border | Candidate frame border colors | 21 / 64 |
| Tooltip - background | Candidate chart tooltip backgrounds | 30 / 64 |
| Tooltip - key font | Highlight values / labels in tooltips | 30 / 64 |
| Tooltip - font | Normal text in tooltips | 30 / 64 |
| Tooltip - border | Candidate tooltip border colors | 21 / 64 |

### Controls and rules

| Control | Description |
| --- | --- |
| Swatch | A current recommended color; the first transparent tile represents transparency. Swatches can be removed |
| Add color | Opens a color picker to append a candidate; duplicates and invalid formats are rejected |
| `n / 64` counter | Configured count / limit — **up to 64 colors per group** |
| Restore Defaults | Resets **only this group** to the system palette |
| Save | Writes all seven groups at once; applies immediately |

:::tip
Think of **Component Style** as *the currently selected value* and **Colors** as *the list of candidates offered to the user*. Trim the candidates here first, then pick one as the default for new cards.
:::

---

## Component Style

"Default Card Style" has the most fields of any settings page. It defines the frame and tooltip appearance of **cards created afterwards**, in two collapsible sections.

![Default Card Style (top): description and the Frame section](pathname:///fat-notes-home/img/instruction/settings/settings-component-style-1.png)

*Red boxes mark the scope note and the "Event Tags" selector. The Frame section contains background color, title position, shadow, padding, border width, corner radius and event tags.*

![Default Card Style (bottom): Tooltip section and Save / Restore Defaults](pathname:///fat-notes-home/img/instruction/settings/settings-component-style-2.png)

*Red box: the Save / Restore Defaults button group (disabled when unchanged). Above it are tooltip padding, border and corner radius.*

### Frame fields

| Field | Control | Description |
| --- | --- | --- |
| Background color | Color palette | Default frame background; candidates come from the Colors page |
| Title position | Left / center / right + Bold / Italic / font color | Title alignment and typography; centered by default |
| Enable shadow | Switch | Card drop shadow |
| Padding | Top / right / bottom / left, px | Space between content and border; default 8 |
| Border width | Color + width + side selector (All) + add button | Border thickness, color and which sides it applies to |
| Corner radius | All corners / top-left / top-right / bottom-left / bottom-right, px | Uniform or per-corner rounding |
| Event tags | Multi-select "Select events to hide" | Hide unneeded event labels on cards |

### Tooltip fields

| Field | Control | Description |
| --- | --- | --- |
| Display | Switch (on by default) | Whether chart tooltips are shown |
| Type | Dropdown (Show all, …) | Which tooltip content is displayed |
| Key font | Font picker + bold / italic + color | Typography of highlighted values and labels |
| Font | Font picker + bold / italic + color | Typography of normal tooltip text |
| Enable shadow | Switch | Tooltip drop shadow |
| Padding | Top / right / bottom / left, px | Inner spacing |
| Border width | Color + width + side selector | Tooltip border |
| Corner radius | All corners / four corners, px | Tooltip rounding |

### Scope (read this carefully)

The note at the top of the page is the key:

> Configures the default frame and tooltip values of **new cards**. Already created cards are **not affected**. Text, form and other cards with transparent backgrounds or special padding keep their own settings. Tooltip defaults apply to **line, pie, radar, heatmap and K-line charts** and other cards with tooltips.

- Existing cards do not change; edit them in their own configuration (see [Common Configuration](../system-components/common-config.md)).
- Text / form blocks with transparent backgrounds or special padding keep their own frame values.
- Tooltip options only matter for chart cards with tooltips.
- "Save" writes the configuration, "Restore Defaults" resets the page; both are disabled until something changes.

---

## Big Screen

Big Screen puts the current dashboard file on a full screen for presentations, monitoring or exhibitions. It has two switches and a carousel list.

![Big Screen page; red boxes mark the two switches and the New Carousel button](pathname:///fat-notes-home/img/instruction/settings/settings-basic-bigscreen.png)

*Top red box: the two switches with explanations. Below: the carousel list and the "New Carousel" button.*

| Item | Description |
| --- | --- |
| Enable big-screen preview | A preview icon appears at the top right; clicking it fills the screen and shows the currently open dashboard file in **preview mode** (render only, no editing) |
| Enable big-screen carousel | A carousel icon appears at the top right; clicking it lets you choose a carousel, then cycles through dashboard files full-screen |
| Carousel list | Columns: Name / Carousel files / Switch interval / Actions. Empty state: "No carousels yet, click New at the top right" |
| New Carousel | Opens the carousel editor modal |

![New Carousel modal: name, switch interval and the file checklist](pathname:///fat-notes-home/img/instruction/settings/settings-modal-carousel.png)

*The modal lets you check the dashboard files to play; "the order of the list below is the playback order, drag to reorder".*

| Field | Control | Description |
| --- | --- | --- |
| Name | Input | Carousel name, used when choosing from the top-right icon |
| Switch interval | Number + seconds | How long each dashboard file stays on screen |
| Carousel files | Checklist (drag to reorder) | Pick existing dashboard files; list order is the playback order |
| Cancel / OK | Buttons | "No files selected" is shown at the bottom until at least one is checked |

Preview mode renders without editing. If blocks do not respond to clicks in full screen, you are in preview mode — just exit it.

---

## File Export

![File Export page; red box marks the PDF and Image checkboxes](pathname:///fat-notes-home/img/instruction/settings/settings-basic-export.png)

*The two export options and their descriptions. The export icon only appears at the top right after a box is checked.*

| Option | Description |
| --- | --- |
| PDF | Export the **currently open dashboard file** as PDF |
| Image | Export the currently open dashboard file as a **PNG image** |

The rule from the page description:

> Once checked, an export icon appears at the top right. With **only one option** checked, clicking it exports the current dashboard file directly. With **both** checked, clicking it asks whether to export as image or PDF.

- Switches apply immediately, with no Save button.
- The export target is the currently open dashboard file, not the whole book; switch files first if needed.
- Big-screen preview and file export are often used together: present on screen, then export a PDF/PNG for archiving.

---

## Quick reference

| I want to… | Page | Action |
| --- | --- | --- |
| Give external scripts a fixed address | Server Ports | Turn off auto-assign → enter port → Save → restart |
| Switch the UI to English | Language | Click English, applies immediately |
| Standardize team colors | Colors | Edit the 7 palettes → Save |
| Make new cards follow visual guidelines | Component Style | Set Frame / Tooltip → Save |
| Present or rotate dashboards | Big Screen | Enable switches → New Carousel → top-right icon |
| Save a dashboard as PDF / PNG | File Export | Check PDF / Image → top-right icon |

## Notes

- Port changes **require a restart**; Component Style changes **do not retroactively update** existing cards — the two most common "it did not work" cases.
- Colors are the candidate list, Component Style is the current default; they complement each other.
- Big-screen and export entries live at the **top right** of the window and do not exist before being enabled.
- Save / Restore Defaults are disabled until the form is modified — that is normal.
- Preview mode is render-only; exit full screen to return to editing.

## Related docs

- [System Settings Overview](./overview.md) — entry point, catalog and effect rules.
- [System Data](./system-data.md) — variables, tags, members, i18n texts.
- [Common Configuration](../system-components/common-config.md) — per-block frame and tooltip options for existing cards.
