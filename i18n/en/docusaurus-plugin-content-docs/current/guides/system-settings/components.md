---
sidebar_position: 4
title: Component Settings
sidebar_label: Component Settings
description: "FatNotes Component Settings explained: validation rules, icon management and add-bar layouts, including the validation function template and hiding/ordering rules."
---

# Component Settings

> The first two settings groups control how the app runs and what data exists. **Component Settings** controls the tools you use while building pages: how forms validate, which icons are available, and what the component panel shows.

The three pages manage a **rule library, an icon library and panel layouts**. All are global, and all use a table plus an "Add" modal or drawer.

| Page | Manages | Typical use |
| --- | --- | --- |
| Validate Rules | Reusable form validation functions | Required fields, formats, business rules |
| Icons | Built-in and custom icons | Consistent icons for buttons, menus, cards |
| Add Bar | Multiple component panel layouts | Simplified panels for different roles |

:::note About the screenshots
Screenshots in this chapter were taken from the Chinese UI; field names are translated in the text and tables.
:::

---

## Validate Rules

Validate Rules turns validation logic into **named reusable rules**: give it a name, write a function, define the error message, then pick it from form blocks instead of repeating the same check in every input.

![Validate Rules list; red box marks the Add Rule button](pathname:///fat-notes-home/img/instruction/settings/settings-comp-validate.png)

*Columns: Name, Description, Error Message, Validate Function, Actions. The red box is "Add Rule"; an empty list shows "No data".*

![Add Rule modal: Name, Description, Error Message and the code editor](pathname:///fat-notes-home/img/instruction/settings/settings-modal-rule.png)

*The lower half is a code editor with line numbers, prefilled with a default validation function.*

### Fields

| Field | Description |
| --- | --- |
| Name | Rule name, shown when choosing a rule inside a form block |
| Description | Note explaining the rule |
| Error Message | Text displayed when validation fails; passed into the function as `errorMsg` |
| Validate Function | JavaScript function, edited in the code editor |

### Default template

New rules start with a "required" template:

```js
(_rule, oldValue, errorMsg) => {
  if (!oldValue) {
    return Promise.reject(errorMsg || "Validation failed");
  }
  return Promise.resolve();
};
```

| Parameter | Meaning |
| --- | --- |
| `_rule` | The rule object passed in by antd forms; usually unused |
| `oldValue` | The current input value |
| `errorMsg` | The text you entered in Error Message |

The contract is simple: **resolve on success, reject with a message on failure**. Replace `if (!oldValue)` with a regex, length, range or cross-field check to create format or range rules. Keeping the message in `errorMsg` lets the function focus on logic.

### Steps

1. Open Component Settings → Validate Rules and click "Add Rule".
2. Fill Name, Description and Error Message.
3. Edit the default template or paste your own function.
4. Click OK, then select the rule in a form block (input, select, radio, …) and test it.

:::caution
Validation functions run inside the page. A syntax error or exception breaks validation for every form using that rule. Check brackets and return values before saving.
:::

---

## Icons

Icons is the global icon library: built-in icons work out of the box, and you can upload your own SVG / images for icon pickers on buttons, menus and cards.

![Icons list; red boxes mark the Add Icon button and the pager](pathname:///fat-notes-home/img/instruction/settings/settings-comp-icons.png)

*Columns: Icon, Icon Name, Description, Type, Actions. Red boxes highlight "Add Icon" and the pager (10 rows per page). Built-in icons are sorted by name across many pages.*

![Add Icon modal: Icon Name, Description and the upload area](pathname:///fat-notes-home/img/instruction/settings/settings-modal-icon.png)

*Upload area: "Drop the file here or click to select", labeled "Upload SVG / image".*

### Page controls

| Control | Description |
| --- | --- |
| All types | Filter by type (built-in / custom, …) |
| Add Icon | Opens the add modal |
| Table | Preview, name, description, type, Edit / Delete actions |
| Pager | 10 rows per page by default; use page numbers to jump |

### Add Icon fields

| Field | Description |
| --- | --- |
| Icon Name | Name shown in pickers; keep it descriptive, e.g. `sales-report` |
| Description | Optional usage note |
| Icon | Upload an SVG / image by dragging it into the area or clicking to choose |

Filter by type first to avoid duplicate uploads. Prefer SVG for crisp scaling, and use consistent name prefixes. Built-in icons also have Edit / Delete actions — check usage before bulk cleanup.

---

## Add Bar

The Add Bar decides **which categories, components and functions appear in the component panel while building a page, and in what order**. Multiple layouts can be saved and switched for different roles or projects.

![Add Bar page; red boxes mark the description and the Add Layout button](pathname:///fat-notes-home/img/instruction/settings/settings-comp-addbar.png)

*Red boxes: the scope note and "Add Layout". Table columns: Name, Description, Status, Actions; "No data" when empty.*

From the page description:

> Save multiple add-bar layouts. Adjust the order of **categories, components and functions**, and hide what you do not need. **Hiding a category also hides all components under it**. Only one layout can be applied at a time; applying a new one un-applies the others.

![Add Layout drawer: Name, Description, Category / Component / Function tabs and Hide switches](pathname:///fat-notes-home/img/instruction/settings/settings-drawer-addbar.png)

*Red boxes highlight the name/description fields, the three tabs and the drag-sortable category list. Every row has a Hide checkbox.*

### Layout fields

| Area | Field / control | Description |
| --- | --- | --- |
| Basic | Name (required) | Layout name, placeholder "Enter a layout name" |
| Basic | Description | Optional note on who the layout is for |
| Tab | Categories | Drag to reorder, hide per category (Charts, Window, Layout, AI, Data, Filter, Form, Office, Dialog, Plugin, Other, …) |
| Tab | Components | Reorder components and hide individual ones |
| Tab | Functions | Reorder and hide function entries |
| List | Drag handle + Hide checkbox | List order becomes panel order; the note says hiding a category also hides its components |
| Footer | Cancel / Save | Saves this layout; without saving nothing changes |

### Applying a layout

1. Click "Add Layout" → fill Name and Description → reorder / hide in the three tabs → Save.
2. Back in the list, use **Apply** in the target row's Actions column.
3. **Only one layout can be active**. Applying a new one automatically un-applies the previous; the Status column updates accordingly.
4. Open the component panel to verify. Edit the layout or apply another one if needed.

:::tip Typical layouts
- **Beginner**: keep Text, Markdown, Table, Line, Pie; hide AI, Terminal, Code and other advanced items.
- **Data team**: move Charts, Filter and Data Source to the top; hide Office and media components.
- **Demo**: order components by the presentation flow so they are quick to find on screen.
:::

---

## Quick reference

| Page | Add entry | Key fields | Table columns |
| --- | --- | --- | --- |
| Validate Rules | Add Rule (modal) | Name, Description, Error Message, Validate Function | Name, Description, Error Message, Validate Function, Actions |
| Icons | Add Icon (modal) | Icon Name, Description, Icon file | Icon, Icon Name, Description, Type, Actions |
| Add Bar | Add Layout (right drawer) | Name, Description, Category / Component / Function order and visibility | Name, Description, Status, Actions |

## Typical combination

For a standardized data-entry page:

1. Create "Required", "Phone format" and "Range" **validation rules** with consistent error messages.
2. Upload a team icon in **Icons** for the submit button and info cards.
3. Save an "Entry page" **Add Bar** layout: move Form to the top, hide unused charts and terminal components.
4. Apply it, then drag input, select and button blocks onto the page and pick the rules in the form configuration.

## Notes

- Validation functions must return a Promise; a syntax error affects every form using the rule.
- Error Message is passed as `errorMsg`; `errorMsg || "Validation failed"` is a safe fallback.
- Hiding a **category** also hides all its components — efficient but easy to overdo, so double-check before saving.
- Add Bar layouts are global: applying another one changes the panel on every page.
- The icon library is large; filter by type and use paging rather than bulk-deleting built-in icons.

## Related docs

- [System Settings Overview](./overview.md) — entry point, catalog, effect rules.
- [System Data](./system-data.md) — variables, tags, members, i18n texts.
- [System Components Overview](../system-components/overview.md) — the categories and components shown in the add bar.
- [Form](../system-components/form.md) — form blocks that consume validation rules.
