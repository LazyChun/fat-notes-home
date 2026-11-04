---
sidebar_position: 9
title: Dialogs
sidebar_label: Dialogs
description: "FatNotes Dialog components: Modal, Drawer, Message and Notification — triggering, options and feedback design."
---

# Dialogs

> Dialog blocks provide **modal interaction and lightweight feedback**. They usually do not stay visible: they are action **targets**, revealed when a button is clicked, a table row is selected or a chart point is clicked.

| Block | Shape | Container | Typical use |
| --- | --- | --- | --- |
| **Modal** | Centred dialog | ✅ | Confirmation, forms, details |
| **Drawer** | Side panel sliding from an edge | ✅ | Filters, side details, settings |
| **Message** | Slim toast | Optional component box | Saved / failed feedback |
| **Notification** | Card with title and description | Optional component box | Task finished, sync result, alert |

![Example page for the Dialog category](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-dialog-example.png)

*The four blocks in their canvas editing state. The **red box** marks the Notification block — at runtime it appears as a floating card.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-dialog-example.png" target="_blank" rel="noopener">View full size</a>

## Core mechanism: revealed by actions

```
Button click / table row click / chart point click
        │  Event → Navigate (display way)
        ▼
   Open in modal / drawer  →  show the target block's content
        │
        ▼
   Action result  →  message / notification feedback
```

In a [button or chart](./form.md) action, choose "open in modal" or "open in drawer" as the display way and select the target block. Messages and notifications are commonly attached to action success or failure to give a clear receipt.

:::note What you see on the canvas is the editing state
A Modal or Drawer appears as an ordinary (possibly blank) block card while editing. Only when an action opens it at runtime do the mask, overlay and animation appear. The same applies to Message and Notification.
:::

## Block reference

All four feedback blocks keep their private options in the right-hand **Basic** group; Modal and Drawer add appearance, close behaviour and Footer groups. The screenshots show the **edit state on the canvas** — the real overlay appears at runtime.

![Private options in the drawer](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-dialog-config.png)

*The **Basic** group of a notification holds type, title, description, placement, duration and the other feedback parameters.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-blocks-dialog-config.png" target="_blank" rel="noopener">View full image</a>

### 1. Modal `modal`

**What it does**: A centred modal dialog that can host forms, details or notes; a container.

![Modal rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-modal.png)

*Rendered example: the modal card in edit mode (empty container); at runtime it appears as a centred overlay.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-modal.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Appearance**

| Option | Values / default | Description |
| --- | --- | --- |
| Title `title` / colour `titleColor` | Text; blank falls back to the component name / colour | Shown at the top of the dialog. |
| Width `width` / height `height` / centred `centered` | Default `800` / `60vh` (or `400px`) / `On` | Size to content; turn centring off for tall content. |

**Close behaviour**

| Option | Values / default | Description |
| --- | --- | --- |
| Close button `closable` / icon `closeIcon` | Default `On`; icon accepts `[icon]name` | Top-right close control and its icon. |
| ESC `keyboard` / mask `mask` / click mask `maskClosable` | All `On` by default | Disable click-mask-to-close for unsaved forms. |

**Footer**

| Option | Values / default | Description |
| --- | --- | --- |
| Show footer / OK / Cancel | Independent switches | Hide the whole footer for display-only dialogs. |
| Button text and OK type `okType` | Primary / Info / Success / Warning / Danger / Link | Use Danger for delete confirmations, Primary for normal submits. |

> **Tip**: The canvas shows the edit state: drag child blocks in, or the dialog opens empty.

### 2. Drawer `drawer`

**What it does**: A panel sliding in from a page edge for filters, details or settings without leaving the main view.

![Drawer rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-drawer.png)

*Rendered example: the drawer card in edit mode; at runtime it slides in from the chosen edge.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-drawer.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Appearance and placement**

