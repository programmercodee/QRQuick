import React, { useState } from "react";
import { FaImage, FaCopy, FaShareAlt, FaWhatsapp, FaEnvelope, FaTwitter, FaFacebook, FaLink, FaTimes, FaFilePdf, FaFileCode, FaPrint, FaEllipsisH } from "react-icons/fa";
import jsPDF from "jspdf";

export default function QRDisplay({ qrRef, qrInstance, options, errors, text }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [showActions, setShowActions] = useState(false); // for mobile three-dots
  const [qrAnimKey, setQrAnimKey] = useState(0); // for QR fade-in

  const handleDownload = async () => {
    if (!qrInstance.current || Object.keys(errors).length) return;
    setDownloading(true);
    try {
      await qrInstance.current.download({ name: "qrquick", extension: options.format });
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCopy = async () => {
    const canvas = qrRef.current.querySelector('canvas, svg');
    if (!canvas) return;
    try {
      await new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) return reject();
          navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]).then(resolve, reject);
        });
      });
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Failed");
    }
    setTimeout(() => setCopyStatus(""), 1200);
  };

  const handleShare = async () => {
    if (!qrInstance.current || Object.keys(errors).length) return;
    // Export as PNG data URL
    const dataUrl = await qrInstance.current.getRawData("png").then(blob => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    });
    setShareUrl(dataUrl);
    // Try Web Share API
    if (navigator.canShare && navigator.canShare({ files: [new File([], "qrquick.png", { type: "image/png" })] })) {
      const blob = await fetch(dataUrl).then(r => r.blob());
      const file = new File([blob], "qrquick.png", { type: "image/png" });
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

  const handleExportSVG = async () => {
    if (!qrInstance.current || Object.keys(errors).length) return;
    const blob = await qrInstance.current.getRawData("svg");
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
    if (!qrInstance.current || Object.keys(errors).length) return;
    const blob = await qrInstance.current.getRawData("png");
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: [img.width, img.height] });
      pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
      pdf.save("qrquick.pdf");
      URL.revokeObjectURL(url);
    };
  };

  const handlePrint = async () => {
    if (!qrInstance.current || Object.keys(errors).length) return;
    const blob = await qrInstance.current.getRawData("png");
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

  // Animate QR code area on update
  React.useEffect(() => {
    setQrAnimKey(k => k + 1);
  }, [text, options.fgColor, options.bgColor, options.logo]);

  const disabled = Object.keys(errors).length > 0;
  const showQR = !errors.text && text && text.trim();

  // Share links (using data URL as image, so only Copy Link is practical for now)
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Scan this QR code! " + shareUrl)}`;
  const emailUrl = `mailto:?subject=QR Code&body=Scan this QR code!%0A${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent("Scan this QR code! ")}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="text-center">
      {showQR ? (
        <>
          {/* DEBUG: Minimal QR area, no overlays or gradients */}
          <div className="flex flex-col items-center justify-center mx-auto mb-2">
            <div className="bg-white border border-blue-200 rounded-xl p-2" style={{ minWidth: 180, minHeight: 180 }}>
              <div ref={qrRef} className="inline-block" />
            </div>
          </div>
          {/* Desktop: All actions visible */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4 mt-4">
            <ActionBtn icon={<FaImage />} label={downloading ? "Downloading..." : "Download"} onClick={handleDownload} disabled={disabled || downloading} color="blue" />
            <ActionBtn icon={<FaCopy />} label="Copy" onClick={handleCopy} disabled={disabled} color="cyan" />
            <ActionBtn icon={<FaFileCode />} label="SVG" onClick={handleExportSVG} disabled={disabled} color="purple" />
            <ActionBtn icon={<FaFilePdf />} label="PDF" onClick={handleExportPDF} disabled={disabled} color="red" />
            <ActionBtn icon={<FaPrint />} label="Print" onClick={handlePrint} disabled={disabled} color="green" />
            <ActionBtn icon={<FaShareAlt />} label="Share" onClick={handleShare} disabled={disabled} color="blue" />
          </div>
          {/* Share Modal (unchanged) */}
          {showShare && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-xl relative animate-fade-in">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-blue-500" onClick={() => setShowShare(false)}><FaTimes size={18} /></button>
                <h3 className="text-lg font-bold mb-3 text-blue-700 flex items-center gap-2"><FaShareAlt /> Share QR Code</h3>
                <div className="flex flex-col gap-3">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-800 font-semibold hover:bg-green-200"><FaWhatsapp /> WhatsApp</a>
                  <a href={emailUrl} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200"><FaEnvelope /> Email</a>
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-100 text-cyan-800 font-semibold hover:bg-cyan-200"><FaTwitter /> Twitter</a>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"><FaFacebook /> Facebook</a>
                  <button onClick={handleCopyLink} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"><FaLink /> Copy Link</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400 italic py-12">Enter valid text or data to generate QR code</div>
      )}
    </div>
  );
}

// Helper: Action button with microinteractions
export function ActionBtn({ icon, label, onClick, disabled, color }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold shadow bg-gradient-to-r from-white to-gray-100 hover:from-blue-50 hover:to-blue-100 active:scale-95 transition-all duration-150 text-gray-700 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed ${color ? `hover:text-${color}-700` : ''}`}
      style={{ minWidth: 120 }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Helper: Divider for modal
export function Divider() {
  return <div className="w-full h-px bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-1 opacity-70" />;
}
