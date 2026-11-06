---
title: FatAudio (fat-audio)
sidebar_label: FatAudio
description: "FatAudio (fat-audio): the AI Music Studio with four views (Workspace / AI Generate / Score Editor / Instruments), projects and a transport bar, an 8-track piano roll and mixer, staff notation editing, 16 synthesized instruments with tone parameters, local JSON storage, and the current stub AI generation."
---

# FatAudio (fat-audio)

> After installing the plugin, an **audio icon** appears in the activity bar. It opens a full-page **AI Music Studio (AMS)**: a compact music workspace organized around an **audio project**, with a multi-track piano roll, staff notation, a mixer, a virtual piano and AI generation in one place. Sound is **synthesized live** by the browser's Web Audio API — no sample libraries — and every project is written as JSON under the workspace `fatAudio/` directory. No cloud, no network required.

![FatAudio opening screen: empty AI Music Studio with the New button](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-empty.png)

*First launch shows the "Studio 等你开播" (Studio is waiting for you) empty state: a DJ illustration, a title and the **新建** (New) button; the transport bar and the four view tabs run across the top. Both language versions of this page use screenshots of the Chinese UI.* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-empty.png" target="_blank" rel="noopener">View full image</a>

This is not an audio player or a recorder. It is a **lightweight sketchpad for arranging ideas**: write melodies in the piano roll, place notes on a staff, balance tracks with faders, audition timbres on a virtual piano, and use the AI panel to create placeholder clips. This page follows the natural workflow — create a project, learn the transport bar, use the workspace, edit a score, shape the tone, try AI generation, and finally inspect where the data lives.

## What it is: a four-view music workbench

| Aspect | Details |
| --- | --- |
| Plugin id / version | `fat-audio` / `0.1.0`; UI name AI Music Studio, abbreviated **AMS** in the transport bar |
| Contributions | Activity bar audio icon, a full workbench page, footer status `[fat-audio] ready`; while active it temporarily hides the host's secondary sidebar and bottom panel |
| Unit of organization | **Audio project** (name, description); create / edit / delete / switch, with the last opened project remembered |
| Four views | **Workspace** (tracks + piano roll + mixer), **AI Generate**, **Score Editor**, **Instruments** |
| Default project | 120 BPM / C Maj / 4/4, eight fixed tracks (Piano, Drums, Guitar, Bass, Violin, Synth, Vocals, Strings), a blank 16-measure score, and an 8-channel + Master mixer |
| Sound | Web Audio API: 16 instruments each with its own oscillator mix and filter, plus ADSR, cutoff, reverb, chorus, delay and panning; no external sample files |
| Data & backend | Python backend (`backend/main.py`, about 17 business handlers), called through `sdk.backend.invoke`; JSON files under `fatAudio/` |

The frontend is React 18 + antd 6 with lightweight `useSyncExternalStore` stores split into project / editor / transport / AI state. Playback turns notes into Web Audio oscillators via `audioEngine`. The backend is a resident Python subprocess launched by the host, speaking line-delimited JSON-RPC; writes use a temp file plus atomic replace.

:::note UI language
Labels, buttons and forms inside the plugin follow the host locale (built-in `zh_CN` and `en_US` dictionaries). This page describes the Chinese UI; all screenshots here — and in the Chinese version — show that same interface.
:::

## Getting started: projects, transport bar, and two kinds of save

![New project dialog: name and description](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-project-modal-filled.png)

Click **新建** (New) to open the project dialog: name is required (≤64 chars), description optional (≤256). On confirm, the backend creates `audios/<id>/audio.json` with a default project and the workbench switches to it immediately.

![Project list: name, description, updated time, edit and delete](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-projects.png)

The leftmost back arrow in the transport bar returns to the project list: each row shows the name, description and updated time, with edit (pencil) and delete (trash) buttons. **Deleting a project cascades to its entire directory and cannot be undone.** The project name at the top is a dropdown for switching or creating projects, with a small dot indicating unsaved changes.

![Project switch dropdown: existing projects and New](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-project-switch.png)

The id of the last opened project is stored in plugin-level configuration, so reopening FatNotes loads that project automatically.

:::tip Saving works in three different ways
- **Manual save**: adding, moving or deleting notes in the piano roll or score only marks the project *dirty* (dot next to the name, highlighted save button). Click the save button on the right of the transport bar, or **保存到工程** (Save to project) in the tone panel.
- **Debounced auto-save**: track volume, M/S and mixer faders are written 300 ms after you stop dragging.
- **Immediate metadata save**: creating / renaming / deleting projects updates `audios.json` directly, separate from the project body.
:::

