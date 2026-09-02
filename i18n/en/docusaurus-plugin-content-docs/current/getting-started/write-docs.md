# Website documentation authoring and publishing guide - By AICode
---
sidebar_position: 2
title: Edit This Documentation
description: Edit Markdown locally and publish updates through GitHub.
---

# Edit This Documentation

This website is built with Docusaurus. Documentation is stored as Markdown in the repository, so there is no content database or admin dashboard to maintain.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm start
```

The local preview refreshes whenever you save a document.

## Content locations

- Chinese documents: `docs/`
- English documents: `i18n/en/docusaurus-plugin-content-docs/current/`

Create a matching `.md` or `.mdx` file in each language directory when adding a translated page.

## Publish updates

Push changes to the `main` branch. GitHub Actions will build the production site and deploy it to GitHub Pages.

```bash
git add .
git commit -m "docs: update user guide"
git push
```

:::warning Check before publishing
Run `npm run build` first. Broken links or build errors can block deployment.
:::
