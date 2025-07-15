import React from 'react';

export default function FAQSection() {
  return (
    <section id="faq" className="w-full py-16 px-2 sm:px-4 bg-white/90 backdrop-blur-lg border-t border-blue-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">Is QRQuick free to use?</h3>
            <p className="text-gray-700">Yes! QRQuick is 100% free and open-source for personal and commercial use.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600">Is my data safe?</h3>
            <p className="text-gray-700">Absolutely. All QR code generation happens in your browser. No data is sent to any server.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600">Can I add my logo or brand colors?</h3>
            <p className="text-gray-700">Yes! You can upload a logo and choose custom colors and styles for your QR code.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600">How do I share my QR code?</h3>
            <p className="text-gray-700">Use the <span className="font-semibold">Actions</span> button to download, export, or share your QR code via WhatsApp, Email, and more.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 