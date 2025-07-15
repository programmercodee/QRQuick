import React from 'react';
import { FaEllipsisH, FaQrcode, FaMagic, FaDownload } from 'react-icons/fa';

export default function HowToUseSection() {
  return (
    <section id="howto" className="w-full py-16 px-2 sm:px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-t border-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">How to Use</h2>
        <ol className="text-lg text-gray-700 space-y-6 max-w-2xl mx-auto text-left">
          <li className="flex items-center gap-3"><FaQrcode className="text-blue-400 text-2xl" /><span><span className="font-bold text-blue-600">1.</span> Enter your text, link, or select a template.</span></li>
          <li className="flex items-center gap-3"><FaMagic className="text-purple-400 text-2xl" /><span><span className="font-bold text-blue-600">2.</span> Customize colors, logo, and style as you like.</span></li>
          <li className="flex items-center gap-3"><FaDownload className="text-green-500 text-2xl" /><span><span className="font-bold text-blue-600">3.</span> Click <span className="font-semibold">Generate</span> to see your QR code instantly.</span></li>
          <li className="flex items-center gap-3"><FaEllipsisH className="text-blue-500 text-2xl" /><span><span className="font-bold text-blue-600">4.</span> Use the <span className="font-semibold">Actions</span> button to download, export, or share.</span></li>
          <li className="flex items-center gap-3"><FaQrcode className="text-blue-400 text-2xl" /><span><span className="font-bold text-blue-600">5.</span> Scan your QR code with any device!</span></li>
        </ol>
      </div>
    </section>
  );
} 