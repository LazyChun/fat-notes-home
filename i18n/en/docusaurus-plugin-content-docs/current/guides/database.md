---
sidebar_position: 7
title: Database
description: "A complete guide to the FatNotes Database module (Database Manager): the database → table → column structure, browsing and filtering rows, creating a database / data source, adding and editing rows, and how it powers dashboards, functions and flows — with an overview screenshot, a data-flow diagram and a quick reference."
---

# Database

> The **Database** module is where FatNotes keeps and browses its **structured data**. It registers local SQLite databases as **data sources** and organizes them into a *database → table → column* hierarchy; from the activity bar you can view, filter and add or remove rows directly, and it is the shared **data foundation** for [Data Dashboards](./data-dashboard.md), [Functions](./functions.md) and [Flow Automation](./flow-automation.md).

This page documents the **Database module** in the activity bar (the Database Manager). For a tour of everything FatNotes can do, start with the [Feature Overview](./features.md).

---

## 1. Where the Database module lives

The activity bar has 7 modules by default, top to bottom. **Database is the 3rd** (after Search, before Extensions):

| # | Activity-bar entry | Opens | Main purpose |
| --- | --- | --- | --- |
| 1 | File Manager | File Manager | Notebooks, page tree and page content |
| 2 | Search | Search sidebar | Search by name / content |
| 3 | **Database** | **Database Manager** | **This page: data sources, table structure, data browsing** |
| 4 | Extensions | Extension Center | Plugins, functions, workflows, skills… |
| 5 | Functions | Functions list + pages | Open the small apps you built |
| 6 | Resources | Resource repo | Images, audio, video and other assets |
| 7 | Run | Run panel | Running / finished / scheduled jobs |

Opening **Database** splits the screen into three parts: a **database tree** on the left, a **table-data area** on the right, and a **filter / toolbar** row above the table.

