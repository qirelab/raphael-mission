import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const EMPTY_DOC = '<!DOCTYPE html><html><head></head><body style="margin:0;overflow:hidden"></body></html>';

/**
 * ViewportPreview — renders children inside an iframe that is `width` px wide,
 * scaled down to fit the parent. Media queries (sm/md/lg/xl) are evaluated
 * against the iframe, and `lang` goes to the iframe's <html>, so a block looks
 * exactly as it does on the live site at that screen width and language.
 *
 * Page styles are copied into the iframe once, on load.
 */
const ViewportPreview = ({ width, lang, title = 'Предпросмотр', children }) => {
  const outerRef = useRef(null);
  const iframeRef = useRef(null);
  const [mountNode, setMountNode] = useState(null);
  const [outerWidth, setOuterWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
      doc.head.appendChild(node.cloneNode(true));
    });
    setMountNode(doc.body);
  };

  useEffect(() => {
    if (mountNode) mountNode.ownerDocument.documentElement.lang = lang;
  }, [mountNode, lang]);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return undefined;
    const observer = new ResizeObserver(() => setOuterWidth(outer.clientWidth));
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountNode) return undefined;
    const IframeResizeObserver = mountNode.ownerDocument.defaultView.ResizeObserver;
    const observer = new IframeResizeObserver(() => setContentHeight(mountNode.scrollHeight));
    observer.observe(mountNode);
    return () => observer.disconnect();
  }, [mountNode]);

  const scale = outerWidth ? Math.min(1, outerWidth / width) : 1;

  return (
    <div ref={outerRef} className="relative w-full overflow-hidden" style={{ height: contentHeight * scale }}>
      <iframe
        ref={iframeRef}
        title={title}
        srcDoc={EMPTY_DOC}
        onLoad={handleLoad}
        tabIndex={-1}
        className="absolute top-0 border-0 pointer-events-none"
        style={{
          width,
          height: contentHeight,
          left: scale < 1 ? 0 : (outerWidth - width) / 2,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
      {mountNode && createPortal(children, mountNode)}
    </div>
  );
};

export default ViewportPreview;
