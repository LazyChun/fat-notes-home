---
title: IT Interview Bank (fat-it-interview)
sidebar_label: IT Interview Bank
description: "IT Interview Bank (fat-it-interview): 364 questions across Web Frontend / Java / Backend / Ops / Algorithms / Database / Networking / OS, with category + cross-category search, practice mode and local progress; 21 algorithm problems animate step by step (bars / array / grid / linked list / matrix / tree). Ships 'Daily Question' and 'Algorithm Demo' dashboard cards."
---

# IT Interview Bank (fat-it-interview)

> After installing the plugin, a **"IT 面试" (IT Interview)** icon appears in the activity bar. Opening it shows a two-pane workbench: a category tree on the left and a practice page on the right. The question bank and the algorithm demos both run **entirely in the frontend with no backend**; your practice history and mastery status are stored only in the local browser.

This is a "practice" plugin: it bundles **364 questions** organized into eight tracks — Web Frontend, Java, Backend, Ops, Algorithms, Database, Networking, and OS — each with its own subcategories. Its standout feature is that **21 algorithm problems can be played step by step**: sorting, search, two pointers, linked lists, trees, graphs and DP animate frame by frame instead of just handing you a code snippet.

This page focuses on **how to use the bank** and **how to read the algorithm demos** — the part that sets it apart from a static "interview PDF".

## What it is: a frontend-only practice plugin

Like FatTools, IT Interview Bank uses the host's plugin contribution points:

- **Activity bar**: an "IT 面试" icon that opens the plugin;
- **Primary sidebar**: only the category tree and search;
- **Workbench page**: an overview and the practice view;
- **Dashboard cards**: "Daily Question" and "Algorithm Demo" (category "other", no data-query config);
- When active, the plugin asks the host to **hide the secondary sidebar and the bottom panel** for more room.

Everything runs in the frontend, so it works offline; practice records live in `localStorage` and are never uploaded.

## Coverage: eight tracks, 364 questions

![IT Interview Bank overview](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-home.png)

The opening screen is an **overview** with eight track cards, each showing its question count and a one-line blurb, plus a **mastery progress bar** (mastered x / total). Quick actions at the top: **Daily Question** (a date-stable pick), **Random**, **Continue** (last opened) and **Algorithm Demo (21)**.

| Track | Count | Subcategories |
| --- | --- | --- |
| Web Frontend | 283 | HTML, CSS, JavaScript, React, Redux, Zustand, Vue, Webpack, Vite, Browser, TypeScript, Performance, Handwritten, Engineering, Web Security, AI Eng, Design |
| Java | 12 | JVM, Collections, Concurrency, Spring, Language basics |
| Backend | 12 | API design, Cache, Message queue, Distributed, System design |
| Ops | 10 | Linux, Docker, Kubernetes, Delivery & Observability, Nginx |
| Algorithms | 21 | Sorting, Search, Pointers & window, Linked list, Tree, Graph, DP |
| Database | 10 | Index, Transaction, SQL, Redis |
| Networking | 8 | TCP, HTTP, HTTPS, DNS, UDP |
| OS | 8 | Process & scheduling, Memory, Synchronization, IO & kernel |