### The transport bar, shared by every view

![Transport bar left: back, project name and the four view tabs](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-transport-left.png)

![Transport bar right: status, save, zoom, snap, undo/redo and metronome](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-transport-right.png)

| Area | Controls | Purpose |
| --- | --- | --- |
| Left | Back / project dropdown / four tabs | Return to the list, switch or create a project, switch views (tabs are disabled with no project open) |
| Center | Rewind · previous marker · play/stop · next marker · fast-forward | Transport control; previous / next marker actually move the play position by ±5 seconds |
| Center | `HH:MM:SS.mmm` / BPM / key / time signature | Current play position and project-level song parameters (120 BPM, C Maj, 4/4 by default) |
| Right | CPU / MEM / WASAPI | Status readouts currently shown as **static placeholders**, not real measurements |
| Right | Zoom 25%–400% | Changes the pixels-per-beat of the piano roll; the score is unaffected |
| Right | Snap / Undo / Redo / Metronome | Snap on = 1/4 beat, off = 1/8 beat; **undo / redo are enabled only in Score Editor**; metronome is a toggle state |

:::tip What actually plays
Pressing play in **Score Editor** schedules `score.notes`; in every other view it schedules the piano-roll notes of **all tracks**, converting beats with the project BPM and applying the current tone parameters. The two sets of notes are independent — see the next section and the score section.
:::

## Workspace: tracks, piano roll and mixer

![Workspace overview: track list, piano roll and mixer](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-workspace.png)

*Three columns: Tracks selects and mutes, Piano Roll edits notes, Mixer balances levels. The colored note blocks and varied fader heights are demo data.* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-workspace.png" target="_blank" rel="noopener">View full image</a>

### Track list

![Track panel: eight default tracks with M / S / volume](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-tracks.png)

Every new project starts with eight color-coded tracks: Piano, Drums, Guitar, Bass, Violin, Synth, Vocals, Strings. Clicking a row selects it, and the piano roll shows only that track's notes. Each row has **M (mute) / S (solo)** buttons and a volume slider; changes auto-save after 300 ms. The track set is fixed — **no adding, removing or renaming tracks**.

### Piano roll

![Piano roll: 49 semitone keys, measure ruler and colored note blocks](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-piano-roll.png)

The keyboard on the left spans 49 semitones (C2–C6) with note names on C positions; the grid on the right is divided into measures and beats, and note blocks are colored **by pitch class** (seven colors for C–B). Common operations:

| Action | Result |
| --- | --- |
| Click empty grid | Add a one-beat note at that pitch and beat, and audition it immediately |
| Drag a note block | Change pitch and start beat together, aligned to the snap grid |
| Click a note block | Select and audition; then ↑↓ shifts a semitone, ←→ moves 1/4 beat, `Delete` removes it |
| Click or drag the measure ruler | Move the playhead |
| Transport zoom | 25%–400% pixels-per-beat; long pieces scroll horizontally |

### Mixer

![Mixer: eight channel strips and Master](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-mixer.png)

Each track gets one channel strip, followed by the **Master** output: drag a fader to change volume (double-click resets to 100), with a dB readout and pan label (C / L / R) at the bottom. Drag the panel's left edge to resize it (260–600 px; width is remembered in browser localStorage). Narrow widths scroll horizontally; at wide widths all eight channels plus Master fit on screen.

:::warning A sketchpad, not a finished DAW
There is no audio / MIDI file import or export, no recording, no effect-plugin chain, no waveform clips, and no WAV/MP3 rendering. The piano roll and mixer store **notes and parameters**; sound is synthesized in the browser only during playback.
:::

## Score Editor: a staff you can click, drag and type into

![Score Editor overview: toolbar, controls, staff canvas and note properties](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score.png)

*Top: durations / accidentals / tools. Middle left: score settings; middle right: the staff. Bottom: properties of the selected note.* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-score.png" target="_blank" rel="noopener">View full image</a>

| Area | Options |
| --- | --- |
| Toolbar | 6 durations (whole / half / quarter / eighth / sixteenth / dotted), accidentals (none / sharp / flat / natural), 5 tools (select / eraser / slur / dynamics / rest), input octave 0–7 |
| Left controls | Instrument (16), key signature (10 major/minor keys), time signature (4/4 · 3/4 · 6/8), clef (treble / bass / alto), measures 4–64, measures per line 2–8, and toggles for note names / fingering / dynamics |
| Bottom properties | Pitch (± semitone), duration, velocity (seven steps pp–fff), tie on/off, accidental; rests only show duration |

