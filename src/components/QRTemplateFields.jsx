import React from "react";
import {
  FaLink,
  FaWifi,
  FaEnvelope,
  FaSms,
  FaUser,
  FaLock,
  FaRegCopy,
} from "react-icons/fa";

function QRTemplateFields({ templateType, templateData, setTemplateData, errors = {}, text, setText }) {
  if (templateType === "text") {
    return (
      <div className="mb-4 text-left flex items-center gap-2">
        <FaRegCopy className="text-blue-400 text-lg" />
        <div className="flex-1">
          <label className="block font-medium mb-1">Text or URL</label>
          <input
            className={`w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.text ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
            placeholder="Enter text or URL..."
            value={text || ""}
            onChange={e => setText(e.target.value)}
          />
          {errors.text && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.text}</div>}
        </div>
      </div>
    );
  }

  if (templateType === "website") {
    return (
      <div className="mb-4 text-left flex items-center gap-2">
        <FaLink className="text-blue-400 text-lg" />
        <div className="flex-1">
          <label className="block font-medium mb-1">Website URL</label>
          <input
            className={`w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.url ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
            placeholder="https://example.com"
            value={templateData.url || ""}
            onChange={(e) => setTemplateData((prev) => ({ ...prev, url: e.target.value }))}
          />
          {errors.url && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.url}</div>}
        </div>
      </div>
    );
  }

  if (templateType === "wifi") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 text-left">
        <div className="flex items-center gap-2">
          <FaWifi className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">WiFi SSID</label>
            <input
              placeholder="SSID"
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.ssid ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              value={templateData.ssid || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, ssid: e.target.value }))}
            />
            {errors.ssid && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.ssid}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaLock className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Password</label>
            <input
              placeholder="Password"
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.password ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              value={templateData.password || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, password: e.target.value }))}
            />
            {errors.password && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.password}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (templateType === "email") {
    return (
      <div className="grid grid-cols-1 gap-3 mb-4 text-left">
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Email address</label>
            <input
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.email ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              placeholder="Email address"
              value={templateData.email || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, email: e.target.value }))}
            />
            {errors.email && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.email}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCopy className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Subject</label>
            <input
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none border-gray-300"
              placeholder="Subject"
              value={templateData.subject || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, subject: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCopy className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Body</label>
            <textarea
              rows={2}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none border-gray-300"
              placeholder="Body"
              value={templateData.body || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, body: e.target.value }))}
            />
          </div>
        </div>
      </div>
    );
  }

  if (templateType === "sms") {
    return (
      <div className="grid grid-cols-1 gap-3 mb-4 text-left">
        <div className="flex items-center gap-2">
          <FaSms className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Phone</label>
            <input
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.phone ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              placeholder="Phone"
              value={templateData.phone || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, phone: e.target.value }))}
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.phone}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCopy className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Message</label>
            <textarea
              rows={2}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none border-gray-300"
              placeholder="Message"
              value={templateData.message || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, message: e.target.value }))}
            />
          </div>
        </div>
      </div>
    );
  }

  if (templateType === "vcard") {
    return (
      <div className="grid grid-cols-1 gap-3 mb-4 text-left">
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Full Name</label>
            <input
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.name ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              placeholder="Full Name"
              value={templateData.name || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, name: e.target.value }))}
            />
            {errors.name && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.name}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaSms className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Phone</label>
            <input
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.phone ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              placeholder="Phone"
              value={templateData.phone || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, phone: e.target.value }))}
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.phone}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Email</label>
            <input
              className={`w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.email ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}`}
              placeholder="Email"
              value={templateData.email || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, email: e.target.value }))}
            />
            {errors.email && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.email}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCopy className="text-blue-400 text-lg" />
          <div className="flex-1">
            <label className="block font-medium mb-1">Organization</label>
            <input
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none border-gray-300"
              placeholder="Organization"
              value={templateData.org || ""}
              onChange={(e) => setTemplateData((prev) => ({ ...prev, org: e.target.value }))}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default QRTemplateFields;
