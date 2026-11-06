---
title: FatGames
sidebar_label: FatGames
description: "FatGames (fat-games) explained: the three-part workbench for 31 entries, the shared game stage, search and sound, automatic score recording and the leaderboard, and the dashboard Game card."
---

# FatGames

> Once FatGames is installed, a **headset icon** appears in the activity bar. Click it and you get a two-column workbench: a game menu on the left, a game stage on the right, and a counter reading "31 games total" at the top of the menu. 2048, Minesweeper, Tetris, a racing game... every title plays differently, but **the way you use them is identical**: search → open → play a round using the on-screen hint → the score is recorded automatically → review it in the Leaderboard. This page focuses on **how to use the plugin** and **the mechanisms shared by every game**; only a few games are used as examples.

## 1. What it is: a UI-oriented game plugin

FatGames (`fat-games`, listed as `Fat Games`) in the [plugin overview](./index.md) is unlike [FatCharts](./fat-charts.md) or [FatAiBase](./fat-ai-base.md): it adds no flow nodes and does not turn query results into charts. It **contributes an entire piece of UI** — an activity bar entry, a primary sidebar game menu, a full workbench page, and a route page per game.

| Aspect | Details |
| --- | --- |
| Entries | **31** in this version: 30 playable games + 1 Leaderboard. Trust the "N games total" counter in the menu |
| UI contributions | Headset activity bar icon, primary sidebar menu, workbench page, `/games/<gameId>` route pages, settings page, global search items |
| Where it runs | All games are **pure frontend**: boards, physics, animation and sound are computed locally in the browser, with no uploads |
| Plugin backend | Only stores scores (`fatGames/history.db`); it opens no business port and takes no part in gameplay |
| Extra contributions | One dashboard block type ("Game"), two commands, a display config panel; `panel` / `footer` are `false` in `plugin.json` |

![Where FatGames fits in FatNotes](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-arch.png)

*Top to bottom: three-part layout → four-section shared stage → routes / search / scores / theme mechanisms → dashboard block, commands and settings page.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-arch.png" target="_blank" rel="noopener">View full size</a>

:::note Interface language
Game titles, buttons, stat labels and hints ship in **Chinese and English** and follow the application language (e.g. 贪吃蛇 / Snake, 重新开始 / Restart). Host shell labels do the same. The one exception is the `Ctrl + K` global search result for a game, whose title comes from the Chinese fallback text in the registry — it stays Chinese even in the English UI.
:::

## 2. Getting started in three steps

### 2.1 Install, entry point and layout

After installing and enabling `fat-games` in the [Extension Center](../guides/extensions.md), a headset icon appears in the activity bar. Clicking it splits the window into three areas (red boxes below): the thin **activity bar** on the far left, the **game menu** in the middle (search box + game cards + sound switch at the bottom), and the **game stage** on the right. While the plugin is active, the secondary sidebar and bottom panel are hidden to give the game more room.

![The three-part FatGames layout](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-layout.png)

*Red boxes from left to right: headset icon, game menu (search box + 31 cards), and the 2048 stage on the right. The small line under the stage is the shared controls hint.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-layout.png" target="_blank" rel="noopener">View full size</a>

### 2.2 Four ways to find a game

There is no need to page through 31 entries. The search box at the top of the menu matches **title, description, category and game id**, in Chinese, English, full pinyin and pinyin initials:

| Method | Action | Best for |
| --- | --- | --- |
| Sidebar search | Type `Snake` and the list collapses to that card | You remember the name or roughly what it does |
| Pinyin initials | Type `tcs` and it still matches 贪吃蛇 (tan chi she) | A Chinese IME is inconvenient |
| Global search | `Ctrl + K`, then type a game name, category or id | Your hands are on the keyboard |
| Command / route | Command `fat-games.openGame` with a game id, or go straight to `/games/<gameId>` | Jumping in from a flow, another extension or a script |

![Searching for Snake in the sidebar](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-search.png)

*Red boxes: the search input and the matching card, showing its icon, description and category tag ("Casual").* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-search.png" target="_blank" rel="noopener">View full size</a>

![Typing the id "snake"](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-search-pinyin.png)

