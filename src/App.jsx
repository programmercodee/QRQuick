import { FaImage, FaCopy, FaShareAlt, FaFilePdf, FaFileCode, FaPrint, FaEllipsisH, FaTimes, FaWhatsapp, FaEnvelope, FaTwitter, FaFacebook, FaLink } from "react-icons/fa";
import QRGenerator from './components/QRGenerator'
import { useState, createContext, useContext, useRef } from 'react';
import QRDisplay, { ActionBtn, Divider } from './components/QRDisplay';
import Header, { LANGS } from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import HowToUseSection from './components/HowToUseSection';
import FAQSection from './components/FAQSection';

const translations = {
  en: {
    generate: 'Generate QR Code',
    download: 'Download',
    copy: 'Copy',
    share: 'Share',
    templates: 'Templates',
    scan: 'Scan',
    showStyling: 'Show Styling Options',
    hideStyling: 'Hide Styling Options',
    type: 'QR Type',
    text: 'Text or URL',
    website: 'Website',
    wifi: 'WiFi',
    email: 'Email',
    sms: 'SMS',
    vcard: 'vCard',
    options: 'Options',
    format: 'Format',
    theme: 'Theme',
    fgColor: 'FG Color',
    bgColor: 'BG Color',
    size: 'Size',
    margin: 'Margin',
    logo: 'Logo (center)',
    remove: 'Remove',
    logoSize: 'Logo Size',
    logoMargin: 'Logo Margin',
    hideDots: 'Hide dots under logo',
    downloadQR: 'Download QR as image',
    copyQR: 'Copy QR as image',
    shareQR: 'Share QR code',
    svg: 'SVG',
    pdf: 'PDF',
    print: 'Print',
    enterData: 'Enter valid text or data to generate QR code',
    chooseTemplate: 'Choose a Template',
  },
  hi: {
    generate: 'QR कोड बनाओ',
    download: 'डाउनलोड करो',
    copy: 'कॉपी करो',
    share: 'शेयर करो',
    templates: 'टेम्पलेट्स',
    scan: 'स्कैन करो',
    showStyling: 'स्टाइलिंग ऑप्शन दिखाओ',
    hideStyling: 'स्टाइलिंग ऑप्शन छुपाओ',
    type: 'QR टाइप',
    text: 'टेक्स्ट या URL',
    website: 'वेबसाइट',
    wifi: 'WiFi',
    email: 'ईमेल',
    sms: 'SMS',
    vcard: 'vCard',
    options: 'ऑप्शन',
    format: 'फॉर्मेट',
    theme: 'थीम',
    fgColor: 'कलर (आगे)',
    bgColor: 'कलर (पीछे)',
    size: 'साइज़',
    margin: 'मार्जिन',
    logo: 'लोगो (बीच में)',
    remove: 'हटा दो',
    logoSize: 'लोगो साइज',
    logoMargin: 'लोगो मार्जिन',
    hideDots: 'लोगो के नीचे डॉट्स छुपाओ',
    downloadQR: 'QR इमेज डाउनलोड करो',
    copyQR: 'QR इमेज कॉपी करो',
    shareQR: 'QR कोड शेयर करो',
    svg: 'SVG',
    pdf: 'PDF',
    print: 'प्रिंट',
    enterData: 'QR कोड बनाने के लिए सही डाटा डालो',
    chooseTemplate: 'टेम्पलेट चुनो',
  },
  pa: {
    generate: 'QR ਕੋਡ ਬਣਾਓ',
    download: 'ਡਾਊਨਲੋਡ ਕਰੋ',
    copy: 'ਕਾਪੀ ਕਰੋ',
    share: 'ਸ਼ੇਅਰ ਕਰੋ',
    templates: 'ਟੈਮਪਲੇਟ',
    scan: 'ਸਕੈਨ ਕਰੋ',
    showStyling: 'ਸਟਾਈਲਿੰਗ ਚੋਣ ਦਿਖਾਓ',
    hideStyling: 'ਸਟਾਈਲਿੰਗ ਚੋਣ ਲੁਕਾਓ',
    type: 'QR ਕਿਸਮ',
    text: 'ਟੈਕਸਟ ਜਾਂ URL',
    website: 'ਵੈੱਬਸਾਈਟ',
    wifi: 'WiFi',
    email: 'ਈਮੇਲ',
    sms: 'SMS',
    vcard: 'vCard',
    options: 'ਚੋਣ',
    format: 'ਫਾਰਮੈਟ',
    theme: 'ਥੀਮ',
    fgColor: 'ਰੰਗ (ਅੱਗੇ)',
    bgColor: 'ਰੰਗ (ਪਿੱਛੇ)',
    size: 'ਸਾਈਜ਼',
    margin: 'ਮਾਰਜਿਨ',
    logo: 'ਲੋਗੋ (ਵਿਚਕਾਰ)',
    remove: 'ਹਟਾਓ',
    logoSize: 'ਲੋਗੋ ਸਾਈਜ਼',
    logoMargin: 'ਲੋਗੋ ਮਾਰਜਿਨ',
    hideDots: 'ਲੋਗੋ ਹੇਠਾਂ ਡਾਟ ਲੁਕਾਓ',
    downloadQR: 'QR ਇਮੇਜ ਡਾਊਨਲੋਡ ਕਰੋ',
    copyQR: 'QR ਇਮੇਜ ਕਾਪੀ ਕਰੋ',
    shareQR: 'QR ਕੋਡ ਸ਼ੇਅਰ ਕਰੋ',
    svg: 'SVG',
    pdf: 'PDF',
    print: 'ਪਰਿੰਟ',
    enterData: 'QR ਕੋਡ ਬਣਾਉਣ ਲਈ ਠੀਕ ਡਾਟਾ ਭਰੋ',
    chooseTemplate: 'ਟੈਮਪਲੇਟ ਚੁਣੋ',
  },
  hn: {
    generate: 'QR code banao',
    download: 'Download karo',
    copy: 'Copy karo',
    share: 'Share karo',
    templates: 'Template',
    scan: 'Scan karo',
    showStyling: 'Styling option dikhao',
    hideStyling: 'Styling option chupao',
    type: 'QR type',
    text: 'Text ya URL',
    website: 'Website',
    wifi: 'WiFi',
    email: 'Email',
    sms: 'SMS',
    vcard: 'vCard',
    options: 'Option',
    format: 'Format',
    theme: 'Theme',
    fgColor: 'Color (aage)',
    bgColor: 'Color (peeche)',
    size: 'Size',
    margin: 'Margin',
    logo: 'Logo (beech mein)',
    remove: 'Hatao',
    logoSize: 'Logo size',
    logoMargin: 'Logo margin',
    hideDots: 'Logo ke neeche dots chupao',
    downloadQR: 'QR image download karo',
    copyQR: 'QR image copy karo',
    shareQR: 'QR code share karo',
    svg: 'SVG',
    pdf: 'PDF',
    print: 'Print',
    enterData: 'QR code banane ke liye sahi data daalo',
    chooseTemplate: 'Template chuno',
  },
};

