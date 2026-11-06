/**
 * FatNotes 发行版与更新日志数据（中英双语）
 *
 * 数据来源：
 * - Gitee Release API：https://gitee.com/api/v5/repos/lazychun/fat-notes/releases
 * - 远端 version.json：https://raw.giteeusercontent.com/lazychun/fat-notes/raw/master/version.json
 * - 本地开发提交记录（git log，未公开发布）
 *
 * 说明：主程序源码未公开发布，对外只提供 Windows 安装包；页面只引用发行版页面地址，
 * 不提供源码包或仓库链接。v0.1.0 是唯一已打包发布的版本；其后标记为 dev 的条目是开发快照，
 * 尚未打进安装包，仅供了解迭代进度。发布新版时只需在 releases 数组头部追加一项。
 *
 * @author By AICode
 * @date 2026-11-07
 */

import {L} from './i18n';
import type {Localized} from './i18n';

/** 当前可下载版本的真实信息 */
export const DOWNLOAD = {
  version: '0.1.0',
  fileName: 'FatNotes-Setup-0.1.0.exe',
  /** Gitee 附件直链，应用内「检查更新」也使用同一地址规则 */
  url: 'https://gitee.com/lazychun/fat-notes/releases/download/v0.1.0/FatNotes-Setup-0.1.0.exe',
  /** 远端 version.json 提供的安装包 MD5 */
  md5: 'dfdae2e958359702dbc729f9670cf3ca',
  /** Content-Length: 63006012 bytes */
  fileSize: '60.1 MB',
  publishedAt: '2026-11-02',
  releasesUrl: 'https://gitee.com/lazychun/fat-notes/releases',
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

/** 按时间倒序：第 1 项为当前下载版本，其余为开发快照 */
export const releases: ReleaseEntry[] = [
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
        meta: 'FatNotes-Setup-0.1.0.exe · 60.1 MB',
        url: DOWNLOAD.url,
      },
    ],
    releaseUrl: DOWNLOAD.releaseTagUrl,
  },
  {
    id: 'dev-2026-11-07',
    version: '2026.11.07',
    date: '2026-11-04 → 11-07',
    channel: 'dev',
    title: L('十一月第一周：编辑与工程化', 'Early November: Editing & Engineering'),
    summary: L(
      '开发快照 · 尚未打进 v0.1.0 安装包。集中在编辑器体验、扩展管理与文档入口。',
      'Dev snapshot · not yet bundled into the v0.1.0 installer. Focused on editor experience, extension management, and docs access.',
    ),
    changes: [
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
          '重构「功能 / 我的工作流」面板的布局结构（11-06）。',
          'Refactored the layout of the My Functions / My Workflows panels (Nov 6).',
        ),
      },
      {
        kind: 'feat',
        text: L(
          '块配置同步与 API 集成增强；新增运行时 token 文件管理，强化本地 API 鉴权（11-05）。',
          'Improved block configuration sync and API integration; added runtime token file management for local API auth (Nov 5).',
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
        kind: 'feat',
        text: L(
          '富文本支持媒体缩放 / 上传与行内编辑；新增 Excel、Word、PPT、PDF 导出（11-04）。',
          'Rich-text media resizing / upload and inline editing; Excel, Word, PPT, and PDF export (Nov 4).',
        ),
      },
      {
        kind: 'improve',
        text: L(
          'Markdown 块支持实时编辑，并简化组件实现与样式（11-03 / 11-04）。',
          'Live Markdown editing and a simpler component with cleaner styles (Nov 3–4).',
        ),
      },
    ],
  },
  {
    id: 'dev-2026-10-31',
    version: '2026.10.31',
    date: '2026-10-29 → 11-01',
    channel: 'dev',
    title: L('数据源与文件体验', 'Data Sources & File Handling'),
    summary: L(
      '开发快照 · 尚未打进 v0.1.0 安装包。围绕 Excel 数据源、看板文件操作与插件目录打磨。',
      'Dev snapshot · not yet bundled into the v0.1.0 installer. Excel sources, board file operations, and the extension catalog.',
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
      '开发快照 · 尚未打进 v0.1.0 安装包。插件可注册块分类，AI 助手与代码生成能力继续补齐。',
      'Dev snapshot · not yet bundled into the v0.1.0 installer. Plugins can register block categories, with more AI assistance and code generation.',
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
      '开发快照 · 尚未打进 v0.1.0 安装包。终端、视频、轮播、时钟等块集中落地。',
      'Dev snapshot · not yet bundled into the v0.1.0 installer. Terminal, video, carousel, clock, and other blocks landed together.',
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
