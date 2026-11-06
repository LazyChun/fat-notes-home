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
        'guides/features',
        'guides/ai-assistant',
        'guides/knowledge-workspace',
        'guides/quick-input',
        'guides/data-dashboard',
        'guides/flow-automation',
        'guides/functions',
        {
          type: 'category',
          label: '系统组件',
          collapsed: false,
          items: [
            'guides/system-components/overview',
            'guides/system-components/common-config',
            'guides/system-components/chart',
            'guides/system-components/window',
            'guides/system-components/layout',
            'guides/system-components/flow-widget',
            'guides/system-components/filter',
            'guides/system-components/form',
            'guides/system-components/office',
            'guides/system-components/dialog',
            'guides/system-components/misc',
          ],
        },
        {
          type: 'category',
          label: '系统设置',
          collapsed: false,
          items: [
            'guides/system-settings/overview',
            'guides/system-settings/basic',
            'guides/system-settings/system-data',
            'guides/system-settings/components',
          ],
        },
        'guides/database',
        'guides/extensions',
        'guides/scheduled-tasks',
      ],
    },
    {
      type: 'category',
      label: '热门插件',
      items: ['plugins/index', 'plugins/fat-tools', 'plugins/fat-charts', 'plugins/fat-diagrams', 'plugins/fat-ai-base', 'plugins/fat-browser-use', 'plugins/fat-games', 'plugins/fat-cut', 'plugins/fat-photo', 'plugins/fat-it-interview'],
    },
    {
      type: 'category',
      label: '插件开发',
      items: ['plugin-dev/index'],
    },
  ],
};

export default sidebars;