| Option | Values / default | Description |
| --- | --- | --- |
| Title / colour | Text / colour; title defaults to the component name | Header text of the drawer. |
| Placement `placement` | Top / Right / Bottom / Left; default `Right` | Right for details, top for filter bars. |
| Size `size` / resizable / max size | Default `480`, also `60%` / `default` / `large` | Resizable lets users drag the edge; max size caps it. |
| Push distance `pushDistance` | Number; component default | How far the main content is pushed when drawers stack. |

**Close behaviour / Footer**

| Option | Values / default | Description |
| --- | --- | --- |
| Close button / ESC / mask / click mask | All `On` by default | Same as Modal. |
| Footer buttons and text | Visibility, text, OK button type | Same as Modal; fits actions such as "Apply filters". |

### 3. Message `message`

**What it does**: A lightweight global toast that disappears after a few seconds; used for save success or failure.

![Message rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-message.png)

*Rendered example: the edit-state card showing "Saved"; at runtime it appears briefly as a top toast.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-message.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Content type `contentType` / content | Text / component box; default `Text`, empty | Component box lets you put child blocks inside the toast. |
| Type `type` | Success / Info / Warning / Error / Loading; default `Info` | Sets icon and colour; use Error on flow failure. |
| Duration `duration` | Milliseconds; default `2000` | Use 3000 ms or more for important results. |
| Pause on hover / icon | Default `On`; icon accepts `[icon]name` | Hovering stops the countdown so long text can be read. |

### 4. Notification `notification`

**What it does**: A notification card with title and description; richer than Message, for task results, sync reports and alerts.

![Notification rendered example](pathname:///fat-notes-home/img/instruction/sysBlocks/en/sys-block-notification.png)

*Rendered example: the edit-state card with "Sales order sync complete, 120 records"; at runtime it floats in a page corner.* · <a href="/fat-notes-home/img/instruction/sysBlocks/en/sys-block-notification.png" target="_blank" rel="noopener">View full image</a>

**Private configuration**:

**Basic**

| Option | Values / default | Description |
| --- | --- | --- |
| Title / description type / description | Title defaults to component name; description is Text / component box | Put the conclusion in the title and details such as duration and row count in the description. |
| Type `type` | Success / Info / Warning / Error; default `Info` | Sets the icon and accent colour. |
| Placement `placement` | Top / topLeft / topRight / bottom / bottomLeft / bottomRight; default `topRight` | Spread simultaneous notifications across corners. |
| Duration `duration` / progress bar `showProgress` | Default `4500` ms / default `Off` | The progress bar shows the remaining time. |
| Closable / close icon / icon / pause on hover | Default `On` / default / default / `On` | Icons accept `[icon]name`; keep manual close for important alerts. |

## Cheat sheet

| Need | Block | Key options |
| --- | --- | --- |
| Ask for confirmation | Modal | Footer buttons, mask close |
| Side filters or details | Drawer | Placement, size, drag-to-resize |
| One-line receipt | Message | Type, content, duration |
| Result with explanation | Notification | Title, description, placement, progress |
| Open on click | Button / chart | Event → Navigate → modal / drawer |

## Typical setups

1. **Confirmation** — button opens a Modal with explanatory text and OK / Cancel; on confirm, run the action and show a success Message.
2. **Detail drill-down** — a table row click opens a Drawer containing a [Form](./form.md) or [Chart](./chart.md).
3. **Task notice** — a [Flow Widget](./flow-widget.md) finishes and fires a Notification with the result and duration; errors use the error type.
4. **Advanced filters** — put [Filters](./filter.md) inside a Drawer so the main dashboard stays clean.

## Notes

- Modals and Drawers are containers: **drag child blocks in**, or they open empty.
- Very short durations are easy to miss — use 3 s or more for important results, or enable pause on hover.
- Multiple notifications can stack; choose placements that do not cover key content.
- Click-mask-to-close is convenient but risky for unsaved forms — disable it in those cases.

## Related

- [Overview](./overview.md) · [Forms](./form.md) · [Common Configuration](./common-config.md) · [Layout](./layout.md)
