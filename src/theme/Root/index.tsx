import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';

/**
 * 全局图片灯箱：双击文档正文中的图片放大查看
 *
 * - 仅作用于文档正文（.markdown 容器）内的图片
 * - 单击遮罩任意处或按 Esc 关闭
 */
export default function Root({children}: {children: ReactNode}): ReactNode {
  const [src, setSrc] = useState<string | null>(null);

  // 监听双击，命中文档图片时打开灯箱
  useEffect(() => {
    const onDblClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const img = target.closest?.('img');
      if (img && img.closest('.markdown')) {
        setSrc(img.currentSrc || img.getAttribute('src') || '');
      }
    };
    document.addEventListener('dblclick', onDblClick);
    return () => document.removeEventListener('dblclick', onDblClick);
  }, []);

  // 灯箱打开期间支持 Esc 关闭
  useEffect(() => {
    if (!src) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSrc(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [src]);

  return (
    <>
      {children}
      {src && (
        <div
          className="img-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="图片放大预览"
          onClick={() => setSrc(null)}
        >
          <img src={src} alt="放大预览" />
          <p>单击任意处或按 Esc 关闭</p>
        </div>
      )}
    </>
  );
}