![Database workspace overview. Red boxes mark the database icon on the activity bar, the Database Manager panel title, the Add database button and the filter input.](pathname:///fat-notes-home/img/instruction/database/en/db-overview.png)

*Red boxes, top to bottom: the database (cylinder) icon on the activity bar, the "Databases" panel on the left, the blue "Add database" button, and the filter input above the table. The tree here expands `test_db`, under which sits a table named `goodman`.*

### UI parts at a glance

| Part | Description |
| --- | --- |
| Database tree | Two-level *database → table* tree; click a table to open it in the workspace |
| Add database | Blue button that creates a new local data source (see [section 4](#4-create-a-database-new-data-source)) |
| Breadcrumb | `database / table` above the grid, showing which table you are viewing |
| Filter row | `field = value` condition; stack several with the `+` button |
| Toolbar | Add row / Delete and other buttons for light editing of the current table |
| Data grid | Rows of records; the first "排序 / Sort" column is a drag handle to reorder |
| Pager | Bottom shows "N records" and "M per page" |

:::info Demo databases are included
FatNotes ships with a few demo databases (e.g. `test_db`, `3阶栋项目报价单`, `电脑演示库`) so you can click in and see how it works. The screenshots use `test_db / goodman` as an example. **Clean up demo data when you are done** so it does not clutter your workspace.
:::

---

## 2. Database, table, column: the three layers

Data in the Database Manager is organized in three levels — **database → table → column**:

- **Database**: an independent data source, backed by one physical SQLite file in your workspace.
- **Table**: a two-dimensional table under a database, made of **rows (records)** and **columns (fields)**.
- **Column**: a field of the table, with a **name** and a **type**. Example: the `goodman` table has columns `ID`, `name`, `age`, `createDate`, `score`, `lastName`.

![Table data area. Red boxes mark the toolbar (Add row / Delete) and the filter row; columns are 排序/ID/name/age/createDate/score/lastName with several records.](pathname:///fat-notes-home/img/instruction/database/en/db-table.png)

*A table looks like this: the leading "排序 / Sort" column is the drag handle, followed by the field columns; the bottom "共 8 条" means the table has 8 rows. The column (field) structure is fixed when the database / table is created.*

:::tip Where is it stored on disk?
The physical files live under `dbs/sqlite3_dbs/<8-hex>.db` in the workspace; the metadata (databases / tables / columns) is recorded in `dbs/items.json` and `dbs/databaseSources.json`. This is what the Database Manager actually reads and writes — back it up before changing anything.
:::

---

## 3. Browse and filter rows

Open any table and all rows are shown by default. Common operations:

| Action | Where | Effect |
| --- | --- | --- |
| Filter by column | Filter row `field = value`; click `+` to stack more | Show only matching rows; multiple conditions are combined with AND |
| Sort | First "排序 / Sort" drag handle | Manually reorder rows up and down |
| Paginate | Bottom pager | Set page size and switch pages |
| Inspect fields | Column headers | Each column is a field; the header is the field name |

The filter input placeholder is "请输入过滤条件 / Enter filter condition" — just type a keyword to filter live. To combine several fields, click `+` at the end of the filter row to add more conditions.

---

## 4. Create a database (new data source)

Click the blue **Add database** button on the left to open the "New database" dialog:

![New database dialog. Red box outlines the form (Name / Type / Default / ID) and the Cancel / OK buttons.](pathname:///fat-notes-home/img/instruction/database/en/db-adddb.png)

*The dialog has: a required **Name**, a **Type** (default `Default`, i.e. a local SQLite database), and a read-only **ID** generated by the system. Fill in the name and click OK to create it.*

| Field | Required | Description |
| --- | --- | --- |
| Name | Required (red star) | Display name of the database; shows up in the left tree |
| Type | Default `Default` | Currently a local-database type |
| ID | Read-only | 8-character ID auto-generated by the system, also the physical file name |
| Cancel / OK | — | Cancel discards; OK creates and registers the source |

After creation the new database immediately appears in the left tree. You can then create tables and enter data, which dashboards, functions and flows can consume right away.

---

## 5. Edit rows

The toolbar above the table lets you do light editing:

![After clicking "Add row", a new empty row appears at the top (ID auto-generated). Red box marks the empty row and the Add row / Delete buttons on the toolbar.](pathname:///fat-notes-home/img/instruction/database/en/db-edit.png)

*Clicking "Add row" inserts a **new empty row** below the header (ID auto-generated, other fields left blank to fill in); select a row and click "Delete" to remove it. Edits are written to disk immediately.*

| Action | Effect |
| --- | --- |
| Add row | Insert a new record below the header; ID is auto-generated |
| Delete | Remove the currently selected row |
| Cell edit | Click a cell to change its value; the change is saved to the physical database at once |

:::warning Edits are written immediately
The Database Manager is a **light-editing** entry point; add / delete / change writes straight to the workspace SQLite file with **no undo**. Back up the `dbs/` folder before editing demo or important data.
:::

---

## 6. How it connects to other modules

The Database module is the common foundation for every data-related capability in FatNotes:

![Database module data flow: create → register → structure → read/write → consumed by dashboards / functions / flows](pathname:///fat-notes-home/img/instruction/database/en/db-mechanism.svg)

- **Data Dashboards**: charts and table blocks query these tables directly and turn rows into visuals.
- **Functions**: a function page can feed input back into a query and pull the matching record from the database.
- **Flow Automation**: ETL / thought / screen tasks can extract, transform and write back to the database.
- **System Components**: table-type and form-type blocks can bind to a data source to display or capture table data.

---

## 7. Things to watch

- **Physical databases live in `dbs/sqlite3_dbs/`**: database / table / column metadata is in `dbs/items.json` and `dbs/databaseSources.json`; structural and data changes persist to disk.
- **Database type when adding**: the default is a local SQLite database; Name is required, ID is auto-generated.
- **Manager is for browsing and light editing**: structural changes (create database / table) go through "Add database"; row-level add/delete/edit happen in the grid toolbar.
- **No undo**: edits write to disk directly — back up important or demo data first.
- **Clean up demo data when done**: the bundled `test_db` and friends are for trying things out; clean them before production use so they don't mix with real workspace data.
- **A source must be registered to be visible**: only databases registered in `databaseSources.json` appear in the manager tree.

---

## Related docs

- [Feature Overview](./features.md) — a tour of everything FatNotes can do.
- [Data Dashboard](./data-dashboard.md) — turn the tables in your database into charts and dashboards.
- [Functions](./functions.md) — package a query-with-database interaction into a small app.
- [Flow Automation](./flow-automation.md) — process the database with ETL / thought / screen tasks.
- [System Components](./system-components/overview.md) — table, form and other components that can bind to a data source.