![Staff detail: colored notes, measure numbers, dynamics and fingering](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score-staff.png)

The score supports both mouse and keyboard input: **click to add**, **A–G keys to enter notes**, **1–6 keys for durations**, drag to move, `Delete` to remove, `Ctrl+Z` to undo, ↑↓ for pitch and ←→ for beat position. With the eraser tool, clicking a note deletes it; the slur tool toggles its tie; the dynamics tool cycles pp→fff; the rest tool places a rest. Undo / redo in the transport bar also work only in this view.

![Note properties: pitch, duration, velocity, tie and accidental](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-score-props.png)

:::note Two independent note sets
Score notes (`score.notes`, with measure, beat, duration, accidental, velocity) and track notes (`tracks[].notes`, with MIDI pitch, start beat and duration) are two separate arrays in the same project. A melody written on the staff does **not** appear in the piano roll, and vice versa. Playback picks one set according to the active view.
:::

## Instruments: 16 timbres, tone parameters and a virtual piano

![Instruments view: library, tone panel and virtual piano](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-instruments.png)

*Left: instrument library. Right: pitch and tone parameters. Bottom: a C3–B4 virtual piano.* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-instruments.png" target="_blank" rel="noopener">View full image</a>

![Instrument library: seven categories and sixteen instruments](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-instrument-library.png)

The left column filters 16 instruments by **All / Keyboard / Strings / Winds / Percussion / Vocals / Synth**: Piano, E-Piano, Organ, Synth, Guitar, E-Guitar, Bass, Violin, Cello, Flute, Saxophone, Trumpet, Drums, String Ensemble, Vocals and Brass Ensemble. Selecting a card sets the current audition timbre; the `+` button behaves like selecting the card and **does not add a track** to the project.

![Pitch control and tone parameters: ADSR, filter, effects, eight built-in presets](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-tone.png)

The right panel has three groups:

| Group | Parameters |
| --- | --- |
| **Pitch control** | Octave −2…+2, fine tuning ±50 cents, master pitch A4 = 440 Hz, pitch bend 1 / 2 / 3 / 6 / 12 semitones |
| **Tone parameters** | Attack / Decay / Sustain / Release (ADSR), cutoff 20–20000 Hz, resonance, reverb, chorus, delay and pan (10 items) |
| **Presets** | 8 built-ins (Warm Piano, Bright E-Piano, Deep Organ, Soft Strings, Crisp Guitar, Jazz Bass, Cinematic Brass, Electronic Pulse), plus **Save preset**, which stores the current parameters under a name in `presets.json`; bottom buttons reset parameters or save to the project |

![Virtual piano: 14 white and 10 black keys from C3 to B4, with C4 highlighted](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-virtual-piano.png)

Click a key on the virtual piano to audition it: the key stays highlighted for 0.5 seconds and uses the **currently selected instrument plus current tone parameters**, so changes to ADSR or reverb are audible immediately without playing the whole arrangement.

Under the hood, `audioEngine` builds each instrument from 1–3 oscillators (sine / triangle / sawtooth / square) with different weights and detunes, passes them through a low-pass or band-pass filter, and applies an ADSR envelope, convolution reverb, delay and stereo panning. These 16 instruments are therefore **synthesized timbres**, not samples — zero dependencies, instantly tweakable.

## AI Generate: from prompt to clips (currently a stub)

![AI Generate overview: form on the left, results and history on the right](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-overview.png)

*Left column: generation conditions. Right column: clips and AI history, with an empty-state hint before the first run.* · <a href="/fat-notes-home/img/instruction/fatAudio/zh/fa-ai-overview.png" target="_blank" rel="noopener">View full image</a>

![AI form: prompt, genres, parameters, instruments and mood](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-form-filled.png)

| Parameter | Values |
| --- | --- |
| Prompt | Free text, **required** (describe style, mood, rhythm) |
| Genre | 10 multi-select chips: Pop / Rock / Jazz / Classical / Electronic / Hip-hop / R&B / Folk / Country / Blues |
| BPM / key / time signature | BPM 40–240; 10 major/minor keys; 4/4 · 3/4 · 6/8 |
| Duration | 30 seconds / 1 minute / 2 minutes / 5 minutes |
| Instruments | 7 multi-select: Piano / Drums / Guitar / Bass / Strings / Synth / Vocals |
| Mood | Cheerful / Melancholy / Passionate / Calm / Romantic / Mysterious |

