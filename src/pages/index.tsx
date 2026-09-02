/**
 * FatNotes 官网首页，展示产品定位、核心能力与文档入口
 *
 * @author By AICode
 * @date 2026-09-02
 */

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';

interface FeatureItem {
  title: ReactNode;
  description: ReactNode;
  icon: string;
  accent: string;
}

interface FeatureCardProps {
  feature: FeatureItem;
}

const features: FeatureItem[] = [
  {
    title: <Translate id="homepage.feature.docs.title">文档与笔记</Translate>,
    description: (
      <Translate id="homepage.feature.docs.description">
        Markdown、富文本与多种文件，在统一空间沉淀你的知识。
      </Translate>
    ),
    icon: '▤',
    accent: 'blue',
  },
  {
    title: <Translate id="homepage.feature.data.title">数据看板</Translate>,
    description: (
      <Translate id="homepage.feature.data.description">
        连接多源数据，以可视化组件洞察每一个重要变化。
      </Translate>
    ),
    icon: '▥',
    accent: 'cyan',
  },
  {
    title: <Translate id="homepage.feature.flow.title">流程自动化</Translate>,
    description: (
      <Translate id="homepage.feature.flow.description">
        用可视化流程连接应用与数据，让重复工作自动完成。
      </Translate>
    ),
    icon: '⌘',
    accent: 'violet',
  },
  {
    title: <Translate id="homepage.feature.ai.title">AI 知识库</Translate>,
    description: (
      <Translate id="homepage.feature.ai.description">
        与你的知识深度对话，获得有上下文的智能回答。
      </Translate>
    ),
    icon: 'A+',
    accent: 'indigo',
  },
];

