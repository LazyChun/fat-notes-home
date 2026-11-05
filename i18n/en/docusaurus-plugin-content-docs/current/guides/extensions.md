---
sidebar_position: 8
title: Extension Center
description: "A complete guide to the FatNotes Extension Center: the FatHub marketplace (plugins / functions / workflows / advanced plugins / Skills / MCP Tools / MCP Servers / collections) and your custom extensions, plus searching, installing, creating and how they power functions, flows and the AI — with an overview screenshot, a structure diagram and notes."
---

# Extension Center

> The **Extension Center** is where FatNotes collects, browses and installs its **extensions**. It puts the **FatHub marketplace** (community-shared extensions) and the extensions **you create** in one panel — the "entry point and manager" of the FatNotes plugin ecosystem, where you find, install and manage extensions.

This page documents the **Extensions** module in the activity bar (the Extension Center). For a tour of everything FatNotes can do, start with the [Feature Overview](./features.md); for ready-made popular extensions see [Popular Plugins](../plugins/index.md); to build your own, see [Plugin Development](../plugin-dev/index.md).

---

## 1. Where the Extension Center lives

The activity bar has 7 modules by default, top to bottom. **Extensions is the 4th** (after Database, before Functions):

| # | Activity-bar entry | Opens | Main purpose |
| --- | --- | --- | --- |
| 1 | File Manager | File Manager | Notebooks, page tree and page content |
| 2 | Search | Search sidebar | Search by name / content |
| 3 | Database | Database Manager | Data sources, table structure, data browsing |
| 4 | **Extensions** | **Extension Center** | **This page: plugins, functions, workflows, skills…** |
| 5 | Functions | Functions list + pages | Open the small apps you built |
| 6 | Resources | Resource repo | Images, audio, video and other assets |
| 7 | Run | Run panel | Running / finished / scheduled jobs |

Opening **Extensions** splits the screen into two parts: a **navigation tree** on the left (extensions grouped by type) and a **content area** on the right (search box + list / detail).

