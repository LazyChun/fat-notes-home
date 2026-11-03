---
sidebar_position: 1
title: Knowledge Workspace
description: Organize notes, documents, and project resources in FatNotes.
---

# Knowledge Workspace

FatNotes uses an IDE-inspired layout for serious knowledge work. The folder tree, editor area, and tool panels share one screen: browse resources, edit content, and run tools side by side, switching to dashboards or automation views whenever needed.

## Layout at a glance

| Area | Purpose |
| --- | --- |
| Activity bar (far left) | Switch between explorer, search, plugins, and other entry points |
| Primary sidebar | Browse the files and resources in your workspace |
| Editor area | Open notes, dashboards, and flows in multiple tabs |
| Secondary sidebar | Persistent AI chat, available at any time |
| Bottom panel | Terminal, output, and diagnostics |
| Command palette (`Ctrl + K`) | One entry to search files, features, and commands |

## A practical structure

1. **Create one workspace per project** so unrelated content never mixes.
2. **Use folders for stable categories and tags for cross-cutting topics**—two or three levels of depth are usually enough.
3. **Keep an index note** with project goals, important links, and current progress; make it the first page you open.
4. **Separate raw material from refined knowledge**, for example a `sources/` folder for original documents and a `notes/` folder for your own conclusions, so origins stay traceable.

## Supported content

The workspace hosts many content types on the same page:

- **Documents**: Markdown, rich text, code (Monaco), spreadsheet-like sheets (Univer), Word, PPT, PDF.
- **Charts**: ECharts-based blocks such as line, pie, heatmap, and candlestick charts.
- **Tools**: terminals, flow diagrams, mind maps, and dashboard widgets.

Availability depends on the current release and installed plugins; some capabilities (OCR, browser automation) are provided through plugins.

## Next steps

Once your knowledge is structured, use [data dashboards](./data-dashboard.md) to monitor key metrics or [workflow automation](./flow-automation.md) to hand repetitive work to the engine.
