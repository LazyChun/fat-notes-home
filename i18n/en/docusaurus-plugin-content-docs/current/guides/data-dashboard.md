# FatNotes data dashboard and database connection guide - By AICode
---
sidebar_position: 2
title: Data Dashboards
description: Connect data sources and organize key metrics into visual dashboards.
---

# Data Dashboards

FatNotes keeps database results, visual widgets, research notes, and conclusions in the same workspace.

## Data sources

The product architecture supports SQLite, MySQL, PostgreSQL, MariaDB, and TimescaleDB. Connector availability may vary by release.

## Build a dashboard

1. Create a data source and enter its connection details.
2. Test the connection with a least-privilege account.
3. Write or generate a query.
4. Bind its results to a table, trend chart, or other widget.
5. Arrange widgets in the order readers need them.

:::caution Protect credentials
Never commit database passwords to notes, screenshots, or public repositories. Prefer read-only accounts for production data.
:::
