---
title: FatPen (fat-pen)
sidebar_label: FatPen
description: "FatPen (fat-pen): a project-based fiction writing workbench with chapter/paragraph editing, nine worldbuilding systems, a map studio (terrain generation / brush / markers / layers), naming and phrase libraries, style settings, AI assistants, and fully local JSON storage."
---

# FatPen (fat-pen)

> After installing the plugin, a **pencil icon (EditOutlined)** appears in the activity bar. It opens a two-part fiction workspace titled **肥笔写手** (FatPen Writer): a menu sidebar on the left and a full workbench page on the right. Everything is organized around a **novel project** — chapters, worldbuilding, outlines, maps, phrase libraries and AI agents all live in one place, and all data is written to JSON files under the workspace `fatPen/` directory. No cloud, no network required.

![FatPen overview: world grid, chapter tree and the active project card](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-overview.png)

*The opening screen: project info and five sidebar groups (World / Chapters / Toolbox / Style / Settings) on the left, the active project card on the right.* · <a href="/fat-notes-home/img/instruction/fatPen/zh/fp-overview.png" target="_blank" rel="noopener">View full image</a>

This is **not** a handwriting or whiteboard tool. It is a structured workbench for long-form fiction: the manuscript is split into parts → chapters → paragraphs that can be reordered, locked and handed to AI; characters, factions, events and timelines are separate records that can be linked; and the map is a real terrain canvas. This page follows the natural workflow — create a project, write chapters, build the world, draw the map, then use the tools and AI.

## What it is: a creation plugin with its own backend

| Aspect | Details |
| --- | --- |
| Plugin id / version | `fat-pen` / `0.1.0`; UI name 肥笔写手 |
| Contributions | Activity bar pencil icon, primary sidebar, full workbench page, bottom panel, footer status `[fat-pen] ready`; also two scaffold demo card types `Block 1` / `Block 2` |
| Unit of organization | **Novel project** — name, description, common / private type; sortable, editable, deletable |
| Writing units | Part (`part`) → chapter (`chapter`) → paragraph; paragraphs can be locked so AI will not change them |
| Worldbuilding | 9 built-in systems plus any number of custom systems (nodes / relations / relation types) |
| Map | Konva canvas with terrain generation, 9 terrain brushes, 9 marker templates, 5 preset layers, boundaries and regions |
| Tools | Name generator, three importable/exportable phrase libraries, style settings |
| AI | Field-level AI edits, 9 AI creation dialogs, agents and default models, 4 MCP meta-tools |
| Data & backend | Python backend (`backend/main.py`, JSON-RPC over stdin/stdout, about 180 handlers), stored as JSON under `fatPen/` |

The frontend is React 18 + antd 6, with AntV X6 for relationship graphs, Konva / react-konva for the map canvas, ECharts for word clouds, and SheetJS for spreadsheet import/export. The host launches a resident Python subprocess; the frontend calls it uniformly through `sdk.backend.invoke(handler, params)`.

:::note UI language
Labels, buttons and forms inside the plugin are primarily **Chinese** (they follow the host locale). All screenshots in this page — and in the Chinese version — show the Chinese UI.
:::

## Getting started: projects, sidebar, auto-save

![Project list: create, reorder and switch projects](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-projects.png)

On first launch the list is empty. Click **添加项目** (Add project) to create one: name (required, ≤60 chars), description (≤200 chars), and type (**common / private**, private by default). Projects can be reordered by drag, edited and deleted. Selecting one binds the whole workbench to it.

![Primary sidebar: nine world tiles, chapter tree and three collapsed groups](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-sidebar.png)

Once a project is selected, the sidebar shows five collapsible, drag-sortable groups:

| Group | Contents |
| --- | --- |
| **World** | A two-column grid of 9 built-in systems; `+` creates a custom system |
| **Chapters** | Tree of parts and chapters, `+` to add, drag handles to reorder |
| **Toolbox** | Name generator |
| **Style** | Genre, narrative pattern, audience, word count, writing styles, notes |
| **Settings** | AI management, sensitive words, recommended words, inspiration sentences |

:::tip There is no Save button
Everything is written **immediately**: a paragraph saves on blur, dialogs save on confirm, style settings auto-save 600 ms after typing stops, and drag order is persisted on drop.
:::

## Chapters and manuscript: part → chapter → paragraph

![Chapter editor: paragraphs, a locked paragraph, AI-generate-chapter and add-paragraph](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-chapter.png)

Opening a chapter turns the workbench into a focused writing page: **Back / chapter title / AI Generate Chapter / Add Paragraph** at the top, paragraph list below (parts show their sub-chapters instead).

- **Paragraphs**: double-click to edit, blur to save, `Esc` to cancel; drag handles reorder them.
- **Context menu**: edit, lock / unlock, delete. A **locked** paragraph is skipped by AI generation and rewriting — useful for final-approved scenes.
- **AI Generate Chapter**: pick an agent, a paragraph count and a creative brief to draft a whole chapter, then polish it paragraph by paragraph.
- Parts and chapters can be renamed, deleted and reordered from the sidebar tree; sub-chapters are inferred from the part hierarchy.

