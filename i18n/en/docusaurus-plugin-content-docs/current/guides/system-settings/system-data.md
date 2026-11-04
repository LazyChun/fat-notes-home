---
sidebar_position: 3
title: System Data
sidebar_label: System Data
description: "FatNotes System Data explained: variables, tags, members and i18n texts — fields, CRUD workflows, bilingual key rules and practical uses."
---

# System Data

> System Data is a set of **global dictionaries**: variables store constants, tags classify things, members hold contacts, and i18n texts provide bilingual UI strings. They belong to no page or book — change one value and the whole workspace sees it.

All four tables share the same workflow, so the common operations come first.

:::note About the screenshots
Screenshots in this chapter were taken from the Chinese UI; all field names are translated below.
:::

## Common CRUD operations

| Action | How | Notes |
| --- | --- | --- |
| Add | Click "Add Variable / Add Tag / Add Member / Add" at the top right | A modal opens; fill the fields and click OK. A success toast confirms it |
| Edit | "Edit" in the row's Action column | The modal is prefilled; click OK to save |
| Delete | "Delete" in the Action column | A "Delete this item?" confirmation appears; confirming removes it globally |
| Browse | The table | Column headers are the fields; I18n Texts adds filters, Icons adds paging |
| Takes effect | — | Immediately, no restart. The app loads this configuration when settings are first opened |

:::caution Deletion is global
Variables, tags, members and text entries can be referenced by pages, flows and plugins. Check usage before deleting: tags are linked to members and feature cards, variables are often used as parameters, and i18n entries directly decide displayed text.
:::

---

## Variables

System Variables is a **Name / Value / Description** key-value table for constants used in more than one place.

