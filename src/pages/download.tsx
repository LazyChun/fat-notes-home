/**
 * FatNotes 下载页
 *
 * 视觉：深色极光 Hero + 票据式版本卡 + Bento 平台卡片 + 跑马灯；
 * 功能：真实安装包直链、平台识别、MD5 一键复制、内嵌更新日志控制台。
 *
 * @author By AICode
 * @date 2026-11-07
 */

import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {L, pick, useLocale} from '../data/i18n';
import {DOWNLOAD} from '../data/releases';
import ReleaseNotes from '../components/ReleaseNotes';

type Platform = 'windows' | 'mac' | 'linux' | 'other';

const copy = {
  eyebrow: L('● 最新发布 · LATEST DROP', '● LATEST DROP'),
  kicker: L('FATNOTES FOR DESKTOP', 'FATNOTES FOR DESKTOP'),
  title1: L('把整个知识工作台，', 'Your entire knowledge'),
  title2: L('装进你的电脑。', 'workspace, on your desktop.'),
  description: L(
    '笔记、数据、自动化与 AI，收进一个本地优先的桌面应用。一次安装，即刻开工。',
    'Notes, data, automation, and AI in one local-first desktop app. Install once, start creating right away.',
  ),
  primary: L('下载 Windows 版', 'Download for Windows'),
  primaryMeta: L(`v${DOWNLOAD.version} · ${DOWNLOAD.fileSize} · 免费`, `v${DOWNLOAD.version} · ${DOWNLOAD.fileSize} · Free`),
  secondary: L('查看更新日志', 'View changelog'),
  tertiary: L('先看安装指南', 'Read the install guide'),
  heroNote: L(
    '本地优先 · 无需注册 · 数据留在你的电脑',
    'Local first · No sign-up · Your data stays on your machine',
  ),
  ticketChannel: L('公开预览 / PUBLIC PREVIEW', 'PUBLIC PREVIEW'),
  ticketVersion: L('当前版本', 'Current version'),
  ticketDate: L('发布日期', 'Released'),
  ticketSize: L('文件大小', 'File size'),
  ticketChecksum: L('MD5 校验', 'MD5 checksum'),
  ticketRequire: L('系统要求', 'Requirements'),
  ticketRequireValue: L('Windows 10+ · WebView2', 'Windows 10+ · WebView2'),
  ticketCopy: L('复制', 'Copy'),
  ticketCopied: L('已复制', 'Copied'),
  ticketStamp: L('可下载', 'AVAILABLE'),
  marquee: [
    L('本地优先', 'LOCAL FIRST'),
    L('60+ 块类型', '60+ BLOCKS'),
    L('数据看板', 'DASHBOARDS'),
    L('流程自动化', 'AUTOMATION'),
    L('插件生态', 'PLUGINS'),
    L('AI 助手', 'AI ASSISTANT'),
  ],
  platformEyebrow: L('CHOOSE YOUR PLATFORM', 'CHOOSE YOUR PLATFORM'),
  platformTitle: L('选一个平台，开始搭建', 'Pick a platform and start building'),
  platformDesc: L(
    '目前正式提供 Windows 安装包，其他平台正在路上。我们会根据当前设备自动标注推荐项。',
    'A Windows build is available today; other platforms are on the way. We highlight the recommended one based on your device.',
  ),
  winLabel: L('Windows', 'Windows'),
  winDesc: L(
    'x64 安装包 · Windows 10 及以上 · 自带 WebView2 即可运行',
    'x64 installer · Windows 10 or later · Uses the built-in WebView2 runtime',
  ),
  winAction: L('下载 .exe 安装包', 'Download .exe installer'),
  macLabel: L('macOS', 'macOS'),
  linuxLabel: L('Linux', 'Linux'),
  soonDesc: L('正在规划中，暂未提供安装包', 'Planned — no installer yet'),
  soonAction: L('敬请期待', 'Coming soon'),
  recommended: L('为你推荐', 'Recommended for you'),
  available: L('现已可用', 'Available now'),
  planned: L('规划中', 'Planned'),
  includedEyebrow: L('WHATS IN THE BOX', "WHAT'S IN THE BOX"),
  includedTitle: L('一个安装包，四种超能力', 'One installer, four superpowers'),
  included: [
    {
      num: '01',
      title: L('本地优先', 'Local first'),
      desc: L(
        '所有笔记、附件与配置都保存在你自己的目录，离线也能完整工作。',
        'Notes, attachments, and settings live in your own folder and work fully offline.',
      ),
      icon: '◈',
    },
    {
      num: '02',
      title: L('自由排版', 'Freeform canvas'),
      desc: L(
        '60+ 种块类型随意组合，Markdown、图表、终端、流程图都能拖进同一页。',
        'Mix 60+ block types — Markdown, charts, terminal, flowcharts — on the same page.',
      ),
      icon: '▦',
    },
    {
      num: '03',
      title: L('数据驱动', 'Data driven'),
      desc: L(
        '连接 SQLite / Excel 数据源，把查询结果变成看板，再用流程节点自动执行。',
        'Connect SQLite / Excel sources, turn queries into dashboards, and automate the rest.',
      ),
      icon: '⌁',
    },
    {
      num: '04',
      title: L('无限扩展', 'Infinitely extensible'),
      desc: L(
        '插件按需安装，AI 助手、OCR、浏览器自动化等重能力随用随加。',
        'Install plugins on demand — AI chat, OCR, browser automation, and more.',
      ),
      icon: '✳',
    },
  ],
  verifyEyebrow: L('VERIFY BEFORE YOU RUN', 'VERIFY BEFORE YOU RUN'),
  verifyTitle: L('下载安心，心里有数', 'Download with confidence'),
  verifyDesc: L(
    '安装包是个人开发者发布的预览版、暂未购买商业代码签名证书。首次运行时 Windows SmartScreen 可能弹出「已保护你的电脑」提示，可在属性中勾选「解除锁定」，或点「更多信息 → 仍要运行」继续安装。',
    'This preview build is published by an individual developer and is not yet code-signed. Windows SmartScreen may warn on first run: check "Unblock" in file properties, or choose "More info → Run anyway".',
  ),
  verifyChecksum: L('校验值', 'Checksum'),
  verifyCopy: L('复制 MD5', 'Copy MD5'),
  verifyCopied: L('已复制到剪贴板', 'Copied to clipboard'),
  verifySource: L('查看发行版说明', 'View release notes'),
  verifyGuide: L('查看安装步骤', 'See install steps'),
  logEyebrow: L('CHANGELOG / 更新日志', 'CHANGELOG'),
  logTitle: L('每一次迭代，都看得见', 'Every iteration, in plain sight'),
  logDesc: L(
    '按版本浏览新增、优化与修复，也保留正式版发布前的阶段性开发记录。',
    'Browse new features, improvements, and fixes by version, plus pre-release development notes.',
  ),
  logAll: L('打开完整更新日志', 'Open the full changelog'),
  bottomEyebrow: L('READY WHEN YOU ARE', 'READY WHEN YOU ARE'),
  bottomTitle: L('第一篇笔记，从下载开始。', 'Your first note starts with a download.'),
  bottomDesc: L(
    '安装只需几分钟。跟着快速开始，创建工作空间并写下第一篇笔记。',
    'Installation takes a few minutes. Follow the quick start to create a workspace and write your first note.',
  ),
  bottomPrimary: L(`立即下载 v${DOWNLOAD.version}`, `Get v${DOWNLOAD.version} now`),
  bottomSecondary: L('阅读快速开始', 'Read the quick start'),
};

function WindowsIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M2 4.6 10.6 3.4v8.1H2V4.6Zm0 14.8 8.6 1.2v-8H2v6.8Zm9.7-13.5L22 3v8.5h-10.3V5.9Zm0 9.6H22V21l-10.3-2.9v-2.6Z" />
    </svg>
  );
}

function AppleIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8 2.2-1.2 3.1-2.5c1-1.4 1.4-2.8 1.4-2.9-.1 0-2.9-1.1-2.9-4ZM14.1 5.3c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5Z" />
    </svg>
  );
}

function LinuxIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2c-2.1 0-3.1 1.8-3.1 4 0 1.6-.5 2.9-1.4 4.4-1 1.7-2.3 3.3-2.3 5.2 0 1.2.6 1.9 1.3 2.3-.2.6-.3 1.2-.3 1.7 0 1.4 2.6 2.4 5.8 2.4s5.8-1 5.8-2.4c0-.5-.1-1.1-.3-1.7.7-.4 1.3-1.1 1.3-2.3 0-1.9-1.3-3.5-2.3-5.2-.9-1.5-1.4-2.8-1.4-4.4 0-2.2-1-4-3.1-4Zm-1.3 3.1c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1Zm2.6 0c.4 0 .7.5.7 1.1s-.3 1.1-.7 1.1-.7-.5-.7-1.1.3-1.1.7-1.1ZM12 9.3c1.3 0 2.3.5 2.3 1 0 .6-1 1.1-2.3 1.1s-2.3-.5-2.3-1.1c0-.5 1-1 2.3-1Zm-3.7 9.3c-.4.5-1.2.4-1.7-.2-.4-.5-.3-1.2.2-1.6l2.4-2c.5-.4 1.2-.3 1.6.2.4.5.3 1.2-.2 1.6l-2.3 2Zm7.4 0-2.3-2c-.5-.4-.6-1.1-.2-1.6.4-.5 1.1-.6 1.6-.2l2.4 2c.5.4.6 1.1.2 1.6-.5.6-1.3.7-1.7.2Z" />
    </svg>
  );
}

