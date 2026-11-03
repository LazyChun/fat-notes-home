---
sidebar_position: 0
title: Advanced Plugins
description: "FatNotes advanced plugin development guide: scaffolding, project structure, the activate entry point, SDK capabilities, debugging, and packaging."
---

# Advanced Plugins

FatNotes plugins are loaded at runtime via **Module Federation**, and a single command gets you started. A plugin can extend almost everything in the host: activity bar icons, sidebar views, full-page routes, custom block types, flow nodes, global search providers, commands, AI settings pages...

## Quick Start

```bash
npx fat-notes-extension-cli create my-plugin
```

The scaffold generates this project structure:

```
my-plugin/
├── plugin.json              # Plugin manifest (read by the installer)
├── funcs.json               # Capability catalog declaration
├── package.json
├── webpack.config.js        # Module Federation build
├── src/
│   ├── bootstrap.ts         # MF async entry
│   ├── index.tsx            # Exports activate(sdk) / deactivate()
│   └── PluginView.tsx       # Sample contribution component
└── types/
    └── fat-notes-sdk.d.ts   # SDK type definitions
```

## Plugin Entry Point

Every plugin exports a pair of lifecycle functions:

```tsx
export async function activate(sdk: FatNotesPluginSDK): Promise<void> {
  // Register an activity bar icon + primary sidebar view
  sdk.contributions.registerActivityBarItem({ /* icon, id ... */ });
  sdk.contributions.registerPrimarySidebar({ /* view definition ... */ });

  // Or register a custom block type / flow node
  sdk.contributions.registerBlockType({ /* defaultOptions, dataConfig ... */ });
}

export function deactivate(): void {
  // Clean up registrations
}
```

## What Plugins Can Contribute

- **UI contributions**: activity bar icons, primary sidebar views, panel tabs, status bar items, full-page routes, workspace pages, settings pages
- **Block system**: custom block types, block display configs, "add block" menu categories
- **Flow engine**: custom flow node types (canvas rendering + drawer editing)
- **Others**: global search providers, AI settings pages, context menus, commands

## SDK Capabilities

| Namespace | Purpose |
| --- | --- |
| `sdk.host` | Host version and run mode |
| `sdk.dataSource` | Enumerate and read data sources |
| `sdk.query` / `sdk.mutation` | Run saved queries / mutations, raw SQL, insert rows |
| `sdk.ui` | toast, modal, theme, i18n |
| `sdk.commands` | Register and execute commands |
| `sdk.store` | Read-only access to host Redux state |
| `sdk.config` | Read/write plugin runtime config |
| `sdk.contributions` | Register all UI contribution points |
| `sdk.events` | Plugin / host event bus |
| `sdk.flow` | List, read, and execute host workflows |
| `sdk.ai` | Call host AI models and chat completions |
| `sdk.asset` | Asset repository: list / upload / rename / move files |
| `sdk.boards` | Plugin-private board configs |
| `sdk.remoteComponents` | Reuse host components (block container, flow editor, time / Cron pickers) |

## Development & Publishing

```bash
fn-ext dev     # watch-mode development
fn-ext build   # build
fn-ext pack    # outputs release/<code>_v<version>.zip
```

Install the resulting zip in-app via **Settings → Advanced Plugins**. For debugging, you can also register the plugin's `dist` directory into the host in devMode — changes take effect immediately.

:::tip Next step
Browse the [plugin overview](../plugins/index.md) to see what others have built, then scaffold your own.
:::

> For full SDK docs and templates, see the scaffold repo: `fat-notes-extension-cli`.
