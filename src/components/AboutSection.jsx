import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 px-2 sm:px-4 bg-white/80 backdrop-blur-lg border-t border-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">About QRQuick</h2>
        <p className="text-lg text-gray-700 mb-4">QRQuick is a modern, open-source QR code generator designed for speed, privacy, and ease of use. No data is ever sent to a server—everything happens in your browser. Enjoy beautiful, customizable QR codes for links, WiFi, contacts, and more.</p>
        <ul className="flex flex-wrap justify-center gap-6 mt-6 text-blue-600 font-semibold text-base">
          <li>🔒 100% Privacy</li>
          <li>🎨 Custom Styles</li>
          <li>📱 Mobile Friendly</li>
          <li>🌐 Multi-language</li>
          <li>🖼️ Logo & Branding</li>
          <li>🖨️ Export: PNG, SVG, PDF, Print</li>
          <li>🔗 Share Anywhere</li>
        </ul>
      </div>
    </section>
  );
} 