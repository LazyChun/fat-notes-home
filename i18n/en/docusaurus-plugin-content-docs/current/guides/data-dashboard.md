---
sidebar_position: 2
title: Data Dashboards
description: Connect data sources and organize key metrics into visual dashboards.
---

# Data Dashboards

FatNotes keeps database query results and visual widgets in the same workspace, connecting your data, analysis, and conclusions on one page. Building a report no longer means querying in a database client, copying into Excel, and pasting a screenshot into notes—the query and the chart live together.

## Data sources

A built-in database manager lets you browse table structures and data visually. The current architecture supports:

| Source | Typical use |
| --- | --- |
| SQLite | Local data, personal records, demos and learning |
| MySQL / MariaDB | Business databases, website backends |
| PostgreSQL / TimescaleDB | Advanced analytics, time-series data |

Connector availability may vary by release; check the app for the current list.

## Build a dashboard

1. **Create a data source**: enter the connection details (host, port, credentials).
2. **Test the connection** with an account that only has the permissions the task needs.
3. **Write or generate a query**: hand-write SQL or let AI draft it.
4. **Bind widgets**: attach the query results to tables, trend charts, gauges, or pie charts.
5. **Arrange the layout** in reading order, with the most important metrics first.

## Tips for better dashboards

- **Time filter linkage**: bind a time filter to the dashboard, then switching between "today / last N hours / custom range" refreshes every chart at once.
- **Mixed layouts**: chart blocks can share a page with notes, tables, and inputs, forming an analysis report with data and conclusions side by side.
- **Combine with flows**: a flow can query and write data on a schedule while the dashboard displays it—together they form a complete monitoring mini-app.

:::caution Protect credentials
Never commit database passwords to notes, screenshots, or public repositories. Prefer read-only accounts for production data.
:::