export const LangContext = createContext({ lang: 'en', t: (k) => k });

export default function App() {
  const [lang, setLang] = useState('en');
  const t = (k) => translations[lang][k] || translations['en'][k] || k;
  // FAB modal state
  const [showFabActions, setShowFabActions] = useState(false);
  // Share modal state
  const [showShare, setShowShare] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  // QR state for FAB visibility
  const [qrState, setQrState] = useState({ showQR: false, errors: {}, text: "", options: {}, qrRef: { current: null }, qrInstance: { current: null } });

  // Handler to update QR state from QRGenerator
  const handleQRState = (state) => setQrState(state);

  // Action handlers
  const disabled = Object.keys(qrState.errors || {}).length > 0;
  const downloading = false; // You can add state if you want to show downloading status

  const handleDownload = async () => {
    if (!qrState.qrInstance.current || disabled) return;
    await qrState.qrInstance.current.download({ name: "qrquick", extension: qrState.options.format });
  };

  const handleCopy = async () => {
    const canvas = qrState.qrRef.current?.querySelector('canvas, svg');
    if (!canvas) return;
    try {
      await new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) return reject();
          navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]).then(resolve, reject);
        });
      });
      setShareStatus("Copied!");
      setTimeout(() => setShareStatus(""), 1200);
    } catch { }
  };

  const handleExportSVG = async () => {
    if (!qrState.qrInstance.current || disabled) return;
    const blob = await qrState.qrInstance.current.getRawData("svg");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrquick.svg";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleExportPDF = async () => {
    if (!qrState.qrInstance.current || disabled) return;
    const blob = await qrState.qrInstance.current.getRawData("png");
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    let jsPDF;
    await import('jspdf').then(mod => { jsPDF = mod.default; });
    img.src = url;
    img.onload = () => {
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: [img.width, img.height] });
      pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
      pdf.save("qrquick.pdf");
      URL.revokeObjectURL(url);
    };
  };

  const handlePrint = async () => {
    if (!qrState.qrInstance.current || disabled) return;
    const blob = await qrState.qrInstance.current.getRawData("png");
    const url = URL.createObjectURL(blob);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<html><head><title>Print QR Code</title></head><body style='display:flex;align-items:center;justify-content:center;height:100vh;background:#f8fafc;'><img src='${url}' style='max-width:90vw;max-height:90vh;'/></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => printWindow.close(), 500);
    };
  };

  const handleShare = async () => {
    if (!qrState.qrInstance.current || disabled) return;
    // Export as PNG data URL
    const blob = await qrState.qrInstance.current.getRawData("png");
    const dataUrl = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    setShareUrl(dataUrl);
    // Try Web Share API
    if (navigator.canShare && navigator.canShare({ files: [new File([], "qrquick.png", { type: "image/png" })] })) {
      const fileBlob = await fetch(dataUrl).then(r => r.blob());
      const file = new File([fileBlob], "qrquick.png", { type: "image/png" });
      try {
        await navigator.share({
          files: [file],
          title: "QR Code from QRQuick",
          text: "Scan this QR code!",
        });
        setShareStatus("Shared!");
        setTimeout(() => setShareStatus(""), 1200);
        return;
      } catch (e) {
        // fallback to modal
      }
    }
    setShowShare(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("Link copied!");
    } catch {
      setShareStatus("Failed");
    }
    setTimeout(() => setShareStatus(""), 1200);
  };

  // Section refs for smooth scroll
  const aboutRef = useRef(null);
  const howToRef = useRef(null);
  const faqRef = useRef(null);

  // Scroll to section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <LangContext.Provider value={{ lang, t }}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200">
        <Header lang={lang} setLang={setLang} />
        <HeroSection>
          <QRGenerator lang={lang} t={t} onQRStateChange={handleQRState} />
        </HeroSection>
        <AboutSection />
        <HowToUseSection />
        <FAQSection />
        <Footer />
        {/* Floating FAB and Modal (mobile only, when QR is visible) */}
        {qrState.showQR && (
          <>
            <button
              className="fixed bottom-6 right-6 z-50 p-5 rounded-full bg-white/80 backdrop-blur-md shadow-2xl border border-blue-200 text-blue-700 text-3xl animate-fab-glow hover:bg-blue-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
              onClick={() => setShowFabActions(v => !v)}
              aria-label="Actions: Download or more actions"
              style={{ boxShadow: '0 4px 32px 0 rgba(59,130,246,0.15)' }}
            >
              <FaEllipsisH />
              <span className="sr-only">Actions: Download or more actions</span>
              {/* Tooltip for visual users */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                Actions
              </span>
            </button>
            {showFabActions && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in md:hidden" onClick={() => setShowFabActions(false)}>
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-5 w-full max-w-xs min-w-[90vw] mx-2 relative animate-scale-in flex flex-col gap-3" onClick={e => e.stopPropagation()}>
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-blue-500" onClick={() => setShowFabActions(false)}><FaTimes size={24} /></button>
                  <div className="flex flex-col gap-3">
                    <ActionBtn icon={<FaImage className="text-blue-500 text-2xl" />} label={downloading ? "Downloading..." : "Download"} onClick={handleDownload} disabled={disabled || downloading} />
                    <Divider />
                    <ActionBtn icon={<FaCopy className="text-cyan-500 text-2xl" />} label="Copy" onClick={handleCopy} disabled={disabled} />
                    <Divider />
                    <ActionBtn icon={<FaFileCode className="text-purple-500 text-2xl" />} label="SVG" onClick={handleExportSVG} disabled={disabled} />
                    <Divider />
                    <ActionBtn icon={<FaFilePdf className="text-red-500 text-2xl" />} label="PDF" onClick={handleExportPDF} disabled={disabled} />
                    <Divider />
                    <ActionBtn icon={<FaPrint className="text-green-500 text-2xl" />} label="Print" onClick={handlePrint} disabled={disabled} />
                    <Divider />
                    <ActionBtn icon={<FaShareAlt className="text-blue-400 text-2xl" />} label="Share" onClick={handleShare} disabled={disabled} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {/* Share Modal */}
        {showShare && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-xl relative animate-fade-in">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-blue-500" onClick={() => setShowShare(false)}><FaTimes size={18} /></button>
              <h3 className="text-lg font-bold mb-3 text-blue-700 flex items-center gap-2"><FaShareAlt /> Share QR Code</h3>
              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent('Scan this QR code! ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-800 font-semibold hover:bg-green-200"><FaWhatsapp /> WhatsApp</a>
                <a href={`mailto:?subject=QR Code&body=Scan this QR code!%0A${encodeURIComponent(shareUrl)}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200"><FaEnvelope /> Email</a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Scan this QR code! ')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-100 text-cyan-800 font-semibold hover:bg-cyan-200"><FaTwitter /> Twitter</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"><FaFacebook /> Facebook</a>
                <button onClick={handleCopyLink} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"><FaLink /> Copy Link</button>
              </div>
              {shareStatus && <div className="text-center text-green-600 mt-2">{shareStatus}</div>}
            </div>
          </div>
        )}
      </div>
    </LangContext.Provider>
  );
}
