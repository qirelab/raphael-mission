import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const Alert = ({ type = 'info', title, message, duration = 5000, onClose, show = true, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsLeaving(false);
      setProgress(100);

      // Trigger enter animation
      setTimeout(() => setIsEntering(true), 10);

      if (duration > 0) {
        const startTime = Date.now();

        // Progress bar animation
        progressIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
          setProgress(remaining);

          if (remaining === 0) {
            clearInterval(progressIntervalRef.current);
          }
        }, 16); // ~60fps

        // Auto close timer
        timerRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      };
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsEntering(false);
    setIsLeaving(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 400);
  };

  if (!isVisible) return null;

  const getAlertConfig = () => {
    const configs = {
      success: {
        bgGradient: 'from-green-50 via-green-50/95 to-emerald-50/90',
        borderColor: 'border-green-200/60',
        iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
        iconColor: 'text-white',
        textColor: 'text-green-900',
        titleColor: 'text-green-800',
        progressBg: 'bg-green-500',
        shadowColor: 'shadow-green-200/50',
        glowColor: 'shadow-green-400/30',
      },
      error: {
        bgGradient: 'from-red-50 via-red-50/95 to-rose-50/90',
        borderColor: 'border-red-200/60',
        iconBg: 'bg-gradient-to-br from-red-400 to-rose-500',
        iconColor: 'text-white',
        textColor: 'text-red-900',
        titleColor: 'text-red-800',
        progressBg: 'bg-red-500',
        shadowColor: 'shadow-red-200/50',
        glowColor: 'shadow-red-400/30',
      },
      warning: {
        bgGradient: 'from-yellow-50 via-amber-50/95 to-orange-50/90',
        borderColor: 'border-yellow-200/60',
        iconBg: 'bg-gradient-to-br from-yellow-400 to-amber-500',
        iconColor: 'text-white',
        textColor: 'text-yellow-900',
        titleColor: 'text-yellow-800',
        progressBg: 'bg-yellow-500',
        shadowColor: 'shadow-yellow-200/50',
        glowColor: 'shadow-yellow-400/30',
      },
      info: {
        bgGradient: 'from-blue-50 via-blue-50/95 to-cyan-50/90',
        borderColor: 'border-blue-200/60',
        iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
        iconColor: 'text-white',
        textColor: 'text-blue-900',
        titleColor: 'text-blue-800',
        progressBg: 'bg-blue-500',
        shadowColor: 'shadow-blue-200/50',
        glowColor: 'shadow-blue-400/30',
      },
    };

    return configs[type] || configs.info;
  };

  const getIcon = () => {
    const config = getAlertConfig();
    const iconClass = `w-5 h-5 sm:w-6 sm:h-6 ${config.iconColor}`;

    const icons = {
      success: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      error: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      warning: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      info: (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    };

    return icons[type] || icons.info;
  };

  const config = getAlertConfig();

  const getAnimationClasses = () => {
    if (isLeaving) {
      return 'opacity-0 translate-x-full scale-95';
    }
    if (isEntering) {
      return 'opacity-100 translate-x-0 scale-100';
    }
    return 'opacity-0 translate-x-full scale-95';
  };

  const ui = (
    <div
      className={`
        fixed z-[10000]
        bottom-4 right-4
        sm:bottom-6 sm:right-6
        md:bottom-8 md:right-8
        w-[calc(100vw-2rem)]
        sm:w-[420px]
        md:w-[480px]
        max-w-[calc(100vw-2rem)]
      `}
    >
      <div
        className={`
          relative
          bg-gradient-to-br ${config.bgGradient}
          backdrop-blur-xl
          border ${config.borderColor}
          rounded-2xl
          shadow-2xl ${config.shadowColor}
          overflow-hidden
          transition-all duration-400 ease-out
          ${getAnimationClasses()}
        `}
        style={{
          transform: isEntering ? 'translateX(0) scale(1)' : undefined,
        }}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60"></div>

        {/* Main content */}
        <div className="relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5">
          {/* Icon with animation */}
          <div
            className={`
              flex-shrink-0
              ${config.iconBg}
              rounded-xl sm:rounded-2xl
              p-2 sm:p-2.5
              shadow-lg ${config.glowColor}
              transition-all duration-300
              ${isEntering ? 'animate-bounce-in' : ''}
            `}
          >
            {getIcon()}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 pt-0.5">
            {title && (
              <h4
                className={`
                  text-sm sm:text-base
                  font-bold
                  ${config.titleColor}
                  font-poppins
                  mb-1
                  leading-snug
                `}
              >
                {title}
              </h4>
            )}
            <p
              className={`
                text-xs sm:text-sm
                ${config.textColor}
                font-poppins
                leading-relaxed
                break-words
              `}
            >
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0
              p-1.5 sm:p-2
              rounded-lg
              ${config.textColor}
              hover:bg-black/10
              active:bg-black/20
              transition-all duration-200
              hover:scale-110
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-current
            `}
            aria-label="Close notification"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="relative h-1 bg-black/5">
            <div
              className={`
                absolute left-0 top-0 h-full
                ${config.progressBg}
                transition-all duration-100 ease-linear
                shadow-lg
              `}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.15);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );

  return createPortal(ui, document.body);
};

export default Alert;
