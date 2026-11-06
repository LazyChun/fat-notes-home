---
title: FatCut
sidebar_label: FatCut
description: "FatCut (fat-cut) plugin guide: a CapCut-style multi-track video editor inside FatNotes — project management, the materials/text/sticker/effect/transition/subtitle/filter creation panels, the multi-track timeline and clip properties, AI clip arrangement (LiteGraph node graph), AI model configuration, and local export to MP4/MOV/WebM."
---

# FatCut

![FatCut video editing workbench overview](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png)

*Red boxes, top to bottom and left to right: the leftmost activity bar (video icon), the left function panel (materials library), the center preview, the right properties panel, and the bottom multi-track timeline.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png" target="_blank" rel="noopener">Open full size</a>

> FatCut is FatNotes' **CapCut-style video editor** plugin (`fat-cut`). It brings an entire "video editing workbench" into your notes: enter via the video icon in the activity bar; on the left is the materials and creation panel (Materials / Text / Stickers / Effects / Transitions / Subtitles / Filters); in the center is the preview; on the right is a context-sensitive properties panel; and at the bottom is a multi-track timeline. From importing assets and laying out subtitles and stickers, to generating a clip arrangement with AI and laying it onto the timeline in one click, to exporting MP4 / MOV / WebM locally — everything can be done here. Projects can be saved and reopened for further editing at any time.

## 1. What it is: a "video editing workbench"

FatCut (`fat-cut`) in the [popular plugins overview](./index.md) differs from [FatPhoto](./fat-photo.md), [FatCharts](./fat-charts.md) and [FatTools](./fat-tools.md): instead of adding an image editor or dashboard charts, it contributes an entire CapCut-style video editing interface — the video icon in the activity bar, a full-page workbench, and its own project, export and AI arrangement flows.

| Aspect | Description |
| --- | --- |
| UI contribution | Video icon in the activity bar, a full-page editing workbench (function panel + preview + properties panel + multi-track timeline) |
| Project model | **Project**: saved as a re-openable, editable editing project containing assets, tracks and the timeline |
| Function panel | Seven creation tabs: Materials / Text / Stickers / Effects / Transitions / Subtitles / Filters |
| Timeline | Multiple video tracks + multiple audio tracks, with zoom / snapping / split / left-right trim / keyframes |
| Clip properties | Source in-point / duration / volume / opacity / speed / transform (scale · rotate) |
| AI editing | Prompt → generate a LiteGraph clip arrangement → build the timeline in one click; a node editor fine-tunes each asset / transition / filter |
| AI config | Recognition model + editing model (from the FatNotes host configuration) |
| Export | Output path / format (MP4·H.264 / MOV / WebM) / resolution / frame rate, synthesized locally via ffmpeg |

![Editing workbench overview (with region annotation)](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png)

*Red boxes: activity bar, function panel, preview, properties panel and timeline. The function panel is currently on the "Materials" tab.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-workbench.png" target="_blank" rel="noopener">Open full size</a>

:::note Interface language
The plugin's internal tab names and panel titles (Materials, Text, Effects, Project Properties, etc.) are currently **fixed in Chinese**; the host's menus, global search and other shell text follow the application's language setting. Therefore the screenshots in this English doc still show the Chinese interface.
:::

## 2. Interface layout: function panel + preview + properties + timeline

After entering FatCut, the interface is divided into four blocks (plus the leftmost activity bar):

- **Function panel (left)**: a row of tabs at the top — Materials / Text / Stickers / Effects / Transitions / Subtitles / Filters — with that tab's creation content below (materials library, style presets, effect list, etc.).
- **Preview (center)**: a player showing the frame at the current timeline position, with play / pause and basic controls.
- **Properties panel (right)**: context-sensitive — shows "Project Properties" when a project is selected, "Clip Properties" when a clip is selected.
- **Timeline (bottom)**: the multi-track editing area; above it is the timeline toolbar (zoom / snapping / split / trim / keyframes / add track), below are the tracks.
- **Top toolbar**: back, project dropdown (folder icon + project name), new, save, export, and AI config (settings/gear icon).

![Project dropdown: switch / create / delete projects](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-projects.png)

*Click the folder button at the top to expand the project list: it lists existing projects (e.g. "剪辑测试") and "+ New Project", and each item can be deleted.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-projects.png" target="_blank" rel="noopener">Open full size</a>

## 3. Project management

FatCut works in units of "projects", and the top toolbar provides a complete project lifecycle:

- **Project dropdown (folder icon)**: expands to list all projects and switch between them directly; each item has a delete button, and the bottom is "+ New Project".
- **New project**: create a blank editing project, with a name you can set.
- **Save**: write the current assets, tracks and timeline into the project; an unsaved indicator appears next to the project name when there are changes.
- **Open / delete**: switch to or delete an existing project from the dropdown.

After creating or opening a project, the right properties panel shows **Project Properties**:

| Project property | Description |
| --- | --- |
| Frame rate | Presets 24 / 25 / 30 / 50 / 60 fps (custom also supported) |
| Width / Height | Video resolution, e.g. 1920 × 1080 |
| Background color | Canvas background color (e.g. #000000) |

## 4. Materials and creation panels

The left function panel has seven tabs covering everything from raw assets to finished packaging.

### Materials

The materials library is where editing starts: import local video / image / audio, list them, and drag them onto the timeline. Each asset can be **AI-recognized** to auto-generate a content description for later AI arrangement.

![Materials library](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-materials.png)

*The materials library lists the video / image / audio files in the project (e.g. logo.jpg, 关注图.png, read_me2.py).* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-materials.png" target="_blank" rel="noopener">Open full size</a>

### Text

The Text tab provides a set of **text style presets**; click or drag to drop them onto the preview:

- Presets: Title, Subtitle, Body, Caption, Italic, Neon, Outline, Banner

![Text style presets](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-text.png)

*Click or drag a text style onto the video preview; presets include Title / Subtitle / Body / Caption / Italic / Neon / Outline / Banner.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-text.png" target="_blank" rel="noopener">Open full size</a>

### Stickers

The Stickers tab provides a categorized gallery with search:

- Categories: Expressions, Gestures, Animals, Food, Sports, Travel, Symbols, Nature, Objects, Faces
- A search box at the top filters by keyword

![Sticker gallery](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-stickers.png)

*The sticker gallery has categories such as Expressions / Gestures / Animals / Food / Sports / Travel; the main area is an expressions grid.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-stickers.png" target="_blank" rel="noopener">Open full size</a>

### Effects

The Effects tab is organized by category, covering image adjustment and atmosphere effects:

- Categories: Basic, Dynamic, Image, RGB, Border, Nature
- Example effects: Grayscale / Retro / Invert / Mirror / Blur / Brightness / Contrast / Saturation / Shake / Heartbeat / Flicker / Glitch / RGB split / Hue rotate / Neon; Borders (Film / Polaroid / VHS); Nature (Snow / Rain / Fog / Fire / Water ripple)

![Effects gallery](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-effects.png)

*Effects are grouped into Basic / Dynamic / Image / RGB / Border / Nature; the main area lists each category's effects.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-effects.png" target="_blank" rel="noopener">Open full size</a>

### Transitions

The Transitions tab provides transitions between clips:

- Categories: Basic, Slide, Wipe, Zoom, Special
- Example effects: Fade, Black fade, White fade, Dissolve, Flash black, Flash white

![Transitions gallery](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-transitions.png)

*Transitions are grouped into Basic / Slide / Wipe / Zoom / Special; the main area lists each transition.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-transitions.png" target="_blank" rel="noopener">Open full size</a>

### Subtitles

The Subtitles tab quickly adds and bulk-edits subtitles:

- Subtitle style presets: Classic, Bold, Outline, Dark, Neon, Karaoke
- "+ Add subtitle" creates one; the subtitle list supports bulk editing of text and timing

![Subtitle styles and list](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-subtitles.png)

*Click a style to add a subtitle, or bulk-edit text and timing in the list; six styles: Classic / Bold / Outline / Dark / Neon / Karaoke.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-subtitles.png" target="_blank" rel="noopener">Open full size</a>

### Filters

The Filters tab provides finished color grading styles:

- Categories: Modern, Cinematic, Retro, Black & White, Portrait, Landscape, Food, Film
- Example effects: Vivid / Natural / Teal-Orange / Cinematic Orange / HDR / Film Noir / Kodak / Fujifilm / Polaroid / VHS

![Filter gallery](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-filters.png)

*Filters are grouped into Modern / Cinematic / Retro / Black & White / Portrait / Landscape / Food / Film; the main area lists each style.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-filters.png" target="_blank" rel="noopener">Open full size</a>

## 5. Timeline

The bottom timeline is the core of editing. Multiple video tracks + multiple audio tracks support:

| Timeline toolbar | Purpose |
| --- | --- |
| Zoom in / out / fit | Adjust the time-axis zoom; fit shows the whole timeline at once |
| Snapping | Auto-align a dragged clip to adjacent clips / the playhead |
| Add video track / Add audio track | Add a new track |
| Split | Cut the current clip at the playhead |
| Trim left / Trim right | Using the playhead as the boundary, cut off the left / right part of a clip |
| Keyframe | Set a keyframe for a property (e.g. transform / opacity) to animate it |

Each track supports mute (speaker), show/hide (eye), lock (lock) and delete (trash); there is also a playhead and a time ruler at the bottom.

![Multi-track timeline](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-timeline.png)

*The timeline has Main video (locked) + Video 1 / 2 / 3 + Audio 1 tracks, with a clip on Video 1 (e.g. fqft_zimu3.mp4); above is the timeline toolbar and ruler.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-timeline.png" target="_blank" rel="noopener">Open full size</a>

## 6. Clip properties

After selecting a clip on the timeline, the right properties panel switches to **Clip Properties**, letting you precisely control that clip:

| Clip property | Description |
| --- | --- |
| Source in-point | The clip's own time in-point (trim the head/tail of the source) |
| Duration | The clip's length on the timeline |
| Volume | Audio volume (valid for video / audio track clips) |
| Opacity | Frame transparency, combinable with keyframes for fade in/out |
| Speed | Playback speed (fast / slow) |
| Transform | Scale and rotate |

## 7. AI clip arrangement

FatCut's AI capability lives in the "AI Cut" entry on the bottom timeline toolbar; opening it reveals the **AI Clip Arrangement** drawer:

- **Prompt**: describe the desired result in natural language (e.g. "make a punchy montage from the current assets"), then click "Generate Arrangement" to have the model (or built-in rules) produce an editing plan.
- **Build Timeline**: lay the arrangement onto the timeline in one click, auto-arranging assets / transitions / filters.
- **Arrangement list**: save / load / backup multiple arrangements (drafts are auto-saved).
- **LiteGraph arrangement graph**: the center canvas expresses the editing structure as a node graph; node types include Start / Clip / Transition / Filter / End.
- **Node editor**: after selecting a node in the graph, fine-tune it in the right panel — bound asset, order, track type / index, timeline in-point, duration, source in-point, transition type / bound clip, filter type, etc.; you can also add / delete nodes.
- **AI recognition**: in the materials library, run AI recognition on a single asset to auto-generate a description for the arrangement.

![AI clip arrangement drawer](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-ai.png)

*AI Clip Arrangement drawer: prompt + generate arrangement, build timeline, arrangement list (load / backup), LiteGraph arrangement graph and node editor.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-ai.png" target="_blank" rel="noopener">Open full size</a>

## 8. AI configuration

Click the settings (gear) icon at the top to open the **AI Configuration** dialog and specify the default models for arrangement:

- **Recognition model**: used to auto-recognize asset content and generate descriptions; must support image recognition.
- **Editing model**: used for AI clip arrangement, auto-generating the timeline from the prompt and assets.

The model list comes from the FatNotes host configuration; if the corresponding capability is not configured, the dialog prompts you to configure it in FatNotes first.

![AI configuration dialog](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-aiconfig.png)

*AI configuration: two dropdowns for the recognition model and the editing model, sourced from the FatNotes host.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-aiconfig.png" target="_blank" rel="noopener">Open full size</a>

## 9. Export

Click the export (export icon) at the top to open the **Export** dialog and synthesize the timeline into a video file:

| Export item | Description |
| --- | --- |
| Output path | Local save path, default `exports/<project_name>_timestamp.mp4`, browsable |
| Format | MP4 (H.264) / MOV / WebM |
| Resolution | Follows the project width/height (e.g. 1920 × 1080) |
| Frame rate | Follows the project frame rate (e.g. 30fps) |
| Duration | Total timeline duration (read-only, e.g. 26.9 s) |

Click "Start Export" to synthesize locally via ffmpeg; progress can be viewed inside the dialog.

![Export dialog](pathname:///fat-notes-home/img/instruction/fatCut/zh/fc-export.png)

*Export: output path / format / resolution / frame rate / duration, with Cancel / Start Export buttons.* · <a href="/fat-notes-home/img/instruction/fatCut/zh/fc-export.png" target="_blank" rel="noopener">Open full size</a>

## Related documents

- [Popular plugins overview](./index.md)
- [FatTools](./fat-tools.md)
- [FatCharts](./fat-charts.md)
- [FatAIBase](./fat-ai-base.md)
- [FatBrowserUse](./fat-browser-use.md)
- [FatGames](./fat-games.md)
- [FatPhoto](./fat-photo.md)
- Project: [LazyChun/fat-cut](https://github.com/LazyChun/fat-cut)
