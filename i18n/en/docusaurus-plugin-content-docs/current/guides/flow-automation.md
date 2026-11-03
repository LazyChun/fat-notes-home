---
sidebar_position: 3
title: Workflow Automation
description: Connect data processing, branching logic, and external services visually.
---

# Workflow Automation

The flow editor breaks a task into connected **nodes**. Drag nodes onto a canvas and wire them together to build an automatically executed workflow—no code required, and the logic stays visible at a glance. A typical flow combines a trigger, processing steps, conditional branches, and output actions.

## Built-in node types

| Category | Representative nodes |
| --- | --- |
| Logic control | Condition, loop, iteration, wait, variable |
| Data | Data source query / write, expression, code execution |
| AI | LLM call, knowledge retrieval, Agent |
| External interaction | HTTP request, screen automation (mouse / keyboard / image / color matching), browser automation (Playwright) |
| Media | Audio/video conversion, TTS, ASR, OCR |

## Common scenarios

- **Scheduled database reports**: run a statistics query every morning and write the result to a note or push a notification.
- **Spreadsheet cleaning and aggregation**: transform, deduplicate, and summarize messy table data by rule.
- **Call HTTP services and store responses**: poll an API and save what it returns.
- **Automate repetitive desktop work**: fill forms or export files via OCR, mouse/keyboard simulation, or browser nodes.
- **AI hand-off**: pass knowledge retrieval results to an LLM node that writes a summary or weekly report.

## A concrete example

This minimal flow shows the basic pattern—convert a Unix timestamp to readable time in one step:

```text
Input block (Unix timestamp) → Time conversion node → Result text block + notification
```

Enter `1790000000`, click run, and the result block immediately shows `2026-09-21 22:13:20`. The same pattern applies to log cleaning, encoding conversion, scheduled fetching, and more.

Flows also connect to dashboards: the ETL DAG itself is a canvas block, so it can share a page with inputs and charts to form an interactive "input → process → visualize" mini-app.

## Build reliable workflows

1. **Give each workflow one clear responsibility**; split complex jobs into composable flows.
2. **Add timeouts and failure paths for external calls**—network requests do not always succeed.
3. **Record inputs and verify results before changing data**, leaving yourself a traceable path.
4. **Test with sample data before connecting production systems.**

:::warning Automation risk
Screen automation and data writes can cause irreversible changes. Confirm the target window, permissions, and backups before running a workflow.
:::