*A game id is enough to narrow the list to a single result; the Chinese full pinyin (`tanchishe`) and initials (`tcs`) work the same way.*

Every game is also registered as a **host global-search item**: press `Ctrl + K`, type "Snake", and a result tagged "游戏" ("Game") appears; press `Enter` to open it. Results from other plugins (for example FatTools) show up alongside it as usual.

![Global search jumping to a game](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-global-search.png)

*The result carries a tag on the right; use `↑/↓` to select, `Enter` to open, `Esc` to close.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-global-search.png" target="_blank" rel="noopener">View full size</a>

### 2.3 Opening and remembering

Click any card → the plugin calls `sdk.router.navigate` to `/games/<gameId>`, and the workbench page renders that game. Switching games never reloads the app. The chosen game is stored in `localStorage`, so **the next time you open the game box (even after restarting the app) you return to the game you last played**. On first use, or when that memory is invalid, the first registered game (2048) is the fallback.

:::tip Stuck on "Opening game…"?
That placeholder means the route is not yet under `/games/*`. Click the headset icon again, or simply pick a card in the menu — no need to restart the plugin.
:::

## 3. Shared features: the conventions behind every game

![One complete round · shared features at a glance](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-common.png)

*The six steps "find → open → play → record → review → reuse" are essentially the same for all 30 games; every row includes a reproducible example.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-common.png" target="_blank" rel="noopener">View full size</a>

### 3.1 One shared stage: the four sections of GameFrame

Every game is wrapped in the same "arcade" shell (`GameFrame`): a gradient stage with rounded corners and an inner shadow, plus a header, a row of stat chips, the play area and a controls hint. A full 2048 round shows the whole flow: press arrow keys to merge tiles → score and best update live → when no moves remain the round ends → click "Restart" to start over.

![The shared 2048 stage](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-game-2048.png)

*Red boxes: the three stat chips (Score / Best / Best Tile), the Restart button, and the controls hint at the bottom.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-game-2048.png" target="_blank" rel="noopener">View full size</a>

| Section | Shared convention | In practice |
| --- | --- | --- |
| Header | Emoji + game title, with that game's actions on the right | "Restart", "Start", "Pause"; buttons play a click sound |
| Stat chips | Label + value, with color coding (gold / blue / purple / green / red) | Score, best, level, mines left, elapsed time, lives… values bump when they change |
| Play area | Keyboard / mouse / touch, depending on the game | 2048 uses arrows or `W/A/S/D`; Minesweeper left-click reveals and right-click flags; Racing uses arrow keys |
| Hint line | One line explaining the controls and the goal | "Controls: Arrow keys or W/A/S/D to move tiles; same numbers merge; target 2048." |

Two games with very different mechanics still share the shell: Minesweeper is a grid with two stat chips, Tetris is a tall board with a "Next" preview and a Start button — yet the header, chips, button style and hint line all come from the same components.

![Minesweeper, a puzzle game](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-game-puzzle.png)

![Tetris, a casual game](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-game-casual.png)

*Top: Minesweeper (Puzzle). Bottom: Tetris (Casual). Different mechanics, identical stage structure, buttons and visual language.*

### 3.2 Animation, sound, theme and language

- **Animation**: a shared set of keyframes — stage entrance, tile spawn, merge flash, value bump, hint pulse — all in CSS, with no image assets.
- **Sound**: synthesized at runtime with the Web Audio API (sine / square / noise) for dozens of events such as clicks, movement, scoring, hits, explosions, wins and losses. **No audio files are shipped.** Each effect has a minimum interval so rapid actions cannot stack into a burst of noise.
- **One switch for everything**: the "Game sound" switch at the bottom of the menu applies to all games and persists in `localStorage`. Browsers require a first user gesture before audio is allowed, so silence right after opening the page is expected.

![The global sound switch at the bottom of the menu](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-sound.png)

*The red box contains the switch and its description. Turning it off silences every game — no per-game setup needed.*

