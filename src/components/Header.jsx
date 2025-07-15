import React, { useState } from 'react';

export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'hn', label: 'Hinglish' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'How to Use', href: '#howto' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 w-full z-30 bg-white/70 backdrop-blur-lg shadow-md border-b border-blue-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow truncate select-none">QRQuick</span>
        {/* Desktop nav and language selector */}
        <nav className="hidden md:flex gap-6 text-blue-700 font-semibold text-base">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="relative group transition">
              <span>{link.label}</span>
              <span className="block h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>
        <div className="hidden md:flex gap-1 ml-4 flex-wrap">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`px-2 py-1 rounded-full text-xs font-semibold border transition ${lang === l.code ? 'bg-blue-200 border-blue-400 text-blue-800' : 'bg-white border-blue-100 text-blue-500 hover:bg-blue-50'}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex flex-col gap-1 p-2 ml-2" onClick={() => setOpen(o => !o)} aria-label="Open menu">
          <span className="w-6 h-0.5 bg-blue-700 rounded transition" />
          <span className="w-6 h-0.5 bg-blue-700 rounded transition" />
          <span className="w-6 h-0.5 bg-blue-700 rounded transition" />
        </button>
        {/* Mobile menu */}
        {open && (
          <div className="fixed inset-0 bg-black/40 z-40 flex flex-col items-end md:hidden" onClick={() => setOpen(false)}>
            <div className="bg-white/95 backdrop-blur-lg shadow-lg rounded-l-2xl p-6 mt-0 mr-0 flex flex-col gap-4 w-full max-w-xs min-h-screen safe-area-inset-top safe-area-inset-bottom" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 text-2xl" onClick={() => setOpen(false)} aria-label="Close menu">&times;</button>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow select-none mb-4">QRQuick</span>
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="text-blue-700 font-bold text-lg hover:text-purple-500 transition py-2" onClick={() => setOpen(false)}>{link.label}</a>
              ))}
              <div className="flex gap-1 mt-4 flex-wrap">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    className={`px-2 py-1 rounded-full text-xs font-semibold border transition ${lang === l.code ? 'bg-blue-200 border-blue-400 text-blue-800' : 'bg-white border-blue-100 text-blue-500 hover:bg-blue-50'}`}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 