import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-2 sm:px-4 bg-white/80 backdrop-blur-lg border-t border-blue-100 text-gray-600 text-sm mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-blue-700 font-bold mb-2">QRQuick</h4>
          <p className="mb-2">QRQuick is crafted for creators and businesses who value privacy and speed.<br />Generate beautiful QR codes instantly, with no data ever sent to a server.</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition text-lg">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition text-lg">LinkedIn</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition text-lg">Twitter</a>
          </div>
          <div className="mt-4 text-left">
            <h5 className="text-blue-700 font-semibold mb-1">About the Creator</h5>
            <p className="text-xs text-gray-700 leading-relaxed">
              <span className="font-bold">Mr Brijesh</span> is a passionate software developer, web enthusiast, and advocate for privacy-first QR technology. With a love for building beautiful, user-friendly web apps, he helps people and businesses connect the digital and real worlds effortlessly.<br />
              <a href="https://my-portfolio-mu-eight-11.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">View my portfolio</a>
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-blue-700 font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#hero" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#howto" className="hover:underline">How to Use</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-blue-700 font-bold mb-2">Credits</h4>
          <p>Made with <span className="text-blue-500">&#10084;&#65039;</span> by Mr Brijesh</p>
          <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} QRQuick</p>
        </div>
      </div>
    </footer>
  );
} 