- **Theme**: `ThemeShell` follows the host light/dark theme and applies the matching algorithm to the plugin's antd components; stage background, borders and text colors switch with it, with no separate setting.
- **Language**: as noted above, in-game labels ship in Chinese and English. Score records use the Chinese fallback title from the registry, so the Leaderboard may still show Chinese names in the English UI.

### 3.3 Automatic score recording

Scores are not a per-game feature but a plugin-wide mechanism: **all 30 playable games call** `recordScore()`. One record is written when a round ends, a stage is cleared or a goal is reached — no save button, and quitting halfway through writes nothing.

| Mechanism | Behavior |
| --- | --- |
| Fields | Game id / title, player name (defaults to "匿名" / anonymous), score, detail (level, duration, hits…) and timestamp |
| Storage | `fatGames/history.db` under the workspace, maintained by the plugin's Python backend using the stdlib `sqlite3` |
| Backend handlers | `scores.add` / `scores.list` / `scores.clear` / `scores.stats` / `scores.dbPath` |
| Retention | Only the latest **500** records per game are kept; long fields and details are truncated |
| Fallback | If the backend is unavailable, scores go to browser `localStorage` (up to **200** records) and gameplay is unaffected |
| Local bests | Per-game "Best" / "Best Tile" values live separately in `localStorage`, independent of the score database |

:::caution Scores stay on this machine
The database lives in the workspace and never syncs across devices. Switching computers, cleaning the workspace or uninstalling the plugin leaves the history behind. If the backend ever fell back to browser storage, clearing browser data removes those scores too.
:::

### 3.4 Leaderboard: one score view for the whole plugin

The last card in the menu, "Leaderboard", is a **records view, not a playable game**: two stat chips at the top show total records and the number of games with scores, followed by per-game counts. The top-right controls filter by game, refresh and clear; the table lists records newest first.

