import React from "react";
import { FaQrcode, FaChevronDown } from "react-icons/fa";

function QRTypeSelector({ templateType, setTemplateType, setTemplateData, setText, setTouched, error }) {
  return (
    <div className="mb-6 text-left relative">
      <label className="block font-semibold mb-2 text-gray-700">QR Type</label>
      <div className="relative">
        <FaQrcode className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg pointer-events-none" />
        <select
          className={`w-full appearance-none rounded-xl border pl-10 pr-8 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none cursor-pointer bg-white text-base font-medium ${error ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
          value={templateType}
          aria-invalid={!!error}
          aria-describedby={error ? 'qrtype-error' : undefined}
          onChange={(e) => {
            const newType = e.target.value;
            setTemplateType(newType);
            setTouched && setTouched((prev) => ({ ...prev, text: true }));
            setTemplateData({});
            setText("");
          }}
        >
          <option value="text">Text / URL</option>
          <option value="website">Website</option>
          <option value="wifi">WiFi</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="vcard">vCard</option>
        </select>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && <div id="qrtype-error" className="text-red-500 text-xs mt-1 animate-pulse">{error}</div>}
    </div>
  );
}

export default QRTypeSelector;