Each paragraph is its own JSON record (`content`, `locked`, ordering), which keeps long manuscripts browsable and makes them easy to search, count or feed to AI.

## Worldbuilding: nine structured systems

The World group ships nine systems, each with its own page and data files:

| System | What it manages |
| --- | --- |
| **Roles** | Aliases, tags, gender / age / race / faction / profession, description, time marks, portraits, "used" flag |
| **Factions** | Faction profiles, role–faction links, faction-to-faction relations |
| **Storyline** | Main / branch lines, node connections, time / place / plot on each node, layout save & reset |
| **Role relationships** | Base relation types (master–apprentice, lover, rival…) plus a draggable topology with optional edge labels |
| **Events** | Event cards, detail drawer, timeline links, chronological sorting |
| **Timeline** | Time nodes and sorting modes |
| **Items** | Item categories, ownership, tags, "used" flag |
| **Outline** | Part / chapter / scene tree with word-count progress and node labels |
| **Map** | See the next section |

![Role management: character cards and the detail panel](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-role.png)

The **Roles** page shows alias, attributes, tags and usage status right on each card; clicking one opens a detail panel with Basic Info / Detailed Info / Time Marks tabs. The **Storyline** page lays the plot out as an editable graph — each node carries time, place and event, main-line nodes are chained with arrows, and branch nodes are color-coded and merge back into the main line.

![Storyline: main and branch nodes connected by arrows](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-storyline.png)

The **Outline** page is the pre-writing view: a part → chapter → scene tree with target word counts and labels such as Opening / Foreshadowing / Turning Point, all reorderable by drag.

![Outline: tree of parts, chapters and scenes with word-count progress](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-outline.png)

### Custom systems

The `+` at the top-right of the World grid creates a **custom system**: give it a name and icon and you get your own node / relation / relation-type topology (AntV X6) — useful for sect lineages, artifact tiers or territorial domains. Layouts can be saved.

Nine pages also expose **AI Create / AI Generate** dialogs (roles, factions, items, events, timeline, outline, storyline, relationships, chapters) to draft batches of records from the existing setting.

## Map studio: draw the world

![Map canvas: terrain patches, city markers, toolbar and map list](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-map.png)

The Map page is the least "note-like" part of FatPen: a map list on the left and a Konva canvas on the right. Defaults are 960×640, a 24×16 grid and a parchment background; any map can be set as the main map, zoom ranges from 0.3× to 4×, and one click fits the view.

### Terrain generation and the brush

![Generate terrain dialog: presets, seed, nine parameters and live preview](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-map-generate.png)

**Generate Terrain** opens a parameter panel: presets (**continent / archipelago / inland / islands / custom**), random seed, sea level, mountain threshold, forest humidity, desert aridity, river count, lake count, noise frequency and octaves. The preview redraws live; **Apply** writes the terrain to the map. **Import image to generate** accepts PNG / JPG / WEBP / BMP and maps colors to terrain using a match threshold.

![Terrain brush: nine terrain swatches and the map toolbar](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-map-tools.png)

The **Terrain Brush** panel offers nine swatches (plain, mountain, grassland, ocean, river, lake, desert, road, forest); pick one and drag on the canvas to paint. The first empty cell cancels painting. The toolbar also holds zoom in / out / fit, zoom percentage, hide terrain symbols, marker templates, boundaries and regions.

:::warning No separate eraser
Brush strokes only **overwrite**. To clear large areas, regenerate the terrain or use "clear all" in the boundary / region panel.
:::

### Markers, layers, boundaries and role locations

![Layer management: five preset layers with visibility and lock controls](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-map-layers.png)

Every map starts with 5 layers: **Terrain / Markers / Image markers / Trajectories / Boundaries**, each with visibility, lock, opacity and ordering controls, plus custom layers.

- **Markers**: 9 built-in templates (castle, palace, tower, house, camp, harbor, temple, ruins, custom) rendered as text icons or images. Drag a template onto the map and fill in name, color, size, description, background, function and coordinates; right-click to edit / duplicate / delete.
- **Role locations**: pin characters to the map to build movement trajectories on the trajectory layer.
- **Boundaries & regions**: country / province / region / custom types with color, width, line style, opacity, curve tension, closed shape and fill; includes "generate borders from coastline", Voronoi-style region division, and clear-coastline / clear-all actions.

:::note Export limits
The map is saved instantly but **cannot be exported as PNG / SVG**. Real file export belongs to the three phrase libraries below.
:::

## Toolbox and three phrase libraries

![Name generator: gender, surname, length, count and candidate names](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-nametool.png)

The **Name Generator** produces Chinese names by gender (male / female / neutral), surname (blank = random), given-name length (random / 1 / 2) and count (default 8, max 50). Click a candidate to favorite it, type your own, deduplicate, or **Regenerate** for a new batch.

The Settings group holds three symmetric libraries with card / list (or tag-cloud) views:

