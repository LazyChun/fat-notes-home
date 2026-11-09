/**
 * FatNotes 官网首页，展示产品定位、核心能力与文档入口
 *
 * @author By AICode
 * @date 2026-09-02
 */

import {useEffect, useState} from 'react';
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

// 渲染单个产品能力卡片
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

// 渲染首页预览区：走马灯循环播放图表展廊与流程画布截图
function HeroCarousel(): ReactNode {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="product-shell" aria-label="FatNotes 功能预览">
      <div className="window-bar">
        <span className="window-dot window-dot--red" />
        <span className="window-dot window-dot--yellow" />
        <span className="window-dot window-dot--green" />
        <span className="window-title">FatNotes Workspace</span>
      </div>
      <div className="hero-carousel">
        {heroSlides.map((slide, index) => (
          <figure
            key={slide.src}
            className={clsx('hero-slide', {'hero-slide--active': index === active})}
            aria-hidden={index !== active}
          >
            <img src={slide.src} alt={slide.alt} loading="eager" />
            <figcaption>{slide.caption}</figcaption>
          </figure>
        ))}
        <div className="hero-carousel-dots">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`切换到第 ${index + 1} 张预览`}
              className={clsx('hero-dot', {'hero-dot--active': index === active})}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
      <div className="status-bar">
        <span>main*</span>
        <span>Live Preview</span>
        <span>UTF-8　Markdown</span>
      </div>
    </div>
  );
}

// 首页预览走马灯的轮播片单
const heroSlides = [

  {
    src: '/fat-notes-home/img/features/charts-display.png',
    alt: '图表类型展廊：50+ 种块组件合集',
    caption: '提供50+种块组件',
  },
  {
    src: '/fat-notes-home/img/features/flow.png',
    alt: '流程自动化：异常报告智能决策流画布',
    caption: '流程自动化 · 可视化节点编排',
  },
  {
    src: '/fat-notes-home/img/features/notebook.png',
    alt: '笔记模板：Markdown 语法速览与多种笔记模板',
    caption: '笔记模板 · 块级富文本编辑',
  },
  {
    src: '/fat-notes-home/img/features/ai-assistant.png',
    alt: 'AI 助手：工作台侧栏 Chat 结合当前看板与知识库实时对话',
    caption: 'AI 助手 · 侧栏 Chat 实时协作',
  },
  {
    src: '/fat-notes-home/img/features/flow-result.png',
    alt: '流程运行结果：时间戳转换后自动回填到看板文本块',
    caption: '流程运行 · 结果自动回填',
  },
];

/**
 * FatNotes 官网首页组件
 *
 * @returns 官网首页内容
 */
// 组合并渲染 FatNotes 官网首页 
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
                <Link className="button button--primary button--lg" to="/download">
                  <Translate id="homepage.cta.download">免费下载</Translate>
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
              <HeroCarousel />
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
