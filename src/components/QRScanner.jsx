import React, { useRef, useState } from "react";
import { FaQrcode, FaTimes, FaCamera, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ onResult, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const scannerRef = useRef(null);
  const html5Qr = useRef(null);
  const unmounted = useRef(false);

  const safeStopAndClear = async () => {
    try {
      if (html5Qr.current) {
        await html5Qr.current.stop().catch(() => { });
        // Only clear if the DOM node is still present
        const el = document.getElementById("qr-reader");
        if (el) html5Qr.current.clear();
      }
    } catch (e) {
      // Ignore errors
    }
  };

  const startScan = async () => {
    setError("");
    setResult("");
    setScanning(true);
    if (scannerRef.current) scannerRef.current.innerHTML = "";
    await safeStopAndClear();
    if (unmounted.current) return;
    html5Qr.current = new Html5Qrcode("qr-reader");
    html5Qr.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decoded) => {
          if (unmounted.current) return;
          setResult(decoded);
          setScanning(false);
          safeStopAndClear();
          if (onResult) onResult(decoded);
        },
        (err) => {
          // Don't set error on every frame; only show scanning state
        }
      )
      .catch((err) => {
        if (unmounted.current) return;
        setError("Camera error: " + (err?.message || err));
        setScanning(false);
      });
  };

  // Clean up camera on close/unmount
  React.useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
      safeStopAndClear();
    };
  }, []);

  // Close on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && onClose) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="w-full max-w-md mx-auto relative" role="dialog" aria-modal="true">
      {/* Close button */}
      <button onClick={async () => {
        await safeStopAndClear();
        if (onClose) onClose();
      }} aria-label="Close scanner" className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 text-2xl z-10"><FaTimes /></button>
      {/* Animated accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-pulse rounded-t-2xl" />
      <div className="flex flex-col items-center justify-center p-4 pt-6 pb-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <FaQrcode className="text-blue-500 text-2xl" />
          <h2 className="text-lg font-bold text-blue-700">Scan QR Code</h2>
        </div>
        <div ref={scannerRef} id="qr-reader" className="w-full max-w-xs min-h-[180px] rounded-xl border border-blue-100 bg-blue-50/40 mb-2" />
        {result && (
          <div className="flex items-center gap-2 mt-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <FaCheckCircle />
            <span className="break-all">{result}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 animate-pulse">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}
        <button
          className={`mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold shadow bg-gradient-to-r from-blue-200 to-cyan-100 text-blue-700 hover:bg-blue-300 transition-all border border-blue-200 text-lg active:scale-98 ${scanning ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={startScan}
          disabled={scanning}
          aria-busy={scanning}
        >
          <FaCamera className="text-xl" /> {scanning ? "Scanning..." : "Start Scan"}
        </button>
      </div>
    </div>
  );
}
