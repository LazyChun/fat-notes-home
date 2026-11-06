/**
 * 下载页 / 更新日志页的轻量多语言工具
 *
 * 站点的默认语言是 zh-Hans，英文 locale 为 en；页面文案用 Localized 对象维护，
 * 不依赖 code.json，保证长文本（更新日志）在中英两套路由下都完整可读。
 *
 * @author By AICode
 * @date 2026-11-07
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type Locale = 'zh' | 'en';

export type Localized = Record<Locale, string>;

/** 构造一条中英双语文案 */
export function L(zh: string, en: string): Localized {
  return {zh, en};
}

/** 读取当前 Docusaurus locale，归一化为 zh / en */
export function useLocale(): Locale {
  const {i18n} = useDocusaurusContext();
  return i18n.currentLocale === 'en' ? 'en' : 'zh';
}

/** 按当前 locale 取出文案 */
export function pick(text: Localized, locale: Locale): string {
  return text[locale];
}
