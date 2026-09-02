/**
 * FatNotes 官网与文档中心的 Docusaurus 配置
 *
 * @author By AICode
 * @date 2026-09-02
 */

import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'FatNotes',
  tagline: '让知识真正流动起来',
  favicon: 'img/favicon.svg',
  url: 'https://lazychun.github.io',
  baseUrl: '/fat-notes-home/',
  organizationName: 'LazyChun',
  projectName: 'fat-notes-home',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  trailingSlash: false,
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/LazyChun/fat-notes-home/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'keywords',
        content: 'FatNotes, 肥仔笔记, 知识管理, 数据看板, 自动化, AI',
      },
    ],
    navbar: {
      title: 'FatNotes',
      logo: {
        alt: 'FatNotes Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: '首页', position: 'left'},
        {
          href: 'https://lazychun.github.io/fat-notes-home/#features',
          label: '功能',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: '文档',
          position: 'left',
        },
        {
          href: 'https://github.com/LazyChun/fat-notes-home',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '开始使用',
          items: [
            {label: '快速开始', to: '/docs/getting-started/quick-start'},
            {label: '文档中心', to: '/docs/intro'},
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LazyChun/fat-notes-home',
            },
            {
              label: '问题反馈',
              href: 'https://github.com/LazyChun/fat-notes-home/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FatNotes. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
