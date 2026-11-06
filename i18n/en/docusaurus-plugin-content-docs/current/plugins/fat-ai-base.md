---
sidebar_position: 2
title: FatAiBase
sidebar_label: FatAiBase
description: "FatAiBase (fat-ai-base) plugin reference: the OCR and Knowledge Base settings tabs, the Knowledge Retrieval flow node, chromadb / PaddleOCR / OpenCV / PaddlePaddle backend scripts, on-demand dependencies and troubleshooting."
---

# FatAiBase

> Most plugins add buttons, panels or charts to the UI; **FatAiBase does not**. It is a **capability base**: once installed, all you see are two extra tabs (**OCR** and **Knowledge Base**) in AI Settings and one extra **Knowledge Retrieval** node in the flow canvas. The real work happens in the background, where a dedicated Python child process runs the heavy libraries — vector store, OCR and image processing — on behalf of the host. This page walks through **what you get → how to configure it → how it runs → how to fix it**.

## 1. What it is: an invisible capability base

The [plugin overview](./index.md) describes it as "Heavy AI capabilities (chromadb vector store / PaddleOCR / OpenCV)". More precisely, the plugin (`fat-ai-base`, manifest name `Fat AI Base`) bundles three things:

1. **Frontend contributions**: two AI Settings tabs and one flow node registered with the host;
2. **Backend capabilities**: a Python child process started by the host, exposing one generic dispatcher for five script families;
3. **On-demand heavy dependencies**: four large Python packages moved out of the host and installed only when this plugin first starts.

In the manifest, `activityBar / primarySidebar / panel / footer / routes / widgetTypes` are all `false` and the permission list is empty — **it has no UI entry of its own**; everything it provides is embedded into existing host features.

![Where FatAiBase fits in FatNotes](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-arch.png)

*Top to bottom: features you use in the UI → host dispatch by script name → the plugin's `run_script` → five script families under `backend/scripts/` → four heavy dependencies installed on first start.* · <a href="/fat-notes-home/img/instruction/fatAiBase/en/faib-arch.png" target="_blank" rel="noopener">Open full size</a>

| What you see / use | What the plugin provides | Underlying dependency |
| --- | --- | --- |
| AI Settings · **OCR** tab | The tab itself (create / edit / delete, reorder, set default, language tags) | — |
| AI Settings · **Knowledge Base** tab | The tab itself (configuration, document upload and indexing, status, reindex) | `chromadb` |
| Flow · **Knowledge Retrieval** node | Node definition, canvas rendering and edit panel | `chromadb` |
| Screen text picking, find-text-on-screen, document extraction | PaddleOCR recognition script | `paddleocr` + `paddlepaddle` + `opencv-python` |
| Image processing (metadata, resize and encoding) | OpenCV script | `opencv-python` |
| Custom Python scripts | `user_script.py` example and the shared dispatcher | — |

:::info Same mechanism as Browser Automation
The host's `pyBackendBridgeService` keeps a "script name → plugin ID" map: `chromadb_script.py / paddleocr_script.py / paddlepaddle_script.py / opencv_script.py / user_script.py` belong to this plugin, while `playwright_script.py` belongs to [fat-browser-use](./index.md). Both are backend-capability plugins; they simply ship different scripts.
:::

## 2. Install and first start

Install and enable `fat-ai-base` from the [Extension Center](../guides/extensions.md). It is **installed on demand**: the package contains scripts and `requirements.txt` only, not the dependencies themselves.

| Item | Value / note |
| --- | --- |
| Backend entry | `backend/main.py`, `backend.enabled: true` |
| Dependency strategy | `depsStrategy: install` — `pip install --target backend/vendor` on first backend start |
| Install timeout | `depsTimeoutSeconds: 7200` (2 hours; the host default is only 120 seconds) |
| Requirements | `chromadb==1.5.1`, `paddlepaddle>=2.6,<3`, `paddleocr>=2.7,<3`, `opencv-python>=4.6,<5` |
| Size / duration | ~1–2 GB; source comments explicitly warn that it "can take hours" |
| Status markers | `backend/.deps_installed`, or `backend/.deps_install_error` on failure |
| Optional settings | `pipIndexUrl` (e.g. a local mirror), `pipExtraArgs`; `PYTHONUTF8=1` is forced to avoid encoding issues with Chinese paths/comments |