Click **开始生成** (Start generating) and the right column shows 1–3 clip cards (genre-based title, duration, mini waveform), each with preview, add-to-workspace, download and delete actions.

![Generated results: clip cards, duration and action buttons](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-results.png)

![Waveform preview: two-color progress, time readout and back / play / forward](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-preview.png)

Clicking play expands a card into a large waveform: purple for played, orange for unplayed, with a progress bar and a `0:26 / 1:00` readout at the top, plus back / play / forward buttons (each ±1 second) at the bottom.

![AI history: timestamps, prompt excerpts and clip counts](pathname:///fat-notes-home/img/instruction/fatAudio/zh/fa-ai-history.png)

The collapsible **AI 历史** (AI History) panel at the bottom right records each run's timestamp, prompt excerpt and clip count, and can be cleared in one click. Records are stored in the project's `aiHistory.json`, separate per project.

:::warning Read this first: AI generation is a mock
`backend/service/aiService` is a **stub**: it validates the prompt, BPM (40–240), duration (30/60/120/300 s) and genres, waits a random 1–2 seconds, then builds 1–3 **placeholder clips with random waveforms**. No model is called and no audible audio is produced. Consequently:
- Clip waveforms are placeholder data (they appear as solid stripes in the screenshots) and preview is just a progress animation;
- **Add to workspace** only shows a success toast; **Download** replies "Download not implemented yet";
- The plugin config reserves a `realAi` flag and an `sdk.ai.chat` integration point, but the current build does not wire it up.

In short, the AI panel demonstrates the **interaction flow and data structure**; real composition / audio generation awaits a future model integration.
:::

## Data & storage: everything stays local

The backend uses `fatAudio/` under the workspace root as its data store:

```text
<workspace>/fatAudio/
├── audios.json                  # project list: id / name / description / timestamps
└── audios/<project id>/
    ├── audio.json               # project body: BPM, key, time signature, 8 tracks + notes, score, mixer, settings
    ├── settings.json            # project-level settings (tone params, etc.)
    ├── presets.json             # custom tone presets
    └── aiHistory.json           # AI generation history for this project
```

All files are UTF-8 JSON, written with a temp file plus atomic replace, so an interrupted exit is unlikely to corrupt a whole project. Frontend calls through `sdk.backend.invoke` include: list `listAudios` / `createAudio` / `updateAudio` / `deleteAudio` / `reorderAudios`, project `getAudio` / `saveAudio`, settings `getAudioSettings` / `saveAudioSettings` / `updateAudioSettings`, presets `listPresets` / `savePreset` / `deletePreset`, history `listAiHistory` / `appendAiHistory` / `clearAiHistory`, and `generateAudio`; plus four host-config handlers (login info, plugin config, system paths).

Plugin-level configuration (last project id, workspace root, default parameters, the `realAi` flag) lives in the host's `sdk.config`, outside `fatAudio/`.

## Before you start

- **Deleting a project cascades to its whole directory**, and there is no project export / backup; copy `audios/<project id>/` yourself for anything important;
- No WAV / MP3 / MIDI / project import or export, no recording; sound exists only as live browser synthesis;
- Eight tracks are fixed and cannot be added or removed; score notes and track notes are not linked;
- Note edits need a manual save; only volume / fader changes auto-save with a debounce;
- The CPU / MEM / WASAPI readouts in the transport bar are static placeholders;
- AI generation is a mock stub (see above): clips cannot be downloaded or actually played in the project;
- Scaffold leftovers remain (the registration still declares the `Puzzle` icon name although the host renders an audio icon, the footer shows `[fat-audio] ready`, and the repo README is still the template). Treat this page and the running UI as the source of truth.

## Summary

FatAudio splits "writing a melody" into four switchable perspectives: the **Workspace** arranges notes and levels across tracks, the **Score Editor** writes measures on a staff, **Instruments** auditions 16 synthesized timbres with ADSR controls, and **AI Generate** demonstrates the future generation flow with a structured form. They share one project, one transport bar and one set of local JSON files. It is handy for capturing motifs quickly, teaching pitch and note values, or sketching arrangements without a DAW — but remember it is currently a **sketchpad with placeholder AI**, not a finished audio production tool.

## Related docs

- [Popular plugins overview](./index.md)
- [FatPhoto](./fat-photo.md)
- [FatPen](./fat-pen.md)
- [FatAiBase](./fat-ai-base.md)
- [Plugin development](../plugin-dev/index.md)
