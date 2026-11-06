/**
 * FatNotes 更新日志页：完整版本时间线 + 可筛选的变更明细
 *
 * @author By AICode
 * @date 2026-11-07
 */

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {L, pick, useLocale} from '../data/i18n';
import {DOWNLOAD, releases} from '../data/releases';
import ReleaseNotes from '../components/ReleaseNotes';

const copy = {
  eyebrow: L('RELEASE NOTES / 版本记录', 'RELEASE NOTES'),
  title: L('更新日志', 'Changelog'),
  titleOutline: L('SHIPPED & SHIPPING', 'SHIPPED & SHIPPING'),
  description: L(
    '从第一个公开预览版到每一次开发快照，FatNotes 的变化都摊开在这里。点选版本、按类型筛选，快速定位你关心的改动。',
    'From the first public preview to every dev snapshot, this is the whole story. Pick a version, filter by type, and find what matters to you.',
  ),
  statVersions: L('个正式版本', 'released version'),
  statSnapshots: L('组开发快照', 'dev snapshots'),
  statChanges: L('条变更记录', 'change entries'),
  legendTitle: L('怎么读这份日志', 'How to read this'),
  legendStable: L(
    '正式发布：已经打包成安装包，可以直接下载。',
    'Release: already packaged into an installer you can download.',
  ),
  legendDev: L(
    '开发快照：版本发布前的阶段性改进记录，最终交付以正式版本为准。',
    'Dev snapshot: pre-release progress notes. Stable releases describe what actually shipped.',
  ),
  legendSource: L(
    '完整发布信息以发行版页面为准。',
    'The releases page is the source of truth for published builds.',
  ),
  back: L('返回下载页', 'Back to download'),
  followEyebrow: L('STAY IN THE LOOP', 'STAY IN THE LOOP'),
  followTitle: L('不想错过下一个版本？', "Don't miss the next drop"),
  followDesc: L(
    '应用内「检查更新」会读取远端版本文件；也可以直接关注发行版页面获取新版本通知。',
    'The in-app "Check for Updates" reads the remote version file. You can also follow the releases page for new builds.',
  ),
  followReleases: L('关注发行版', 'Follow releases'),
  followRepo: L('当前版本说明', 'Current release notes'),
  followDocs: L('阅读快速开始', 'Read the quick start'),
};

/** FatNotes 更新日志页 */
export default function Changelog(): ReactNode {
  const locale = useLocale();
  const stableCount = releases.filter((entry) => entry.channel === 'stable').length;
  const devCount = releases.length - stableCount;
  const changeCount = releases.reduce((sum, entry) => sum + entry.changes.length, 0);

  return (
    <Layout
      title={locale === 'zh' ? '更新日志' : 'Changelog'}
      description="FatNotes 全部版本与开发快照的更新日志，可按版本与变更类型筛选查看。"
    >
      <main className="cl-page">
        <section className="cl-hero">
          <div className="cl-hero__grid" aria-hidden="true" />
          <div className="cl-hero__blob" aria-hidden="true" />
          <div className="container cl-hero__inner">
            <div className="cl-hero__top">
              <span className="dl-kicker">{pick(copy.eyebrow, locale)}</span>
              <Link className="cl-hero__back" to="/download">
                <span aria-hidden="true">←</span> {pick(copy.back, locale)}
              </Link>
            </div>
            <Heading as="h1">{pick(copy.title, locale)}</Heading>
            <div className="cl-hero__outline" aria-hidden="true">{copy.titleOutline.zh}</div>
            <p className="cl-hero__desc">{pick(copy.description, locale)}</p>
            <div className="cl-hero__stats">
              <div><b>{stableCount}</b><span>{pick(copy.statVersions, locale)}</span></div>
              <div><b>{devCount}</b><span>{pick(copy.statSnapshots, locale)}</span></div>
              <div><b>{changeCount}</b><span>{pick(copy.statChanges, locale)}</span></div>
            </div>
          </div>
        </section>

        <section className="dl-section cl-body">
          <div className="container">
            <div className="cl-legend">
              <div className="cl-legend__title"><span aria-hidden="true">✳</span> {pick(copy.legendTitle, locale)}</div>
              <ul>
                <li><span className="rn__badge rn__badge--stable">{locale === 'zh' ? '正式发布' : 'Release'}</span>{pick(copy.legendStable, locale)}</li>
                <li><span className="rn__badge rn__badge--dev">{locale === 'zh' ? '开发快照' : 'Dev snapshot'}</span>{pick(copy.legendDev, locale)}</li>
              </ul>
              <p>{pick(copy.legendSource, locale)}</p>
            </div>
            <ReleaseNotes />
          </div>
        </section>

        <section className="cl-follow">
          <div className="container cl-follow__inner">
            <div>
              <span className="dl-kicker">{pick(copy.followEyebrow, locale)}</span>
              <Heading as="h2">{pick(copy.followTitle, locale)}</Heading>
              <p>{pick(copy.followDesc, locale)}</p>
            </div>
            <div className="cl-follow__links">
              <a className="dl-btn dl-btn--primary" href={DOWNLOAD.releasesUrl} target="_blank" rel="noopener noreferrer">
                {pick(copy.followReleases, locale)} <span aria-hidden="true">↗</span>
              </a>
              <a className="dl-btn dl-btn--ghost" href={DOWNLOAD.releaseTagUrl} target="_blank" rel="noopener noreferrer">
                {pick(copy.followRepo, locale)} <span aria-hidden="true">↗</span>
              </a>
              <Link className="cl-follow__text" to="/docs/getting-started/quick-start">
                {pick(copy.followDocs, locale)} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