:::caution Allow enough time and disk for the first install
At startup the host pre-warms the OCR engines in the background, which may trigger this plugin's first start and dependency installation. The Extension Center shows "Installing dependencies…" during that time, and **Knowledge Base, OCR and the Knowledge Retrieval node are not yet usable**. If it fails, use "Retry" or copy the **pip command** shown in the UI to install manually. Do the first install while online, with plenty of free disk, and do not kill the process midway.
:::

The host never fails silently: when the plugin is missing or dependencies are not ready, the two AI Settings tabs keep a placeholder saying "This section is provided by a plugin. Install and enable the plugin first."; calls into the scripts raise guided errors such as "This feature requires the plugin fat-ai-base (running chromadb_script.py). Install and enable the plugin in the Extensions center, then retry".

## 3. AI Settings: two tabs provided by the plugin

Click the **AI** icon at the bottom left to open AI Settings. The red-boxed **OCR** and **Knowledge Base** tabs are registered entirely by this plugin; the others (Models, Memory, MCP, TTS, ASR, Agent Strategy) are built into the host.

![AI Settings menu, with the plugin's OCR and Knowledge Base tabs outlined in red](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-tabs.png)

*Tabs are ordered by weight: OCR first, Knowledge Base second. After uninstalling, the menu keeps a placeholder entry with install guidance so the configuration does not "vanish".* · <a href="/fat-notes-home/img/instruction/fatAiBase/en/faib-tabs.png" target="_blank" rel="noopener">Open full size</a>

### 3.1 OCR: managing recognition entries

![OCR settings list, with the built-in Windows OCR entry expanded](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-ocr-list.png)

*Entries can be reordered by drag and drop; expanding one shows its ID and language tags. The built-in `windows_ocr` is marked "Default" and cannot be edited or deleted.* · <a href="/fat-notes-home/img/instruction/fatAiBase/en/faib-ocr-list.png" target="_blank" rel="noopener">Open full size</a>

![Add OCR dialog: name and languages](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-ocr-modal.png)

*The create / edit form has just two fields: Name and Languages (free tags, Enter or comma separated).*

| Action | Notes |
| --- | --- |
| Add OCR / Edit / Delete | Maintains the entries; `windows_ocr` is a system entry that can only be set as default |
| Set as default | Check button on non-default entries; writes `isDefault` |
| Drag to reorder | Handle on the right; failures roll back and show a message |
| Language tags | e.g. `zh-CN`, `en-US`; metadata only |

:::tip No recognition parameters and no "test" button here
This tab manages the **entry list** only — there is no recognition-language dropdown, GPU switch or test button. Actual recognition is done by the host's `/app/ocr/*` endpoints calling the plugin's `paddleocr_script.py`: on Windows the system `Windows OCR API` is preferred, with PaddleOCR as fallback. Screen text picking, find-text-on-screen and document extraction all use that path. In short, **whether PaddleOCR works depends on this plugin and its dependencies**, not on what you type here.
:::

### 3.2 Knowledge Base: from documents to vector retrieval

The Knowledge Base tab is the plugin's most complete UI, covering **create → configure → upload documents → check status / reindex**.

![Knowledge Base list, with one entry expanded to show all parameters](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-kb-list.png)

*The subtitle shows "Embedding model · Index name"; the seven expanded rows are all key parameters. Top-right icons: Documents, Edit, Delete, drag handle.* · <a href="/fat-notes-home/img/instruction/fatAiBase/en/faib-kb-list.png" target="_blank" rel="noopener">Open full size</a>

| Detail field | Meaning |
| --- | --- |
| ID | Unique identifier referenced by flow nodes and document APIs |
| Embedding Model | Model used to turn text chunks into vectors; **required** |
| Index / Collection | chromadb collection name; defaults to the KB ID when empty |
| Storage Path | Vector store and document directory; defaults to `kbs` under the book folder |
| Chunking (size/overlap) | `chunkSize / chunkOverlap` — how finely documents are split |
| Retrieval (topK/threshold) | `topK / scoreThreshold` (0–1) — how many hits and how strict the filter is |
| Description | Free-form note about the KB's purpose |

![Add Knowledge Base dialog: all configuration fields](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-kb-modal.png)

*Besides the fields above you can set description, tags and languages; the red dot marks required fields (Name, Embedding Model).*

| Form field | Control / default | Notes |
| --- | --- | --- |
| Name | Text input, required | Shown in the list and in the flow node picker |
| Description / Tags / Languages | Textarea / free tags | For grouping; languages are optional |
| Embedding Model | Searchable select, required | Pick from the configured [models](../guides/ai-assistant.md); it must produce embeddings |
| Index / Collection | Text input, optional | Defaults to the KB ID |
| Storage Path | Text input, optional | Defaults to `kbs/<ID>` under the book folder |
| Chunking | Two number inputs: `chunkSize` / `chunkOverlap` | 500 / 50 is a reasonable start for long documents |
| Retrieval | Two number inputs: `topK` / `scoreThreshold` (step 0.01) | e.g. 5 / 0.35; a higher threshold means fewer, stricter hits |

Click the **Documents** icon on a card to open the document dialog:

![Knowledge Base documents dialog: upload area and document table](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-kb-docs.png)

*Drag and drop or click to upload in bulk; the table shows file name, status, chunk count, update time and actions (Open / Reindex / Delete). It refreshes every 2 seconds while any document is queued or processing.*

| Status | Meaning |
| --- | --- |
| Ready `ready` | Split, embedded and written to the collection; searchable |
| Processing `processing` | Splitting and embedding; the Reindex button is disabled |
| Queued `queued` | Uploaded, waiting for the background job |
| Error `error` | Expand the row for the red error text; delete and re-upload, or reindex |

**One retrieval, end to end**: upload document → split using the chunking parameters → embed with the chosen model → `chromadb_script.py` writes the vectors into a collection → a flow node or the AI assistant recalls passages using `topK / scoreThreshold`. All vector I/O runs inside this plugin's backend; the host only orchestrates.

## 4. Flow automation: the Knowledge Retrieval node

The plugin contributes exactly one node to the flow canvas: **`knowledgeRetrieval` (Knowledge Retrieval)**, in the "Think" category with a magenta icon. Click "Add node" on the canvas and search for it:

![Knowledge Retrieval node found in the Add node panel](pathname:///fat-notes-home/img/instruction/fatAiBase/en/faib-flow-node.png)

*The red box marks the plugin-registered node; the host's built-in list no longer contains this type. After uninstalling, the canvas shows a placeholder with install guidance.*

| Position | Field | Notes |
| --- | --- | --- |
| Input | `input` (string) | Usually the question text from an upstream node |
| Config | `knowledgeBaseIds` | Multiple KBs selected from the Knowledge Base tab |
| Config | `queryText` | Query text, supports variable references; falls back to the input variable |
| Config | `delayAfterAction` | Wait after execution, default 0 |
| Output | `passages` | Array of recalled passages (text, score, metadata) |
| Output | `content` | Concatenated text, ready to feed into an LLM node |
| Output | `raw` | Raw response object |
| Output | `time_used(ms)` | Retrieval duration in milliseconds |

A typical question-answering flow:

| Step | Node | Key configuration |
| --- | --- | --- |
| 1 | Start | Define a question variable, e.g. `question` |
| 2 | **Knowledge Retrieval** | Select the KBs; set query text to `$start_001.question` |
| 3 | LLM | Reference the previous `content` in the prompt and ask for a grounded answer |
| 4 | Output / Text block | Show the answer and cited passages |

:::tip Variable syntax
Query text supports `$var.xxx` for sub-fields and `$var[idx]&` for array indexes, for example `$start_001.question` from an input block. The host executor resolves variables first, then calls the knowledge base service with `topK` (clamped to 1–50). So **check that documents are Ready** before tuning topK or the threshold — no threshold can recall content that was never indexed.
:::

## 5. Backend capabilities (advanced)

The plugin backend **does not listen on any HTTP port**. It is a child process started by the host, communicating over single-line JSON on stdin / stdout. It exposes only two business handlers:

| Handler | Purpose |
| --- | --- |
| `run_script` | Takes `{script, func, args, kwargs}`, loads the module from `backend/scripts/` by file name, calls the function and returns a JSON-serializable result |
| `list_scripts` | Lists all scripts and their public function names |

Call pattern (this is exactly what the host's `pyBackendBridgeService` does):

```json
{
  "id": "req-1",
  "handler": "run_script",
  "params": {
    "script": "chromadb_script.py",
    "func": "query_embeddings",
    "args": [],
    "kwargs": { "collection_name": "kb_chunks", "query_embeddings": [[0.1, 0.2]], "n_results": 5 }
  }
}
```

Modules and PaddleOCR instances are **cached in the process** so heavy libraries are not reloaded on every call; requests are handled concurrently by an 8-thread pool. The child process can also call back into the host via `hostCall` (plugin config, system paths, AI chat, flow execution), so plugin authors do not need to run their own server.

| Script | Main functions | Used by |
| --- | --- | --- |
| `chromadb_script.py` | `get_version` / `create_collection` / `get_or_create_collection` / `add` / `add_documents` / `query` / `query_embeddings` / `delete` | KB collections, writes, text or vector queries |
| `paddleocr_script.py` | `get_version` / `warmup` / `ocr_image_base64` | OCR, returning lines with text, score and bounding boxes |
| `opencv_script.py` | `get_version` / `image_info_base64` / `resize_base64` | Image dimensions, resizing and PNG/JPG re-encoding |
| `paddlepaddle_script.py` | `get_version` / `device_info` | Runtime version, CUDA and device info |
| `user_script.py` | `hello` / `add` | Example placeholder for custom scripts |

:::note For plugin developers
`run_script` rejects paths outside `backend/scripts/` and returns explicit errors when a script or function is missing; script calls time out after 3600 seconds by default. To reuse an existing capability, simply call the host's `execute_script_sync(script, func, ...)` instead of implementing the child-process protocol yourself. See [Plugin Development](../plugin-dev/index.md) for more conventions.
:::

## 6. Typical combinations and troubleshooting

| Scenario | Plugin capability used |
| --- | --- |
| Feed product manuals to the AI assistant | Knowledge Base tab → document indexing → bind the KB to an Agent skill |
| Grounded Q&A inside a flow | Knowledge Retrieval node → LLM node → output block |
| Screen text picking / automatic form filling | PaddleOCR script (host screen-pick and find-text nodes) |
| Bulk image pre-processing | OpenCV script (`image_info_base64` / `resize_base64`) |
| Browser automation | Install `fat-browser-use` instead; Playwright is not part of this plugin |

| Symptom | Check first |
| --- | --- |
| OCR / Knowledge Base tabs only show install guidance | Plugin not installed or not enabled; or dependencies still installing |
| "This feature requires the plugin fat-ai-base (running xxx_script.py)" | Host cannot resolve the script to a plugin; enable it in the Extension Center and wait for deps |
| Dependency install failed / timed out | Use "Retry" in the UI, or copy the pip command; on slow networks set a `pipIndexUrl` mirror |
| Documents stay Processing or turn Error | Expand the failed row; verify the Embedding model, then reindex or delete and re-upload |
| Knowledge Retrieval returns nothing | Are documents Ready? Are the right KBs selected? Is `scoreThreshold` too high? |
| Recognition is not using PaddleOCR | On Windows the system OCR takes priority — that is the host's intended fallback, not a plugin bug |
| Tabs / node disappear after an upgrade | Check the plugin status in the Extension Center; after uninstall the host keeps placeholders with install guidance |

## 7. Things to keep in mind

- **It is a base, not a toolbox**: no activity bar, sidebar or standalone page. Do not look for a "FatAiBase" window — observe it through AI Settings, flow nodes and the Extension Center.
- **Dependencies are heavy**: ~1–2 GB and a first install that may take hours; `depsTimeoutSeconds: 7200` exists for that reason, so do not reduce it to the host default of 120 seconds.
- **Configuration still belongs to the host**: OCR / KB entries live in the host's AI config; the plugin only supplies the UI and execution. Uninstalling does not delete your configuration — the tabs keep a placeholder.
- **The OCR tab is not recognition settings**: it manages entries only; engine choice, parameters and recognition endpoints live on the host side.
- **Pick a working Embedding model**: it determines whether chunks can be embedded at all, and is the most common cause of "upload succeeded but retrieval is empty".
- **Version differences**: script functions and form fields may change between plugin versions; trust your installed UI and the `list_scripts` output.

## Related docs

- [Popular Plugins · Overview](./index.md) — full plugin list and repositories
- [Extension Center](../guides/extensions.md) — install, enable, dependency status and retry
- [AI Assistant](../guides/ai-assistant.md) — model configuration and Agent skills
- [Flow Automation](../guides/flow-automation.md) — node wiring and variable passing
- [Plugin Development](../plugin-dev/index.md) — contribution points and plugin structure
