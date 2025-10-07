import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Projects', to: '/projects', hasDropdown: true },
  { label: 'About', to: '/about' },
  { label: 'Training', to: '/training' },
  { label: 'Shop', to: '/shop' },
  { label: 'Testimonies', to: '/testimonies' },
  { label: 'Story', to: '/story' },
  { label: 'Contact', to: '/contact' },
];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const ui = (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[9999]">
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white shadow-xl rounded-l-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold">Raphael Mission</div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl p-4">
            <nav className="space-y-4">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={onClose} className="flex items-center justify-between text-gray-700 text-lg">
                  <span>{l.label}</span>
                  {l.hasDropdown && (
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/donate" onClick={onClose} className="mt-6 block text-center rounded-2xl py-4 shadow-lg bg-emerald-700 text-white text-xl font-semibold">
            Donate
          </Link>
        </div>

        <div className="pt-4 text-center text-sm text-gray-700">© Raphael Mission 2025. All rights</div>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}


