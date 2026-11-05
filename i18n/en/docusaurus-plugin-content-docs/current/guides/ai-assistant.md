---
sidebar_position: 2
title: AI Assistant
description: A detailed guide to FatNotes' built-in AI Assistant (Chat) — entry points, conversation UI, core capabilities, and usage tips, with a conversation screenshot and worked examples.
---

# AI Assistant

FatNotes makes AI chat a resident capability of the workspace. In natural language you can ask it to create chart cards, generate SQL queries, answer questions based on your own notes, and re-layout pages in bulk. It is not a standalone chat box — it is an agent that can actually act on the content and data in your current workspace.

## Where to find it

- **Secondary sidebar (Chat)**: the right side of the interface reserves a resident area for AI conversation — summon or collapse it anytime.
- **Command palette**: press `Ctrl + K`, search for and select "Open Chat" to enter the conversation.

> Tip: above the gear icon at the bottom-left there is also a separate **AI icon** that opens "AI Settings" (models, memory, MCP, TTS, ASR, Agent policies) — a different page from the chat window. AI capabilities themselves are managed centrally in AI Settings:

![AI Settings: models / OCR / knowledge base / memory / MCP / TTS / ASR / Agent policies](pathname:///fat-notes-home/img/features/ai-settings.png)

## The conversation UI

![AI Assistant chat window: model selector, thinking steps, and a chart-card creation example](pathname:///fat-notes-home/img/features/ai-assistant-chat.png)

From top to bottom the window contains:

| Area | Description |
| --- | --- |
| Title bar | Shows "CHAT" and the assistant badge, with view (eye), pin, split, panel, and fullscreen window controls |
| Message area | Alternating user bubbles (right) and AI cards (left, robot avatar); AI replies can collapse a "thinking process (N steps)" section |
| Input area | Bottom input box; switch the **model** (e.g. `deepseek-v4-pro`), press Enter to send; multi-turn conversation supported |

Below each AI reply there are usually **Copy** and **Regenerate** buttons for reusing content or refining the result.

## Core capabilities

### 1. Create components and dashboard cards in natural language

Tell the AI what block you want and it creates the component on the canvas to spec. For example:

> User: "Create me a line chart card for traffic monitoring"

The AI creates a `fat-charts.trend` (time-series) card and explains the card type, position (top-left of the canvas, size 8×32), shape (line), and data-binding status. It can also continue to fill in the query configuration afterward.

Common block types it can create include: line / bar / area trend charts, number cards, gauges, rankings, pie charts, tables, text, Markdown, and more — see [System Components](./system-components/overview.md) for the full list.

### 2. Generate and write queries (SQL)

When binding a data dashboard you don't have to hand-write SQL — give the AI the table structure or a description of the requirement and it drafts the query, then helps you bind it to a chart component. See the "write or generate a query" step in [Data Dashboards](./data-dashboard.md).

### 3. Answer based on your knowledge base

With the built-in **knowledge base (RAG)**, the AI answers from your own notes and documents rather than generic responses. Use it to summarize weekly reports, explain a passage of material, or retrieve key points across documents.

### 4. Iterative editing and layout

The AI supports multi-turn dialogue: after creation you can add "move it to the right", "switch to a bar chart", or "bind the table with data source ID X" and it updates the card configuration in place — no need to open the config drawer manually.

### 5. Skills and tool extension (MCP)

Through AI Settings you can connect **Skills** and **MCP Tools / Servers**, giving the conversation specialized abilities (writing reports, looking up material, calling external tools). See [Extension Center](./extensions.md).

## Usage tips

- **Be specific for better results**: state the card type, data dimensions, position and size so the AI gets close on the first try.
- **Give data-source clues**: to connect real data, tell the AI the data source ID or the corresponding table / metric and it fills in the query config.
- **Polish with multi-turn dialogue**: let the AI scaffold first, then refine step by step — more effective than one long requirement.
- **Let the AI read your material**: prepare notes in the knowledge base, then ask the AI to summarize or write reports from them; conclusions and their basis stay on the same page.

## Security and privacy

:::caution Don't submit sensitive credentials in the chat
Do not paste database passwords, API keys, or personal private data into the conversation input. For production data, prefer read-only accounts; related configuration is in [System Settings](./system-settings/overview.md) and [Database](./database.md).
:::

## Next steps

- To connect real data to AI-generated charts → [Data Dashboards](./data-dashboard.md)
- To hand repetitive data processing to the engine → [Flow Automation](./flow-automation.md)
- To centrally manage models, memory, and MCP → the "AI capabilities" section of [Feature Overview](./features.md)