![System Variables list; red boxes mark the Add Variable button and the row actions](pathname:///fat-notes-home/img/instruction/settings/settings-data-variables.png)

*Columns: Name, Value, Description, Actions. Red boxes highlight the add button and the inline Edit action. The sample data contains two rows.*

![Add Variable modal: Name, Value, Description](pathname:///fat-notes-home/img/instruction/settings/settings-modal-variable.png)

*Add and Edit share the same modal; its three fields map to the three columns.*

| Field | Required | Description |
| --- | --- | --- |
| Name | Yes | Identifier of the variable; keep it short, readable and unlikely to collide |
| Value | No | The value, stored as text |
| Description | No | Optional note explaining what the variable is for |

**Usage tips**

- Centralize values that **change but are reused**: department names, thresholds, default regions, URL prefixes. Update once instead of hunting down hard-coded values.
- Used by flows, query conditions and page variables; the exact reference syntax depends on the component or plugin.
- Treat Name as a key: agree on a naming convention (for example `sales.target.q3`) before adding many entries.
- Always fill Description — six months later it saves a lot of guessing.

---

## Tags

System Tags is a global **Name + Color** classification dictionary.

![System Tags list; red box marks the Add Tag button](pathname:///fat-notes-home/img/instruction/settings/settings-data-tags.png)

*The table lists tag names and actions; the red box is the Add Tag button.*

![Add Tag modal: Name, Color](pathname:///fat-notes-home/img/instruction/settings/settings-modal-tag.png)

*Only two fields: Name and Color.*

| Field | Required | Description |
| --- | --- | --- |
| Name | Yes | Displayed tag text, e.g. "Priority" or "Needs review" |
| Color | No | Display color used to distinguish tags in lists and pickers |

**Usage tips**

- **Members** can link to several tags to mark teams, roles or skills.
- **I18n Texts** can be filtered by tag, which helps manage entries per module.
- Tag pickers on feature cards and extension pages read this same dictionary.
- Define a small stable set with consistent color semantics (red = urgent, blue = info, green = done).

---

## Members

System Members is a lightweight directory with contact details and tag links.

![System Members list; red boxes mark the Add Member button and the empty state](pathname:///fat-notes-home/img/instruction/settings/settings-data-members.png)

*Columns: Name, Phone, Email, Tags, Actions. "No data" is shown when empty.*

![Add Member modal: Name, Phone, Email, Tags](pathname:///fat-notes-home/img/instruction/settings/settings-modal-member.png)

*Tags is a multi-select with the placeholder "Select tags (optional)"; options come from System Tags.*

| Field | Required | Description |
| --- | --- | --- |
| Name | Yes | Member name or display name |
| Phone | No | Optional contact number |
| Email | No | Validated; an invalid address shows "Please enter a valid email" |
| Tags | No | Multi-select from System Tags, used for group filtering |

Use it to record dashboard owners, data reviewers or on-call contacts. Build role tags first, then assign them to members so you can filter by tag later.

---

## I18n Texts

The most special of the four tables: it maintains **runtime UI strings**, which can override or extend the built-in language packs and follow the language chosen in [Basic Settings → Language](./basic.md#language).

![I18n Texts list; red boxes mark the filters and the Add button](pathname:///fat-notes-home/img/instruction/settings/settings-data-i18n.png)

*Columns: ID, Prefix, Chinese Text, English Text, Tags, Created At, Updated At, Actions. Red boxes highlight the prefix/tag filters and the Add button.*

![Add i18n text modal: Prefix, Chinese Text, English Text, Tags](pathname:///fat-notes-home/img/instruction/settings/settings-modal-i18n.png)

*Tags are added by typing and pressing Enter ("Enter a tag and press Enter").*

### Fields

| Field | Required | Description |
| --- | --- | --- |
| ID | Yes (table column) | Entry identifier, combined with the prefix into a full key |
| Prefix | Yes | Namespace prefix; placeholder "Enter a prefix, e.g. app.home" |
| Chinese Text | Yes | Text shown for `zh_CN` |
| English Text | Yes | Text shown for `en_US` |
| Tags | No | Type and press Enter to add; used for filtering |
| Created At / Updated At | Automatic | Audit columns, not editable |

### Key rules and resolution

The app merges entries into the active language pack as follows:

1. Full key = `Prefix.ID`, e.g. prefix `app.home` + ID `title` → `app.home.title`. Entries with an empty prefix or ID are skipped.
2. In **Simplified Chinese** the Chinese Text is used; in **English** the English Text is used.
3. If the active language's text is empty, the app **falls back to the other language**; if both are empty the entry is ignored.
4. Entries are merged with the built-in language pack, so you can override a default string by using the same key, or add custom keys.

### Filtering and maintenance

- Filters: **by prefix**, **by Chinese/English text**, **by tag**. Use consistent prefixes such as `sales.*` or `ops.*` when many modules exist.
- Editing refreshes Updated At; new entries appear first.
- Changes merge into the message table immediately — switch the interface language to verify both versions.

:::tip When to use I18n Texts
- Rewriting a built-in hint in your team's wording;
- Blocks or plugins of your own that need different text per language;
- Delivering the same workspace to Chinese and English users.

Plain notes do not belong here — they are never auto-translated; keep two versions yourself.
:::

---

## Quick reference

| Page | Fields | Required | Table columns |
| --- | --- | --- | --- |
| Variables | Name / Value / Description | Name | Name, Value, Description, Actions |
| Tags | Name / Color | Name | Name, Actions |
| Members | Name / Phone / Email / Tags | Name (email must be valid) | Name, Phone, Email, Tags, Actions |
| I18n Texts | ID / Prefix / Chinese / English / Tags | Prefix, Chinese, English | ID, Prefix, Chinese, English, Tags, Created At, Updated At, Actions |

## Typical combination

A team dashboard usually connects all four tables:

1. Create three **tags** — Data, Operations, Review — with colors.
2. Add **members** and tag them by group.
3. Store defaults (region, target value) in **variables** for queries and flows.
4. Maintain bilingual titles and hints in **i18n texts** under one prefix such as `team.dashboard.*`.
5. Switch the language to verify both versions, and filter texts by tag to check module coverage.

## Notes

- System Data is app-level: it is not tied to a book and is not saved per page.
- Check references before deleting, especially tags linked to members and variables read by flows.
- The full i18n key is `Prefix.ID`, not just the ID; empty prefix or ID is skipped.
- An empty Chinese or English text falls back to the other language — it does **not** hide the string.
- Member emails are validated; phone, description and tags are optional.

## Related docs

- [System Settings Overview](./overview.md) — entry point, catalog, effect rules.
- [Basic Settings · Language](./basic.md#language) — decides which language an entry resolves to.
- [Component Settings](./components.md) — validation rules, icons, add bar.
