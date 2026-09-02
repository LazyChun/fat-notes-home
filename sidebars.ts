/**
 * FatNotes 文档中心侧边栏配置
 *
 * @author By AICode
 * @date 2026-09-02
 */

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '开始使用',
      collapsed: false,
      items: ['getting-started/quick-start', 'getting-started/write-docs'],
    },
    {
      type: 'category',
      label: '使用指南',
      items: [
        'guides/knowledge-workspace',
        'guides/data-dashboard',
        'guides/flow-automation',
      ],
    },
  ],
};

export default sidebars;