![Extension Center overview. Red boxes mark the "Extension Center" panel title on the left nav, the FatHub and custom groups, and the right-hand search box "搜索应用名称、描述或slug".](pathname:///fat-notes-home/img/instruction/extensions/en/extensions-overview.png)

*The left side is the Extension Center nav tree: the expanded "FatHub" marketplace above contains Plugins, Functions, Workflows, Advanced Plugins, Skills, MCP Tools, MCP Servers and Collections; below it are the "My Functions / My Workflows / Custom Plugins / Custom Skills …" custom groups. The search box at the top right reads "搜索应用名称、描述或slug" (search by app name, description or slug).*

### UI parts at a glance

| Part | Description |
| --- | --- |
| Extension Center title | Top-left of the panel, with a cloud-upload icon — the master entry for extensions |
| Navigation tree | Left side, lists every extension type under "FatHub marketplace" and "My / Custom" |
| Expand / collapse | The arrow before a group (e.g. FatHub, Custom Plugins) toggles its children |
| `+` button | The new-button on the right of custom groups; click to create a custom extension of that type |
| Search box | Top-right "搜索应用名称、描述或slug" — filters the current type by name / description / slug |
| Content area | Lists or shows details of extensions under the selected type (the screenshot shows the "Plugins" category with an empty list) |

---

## 2. Structure overview: FatHub marketplace + your custom extensions

The Extension Center splits extensions into two big parts: **what comes from the community** and **what you build yourself**.

![Extension Center structure diagram: the central "Extension Center" node splits into the FatHub Marketplace (Plugins / Functions / Workflows / Advanced Plugins / Skills / MCP Tools / MCP Servers / Collections) and My / Custom Extensions (My Functions / My Workflows / Custom Plugins / Custom Skills / Custom MCP Tool / Custom MCP Server / Custom Advanced Plugins / Custom Collections).](pathname:///fat-notes-home/img/instruction/extensions/en/extensions-structure.svg)

- **FatHub Marketplace**: a community-shared extension repository. It has 8 categories by type — Plugins, Functions, Workflows, Advanced Plugins, Skills, MCP Tools, MCP Servers and Collections. You browse, search and install extensions that others have built.
- **My / Custom Extensions**: the extensions you create and own. This includes "My Functions / My Workflows" (functions and workflows you published) and the creatable groups "Custom Plugins / Custom Skills / Custom MCP Tool / Custom MCP Server / Custom Advanced Plugins / Custom Collections", each with a `+` on the right to create a new one.

:::tip How the two relate
FatHub extensions are "built by others, installed by you"; custom extensions are "built by you". Both are eventually consumed by FatNotes' functions, flows and AI — only the source differs. Once a FatHub extension is installed locally, it also appears under your corresponding "My / Custom" list.
:::

---

## 3. The FatHub marketplace

FatHub is the FatNotes extension store, split into 8 categories by extension type. Click **FatHub** in the nav tree to expand it:

| Category | What's inside | Typical use |
| --- | --- | --- |
| **Plugins** | General plugins (UI / capability packs) | Enhance a class of features or the UI after install |
| **Functions** | Packaged "function" apps | One-click install a small app that opens from the "Functions" entry |
| **Workflows** | Ready-made automation templates | Installed and callable by [Flow Automation](./flow-automation.md) |
| **Advanced Plugins** | More powerful, possibly configurable plugins | Complex data processing, external system integration, etc. |
| **Skills** | "Skills" for the AI | Give the AI chat a specialized ability (e.g. write reports, look things up) |
| **MCP Tools** | Tools conforming to the MCP protocol | Expose external tools to the AI as callable functions |
| **MCP Servers** | Servers conforming to the MCP protocol | A server providing a set of MCP tools / resources |
| **Collections** | Bundles of multiple extensions | Install a related group of extensions at once |

:::info What you select on the left is what shows on the right
Click a category in the nav tree (e.g. "Plugins") and the right content area lists the extensions under that category. In the screenshot example "Plugins" is selected but the list is empty — meaning this environment has not yet installed or published any plugin; once installed, the entries appear here.
:::

---

## 4. My / Custom extensions

This area holds the extensions **you create** — the "workshop" of the Extension Center:

| Group | Description | How to create |
| --- | --- | --- |
| **My Functions** | Functions you published / own | Collected here after publishing in the Functions module |
| **My Workflows** | Workflows you created | Collected here after saving in Flow Automation |
| **Custom Plugins** | Plugins you wrote | Click `+` on the group |
| **Custom Skills** | AI skills you defined | Click `+` on the group |
| **Custom MCP Tool** | MCP tools you connected | Click `+` on the group |
| **Custom MCP Server** | MCP servers you connected | Click `+` on the group |
| **Custom Advanced Plugins** | Advanced plugins you wrote | Create inside the group |
| **Custom Collections** | Extension bundles you assembled | Click `+` on the group |

The groups with a `+` (Custom Plugins, Custom Skills, Custom MCP Tool, Custom MCP Server, Custom Collections) are the most-used "create" entries: click `+`, fill in the form (name, type, config, etc.), and a new custom extension is created.

![Extension Center nav tree detail: the Custom Plugins and Custom Skills groups each contain an example entry (adf / adsf), with a + new-button on the right.](pathname:///fat-notes-home/img/instruction/extensions/en/extensions-overview.png)

*In the screenshot example, "Custom Plugins" already has an entry named `adf`, and "Custom Skills" has one named `adsf` — these are your own extensions hanging under the "custom" groups.*

---

## 5. Search and install

The search box at the top of the content area is the Extension Center's "search engine":

- **Placeholder**: `搜索应用名称、描述或slug` (search by app name, description or slug)
- **Match scope**: the extension's **name**, **description**, and **slug** (its unique short identifier in the system)
- **Scope of effect**: it only filters extensions **under the currently selected type**. For example, with "Plugins" selected it searches within plugins; switching to "MCP Tools" searches within MCP Tools.

The typical install flow: find the extension under the right FatHub category → open its detail → click install (or "Get") → once installed it appears under your corresponding "My / Custom" list and can be invoked by functions, flows or the AI.

:::warning Check the type before installing
Different types land and are used differently: functions appear in the "Functions" entry, workflows in Flow Automation, Skills / MCP in the AI configuration. Installing the wrong type may leave you unable to find the entry, so confirm its category first.
:::

---

## 6. How extensions are used

Extensions are not "done once installed" — they must eventually be consumed by a concrete FatNotes capability:

- **Functions / Workflows**: after install or creation, open and use directly from the "Functions" / "Run" entries — visible, clickable small apps / automations.
- **Skills**: once connected to the AI chat, give the AI a specialized ability, appearing among the AI's available skills.
- **MCP Tools / MCP Servers**: expose external tools / services to the AI as callable functions or resources.
- **Plugins / Advanced Plugins**: enhance FatNotes' UI or data-processing; usually auto-loaded on startup.
- **Collections**: bring in a related group of extensions at once, all taking effect together.

![Extension consumption chain: install/create in the Extension Center → land in functions / flows / AI → used directly by the user.](pathname:///fat-notes-home/img/instruction/extensions/en/extensions-structure.svg)

---

## 7. Relationship with "Popular Plugins" and "Plugin Development"

The Extension Center is the **management entry** for extensions, and the docs site has two closely related categories — each owns a slice:

- **[Popular Plugins](../plugins/index.md)**: showcases ready-made, worth-trying extensions from the community — essentially FatHub's "editor's picks"; a good place to start browsing.
- **[Plugin Development](../plugin-dev/index.md)**: teaches you to build a plugin / function / workflow from scratch and publish it — the result comes back to the Extension Center as a "custom extension" you create and manage.
- **Extension Center (this page)**: the "hub" connecting the two above, responsible for pulling in others' extensions and managing your own.

In one line: **Popular Plugins** tells you what to install, **Plugin Development** teaches you to build, and the **Extension Center** installs and manages both.

---

## 8. Notes

- **Don't mix up the two sources**: FatHub is community-shared and you install it; custom is what you create. Both entries are in the left nav tree, separated by group.
- **Search is limited to the current type**: the search box only filters the selected extension type; switch category then search again.
- **Watch where a type lands**: functions → Functions module, workflows → Flow Automation, Skills / MCP → AI config; confirm the type before installing so you can find the entry.
- **Use `+` to create custom groups**: the `+` on the right of Custom Plugins / Skills / MCP Tool / MCP Server / Collections is the create entry.
- **Extensions must be consumed**: after installing, remember to enable / invoke it in the corresponding function, flow or AI config, otherwise it just sits in the list.
- **slug is the identity**: search supports lookup by slug, the unique short identifier of an extension in the system, used to tell duplicates apart.

---

## Related documents

- [Feature Overview](./features.md) — a tour of everything FatNotes can do.
- [Functions](./functions.md) — open the small apps you built (maps to "Functions / My Functions" here).
- [Flow Automation](./flow-automation.md) — running and orchestrating workflows (maps to "Workflows / My Workflows" here).
- [Popular Plugins](../plugins/index.md) — a curated list of ready-made community extensions.
- [Plugin Development](../plugin-dev/index.md) — build and publish your own plugin / function / workflow from scratch.