| Library | Dimension | Purpose |
| --- | --- | --- |
| **Sensitive words** | Severity: low / medium / high | Flag wording to avoid or rewrite before publishing |
| **Recommended words** | Vocabulary / expression / rhetoric / atmosphere / other | Accumulate the book's voice for humans and AI |
| **Inspiration sentences** | Opening / ending / transition / description / dialogue / other | Reusable lines and scenes with rating and usage notes |

![Inspiration sentence library: two-column cards, category tags, import / export](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-sentences.png)

### Import and export

![Export dialog: XLSX / CSV and selectable columns](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-export.png)

All three libraries have **Import / Export** buttons:

- **Export**: choose XLSX or CSV, tick the columns to include (required columns cannot be unchecked); the file is generated in the browser and named `sensitive_words`, `recommended_words` or `inspiration_sentences`.
- **Import**: drop `.csv / .xlsx / .xls`; Chinese and English column names are both accepted (`content / 句子 / 内容`), the preview marks new vs. duplicate rows, and confirmed rows are appended without overwriting existing data.

## Style settings and AI assistance

![Style settings: genre, narrative patterns, audience, word count, writing styles and notes](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-style.png)

**Style** lives in its sidebar group: genre (14 presets such as xianxia, sci-fi, urban, historical), narrative pattern (14 presets such as Hero's Journey, Three Acts, Foreshadowing, Progression), audience, target word count (in tens of thousands), writing style (16 presets) and free-form notes. Every field accepts custom values, and the bottom automatically summarizes genre / pattern / audience / length / style as the book's tone-of-voice brief.

![AI management: default model configuration and agent cards](pathname:///fat-notes-home/img/instruction/fatPen/zh/fp-ai.png)

**AI Management** has two parts:

- **Default models**: separate models for text, image, outline, role and chapter generation.
- **Agents**: name, description, **workpoint** (global / role / faction / item / outline / chapter / map / event / storyline / timeline / relationship), model, knowledge bases, vector stores, MCP tools, skills, system prompt, `temperature`, max iterations, auto-MCP and enable switch. Each AI entry uses the agent bound to its workpoint.

Two more AI capabilities are worth noting:

- **Field-level AI edits**: a small icon next to a field opens "AI modify" with execute, copy instruction, instruction history, refill and restore-original actions; results are cached in `aiCache.json`.
- **MCP tools**: 4 meta-tools (list categories / list tools in category / search tools / call tool) expose roughly 40 categories of backend handlers (projects, chapters, roles, maps, libraries…) so agents can read and write worldbuilding data directly.

## Local data and storage

The backend uses `fatPen/` in the workspace root as its data store:

```text
<workspace>/fatPen/
├── fictions.json                 # project list and ordering
├── settings.json                 # global: last selected project, menu state
└── fictions/<project id>/
    ├── settings.json             # per-project menu order / collapse / view prefs
    ├── chapters.json             # parts and chapters
    ├── paragraphs/<chapter id>.json   # manuscript paragraphs (incl. locked)
    ├── fictionStyle.json         # style settings
    ├── aiCache.json              # field-level AI cache
    ├── sensitiveWords.json / recommendedWords.json / inspirationSentences.json
    ├── names.json                # favorited names
    └── world/
        ├── elements.json         # 9 built-in systems + custom systems
        ├── role/ faction/ item/ timeline/ event/ storyline/ outline/
        ├── map/maps.json         # maps, terrain cells, markers, boundaries, regions, layers
        └── system/<system id>/   # nodes / relations / relation types / positions
```

All files are UTF-8 JSON written via temp-file + atomic replace, so an interrupted run rarely corrupts a project. The frontend calls about 180 backend handlers through `sdk.backend.invoke`; MCP calls go through the host's `/app/pluginBackend/invoke`.

:::warning Before you rely on it
- **Deleting a project cascades to its entire directory**, and there is no whole-project export / backup — copy `fictions/<project id>/` yourself before cleanup.
- No global shortcuts; only component-level keys: `Esc` cancels editing, `Enter` commits input, double-click edits a paragraph, long-press 2 s to reorder groups.
- Maps cannot be exported as images; the terrain brush has no dedicated eraser.
- Scaffold contributions remain (`Block 1` / `Block 2` card types, bottom panel, `[fat-pen] ready` footer) and can be ignored; the repository README is still the uncustomized CLI template, so this page is the functional reference.
:::

## Summary

FatPen turns long-form writing into **manageable data**: projects for scope, parts / chapters / paragraphs for the manuscript, nine systems for the setting, the map for geography, libraries for language, style settings for tone, and AI / MCP for drafting and rewriting. It fits novels, serialized articles, scripts and any long work where characters must stay consistent, timelines must not contradict themselves, and the map has to match the story.

## Related docs

- [Popular plugins overview](./index.md)
- [FatAiBase](./fat-ai-base.md)
- [FatDiagrams](./fat-diagrams.md)
- [Plugin development](../plugin-dev/index.md)
