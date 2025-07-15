import React from 'react';

export default function HeroSection({ children }) {
  return (
    <section id="hero" className="relative w-full flex flex-col items-center justify-center py-12 px-2 sm:px-4 min-h-[60vh] overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200 via-cyan-200 to-purple-200 rounded-full blur-3xl opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-200 via-blue-100 to-cyan-100 rounded-full blur-2xl opacity-30 animate-pulse-slow" />
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-400 bg-clip-text text-transparent drop-shadow mb-2">Your Instant QR Code Companion</h1>
        <p className="text-lg sm:text-xl text-blue-500 font-medium mb-4">Generate, customize, and share QR codes in seconds. Free, fast, and privacy-friendly.</p>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </section>
  );
} 