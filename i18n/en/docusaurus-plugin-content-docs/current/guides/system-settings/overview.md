---
sidebar_position: 1
title: System Settings Overview
sidebar_label: Overview
description: "An overview of FatNotes system settings: how to open them, the 13 settings pages, when changes take effect, common operations and a recommended setup order."
---

# System Settings Overview

> Settings are FatNotes' **global configuration center**. You are not editing one page or one book, but the behavior and appearance of the whole app. Knowing which changes apply instantly, which need a restart, and which only affect newly created cards avoids most "I changed it but nothing happened" confusion.

There are **3 groups with 13 settings pages**: Basic Settings controls runtime parameters and appearance, System Data holds global dictionaries, and Component Settings manages form validation, icons and the component add bar. This chapter explains the entry point, layout and effect rules; the following chapters cover each topic in depth.

:::note About the screenshots
All screenshots in this chapter were taken from the Chinese UI. Field names are translated in the surrounding text and tables.
:::

## 1. Opening settings

Click the **gear icon at the bottom-left** of the window (bottom of the activity bar) to open the settings page; you can also pick "Settings" from the management menu at the top right. The left activity bar stays in place and the main area becomes a two-column layout: settings tree on the left, configuration panel on the right.

![Click the bottom-left gear to open settings; the red box marks the entry point](pathname:///fat-notes-home/img/instruction/settings/settings-entry.png)

*Red box: the settings gear. The whole workbench switches to settings; you can return to notes, databases or plugins at any time using the other activity bar icons.*

![Settings layout: catalog tree on the left and configuration panel on the right](pathname:///fat-notes-home/img/instruction/settings/settings-catalog.png)

*Left red box: the settings catalog (3 groups with child items). Right red box: the configuration panel (here showing System Data → Variables). Clicking a catalog item switches the panel immediately.*

:::tip Two easily confused entries
The icon just above the gear opens **AI Settings** (models, memory, MCP, TTS, ASR, Agent strategies), a separate page. Installed plugins may also register their own settings pages, which appear under an "Advanced Plugins" group.
:::

## 2. Catalog at a glance

| Group | Page | Purpose | Takes effect | Chapter |
| --- | --- | --- | --- | --- |
| Basic Settings | [Server Ports](./basic.md#server-ports) | Backend and UI service ports | **After app restart** | Basic Settings |
| Basic Settings | [Language](./basic.md#language) | Simplified Chinese / English UI and system texts | Immediately | Basic Settings |
| Basic Settings | [Colors](./basic.md#colors) | 7 recommended palettes for frames and tooltips | Immediately after saving | Basic Settings |
| Basic Settings | [Component Style](./basic.md#component-style) | Default frame and tooltip styles for new cards | Only for **newly created** cards | Basic Settings |
| Basic Settings | [Big Screen](./basic.md#big-screen) | Full-screen preview, carousel and carousel list | Icons appear at top right once enabled | Basic Settings |
| Basic Settings | [File Export](./basic.md#file-export) | PDF / PNG export switches | Icon appears at top right once enabled | Basic Settings |
| System Data | [Variables](./system-data.md#variables) | Global key/value constants | Immediately | System Data |
| System Data | [Tags](./system-data.md#tags) | Global tag dictionary (name + color) | Immediately | System Data |
| System Data | [Members](./system-data.md#members) | Member directory with tags | Immediately | System Data |
| System Data | [I18n Texts](./system-data.md#i18n-texts) | Bilingual texts with prefixes and tags | Immediately | System Data |
| Component Settings | [Validate Rules](./components.md#validate-rules) | Reusable form validation functions | Available to form blocks after saving | Component Settings |
| Component Settings | [Icons](./components.md#icons) | Built-in and custom icon library | Available to icon pickers after saving | Component Settings |
| Component Settings | [Add Bar](./components.md#add-bar) | Multiple add-bar layouts with ordering and hiding | After applying one layout | Component Settings |

Group headings only organize the tree: clicking one expands or collapses it. The 13 child items are the actual configurable pages.

## 3. Three kinds of effect (most important)

| Type | Pages | Behavior |
| --- | --- | --- |
| **Immediate** | Language, Colors, Big Screen, File Export, System Data, Component Settings | The UI, palettes and dictionaries update right after saving or toggling; open pages usually read the new values at once |
| **After restart** | Server Ports | Ports are process startup parameters; saving only writes the config. The page hints "Port changed to XXXX, restart the app to apply" |
| **New cards only** | Component Style | It stores the *default for new cards*. Existing cards are never updated retroactively; blocks with transparent backgrounds or special padding keep their own settings |

Two more rules:

- **Global scope**: settings belong to the app, not to a book, page or data source. Whichever page you open settings from, you edit the same configuration.
- **Tooltip exception**: the tooltip defaults in Component Style only apply to chart cards with tooltips (line, pie, radar, heatmap, K-line charts), not to plain container blocks.

## 4. Common operations

1. **Switch pages**: click a catalog item; the right panel is replaced immediately and unsaved edits are not kept.
2. **Form pages** (Server Ports, Component Style, Colors): edit controls → click "Save" at the bottom. The button is disabled (gray) until something changes; "Restore Defaults" next to it resets the page or group to factory values.
3. **Switch/option pages** (Language, Big Screen, File Export): clicking the option or switch applies it, usually with no Save button.
4. **Table pages** (System Data, Validate Rules, Icons, Add Bar, carousel list): the "Add …" button at the top right opens a modal or drawer → fill the fields → "OK". Each row has Edit / Delete / Apply actions in its Action column, and deletion asks for confirmation.
5. **Filtering and paging**: I18n Texts can be filtered by prefix / text / tag; Icons can be filtered by type and paged (10 rows per page by default).

:::caution Check references before deleting
Variables, tags, members and validation rules are global data that pages, blocks and plugins can reference. Deleting one may break queries, forms or cards that depend on it. Check usage before confirming.
:::

## 5. Recommended setup order

1. **Language** — decide the UI language first; every description follows it.
2. **Server Ports** — only change if external scripts or plugins need fixed ports, then restart. "Auto-assign port" is fine for everyday use.
3. **Component Style** — define frame and tooltip defaults *before* building many cards, so every new card inherits them automatically.
4. **Colors** — trim the recommended palettes to your team's visual guidelines; every color picker will then use them.
5. **System Data / Component Settings** — add variables, tags, members and i18n texts as needed; configure validation rules, icons and add-bar layouts.
6. **Big Screen / File Export** — enable only when presenting, rotating dashboards or exporting, to keep the top-right area uncluttered.

## 6. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| The address did not change after editing a port | Ports need an app restart. If the target port is occupied, the app automatically uses an available one and explains it; the configured value stays unchanged |
| Old cards did not change after editing Component Style | The setting only affects cards created afterwards; adjust existing cards in their own configuration |
| The "Save" button cannot be clicked | Disabled until the form is modified; change any control to enable it |
| No big-screen / export icon at the top right | The corresponding switch is off; enable it on the Big Screen or File Export page |
| Unknown items in the settings catalog | Plugins can register settings pages, usually under "Advanced Plugins" |
| Some texts stay Chinese after switching to English | Language covers the UI and built-in system texts; your own notes and custom i18n entries need both language versions maintained by you |

## 7. Related docs

- [Basic Settings](./basic.md) — ports, language, colors, component style, big screen, file export.
- [System Data](./system-data.md) — variables, tags, members, i18n texts.
- [Component Settings](./components.md) — validate rules, icons, add bar.
- [System Components Overview](../system-components/overview.md) — the components affected by these settings.
- [Common Configuration](../system-components/common-config.md) — per-block title, frame and tooltip options.
