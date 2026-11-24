import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// Minimum horizontal travel (px) that counts as a swipe instead of a tap.
const SWIPE_THRESHOLD = 50;
// Vertical travel (px) after which releasing the finger closes the viewer.
const SWIPE_CLOSE_THRESHOLD = 80;

/**
 * Fullscreen image viewer (project gallery, shop paintings).
 *
 * Controlled by `index`: a number opens the viewer on that image, `null` keeps
 * it closed. Closing restores focus to whatever element opened it, so keyboard
 * and screen-reader users land back on the thumbnail they clicked.
 *
 * Swipe up or down closes; left/right flips photos, or closes when there is
 * only one. Optional `captions` are shown under the photo and used as alt text.
 */
const Lightbox = ({ images, index, onClose, onIndexChange, labels, captions }) => {
  const isOpen = index !== null && index !== undefined;
  const total = images.length;

  const [isZoomed, setIsZoomed] = useState(false);
  const [dragY, setDragY] = useState(0);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const touchStart = useRef(null);
  const panRef = useRef(null);

  const goTo = useCallback(
    (nextIndex) => {
      if (total === 0) return;
      onIndexChange((nextIndex + total) % total);
    },
    [onIndexChange, total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Remember the opener, lock page scroll, and move focus into the dialog.
  // The open/close fade is a CSS animation, not React state: a viewer must
  // never end up with an invisible overlay that still swallows clicks if a
  // frame callback is throttled.
  useEffect(() => {
    if (!isOpen) return undefined;

    triggerRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Tab') e.preventDefault(); // keep focus inside the dialog
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  // Always reopen a photo at fit-to-screen, including after prev/next.
  useEffect(() => {
    setIsZoomed(false);
    setDragY(0);
  }, [index, isOpen]);

  // Start the zoomed view centred instead of at the top-left corner.
  useEffect(() => {
    const el = panRef.current;
    if (!isZoomed || !el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [isZoomed]);

  if (!isOpen || total === 0) return null;

  // While zoomed, drags pan the photo — they must not also flip or close it.
  // A second finger (pinch) cancels the gesture.
  const handleTouchStart = (e) => {
    if (isZoomed || e.touches.length > 1) {
      touchStart.current = null;
      return;
    }
    const { clientX, clientY } = e.changedTouches[0];
    touchStart.current = { x: clientX, y: clientY };
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current) return;
    if (e.touches.length > 1) {
      touchStart.current = null;
      setDragY(0);
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    setDragY(Math.abs(dy) > Math.abs(dx) ? dy : 0);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    setDragY(0);

    if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) >= SWIPE_CLOSE_THRESHOLD) onClose();
      return;
    }
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (total === 1) onClose();
    else if (dx > 0) goPrev();
    else goNext();
  };

  const caption = captions?.[index];
  const imageAlt = caption || `${labels.image} ${index + 1}`;

  const arrowClasses =
    'absolute top-1/2 z-10 -translate-y-1/2 flex items-center justify-center w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      className="lightbox-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
        setDragY(0);
      }}
    >
      {/* Close */}
      <button
        type="button"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={labels.close}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={labels.previous}
            className={`${arrowClasses} left-2 sm:left-5`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={labels.next}
            className={`${arrowClasses} right-2 sm:right-5`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image */}
      <div className="lightbox-figure relative max-w-full max-h-full">
        <div
          className={`flex flex-col items-center ${dragY === 0 ? 'transition-[transform,opacity] duration-200 ease-out' : ''}`}
          style={{
            transform: `translateY(${dragY}px)`,
            opacity: 1 - Math.min(Math.abs(dragY) / 400, 0.6),
          }}
        >
          {isZoomed ? (
            <div
              ref={panRef}
              className="overflow-auto overscroll-contain max-w-[84vw] sm:max-w-[88vw] max-h-[78vh] sm:max-h-[82vh] rounded-lg"
            >
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                aria-label={labels.zoomOut}
                className="block cursor-zoom-out focus:outline-none"
              >
                <img
                  src={images[index]}
                  alt={imageAlt}
                  className="max-w-none w-[180vw] sm:w-[150vw] h-auto select-none"
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              aria-label={labels.zoomIn}
              className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
            >
              <img
                src={images[index]}
                alt={imageAlt}
                className={`max-w-[84vw] sm:max-w-[88vw] ${caption ? 'max-h-[70vh] sm:max-h-[76vh]' : 'max-h-[78vh] sm:max-h-[82vh]'} w-auto h-auto object-contain rounded-lg select-none`}
              />
            </button>
          )}
          {caption && (
            <p className="mt-3 max-w-[84vw] sm:max-w-[640px] text-center text-[14px] sm:text-[16px] leading-snug font-poppins text-white line-clamp-2">
              {caption}
            </p>
          )}
          {total > 1 && (
            <span className="mt-4 text-[14px] sm:text-[16px] font-poppins text-white/80">
              {index + 1} / {total}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    dialog: PropTypes.string,
    close: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string,
    image: PropTypes.string,
    zoomIn: PropTypes.string,
    zoomOut: PropTypes.string,
  }),
  captions: PropTypes.arrayOf(PropTypes.string),
};

Lightbox.defaultProps = {
  index: null,
  captions: null,
  labels: {
    dialog: 'Image viewer',
    close: 'Close',
    previous: 'Previous image',
    next: 'Next image',
    image: 'Image',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
  },
};

export default Lightbox;