> Questions are tagged **Easy / Medium / Hard** (green / gold / red). Each has a prompt (the interviewer's wording), a reference answer (bullet points + code), and follow-ups.

## Sidebar: category tree + cross-category search + progress

![Sidebar: category tree, search box and progress](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-sidebar.png)

The primary sidebar holds just two things: a **search box** and the **category tree**.

- The top stat line reads **`364 题 · 已掌握 0`** (364 questions · 0 mastered);
- The tree expands into eight tracks, each with an expand/collapse arrow and a `done/total` mastery count;
- Subcategories also show `done/total`, so you always know how far you've gone.

![Cross-category search: typing "虚拟内存" jumps to the OS / Memory question](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-search.png)

The search box searches **across all tracks** by keyword, tag or category (e.g. "虚拟内存"), listing each hit with its **parent / child category path**. The host's **global search (⌘/Ctrl + K)** also reaches interview questions, all tagged "面试题".

## Practice and practice mode

![Question page: left list, right prompt and reference answer](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-question.png)

Inside any track you get the classic three-pane layout: **question list on the left, detail on the right**.

- The list has keyword search, difficulty filters (All / Easy / Medium / Hard) and a "unmastered only" toggle;
- The detail shows the **difficulty tag, the prompt box**, and three actions: **Mark mastered**, **Add to review**, **Copy answer**;
- The reference answer is **hidden behind a "查看参考答案" button** by default — that's the point of **practice mode**: think first, then check;
- Below the answer sit **follow-ups** that push the topic deeper; the bottom has **Prev / Next** for sequential practice.

Practice mode, mastery and review status are stored locally: mastered questions get a checkmark on cards and lists, and review-flagged ones surface in the overview's **To review** area.

## Algorithm demos (the highlight): watch algorithms run step by step

This is the feature most worth calling out. **21 algorithm problems don't just give an answer — they animate**:

Bubble, selection, insertion, quicksort, merge, heapsort, binary search & lower bound, two pointers, sliding window, move zeroes, BFS, DFS, reverse linked list, cycle detection, 0/1 knapsack, climb stairs, max subarray, LCS, inorder & level-order traversal.

Each ships an **algorithm player** with:

- a **visualization stage** in one of six forms — bars, array (with pointers), grid (graph search), linked list (SVG nodes + pointers), matrix (DP table), tree (traversal);
- **step controls**: `Prev / Play / Next / Reset`, frame by frame or auto-play;
- **speed**: `0.5x / 1x / 2x / 4x`;
- a **progress slider** to jump to any step;
- a **legend** coloring "compare / swap / pivot / done / focus" so each step is readable;
- **editable input**: most demos let you supply your own data (e.g. `5,1,4,2,8`) and hit "重新演示" (Replay) from your input.

![Algorithm demo: bubble sort bars with the player controls](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-algo-bubble.png)

Take **bubble sort**: bar height is the value, each step highlights the pair being "compared" or "swapped", and after a pass the max is colored "done" (green); the legend tells you each bar's state at a glance, and the speed/slider are always adjustable.

![Algorithm demo: reverse linked list, prev / curr / next pointers advancing per step](pathname:///fat-notes-home/img/instruction/fatItInterview/zh/it-algo-list.png)

Now **reverse linked list**: nodes are rounded value boxes, arcs show pointer direction, and `prev / curr / next` are color-coded by position. Stepping through makes the "remember next, point curr.next to prev, advance all three" sequence obvious, instead of mentally simulating Java/JS code.

The other visualizations read similarly: binary search & lower bound use an **array with lo/hi/mid pointers**, sliding window an **array with a window highlight**, BFS/DFS a **grid (frontier / visited / path)**, 0/1 knapsack and LCS a **matrix (DP table)**, inorder/level-order a **tree (stack / queue / visiting / visited)**. On the same page you get both the **prose + code** and the **playable demo**, so theory and practice line up.

## Dashboard cards: bring questions and demos to your workbench

The plugin provides two dashboard cards (category "other", no query config):

- **Daily Question** (`fat-it-interview.daily`): shows today's pick; you can peek the answer in-card or "在题库中打开" to jump to the full practice page;
- **Algorithm Demo** (`fat-it-interview.algo`): a dropdown to pick any of the 21 demos and play it right on the dashboard.

So you can pin "daily question" or an algorithm demo on a board you use daily, and practice on open without entering the plugin.

## Commands and settings

- Command **`fat-it-interview.openQuestion`**: open a question by id (e.g. from a script or shortcut);
- Command **`fat-it-interview.ping`**: returns `pong` with the current question count, for a quick health check;
- **Settings page**: explains the built-in count, that practice mode hides answers by default, that mastery/review stay local, and how the `openQuestion` command works.

## Summary

IT Interview Bank combines "memorizing" with "watching algorithms run":

- **364 questions across eight tracks**, cleanly categorized, cross-searchable, with difficulty and mastery progress;
- **Practice mode** quizzes you before revealing answers; mastery and review live on the device;
- **21 algorithm problems animate step by step** — six visualizations plus step/play/speed/editable input — its most brilliant part;
- **Daily Question / Algorithm Demo** dashboard cards embed practice into your everyday workbench.

Great for daily review, pre-interview cramming, and actually *seeing* algorithms rather than memorizing them.
