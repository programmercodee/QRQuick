import React, { useRef, useState, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import QRTypeSelector from "./QRTypeSelector";
import QRTemplateFields from "./QRTemplateFields";
import QROptions from "./QROptions";
import QRDisplay from "./QRDisplay";
import QRScanner from "./QRScanner";
import { generateTemplateText, validateFields } from "./utils";
import { FaQrcode, FaMagic, FaEdit, FaRegIdCard, FaWifi, FaCalendarAlt, FaGlobe, FaEnvelope, FaUserFriends, FaLink, FaSms, FaTimes } from "react-icons/fa";

const TEMPLATES = [
  {
    name: "Business Card",
    icon: <FaRegIdCard className="text-blue-500 text-2xl" />,
    type: "vcard",
    data: { name: "John Doe", phone: "+1234567890", email: "john@example.com", org: "Company" },
    style: { fgColor: "#2563eb", bgColor: "#e0e7ff" },
  },
  {
    name: "Event",
    icon: <FaCalendarAlt className="text-purple-500 text-2xl" />,
    type: "text",
    data: { text: "Event: QRQuick Launch\nDate: 2024-07-01\nVenue: Online" },
    style: { fgColor: "#a21caf", bgColor: "#f3e8ff" },
  },
  {
    name: "WiFi",
    icon: <FaWifi className="text-green-500 text-2xl" />,
    type: "wifi",
    data: { ssid: "QRQuickWiFi", password: "password123" },
    style: { fgColor: "#059669", bgColor: "#d1fae5" },
  },
  {
    name: "Social",
    icon: <FaUserFriends className="text-pink-500 text-2xl" />,
    type: "website",
    data: { url: "https://twitter.com/qrquick" },
    style: { fgColor: "#db2777", bgColor: "#fce7f3" },
  },
  {
    name: "Email",
    icon: <FaEnvelope className="text-orange-500 text-2xl" />,
    type: "email",
    data: { email: "hello@qrquick.com", subject: "Hello QRQuick!", body: "Check out this awesome QR code app." },
    style: { fgColor: "#ea580c", bgColor: "#ffedd5" },
  },
];

const QR_TYPES = [
  { key: "text", label: "Text/URL", icon: <FaLink className="text-blue-400" /> },
  { key: "website", label: "Website", icon: <FaGlobe className="text-blue-400" /> },
  { key: "wifi", label: "WiFi", icon: <FaWifi className="text-green-500" /> },
  { key: "email", label: "Email", icon: <FaEnvelope className="text-orange-500" /> },
  { key: "sms", label: "SMS", icon: <FaSms className="text-cyan-500" /> },
  { key: "vcard", label: "vCard", icon: <FaRegIdCard className="text-purple-500" /> },
];

const QRGenerator = ({ lang, t, onQRStateChange }) => {
  const qrRef = useRef(), qrInstance = useRef(null);
  const [text, setText] = useState("");
  const [templateType, setTemplateType] = useState("text");
  const [templateData, setTemplateData] = useState({});
  const [options, setOptions] = useState({ fgColor: "#000", bgColor: "#fff", size: 200, margin: 10, ecLevel: "M", logo: null, format: "png" });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("generate");
  const [showOptions, setShowOptions] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Initialize QR instance
  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: options.size, height: options.size, data: " ",
      margin: options.margin,
      dotsOptions: { color: options.fgColor },
      backgroundOptions: { color: options.bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 5 },
      qrOptions: { errorCorrectionLevel: options.ecLevel },
    });
  }, []);

  // Update on data or options change
  useEffect(() => {
    const errs = validateFields(text, options, templateType, templateData);
    setErrors(errs);
    if (!qrRef.current || !qrInstance.current) return;
    qrRef.current.innerHTML = "";
    qrInstance.current.update({
      width: options.size, height: options.size, data: text || " ",
      image: options.logo, margin: options.margin,
      dotsOptions: { color: options.fgColor },
      backgroundOptions: { color: options.bgColor },
      qrOptions: { errorCorrectionLevel: options.ecLevel },
      imageOptions: {
        ...options.imageOptions,
        crossOrigin: "anonymous",
      },
    });
    qrInstance.current.append(qrRef.current);
  }, [text, options]);

  // Generate template
  useEffect(() => {
    if (templateType !== "text") {
      setText(generateTemplateText(templateType, templateData));
    }
  }, [templateData, templateType]);

  // Add showQR calculation at the top level
  const showQR = !errors.text && text && text.trim();

  // Notify parent of QR state changes
  useEffect(() => {
    if (onQRStateChange) {
      onQRStateChange({
        showQR,
        errors,
        text,
        options,
        qrRef,
        qrInstance
      });
    }
  }, [showQR, errors, text, options]);

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl border border-blue-200 p-2 sm:p-8 flex flex-col md:grid md:grid-cols-2 items-stretch gap-0 sm:gap-0 overflow-hidden">
      {/* Animated Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-pulse rounded-t-3xl z-20" />
      {/* QR Card (left on desktop, top on mobile) */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 md:border-r md:border-blue-100 md:pr-8 min-h-[420px] md:min-h-[480px]">
        <div className="relative w-full flex flex-col items-center">
          {/* Glowing QR area */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 md:w-72 md:h-72 rounded-3xl pointer-events-none z-0 animate-pulse-slow"
            style={{ background: "radial-gradient(circle, #60a5fa33 0%, #a7f3d033 80%, transparent 100%)", filter: "blur(20px)", opacity: 0.7 }} />
          <div className="relative z-10 bg-white/90 backdrop-blur-xl border-2 border-transparent rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col items-center" style={{ borderImage: "linear-gradient(135deg, #60a5fa 0%, #a7f3d0 100%) 1", minWidth: 220, maxWidth: 320 }}>
            <QRDisplay qrRef={qrRef} qrInstance={qrInstance} options={options} errors={errors} text={text} t={t} lang={lang} />
          </div>
        </div>
      </div>
      {/* Form Section (right on desktop, bottom on mobile) */}
      <div className="flex flex-col justify-center p-4 sm:p-8 gap-4 sm:gap-6 min-h-[420px] md:min-h-[480px]">
        {/* Header */}
        <div className="flex flex-col items-center md:items-start pt-2 pb-2 md:pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">
              <FaQrcode />
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-400 bg-clip-text text-transparent drop-shadow animate-gradient-x">QRQuick</h1>
          </div>
          <p className="text-blue-400 text-base sm:text-lg mt-1 font-medium animate-fade-in">{t('generate')}</p>
        </div>
        {/* Tab Bar for QR Types */}
        <div className="w-full flex flex-row flex-nowrap overflow-x-auto scrollbar-hide-mobile md:flex-wrap md:overflow-x-visible justify-start gap-2 sm:gap-4 mb-2 px-2 sm:px-4 py-2 rounded-xl bg-white/80 backdrop-blur border border-blue-100 shadow animate-fade-in relative">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-blue-700 bg-gradient-to-r from-cyan-100 to-blue-100 border border-blue-200 shadow hover:bg-blue-200 transition mb-2 md:mb-0 shrink-0"
            onClick={() => setShowScanner(true)}
            type="button"
          >
            <FaQrcode className="text-xl" /> Scan QR
          </button>
          {QR_TYPES.map(type => (
            <button
              key={type.key}
              className={`flex flex-col items-center min-w-[96px] px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all border-2 duration-200 shrink-0 ${templateType === type.key ? 'border-blue-500 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 shadow-lg scale-105' : 'border-transparent text-gray-400 bg-white hover:text-blue-500 hover:scale-105'}`}
              onClick={() => {
                setTemplateType(type.key);
                setTemplateData({});
                setText("");
              }}
              aria-current={templateType === type.key ? 'page' : undefined}
            >
              {type.icon}
              <span className="mt-1 whitespace-nowrap">{type.label}</span>
            </button>
          ))}
        </div>
        {/* QR Scanner Modal/Section */}
        {showScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
            <QRScanner onResult={val => {
              let handled = false;
              if (templateType === 'text') {
                setText(val);
                handled = true;
              } else if (templateType === 'website') {
                setTemplateData({ url: val });
                handled = true;
              } else if (templateType === 'wifi') {
                // WiFi:WIFI:T:WPA;S:SSID;P:password;;
                const m = val.match(/^WIFI:T:(.*?);S:(.*?);P:(.*?);/i);
                if (m) {
                  setTemplateData({ ssid: m[2], password: m[3] });
                  handled = true;
                }
              } else if (templateType === 'email') {
                // mailto:email?subject=...&body=...
                const mail = val.match(/^mailto:([^?]+)(\?(.+))?/i);
                if (mail) {
                  const params = {};
                  if (mail[3]) mail[3].split('&').forEach(p => { const [k, v] = p.split('='); params[k] = decodeURIComponent(v || ''); });
                  setTemplateData({ email: mail[1], subject: params.subject || '', body: params.body || '' });
                  handled = true;
                }
              } else if (templateType === 'sms') {
                // sms:1234567890?body=Hello
                const sms = val.match(/^sms:(\+?\d+)(\?body=(.*))?/i);
                if (sms) {
                  setTemplateData({ phone: sms[1], message: sms[3] || '' });
                  handled = true;
                }
              } else if (templateType === 'vcard') {
                // BEGIN:VCARD ...
                if (/BEGIN:VCARD/i.test(val)) {
                  const name = (val.match(/FN:(.*)/i) || [])[1] || '';
                  const phone = (val.match(/TEL.*:(.*)/i) || [])[1] || '';
                  const email = (val.match(/EMAIL.*:(.*)/i) || [])[1] || '';
                  const org = (val.match(/ORG:(.*)/i) || [])[1] || '';
                  setTemplateData({ name, phone, email, org });
                  handled = true;
                }
              }
              if (!handled) setText(val);
              setShowScanner(false);
            }} onClose={() => setShowScanner(false)} />
          </div>
        )}
        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 my-2" />
        {/* Form Fields */}
        <div className="bg-white/90 rounded-2xl shadow p-3 sm:p-6 animate-fade-in">
          <QRTemplateFields templateType={templateType} templateData={templateData} setTemplateData={setTemplateData} errors={errors} text={text} setText={setText} t={t} lang={lang} />
        </div>
        <button
          type="button"
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold shadow bg-gradient-to-r from-blue-200 to-cyan-100 text-blue-700 hover:bg-blue-300 transition-all border border-blue-200 text-lg sm:text-xl active:scale-98 ${showOptions ? 'ring-2 ring-blue-300 scale-105' : ''}`}
          onClick={() => setShowOptions(v => !v)}
        >
          <FaMagic className="text-lg" /> {showOptions ? t('hideStyling') : t('showStyling')}
        </button>
        {showOptions && (
          <div className="bg-white/90 rounded-2xl shadow p-3 sm:p-6 mt-2 animate-fade-in">
            <QROptions options={options} setOptions={setOptions} errors={errors} t={t} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
