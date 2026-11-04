---
sidebar_position: 4
title: Scheduled Tasks
description: "FatNotes scheduled tasks explained: schedule rules, Cron expressions, activating a board, run records and execution counts, plus a field reference, common scenarios and caveats."
---

# Scheduled Tasks

> **Run Now** executes a board once. **Scheduled Tasks** let it run itself on a timetable. Three pieces work together: a **schedule rule** (when to run), the **flow cards** on a board (what runs), and an **active scheduled run** (the switch that hands the board to the background scheduler). Typical uses are daily reports, periodic checks, data sync and backups.

Getting these three straight is the difference between a task that runs and one that looks configured but never fires:

| Piece | Where | Purpose |
| --- | --- | --- |
| Schedule rule | Run panel → Schedule Rules → Add Schedule | Name, Cron expression, Enabled flag; created from a board it binds to that board |
| Flow cards | Think / Screen Task / ETL DAG blocks on the board | The actual work performed when the time comes |
| Scheduled run record | Tab bar ▶ dropdown → Scheduled Run → pick a rule | Activation: only boards with a running scheduled record are dispatched |

---

## Where to find it

| Entry point | Location | Best for |
| --- | --- | --- |
| Run panel | **Play (Run)** icon in the left activity bar | Review running / completed work and manage every rule |
| Run dropdown | **▶ and the small arrow** at the right of the tab bar | Run a board now, activate a rule, or create a rule in place |
| Command Palette | `Ctrl + K`, search for "Run" | Jump to the Run panel quickly |

The ▶ button only appears on boards that contain **flow cards**. A plain chart board has nothing to schedule, so the button is hidden.

![Schedule Rules page of the Run panel; red boxes mark the sidebar entry and Add Schedule](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-rules.png)

*The Run panel has three pages: Running / Completed / Schedule Rules. Red boxes highlight "Schedule Rules" in the sidebar and the "Add Schedule" button.*

---

## The Schedule Rules list

The list is the ledger for all your scheduled tasks:

| Column | Meaning |
| --- | --- |
| Rule Name | A custom name; include frequency and intent, e.g. "Daily 09:00 Sales Report" |
| Cron Expression | A five-field timetable: `min hour day month weekday` |
| Executions | How many times this rule has fired, starting at 0 |
| Board Name | The bound board; `[General]` means no board is bound |
| Enabled | Toggle; switch off to pause the rule |
| Actions | Edit (rename / change Cron / toggle) and Delete (with confirmation) |

Three filters sit above the table: **Search rule name** (pinyin-friendly fuzzy match), **Search cron expression**, and **Select board** (multi-select). Filtering by board is the fastest way to navigate a long list.

---

## Create a rule

1. Open a board with flow cards, click the small arrow beside ▶ → **Add Schedule**; or click **Add Schedule** on the Schedule Rules page.
2. Fill in the rule name and Cron expression, and leave **Enabled** on.
3. Click **OK**. The rule appears in the list immediately.

![Add Schedule Rule dialog; red boxes mark Rule Name, Cron Expression and Enabled](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-rule-modal.png)

*Red boxes from top to bottom: Rule Name (required), Cron Expression (required, with visual selector and text input), Enabled (on by default). Cancel / OK at the bottom.*

### Field reference

| Field | Required | Notes |
| --- | --- | --- |
| Rule Name | Yes | Placeholder "Enter rule name"; shown in the dropdown and in run records |
| Cron Expression | Yes | Type it directly or build it with the visual selector; hint "Format: min hour day month weekday" |
| Enabled | No | On by default; off keeps the rule but excludes it from scheduling |

The visual selector translates an expression into plain language — `0 9 * * 1-5` reads "Every week on MON-FRI at 9:0". Changing a dropdown updates the expression in the text box above it.

### Common Cron expressions

| Expression | Meaning |
| --- | --- |
| `*/5 * * * *` | Every 5 minutes |
| `0 9 * * *` | Every day at 09:00 |
| `30 8 * * *` | Every day at 08:30 |
| `0 0 1 * *` | 00:00 on the 1st of each month |
| `0 9 * * 1-5` | Weekday repetition (shown as MON-FRI 09:00; see the weekday note below) |

Only **five-field** expressions with `*`, `/`, `,` and `-` are supported. Second-level expressions, six-or-more fields, and extensions such as `?`, `L` or `W` are not recognised.

---

## Activate it (the step people miss)

Saving a rule only registers a timetable. To make the background scheduler execute it, **activate the rule on the target board**:

1. Open the board the rule is bound to — it must contain flow cards.
2. Click the small arrow beside ▶ in the tab bar.
3. Pick the rule under **Scheduled Run**. A run record of type *scheduled* is created and appears in the Running list.
4. Keep the app running. When the time matches, the backend runs every flow card on the board and streams node progress back to the canvas.