// 渲染单个产品能力卡片 - By AICode
function FeatureCard({feature}: FeatureCardProps): ReactNode {
  return (
    <article className="feature-card">
      <div className={clsx('feature-icon', `feature-icon--${feature.accent}`)}>
        {feature.icon}
      </div>
      <Heading as="h3">{feature.title}</Heading>
      <p>{feature.description}</p>
      <Link to="/docs/intro" className="feature-link">
        <Translate id="homepage.feature.learnMore">了解更多</Translate>
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}

// 渲染用于展示产品能力的 IDE 风格界面模型 - By AICode
function ProductMockup(): ReactNode {
  return (
    <div className="product-shell" aria-label="FatNotes workspace preview">
      <div className="window-bar">
        <span className="window-dot window-dot--red" />
        <span className="window-dot window-dot--yellow" />
        <span className="window-dot window-dot--green" />
        <span className="window-title">FatNotes Workspace</span>
      </div>
      <div className="workspace">
        <aside className="activity-bar">
          <strong>F</strong>
          <span>▤</span>
          <span>⌕</span>
          <span>◇</span>
          <span>⌘</span>
        </aside>
        <aside className="file-tree">
          <small>工作空间</small>
          <b>项目分析报告</b>
          <span>⌄ 数据报告</span>
          <span>　市场分析.md</span>
          <span>　产品路线图</span>
          <span>⌄ 数据库</span>
          <span>　PostgreSQL</span>
          <span>　SQLite</span>
          <small>资源</small>
          <span>Dataview</span>
          <span>AI 助手</span>
        </aside>
        <section className="dashboard">
          <div className="editor-tab">项目分析报告.md</div>
          <p className="eyebrow"># 项目分析报告</p>
          <h4>关键指标概览</h4>
          <div className="metric-grid">
            <div><small>总收入</small><b>¥82,736</b><em>↗ 12.4%</em></div>
            <div><small>活跃项目</small><b>2,734</b><em>↗ 8.1%</em></div>
          </div>
          <div className="chart-card">
            <span>收入趋势</span>
            <svg viewBox="0 0 320 100" role="img" aria-label="Data trend">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2679ff" stopOpacity=".35" />
                  <stop offset="100%" stopColor="#2679ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 86 L25 78 L48 82 L70 62 L93 68 L116 46 L140 56 L164 35 L188 42 L210 22 L235 30 L260 14 L286 23 L320 7 L320 100 L0 100 Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 86 L25 78 L48 82 L70 62 L93 68 L116 46 L140 56 L164 35 L188 42 L210 22 L235 30 L260 14 L286 23 L320 7"
                fill="none"
                stroke="#4d8fff"
                strokeWidth="3"
              />
            </svg>
          </div>
        </section>
        <section className="flow-panel">
          <div className="editor-tab">自动化流程.flow</div>
          <div className="flow-node flow-node--green">定时触发<small>每天 09:00</small></div>
          <span className="flow-line" />
          <div className="flow-node flow-node--blue">查询数据<small>PostgreSQL</small></div>
          <span className="flow-line" />
          <div className="flow-branches">
            <div className="flow-node flow-node--violet">数据清洗<small>Python 脚本</small></div>
            <div className="flow-node flow-node--orange">发送报告<small>邮件通知</small></div>
          </div>
        </section>
      </div>
      <div className="status-bar">
        <span>main*</span>
        <span>Live Preview</span>
        <span>UTF-8　Markdown</span>
      </div>
    </div>
  );
}

/**
 * FatNotes 官网首页组件
 *
 * @returns 官网首页内容
 */
// 组合并渲染 FatNotes 官网首页 - By AICode
export default function Home(): ReactNode {
  return (
    <Layout
      title="让知识真正流动起来"
      description="FatNotes 将笔记、数据、自动化与 AI 汇聚在一个桌面级知识工作台。"
    >
      <main>
        <header className="hero">
          <div className="hero-glow hero-glow--left" />
          <div className="hero-glow hero-glow--right" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="hero-badge">
                <span />
                <Translate id="homepage.badge">
                  本地优先的知识工作台
                </Translate>
              </div>
              <Heading as="h1">
                <Translate id="homepage.title.before">让</Translate>
                <span className="gradient-text">
                  <Translate id="homepage.title.highlight">知识</Translate>
                </span>
                <Translate id="homepage.title.after">真正流动起来</Translate>
              </Heading>
              <p className="hero-description">
                <Translate id="homepage.description">
                  笔记、数据、自动化与 AI，汇聚在一个桌面级知识工作台。
                </Translate>
              </p>
              <div className="hero-actions">
                <Link className="button button--primary button--lg" to="/docs/getting-started/quick-start">
                  <Translate id="homepage.cta.download">免费开始</Translate>
                  <span aria-hidden="true"> ↓</span>
                </Link>
                <Link className="button button--secondary button--lg" to="/docs/intro">
                  <Translate id="homepage.cta.docs">查看文档</Translate>
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
              <div className="hero-points">
                <span>✓ <Translate id="homepage.point.local">本地优先</Translate></span>
                <span>✓ <Translate id="homepage.point.database">多数据源</Translate></span>
                <span>✓ <Translate id="homepage.point.plugin">插件生态</Translate></span>
              </div>
            </div>
            <div className="hero-visual">
              <ProductMockup />
            </div>
          </div>
        </header>

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <span><Translate id="homepage.features.eyebrow">核心能力</Translate></span>
              <Heading as="h2">
                <Translate id="homepage.features.title">一个工作台，无限可能</Translate>
              </Heading>
              <p>
                <Translate id="homepage.features.description">
                  从灵感记录到数据洞察，从重复任务到智能协作。
                </Translate>
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature) => (
                <FeatureCard key={feature.accent} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="docs-cta">
          <div className="container docs-cta__inner">
            <div>
              <span className="section-kicker">
                <Translate id="homepage.docs.eyebrow">文档中心</Translate>
              </span>
              <Heading as="h2">
                <Translate id="homepage.docs.title">从第一篇笔记开始</Translate>
              </Heading>
              <p>
                <Translate id="homepage.docs.description">
                  清晰的指南、可搜索的文档，以及持续更新的最佳实践。
                </Translate>
              </p>
            </div>
            <Link className="button button--primary button--lg" to="/docs/intro">
              <Translate id="homepage.docs.cta">进入文档中心</Translate>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
