import React, { useRef, useState } from "react";
import { FaQrcode, FaTimes, FaCamera, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";

function parseQRFields(val) {
  // Try to parse common QR types for preview
  if (/^WIFI:T:.*;S:.*;P:.*;/i.test(val)) {
    const m = val.match(/^WIFI:T:(.*?);S:(.*?);P:(.*?);/i);
    if (m) return { type: 'WiFi', fields: { SSID: m[2], Password: m[3], Security: m[1] } };
  }
  if (/^mailto:/i.test(val)) {
    const mail = val.match(/^mailto:([^?]+)(\?(.+))?/i);
    if (mail) {
      const params = {};
      if (mail[3]) mail[3].split('&').forEach(p => { const [k, v] = p.split('='); params[k] = decodeURIComponent(v || ''); });
      return { type: 'Email', fields: { Email: mail[1], Subject: params.subject || '', Body: params.body || '' } };
    }
  }
  if (/^sms:/i.test(val)) {
    const sms = val.match(/^sms:(\+?\d+)(\?body=(.*))?/i);
    if (sms) return { type: 'SMS', fields: { Phone: sms[1], Message: sms[3] || '' } };
  }
  if (/BEGIN:VCARD/i.test(val)) {
    const name = (val.match(/FN:(.*)/i) || [])[1] || '';
    const phone = (val.match(/TEL.*:(.*)/i) || [])[1] || '';
    const email = (val.match(/EMAIL.*:(.*)/i) || [])[1] || '';
    const org = (val.match(/ORG:(.*)/i) || [])[1] || '';
    return { type: 'vCard', fields: { Name: name, Phone: phone, Email: email, Organization: org } };
  }
  if (/^https?:\/\//i.test(val)) {
    return { type: 'Website', fields: { URL: val } };
  }
  return { type: 'Raw', fields: { Value: val } };
}

export default function QRScanner({ onResult, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [preview, setPreview] = useState(null);
  const scannerRef = useRef(null);
  const html5Qr = useRef(null);
  const unmounted = useRef(false);

  const safeStopAndClear = async () => {
    try {
      if (html5Qr.current) {
        await html5Qr.current.stop().catch(() => { });
        const el = document.getElementById("qr-reader");
        if (el) html5Qr.current.clear();
      }
    } catch (e) { }
  };

  const startScan = async () => {
    setError("");
    setResult("");
    setPreview(null);
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
          setPreview(parseQRFields(decoded));
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
        {/* Live preview of scanned content */}
        {scanning && preview && (
          <div className="w-full mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100 text-left animate-fade-in">
            <div className="font-semibold text-blue-700 mb-1">Scanned Preview:</div>
            <div className="text-xs text-gray-700 break-all mb-1">{preview.type}</div>
            <ul className="text-sm text-gray-800 space-y-1">
              {Object.entries(preview.fields).map(([k, v]) => (
                <li key={k}><span className="font-medium text-blue-600">{k}:</span> {v}</li>
              ))}
            </ul>
          </div>
        )}
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