![Run dropdown in the tab bar; red boxes mark Scheduled Run and Add Schedule](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-board-menu.png)

*Top to bottom: Run Now (becomes Stop Run while running), the "Scheduled Run" group (rules for the current board plus general rules; hovering shows the Cron expression), and Add Schedule. Clicking a rule activates it; after about 2 seconds of hover, edit / delete icons appear.*

![How a scheduled task fires](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-mechanism.svg)

A few mechanism details worth remembering:

- The backend checks all enabled rules **every 30 seconds**, matching the current minute against **local time** — minute-level precision.
- A flow runs only when the Cron expression matches **and** the board has a running scheduled record. If either is missing, that check is skipped.
- A board is triggered at most once per **55 seconds**, so a high-frequency Cron cannot pile up duplicate runs.
- It executes **all flow cards** on the board (Think, Screen Task, ETL DAG) and broadcasts progress over WebSocket; it does not refresh chart queries.

:::tip Need a temporary pause?
Two options: switch **Enabled** off in the rules list (turn it back on later), or click **Cancel** on the record in Running (ends this scheduled run, so no further triggers). Once the app exits, scheduling stops and missed runs are not replayed.
:::

---

## Review run records

The other two pages of the Run panel are for follow-up. The **Run Rule** column is especially useful: scheduled records show the rule name, and clicking it jumps to Schedule Rules with that name pre-filtered; manual records show "Run Now".

![Running list; red box marks the run records table](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-running.png)

*Columns: Board Name / Status / Run Rule / Executions / Start Time / Actions. Scheduled records can be expanded to see their flow blocks; Cancel ends the run.*

![Completed list; red box marks the run records table](pathname:///fat-notes-home/img/instruction/schedule/en/schedule-completed.png)

*Completed adds End Time and Duration, plus an "All Status" filter for Completed / Failed. Scheduled records keep the rule name and execution count for traceability.*

| Page | What you see | Typical use |
| --- | --- | --- |
| Running | Current manual / scheduled runs and start times | Verify activation, cancel a run |
| Completed | Status, start / end times, duration | Investigate failures, estimate runtime |
| Schedule Rules | All rules, enabled state, executions | Rename, change frequency, pause, delete |

---

## Common setups

1. **Daily sales report**: put an ETL DAG on the board (query yesterday's data → compute metrics → build text → send a message), create "Daily 09:00 Sales Report" with `0 9 * * *`, and activate it from the tab bar menu. The report generates itself every morning.
2. **High-frequency device checks**: `*/5 * * * *` bound to an operations board, with a flow that calls an API and writes to a data source. Keep the flow clearly shorter than the interval so the next trigger does not arrive mid-run.
3. **Periodic backups**: day / month fields are more predictable for fixed dates, e.g. `0 0 1 * *` on the first of each month; check Duration on the Completed page afterwards.
4. **Reuse a mode across boards**: rules created directly in the Run panel are not bound to a board (Board Name shows `[General]`) and appear in every board's run menu — handy as a click-to-run preset. For automatic execution, create the rule from the **Add Schedule** entry on the specific board.

---

## Caveats

- **Keep the app running**: the scheduler starts with the backend service; closing the app stops triggers and missed runs are not replayed.
- **The board needs flow cards**: charts, text and other regular blocks are not executed; without flow cards, even the ▶ button is hidden.
- **Weekday fields differ in semantics**: the visual selector follows the usual Crontab convention (`0/7` = Sunday, `1-5` = Monday–Friday), while backend matching uses `0 = Monday … 6 = Sunday`. For weekly rules, watch the first few actual trigger times, or express the schedule with day / month fields; the Start Time in run records is the source of truth.
- **Cron is minute-level**: do not expect second-level triggers, and remember the 55-second minimum gap per board.
- **Deleting a rule is not a history cleanup**: only the rule is removed; existing run records remain. Turning **Enabled** off is safer for a temporary pause.
- **Not the same as the Clock Task block**: "Other → Clock Task" in the component panel is a block-level timer that fires in-page interactions; schedule rules dispatch whole-board workflows. Pick the one that fits.
- **Automation has side effects**: flows may write to databases, call APIs or run scripts. Validate once with Run Now before enabling, and double-check target data sources and credentials.

---

## Related docs

- [Workflow Automation](./flow-automation.md) — flow nodes, canvas orchestration and running flows.
- [Data Dashboard](./data-dashboard.md) — boards that host flow cards and display results.
- [Flow Components](./system-components/flow-widget.md) — Think, Screen Task, ETL DAG and other dispatchable cards.
- [System Settings Overview](./system-settings/overview.md) — runtime and port settings.