function DownloadIcon(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
      <path d="M4 17.5v1.2A2.3 2.3 0 0 0 6.3 21h11.4a2.3 2.3 0 0 0 2.3-2.3v-1.2" />
    </svg>
  );
}

/** 一键复制 MD5，兼容无 clipboard API 的环境 */
async function copyText(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // 非安全上下文或权限被拒绝时，降级到 execCommand
    }
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) {
    throw new Error('copy failed');
  }
}

/** 版本票据卡片：展示版本信息与可复制的校验值 */
function ReleaseTicket(): ReactNode {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  return (
    <div className="dl-ticket-wrap">
      <div className="dl-orbit" aria-hidden="true" />
      <div className="dl-ticket">
        <div className="dl-ticket__top">
          <span className="dl-ticket__channel">{pick(copy.ticketChannel, locale)}</span>
          <span className="dl-ticket__stamp">{pick(copy.ticketStamp, locale)}</span>
        </div>
        <div className="dl-ticket__version">
          <span className="dl-ticket__v">v</span>
          {DOWNLOAD.version}
        </div>
        <div className="dl-ticket__file">{DOWNLOAD.fileName}</div>
        <div className="dl-ticket__perforation" aria-hidden="true" />
        <dl className="dl-ticket__grid">
          <div>
            <dt>{pick(copy.ticketDate, locale)}</dt>
            <dd>{DOWNLOAD.publishedAt}</dd>
          </div>
          <div>
            <dt>{pick(copy.ticketSize, locale)}</dt>
            <dd>{DOWNLOAD.fileSize}</dd>
          </div>
          <div className="dl-ticket__wide">
            <dt>{pick(copy.ticketRequire, locale)}</dt>
            <dd>{pick(copy.ticketRequireValue, locale)}</dd>
          </div>
          <div className="dl-ticket__wide">
            <dt>{pick(copy.ticketChecksum, locale)}</dt>
            <dd className="dl-ticket__md5">
              <code>{DOWNLOAD.md5}</code>
              <button
                type="button"
                className={clsx('dl-copy', {'dl-copy--done': copied})}
                onClick={async () => {
                  try {
                    await copyText(DOWNLOAD.md5);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1800);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                {copied ? pick(copy.ticketCopied, locale) : pick(copy.ticketCopy, locale)}
              </button>
            </dd>
          </div>
        </dl>
        <div className="dl-ticket__bottom">
          <span>✳ FATNOTES</span>
          <span>{DOWNLOAD.publishedAt.split('-').join('.')}</span>
        </div>
      </div>
    </div>
  );
}

/** FatNotes 下载页 */
export default function Download(): ReactNode {
  const locale = useLocale();
  const [platform, setPlatform] = useState<Platform>('other');
  const [md5Copied, setMd5Copied] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      setPlatform('windows');
    } else if (ua.includes('mac')) {
      setPlatform('mac');
    } else if (ua.includes('linux') || ua.includes('x11')) {
      setPlatform('linux');
    }
  }, []);

  return (
    <Layout
      title={locale === 'zh' ? '下载 FatNotes' : 'Download FatNotes'}
      description="下载 FatNotes 桌面版，查看版本信息与完整更新日志。"
    >
      <main className="dl-page">
        {/* Hero */}
        <section className="dl-hero">
          <div className="dl-hero__mesh" aria-hidden="true" />
          <div className="dl-hero__grid" aria-hidden="true" />
          <div className="dl-hero__blob dl-hero__blob--a" aria-hidden="true" />
          <div className="dl-hero__blob dl-hero__blob--b" aria-hidden="true" />
          <div className="container dl-hero__inner">
            <div className="dl-hero__copy">
              <div className="dl-hero__eyebrow">
                <span>{pick(copy.eyebrow, locale)}</span>
                <span className="dl-hero__kicker">{copy.kicker.zh}</span>
              </div>
              <Heading as="h1" className="dl-hero__title">
                <span>{pick(copy.title1, locale)}</span>
                <span className="dl-hero__gradient">{pick(copy.title2, locale)}</span>
              </Heading>
              <p className="dl-hero__desc">{pick(copy.description, locale)}</p>
              <div className="dl-hero__actions">
                <a className="dl-btn dl-btn--primary" href={DOWNLOAD.url} target="_blank" rel="noopener noreferrer">
                  <DownloadIcon />
                  <span>{pick(copy.primary, locale)}</span>
                  <span className="dl-btn__arrow" aria-hidden="true">↗</span>
                </a>
                <Link className="dl-btn dl-btn--ghost" to="/changelog">
                  <span>{pick(copy.secondary, locale)}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="dl-hero__meta">
                <span className="dl-hero__meta-main">{pick(copy.primaryMeta, locale)}</span>
                <span className="dl-hero__meta-sep" />
                <span>{pick(copy.heroNote, locale)}</span>
              </div>
            </div>
            <ReleaseTicket />
          </div>
          <div className="dl-marquee" aria-hidden="true">
            <div className="dl-marquee__track">
              {[0, 1].map((round) =>
                copy.marquee.map((item, index) => (
                  <span key={`${round}-${index}`}>
                    {pick(item, locale)} <i>✳</i>
                  </span>
                )),
              )}
            </div>
          </div>
        </section>

        {/* 平台选择 */}
        <section className="dl-section dl-platforms">
          <div className="container">
            <div className="dl-section__head">
              <span className="dl-kicker">{pick(copy.platformEyebrow, locale)}</span>
              <Heading as="h2">{pick(copy.platformTitle, locale)}</Heading>
              <p>{pick(copy.platformDesc, locale)}</p>
            </div>
            <div className="dl-platform-grid">
              <article className={clsx('dl-platform dl-platform--win', {
                'dl-platform--recommended': platform === 'windows',
              })}>
                <div className="dl-platform__glow" aria-hidden="true" />
                <div className="dl-platform__top">
                  <span className="dl-platform__icon"><WindowsIcon /></span>
                  <span className="dl-platform__tag dl-platform__tag--on">{pick(copy.available, locale)}</span>
                </div>
                <h3>{pick(copy.winLabel, locale)}</h3>
                <p>{pick(copy.winDesc, locale)}</p>
                <div className="dl-platform__file">
                  <code>{DOWNLOAD.fileName}</code>
                  <span>{DOWNLOAD.fileSize}</span>
                </div>
                <a className="dl-btn dl-btn--light" href={DOWNLOAD.url} target="_blank" rel="noopener noreferrer">
                  <DownloadIcon />
                  <span>{pick(copy.winAction, locale)}</span>
                  <span className="dl-btn__arrow" aria-hidden="true">↗</span>
                </a>
                {platform === 'windows' && (
                  <div className="dl-platform__hint">✓ {pick(copy.recommended, locale)}</div>
                )}
              </article>
              {[
                {key: 'mac' as Platform, label: copy.macLabel, icon: <AppleIcon />},
                {key: 'linux' as Platform, label: copy.linuxLabel, icon: <LinuxIcon />},
              ].map((item) => (
                <article
                  key={item.key}
                  className={clsx('dl-platform dl-platform--soon', {
                    'dl-platform--recommended': platform === item.key,
                  })}
                >
                  <div className="dl-platform__top">
                    <span className="dl-platform__icon">{item.icon}</span>
                    <span className="dl-platform__tag">{pick(copy.planned, locale)}</span>
                  </div>
                  <h3>{pick(item.label, locale)}</h3>
                  <p>{pick(copy.soonDesc, locale)}</p>
                  <div className="dl-platform__progress" aria-hidden="true"><span /></div>
                  <div className="dl-platform__soon-btn">{pick(copy.soonAction, locale)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 安装包内容 */}
        <section className="dl-section dl-included">
          <div className="container">
            <div className="dl-section__head dl-section__head--left">
              <span className="dl-kicker">{pick(copy.includedEyebrow, locale)}</span>
              <Heading as="h2">{pick(copy.includedTitle, locale)}</Heading>
            </div>
            <div className="dl-bento">
              {copy.included.map((item) => (
                <article key={item.num} className="dl-bento-card">
                  <div className="dl-bento-card__top">
                    <span className="dl-bento-card__icon" aria-hidden="true">{item.icon}</span>
                    <span className="dl-bento-card__num">{item.num}</span>
                  </div>
                  <h3>{pick(item.title, locale)}</h3>
                  <p>{pick(item.desc, locale)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 安全与校验 */}
        <section className="dl-section dl-verify">
          <div className="container dl-verify__grid">
            <div>
              <span className="dl-kicker">{pick(copy.verifyEyebrow, locale)}</span>
              <Heading as="h2">{pick(copy.verifyTitle, locale)}</Heading>
              <p>{pick(copy.verifyDesc, locale)}</p>
              <div className="dl-verify__links">
                <a href={DOWNLOAD.releaseTagUrl} target="_blank" rel="noopener noreferrer">
                  {pick(copy.verifySource, locale)} <span aria-hidden="true">↗</span>
                </a>
                <Link to="/docs/getting-started/quick-start">
                  {pick(copy.verifyGuide, locale)} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="dl-terminal">
              <div className="dl-terminal__bar">
                <span className="dl-terminal__dot" /><span className="dl-terminal__dot" /><span className="dl-terminal__dot" />
                <span>integrity-check</span>
              </div>
              <div className="dl-terminal__body">
                <div><span className="dl-terminal__prompt">$</span> file <b>{DOWNLOAD.fileName}</b></div>
                <div className="dl-terminal__out">Windows installer · {DOWNLOAD.fileSize}</div>
                <div><span className="dl-terminal__prompt">$</span> md5sum <b>{DOWNLOAD.fileName}</b></div>
                <div className="dl-terminal__out dl-terminal__hash">{DOWNLOAD.md5}</div>
                <div className="dl-terminal__ok">✓ checksum matched · v{DOWNLOAD.version}</div>
                <button
                  type="button"
                  className={clsx('dl-terminal__copy', {'dl-terminal__copy--done': md5Copied})}
                  onClick={async () => {
                    try {
                      await copyText(DOWNLOAD.md5);
                      setMd5Copied(true);
                      window.setTimeout(() => setMd5Copied(false), 1800);
                    } catch {
                      setMd5Copied(false);
                    }
                  }}
                >
                  {md5Copied ? pick(copy.verifyCopied, locale) : pick(copy.verifyCopy, locale)}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 更新日志速览 */}
        <section className="dl-section dl-log" id="changelog">
          <div className="container">
            <div className="dl-section__head dl-section__head--split">
              <div>
                <span className="dl-kicker">{pick(copy.logEyebrow, locale)}</span>
                <Heading as="h2">{pick(copy.logTitle, locale)}</Heading>
                <p>{pick(copy.logDesc, locale)}</p>
              </div>
              <Link className="dl-text-link" to="/changelog">
                {pick(copy.logAll, locale)} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ReleaseNotes limit={3} />
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="dl-bottom">
          <div className="dl-bottom__glow" aria-hidden="true" />
          <div className="container dl-bottom__inner">
            <div>
              <span className="dl-kicker">{pick(copy.bottomEyebrow, locale)}</span>
              <Heading as="h2">{pick(copy.bottomTitle, locale)}</Heading>
              <p>{pick(copy.bottomDesc, locale)}</p>
            </div>
            <div className="dl-bottom__actions">
              <a className="dl-btn dl-btn--primary" href={DOWNLOAD.url} target="_blank" rel="noopener noreferrer">
                <DownloadIcon />
                <span>{pick(copy.bottomPrimary, locale)}</span>
              </a>
              <Link className="dl-btn dl-btn--ghost" to="/docs/getting-started/quick-start">
                {pick(copy.bottomSecondary, locale)} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
