/**
 * FatNotes 发行版与更新日志数据（中英双语）
 *
 * 数据来源：
 * - Gitee Release API：https://gitee.com/api/v5/repos/lazychun/fat-notes/releases
 * - 远端 version.json：https://raw.giteeusercontent.com/lazychun/fat-notes/raw/master/version.json
 * - 本地开发提交记录（git log，未公开发布）
 *
 * 说明：主程序源码未公开发布，对外只提供 Windows 安装包；页面只引用发行版页面地址，
 * 不提供源码包或仓库链接。DOWNLOAD 始终表示当前可下载版本，历史版本信息放在
 * PREVIOUS_DOWNLOAD / FIRST_DOWNLOAD；dev 条目是正式版发布前的阶段性记录，不代表另行发布的安装包。
 * 发布新版时：更新 DOWNLOAD，把旧值移入 PREVIOUS_DOWNLOAD，把更早的版本依次后移
 * （必要时新增历史常量），并在 releases 数组头部追加一项。
 *
 * @author By AICode
 * @date 2026-11-11
 */

import {L} from './i18n';
import type {Localized} from './i18n';

/** 当前可下载版本的真实信息（v0.1.2，2026-11-11 15:00 发布） */
export const DOWNLOAD = {
  version: '0.1.2',
  fileName: 'FatNotes-Setup-0.1.2.exe',
  /** Gitee 附件直链，应用内「检查更新」也使用同一地址规则 */
  url: 'https://gitee.com/lazychun/fat-notes/releases/download/v0.1.2/FatNotes-Setup-0.1.2.exe',
  /** 远端 version.json 提供的安装包 MD5，与本地 dist 打包产物一致 */
  md5: 'cac7e3df11c79e3a4777f37d225b9eea',
  /** Content-Length: 63056511 bytes */
  fileSize: '60.1 MB',
  publishedAt: '2026-11-11',
  releasesUrl: 'https://gitee.com/lazychun/fat-notes/releases',
  releaseTagUrl: 'https://gitee.com/lazychun/fat-notes/releases/tag/v0.1.2',
} as const;

/** 上一个正式版本，仅供更新日志里的历史版本展示 */
export const PREVIOUS_DOWNLOAD = {
  version: '0.1.1',
  fileName: 'FatNotes-Setup-0.1.1.exe',
  url: 'https://gitee.com/lazychun/fat-notes/releases/download/v0.1.1/FatNotes-Setup-0.1.1.exe',
  fileSize: '60.1 MB',
  releaseTagUrl: 'https://gitee.com/lazychun/fat-notes/releases/tag/v0.1.1',
} as const;

/** 首个正式版本（历史存档），供更新日志中的 v0.1.0 条目引用 */
export const FIRST_DOWNLOAD = {
  version: '0.1.0',
  fileName: 'FatNotes-Setup-0.1.0.exe',
  url: 'https://gitee.com/lazychun/fat-notes/releases/download/v0.1.0/FatNotes-Setup-0.1.0.exe',
  fileSize: '60.1 MB',
  releaseTagUrl: 'https://gitee.com/lazychun/fat-notes/releases/tag/v0.1.0',
} as const;

export type ChangeKind = 'feat' | 'improve' | 'fix';

export interface ChangeItem {
  kind: ChangeKind;
  text: Localized;
}

export interface ReleaseAsset {
  label: Localized;
  meta: string;
  url: string;
}

export interface ReleaseEntry {
  id: string;
  version: string;
  date: string;
  channel: 'stable' | 'dev';
  title: Localized;
  summary: Localized;
  changes: ChangeItem[];
  assets?: ReleaseAsset[];
  /** 该版本的发行版页面地址（非源码仓库） */
  releaseUrl?: string;
}

