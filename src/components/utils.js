// components/QRGenerator/utils.js
export const generateTemplateText = (type, data) => {
  switch (type) {
    case "website": return data.url || "";
    case "wifi": return `WIFI:T:WPA;S:${data.ssid || ""};P:${data.password || ""};;`;
    case "email": return `mailto:${data.email || ""}?subject=${encodeURIComponent(data.subject || "")}&body=${encodeURIComponent(data.body || "")}`;
    case "sms": return `sms:${data.phone || ""}?body=${encodeURIComponent(data.message || "")}`;
    case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nN:${data.name || ""}\nTEL:${data.phone || ""}\nEMAIL:${data.email || ""}\nORG:${data.org || ""}\nEND:VCARD`;
    default: return data.text || "";
  }
};

export const validateFields = (text, options, templateType = "text", templateData = {}) => {
  const errs = {};
  // General text check
  if (!text.trim()) errs.text = "Required";

  // Type-specific checks
  if (templateType === "website") {
    if (!templateData.url || !/^https?:\/\//.test(templateData.url)) {
      errs.url = "Valid URL required (must start with http:// or https://)";
    }
  }
  if (templateType === "wifi") {
    if (!templateData.ssid) errs.ssid = "SSID required";
    if (!templateData.password) errs.password = "Password required";
  }
  if (templateType === "email") {
    if (!templateData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(templateData.email)) errs.email = "Valid email required";
  }
  if (templateType === "sms") {
    if (!templateData.phone || !/^\+?\d{7,}$/.test(templateData.phone)) errs.phone = "Valid phone required";
  }
  if (templateType === "vcard") {
    if (!templateData.name) errs.name = "Name required";
    if (templateData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(templateData.email)) errs.email = "Valid email required";
    if (templateData.phone && !/^\+?\d{7,}$/.test(templateData.phone)) errs.phone = "Valid phone required";
  }

  if (options.size < 100 || options.size > 1000) errs.size = "100–1000";
  if (options.margin < 0 || options.margin > 50) errs.margin = "0–50";
  return errs;
};
