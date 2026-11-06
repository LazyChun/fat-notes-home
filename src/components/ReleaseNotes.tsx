/**
 * 可交互的更新日志控制台：左侧版本轨道 + 右侧变更明细 + 类型筛选
 *
 * 下载页与更新日志页共用；limit 可控制展示的版本数量。
 *
 * @author By AICode
 * @date 2026-11-07
 */

import {useState} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {L, pick, useLocale} from '../data/i18n';
import type {Localized} from '../data/i18n';
import {DOWNLOAD, releases} from '../data/releases';
import type {ChangeKind} from '../data/releases';

interface ReleaseNotesProps {
  /** 只展示最近 N 个版本，不传则展示全部 */
  limit?: number;
}

type Filter = 'all' | ChangeKind;

const kindLabel: Record<ChangeKind, Localized> = {
  feat: L('新增', 'New'),
  improve: L('优化', 'Improved'),
  fix: L('修复', 'Fixed'),
};

const kindIcon: Record<ChangeKind, string> = {
  feat: '✦',
  improve: '↗',
  fix: '✓',
};

const copy = {
  filters: L('筛选', 'Filter'),
  all: L('全部', 'All'),
  stable: L('正式发布', 'Release'),
  dev: L('开发快照', 'Dev snapshot'),
  devNote: L(
    '该条目为开发快照，尚未打进 v0.1.0 安装包。',
    'Dev snapshot — not yet bundled into the v0.1.0 installer.',
  ),
  changes: L('本次变更', "What's inside"),
  empty: L('该版本暂无此类型的变更。', 'No changes of this type in this version.'),
  files: L('发布文件', 'Release files'),
  releasePage: L('查看发布页', 'Open release page'),
  allReleases: L('查看完整更新日志', 'View the full changelog'),
  sourceNote: L(
    '更新日志依据发行版说明与开发记录整理',
    'Changelog based on release notes and development records',
  ),
};

/** 渲染版本切换 + 变更明细的交互控制台 */
export default function ReleaseNotes({limit}: ReleaseNotesProps): ReactNode {
  const locale = useLocale();
  const list = typeof limit === 'number' ? releases.slice(0, limit) : releases;
  const [activeId, setActiveId] = useState(list[0].id);
  const [filter, setFilter] = useState<Filter>('all');

  const active = list.find((entry) => entry.id === activeId) ?? list[0];
  const visibleChanges =
    filter === 'all'
      ? active.changes
      : active.changes.filter((item) => item.kind === filter);

  return (
    <div className="rn">
      <div className="rn__console">
        <div className="rn__rail" role="tablist" aria-orientation="vertical" aria-label={pick(copy.changes, locale)}>
          <div className="rn__rail-label">RELEASES / {list.length}</div>
          {list.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`rn-tab-${entry.id}`}
              aria-selected={entry.id === active.id}
              aria-controls={`rn-panel-${entry.id}`}
              className={clsx('rn__rail-item', {
                'rn__rail-item--active': entry.id === active.id,
              })}
              onClick={() => {
                setActiveId(entry.id);
                setFilter('all');
              }}
            >
              <span className={clsx('rn__rail-dot', `rn__rail-dot--${entry.channel}`)} />
              <span className="rn__rail-version">{entry.version}</span>
              <span className="rn__rail-date">{entry.date}</span>
              {index === 0 && <span className="rn__rail-latest">LATEST</span>}
            </button>
          ))}
          <div className="rn__rail-foot">
            <span>⌁</span>
            <span>{pick(copy.sourceNote, locale)}</span>
          </div>
        </div>

        <div
          className="rn__detail"
          role="tabpanel"
          id={`rn-panel-${active.id}`}
          aria-labelledby={`rn-tab-${active.id}`}
          key={active.id}
        >
          <div className="rn__detail-head">
            <div className="rn__detail-meta">
              <span className={clsx('rn__badge', `rn__badge--${active.channel}`)}>
                {pick(active.channel === 'stable' ? copy.stable : copy.dev, locale)}
              </span>
              <span className="rn__detail-date">{active.date}</span>
            </div>
            <h3>{pick(active.title, locale)}</h3>
            <p>{pick(active.summary, locale)}</p>
            {active.channel === 'dev' && (
              <div className="rn__dev-note">
                <span aria-hidden="true">◷</span> {pick(copy.devNote, locale)}
              </div>
            )}
          </div>

          <div className="rn__filters" aria-label={pick(copy.filters, locale)}>
            {(['all', 'feat', 'improve', 'fix'] as Filter[]).map((item) => {
              const count =
                item === 'all'
                  ? active.changes.length
                  : active.changes.filter((change) => change.kind === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  className={clsx('rn__filter', {'rn__filter--active': filter === item})}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item === 'all' ? pick(copy.all, locale) : pick(kindLabel[item], locale)}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="rn__changes">
            <div className="rn__changes-label">{pick(copy.changes, locale)}</div>
            {visibleChanges.length === 0 ? (
              <p className="rn__empty">{pick(copy.empty, locale)}</p>
            ) : (
              <ul>
                {visibleChanges.map((change, index) => (
                  <li key={`${active.id}-${index}`} className={`rn__change rn__change--${change.kind}`}>
                    <span className="rn__change-icon" aria-hidden="true">{kindIcon[change.kind]}</span>
                    <span className="rn__change-kind">{pick(kindLabel[change.kind], locale)}</span>
                    <span className="rn__change-text">{pick(change.text, locale)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {active.assets && active.assets.length > 0 && (
            <div className="rn__assets">
              <div className="rn__changes-label">{pick(copy.files, locale)}</div>
              <div className="rn__asset-list">
                {active.assets.map((asset) => (
                  <a key={asset.url} href={asset.url} className="rn__asset" target="_blank" rel="noopener noreferrer">
                    <span className="rn__asset-icon" aria-hidden="true">↓</span>
                    <span>
                      <b>{pick(asset.label, locale)}</b>
                      <small>{asset.meta}</small>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="rn__detail-foot">
            {active.releaseUrl && (
              <a href={active.releaseUrl} target="_blank" rel="noopener noreferrer">
                {pick(copy.releasePage, locale)} <span aria-hidden="true">↗</span>
              </a>
            )}
            {typeof limit === 'number' && (
              <Link to="/changelog">
                {pick(copy.allReleases, locale)} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {typeof limit !== 'number' && (
        <div className="rn__footer">
          <a href={DOWNLOAD.releasesUrl} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">◎</span> Gitee Releases
          </a>
          <Link to="/docs/getting-started/quick-start">
            <span aria-hidden="true">→</span> {pick(L('阅读快速开始', 'Read the quick start'), locale)}
          </Link>
        </div>
      )}
    </div>
  );
}