/** 按时间倒序：第 1 项为当前下载版本，其余为历史版本与开发记录 */
export const releases: ReleaseEntry[] = [
  {
    id: 'v0.1.2',
    version: 'v0.1.2',
    date: '2026-11-11',
    channel: 'stable',
    title: L('块编辑打磨与问题修复', 'Block Editing Polish & Bug Fixes'),
    summary: L(
      '第三个公开预览版。官方发布说明为「修复一些 bug」；11 月 8 日以来的插件安装、画布缩放与块编辑交互改进也一并打包。',
      'Third public preview. Official notes say "bug fixes", bundled with the plugin installation, canvas zoom, and block editing improvements made since Nov 8.',
    ),
    changes: [
      {
        kind: 'fix',
        text: L(
          '修复若干已知问题（官方发布说明）。',
          'Fixed known issues (official release note).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '块支持悬停编辑：鼠标移到块上即可直接唤起编辑操作（11-11）。',
          'Hover-to-edit for blocks: hovering a block now exposes its editing affordances (Nov 11).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '优化块编辑时的按键处理，输入与快捷键更顺手（11-11）。',
          'Improved key handling while editing blocks, with smoother typing and shortcuts (Nov 11).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '增强 FatFlow / BlockFlow 画布的缩放能力（11-10）。',
          'Better zoom behavior in the FatFlow and BlockFlow canvases (Nov 10).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '扩展安装按钮的状态与加载提示更清晰（11-08）。',
          'Clearer install button states and loading indicators for extensions (Nov 8).',
        ),
      },
      {
        kind: 'fix',
        text: L(
          '修复插件更新流程中的异常（11-08）。',
          'Fixed issues in the plugin update flow (Nov 8).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '版本号升至 0.1.2，安装包与自动更新通道同步更新（11-11）。',
          'Version bumped to 0.1.2 with the installer and in-app update channel kept in sync (Nov 11).',
        ),
      },
    ],
    assets: [
      {
        label: L('Windows 安装包', 'Windows installer'),
        meta: `${DOWNLOAD.fileName} · ${DOWNLOAD.fileSize}`,
        url: DOWNLOAD.url,
      },
    ],
    releaseUrl: DOWNLOAD.releaseTagUrl,
  },
  {
    id: 'v0.1.1',
    version: 'v0.1.1',
    date: '2026-11-07',
    channel: 'stable',
    title: L('编辑器与 AI 助手升级', 'Editor & AI Assistant Upgrade'),
    summary: L(
      '第二个公开预览版。官方发布说明为「优化 AI 助手、修复已知 bug」；11 月以来的编辑器、导出与扩展管理改进也一并打包。',
      'Second public preview. Official notes highlight an improved AI assistant and bug fixes, bundled with the November editor, export, and extension improvements.',
    ),
    changes: [
      {
        kind: 'improve',
        text: L(
          '优化 AI 助手（官方发布说明）。',
          'Improved the AI assistant (official release note).',
        ),
      },
      {
        kind: 'fix',
        text: L(
          '修复若干已知问题（官方发布说明）。',
          'Fixed known issues (official release note).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '命令面板新增文档入口，并补齐多语言文案（11-07）。',
          'Documentation access from the command palette, plus localization updates (Nov 7).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '导出 funcs.json 时同步功能名称与描述（11-07）。',
          'funcs.json exports now sync function names and descriptions (Nov 7).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '富文本块支持媒体上传、缩放与行内编辑；新增 Excel / Word / PPT / PDF 导出（11-04）。',
          'Rich-text media upload, resizing and inline editing; Excel, Word, PPT, and PDF export (Nov 4).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          'Markdown 块支持实时编辑，并简化组件实现与样式（11-03 / 11-04）。',
          'Live Markdown editing and a simpler component with cleaner styles (Nov 3–4).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '块配置同步与 API 集成增强；新增运行时 token 文件管理，强化本地 API 鉴权（11-05）。',
          'Improved block configuration sync and API integration; added runtime token file management for local API auth (Nov 5).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '重构「功能 / 我的工作流」面板的布局结构（11-06）。',
          'Refactored the layout of the My Functions / My Workflows panels (Nov 6).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '扩展安装状态管理、标签关闭与下拉样式优化（11-04）。',
          'Better extension install state, tab closing, and dropdown styling (Nov 4).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '版本号升至 0.1.1，安装包与自动更新通道同步更新（11-07）。',
          'Version bumped to 0.1.1 with the installer and in-app update channel kept in sync (Nov 7).',
        ),
      },
    ],
    assets: [
      {
        label: L('Windows 安装包', 'Windows installer'),
        meta: `${PREVIOUS_DOWNLOAD.fileName} · ${PREVIOUS_DOWNLOAD.fileSize}`,
        url: PREVIOUS_DOWNLOAD.url,
      },
    ],
    releaseUrl: PREVIOUS_DOWNLOAD.releaseTagUrl,
  },
  {
    id: 'v0.1.0',
    version: 'v0.1.0',
    date: '2026-11-02',
    channel: 'stable',
    title: L('FatNotes（肥宅笔记）第一版', 'FatNotes: The First Release'),
    summary: L(
      '首个公开预览版。安装包、自动更新通道与文档中心同步上线，Windows 用户下载后即可开箱使用。',
      'The first public preview. Installer, in-app update channel, and the docs site all shipped together — Windows users can start right after installing.',
    ),
    changes: [
      {
        kind: 'feat',
        text: L(
          'Windows 安装包 FatNotes-Setup-0.1.0.exe（约 60.1 MB），安装后无需配置环境；需 Windows 10+ 与 WebView2 运行时。',
          'Windows installer FatNotes-Setup-0.1.0.exe (~60.1 MB), ready to use with no environment setup; requires Windows 10+ and the WebView2 runtime.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '本地优先工作空间：笔记、附件与配置全部保存在你自己选择的目录。',
          'Local-first workspace: notes, attachments, and configuration all live in a folder you choose.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '60+ 种块类型：Markdown、富文本、表格、图表、终端、流程图等，可自由拖拽排版。',
          '60+ block types: Markdown, rich text, tables, charts, terminal, flowcharts, and more — arranged by drag and drop.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '数据看板与流程自动化：连接 SQLite / Excel 数据源，用可视化节点编排重复任务。',
          'Data dashboards and workflow automation: connect SQLite / Excel sources and orchestrate repetitive tasks with visual nodes.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '插件生态：基于 Module Federation 运行时加载，重型依赖由插件按需安装。',
          'Plugin ecosystem: runtime loading via Module Federation, with heavy dependencies installed on demand by each plugin.',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '本地 API 鉴权，以及 FastAPI / 插件后端的退出清理流程。',
          'Local API authentication and graceful shutdown for the FastAPI and plugin backends.',
        ),
      },
      {
        kind: 'fix',
        text: L(
          '修复流程编辑抽屉潜在的空引用问题。',
          'Fixed a potential null reference in the flow editor drawer.',
        ),
      },
    ],
    assets: [
      {
        label: L('Windows 安装包', 'Windows installer'),
        meta: `${FIRST_DOWNLOAD.fileName} · ${FIRST_DOWNLOAD.fileSize}`,
        url: FIRST_DOWNLOAD.url,
      },
    ],
    releaseUrl: FIRST_DOWNLOAD.releaseTagUrl,
  },
  {
    id: 'dev-2026-10-31',
    version: '2026.10.31',
    date: '2026-10-29 → 11-01',
    channel: 'dev',
    title: L('数据源与文件体验', 'Data Sources & File Handling'),
    summary: L(
      '开发快照 · 首个预览版发布前的阶段性记录。围绕 Excel 数据源、看板文件操作与插件目录打磨。',
      'Dev snapshot · pre-release progress notes. Excel sources, board file operations, and the extension catalog.',
    ),
    changes: [
      {
        kind: 'feat',
        text: L(
          'Excel 数据源同步与配置；看板支持文件拖放管理（10-31）。',
          'Excel data source sync and configuration; file drop handling for boards (Oct 31).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '自定义插件支持仓库地址字段与「不可安装」状态提示（10-31）。',
          'Repository URL fields and an explicit "cannot install" state for bespoke plugins (Oct 31).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '仪表盘导出、快速输入组件接入插件注册表（10-29）。',
          'Dashboard export and plugin registry support in Quick Input (Oct 29).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '项目配置同步、插件加载期间的样式管理（10-29）。',
          'Project configuration sync and style management during plugin loading (Oct 29).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '清理 package.json 与 requirements.txt 中未使用的依赖（11-01）。',
          'Removed unused dependencies from package.json and requirements.txt (Nov 1).',
        ),
      },
    ],
  },
  {
    id: 'dev-2026-10-27',
    version: '2026.10.27',
    date: '2026-10-26 → 10-27',
    channel: 'dev',
    title: L('插件 SDK 与 AI 能力', 'Plugin SDK & AI'),
    summary: L(
      '开发快照 · 首个预览版发布前的阶段性记录。插件可注册块分类，AI 助手与代码生成能力继续补齐。',
      'Dev snapshot · pre-release progress notes. Plugins can register block categories, with more AI assistance and code generation.',
    ),
    changes: [
      {
        kind: 'feat',
        text: L(
          '插件 SDK 新增块分类注册与管理、最低宿主版本约束（10-27）。',
          'Block category registration and minimum host version support in the plugin SDK (Oct 27).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '扩展目录一键刷新，并支持从仓库地址直接安装插件（10-27）。',
          'One-click extension catalog refresh and installation from a repository URL (Oct 27).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          'AI 对话支持重试，文档处理链路更稳定（10-27）。',
          'Retry support for AI chat and more reliable document handling (Oct 27).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '代码与终端块接入 AI 脚本生成（10-26）。',
          'AI script generation inside the Code and Terminal blocks (Oct 26).',
        ),
      },
      {
        kind: 'fix',
        text: L(
          '修复流程编辑抽屉潜在的空引用问题（10-26）。',
          'Fixed a potential null reference in the flow editor drawer (Oct 26).',
        ),
      },
    ],
  },
  {
    id: 'dev-2026-10-25',
    version: '2026.10.25',
    date: '2026-10-25',
    channel: 'dev',
    title: L('块系统大扩充', 'A Big Batch of Blocks'),
    summary: L(
      '开发快照 · 首个预览版发布前的阶段性记录。终端、视频、轮播、时钟等块集中落地。',
      'Dev snapshot · pre-release progress notes. Terminal, video, carousel, clock, and other blocks landed together.',
    ),
    changes: [
      {
        kind: 'feat',
        text: L(
          '新增终端块、视频块、轮播块与带调度能力的时钟块。',
          'Added Terminal, Video, Carousel, and Clock blocks with scheduling support.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '剪贴板内容可一键粘贴为块，文件管理加入右键菜单与剪贴板联动。',
          'Paste clipboard content directly as blocks; context menu and clipboard integration for file management.',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '图片块支持上传与装饰配置，Word / Excel / PDF / PPT 文件处理增强。',
          'Image block upload and decorations, plus improved Word / Excel / PDF / PPT handling.',
        ),
      },
      {
        kind: 'improve',
        text: L(
          '代码 / 终端块的主题与按钮交互样式统一，轮播自动播放更稳定。',
          'Unified themes and button interactions for Code / Terminal blocks, and steadier carousel autoplay.',
        ),
      },
    ],
  },
];