![Leaderboard: score stats and records](pathname:///fat-notes-home/img/instruction/fatGames/en/fg-scores.png)

*Red box: the "total records / games" stat chips. Top right: game filter, refresh and clear. Columns: game, player, score, detail and time.* · <a href="/fat-notes-home/img/instruction/fatGames/en/fg-scores.png" target="_blank" rel="noopener">View full size</a>

| Action | Details |
| --- | --- |
| Filter by game | The dropdown lists only games that have records; "All games" shows everything |
| Sort | Newest first by default; click the Score header to sort by score |
| Paginate | 10 rows per page, reading the latest 100 records |
| Clear | Confirmation required; clears either the currently filtered game or everything |
| Detail | Shows game-specific fields such as `level=12` or `seconds=298`; hover to see the full text |

### 3.5 Local by design

- **No network**: all game logic runs in the browser. There are no accounts, no matchmaking servers, no uploads — everything works offline.
- **No data binding**: stages need no data source, book or dashboard query. Open a game and play.
- **The backend is just a ledger**: although the manifest enables a Python backend, it only maintains `history.db`. If it is down, scores fall back to browser storage and games still play normally.

## 4. A few example games

The 31 entries are organized into three categories. This is a map, not a complete list:

| Category | Count | Examples |
| --- | --- | --- |
| Puzzle | 6 | 2048, Minesweeper, Memory Match, Gomoku, 3D Rubik's Cube, Sliding Puzzle |
| Casual | 24 | Tetris, Snake, Whack-a-Mole, Gold Miner, Ping Pong, 3D Pool, Curling, Hurdles, Trick Shot, Hawk & Chicks, Tortoise & Hare, Orange Peel, Cats vs Dogs, Racing… |
| Records | 1 | Leaderboard |

A handful that show how varied the mechanics are:

| Game | How to play | What gets recorded |
| --- | --- | --- |
| 2048 | Merge numbered tiles with arrows or `W/A/S/D`, aim for 2048 | Score, best tile |
| Minesweeper | Left-click to reveal, right-click to flag; uncover every safe cell | Duration, mines left |
| Tetris | Move / rotate / hard-drop, clear lines and level up | Score, lines, level |
| Snake | Steer to eat food; the longer it gets, the harder it is | Score, snake length |
| Trick Shot | Draw the bow, use bounce and wind to hit the target | Score, hits, duration |
| Detective Typer | Type pinyin to catch suspects before they cross the escape line | Score, level, duration |
| Racing | Drive three laps, chase the highest average speed | Distance, average speed, laps |

:::tip The list changes
Game count, names and categories may change between plugin versions. The "N games total" counter and card descriptions in the menu are always more accurate than any static list.
:::

## 5. Beyond the game box

Games are not confined to the game box. The plugin registers one **dashboard block type**, "Game", which can be dragged onto a board page like any other component:

| Block type | Category / default size | Purpose |
| --- | --- | --- |
| `fat-games.game` (Game) | `other` / 6×30 (min 4×16) | Switch between and play several games inside one card; no data source (`dataConfig: false`) |

Its private configuration lives in `options.gameSwitcher` and is edited visually in the block config drawer, under Display config:

| Field | Default | Meaning |
| --- | --- | --- |
| `games` | All playable games (Leaderboard excluded) | Game ids available for switching; empty falls back to all |
| `defaultGame` | `2048` | Game shown when the card opens |
| `showSwitch` | `true` | Whether the switcher is visible |
| `switchStyle` | `segmented` | `segmented` button group or a `select` dropdown |
| `switchPosition` | `top` | Switcher placed at `top` or `bottom` |

A few more useful entry points: the commands `fat-games.openGame(gameId)` (open a specific game from a flow or another extension) and `fat-games.ping` (check that the plugin is loaded), plus a settings page listing **all games and their routes**. For plugin authors: the "activity bar + primary sidebar + workbench page" layout consists of `registerActivityBarItem`, `registerPrimarySidebar` and `registerWorkbenchPage`, and the activity bar id must match the workbench page id. Adding a game means one entry in `registry.tsx`, with pure logic in `utils.ts` for easy unit tests — see [Plugin Development](../plugin-dev/index.md).

## 6. Troubleshooting and boundaries

| Symptom | Check first |
| --- | --- |
| No headset icon in the activity bar | Is the plugin installed and enabled in the [Extension Center](../guides/extensions.md)? Also right-click the activity bar to make sure the item is not hidden |
| Stuck on "Opening game…" | The route is not under `/games/*`; click the headset icon or pick a card again |
| A game cannot be found | Try another keyword: Chinese name, English name, game id, full pinyin or initials. Search matches title / description / category |
| No sound at all | Check the "Game sound" switch at the bottom of the menu; browsers also require one user gesture before audio plays |
| No score after a round | Only a completed round (loss / clear / goal) is recorded — quitting midway writes nothing. Also check that the backend or `localStorage` is writable |
| Leaderboard is empty | Play a round first. If the backend was unavailable, scores may be in browser storage rather than `history.db` |
| Scores vanished on another computer | Scores live only in the local `fatGames/history.db` or browser storage; there is no cloud sync |
| Search results stay Chinese in the English UI | Expected: host global-search items use the Chinese fallback titles from the registry; in-game labels are still English |
| A 3D / physics game stutters | Rendering and computation happen in the browser and depend on local hardware; close other GPU-heavy pages |

A few boundaries worth remembering:

- **It is a UI plugin, not a data-source plugin**: games are not bound to books, data tables or dashboard queries, and need no account.
- **The backend is not a game engine**: it only serves the score database. If it is down, games still play and scores fall back to browser storage.
- **Scores belong to this machine**: they include player names and custom details; clear the relevant records from the Leaderboard in sensitive scenarios. Backing up the workspace includes `fatGames/history.db`.
- **Version differences**: game count, categories and some button labels may change between releases — the installed version's UI is authoritative.

## Related docs

- [Popular Plugins · Overview](./index.md) — the full plugin list and repositories
- [Toolbox (FatTools)](./fat-tools.md) — another UI-oriented plugin with the same three-part workbench
- [FatCharts](./fat-charts.md) — dashboard chart blocks in the same category
- [Extension Center](../guides/extensions.md) — installing, enabling and plugin status
- [Data Dashboard](../guides/data-dashboard.md) — dropping a Game card onto a board
- [Flow Automation](../guides/flow-automation.md) — opening a game via commands
- [Plugin Development](../plugin-dev/index.md) — activity bar, sidebar and workbench page contributions
