import React from "react";
import { useRef } from "react";

export default function QROptions({ options, setOptions, errors, t, lang }) {
  const themes = {
    Classic: { fg: "#000000", bg: "#ffffff" },
    Dark: { fg: "#fff", bg: "#333" },
    Neon: { fg: "#39ff14", bg: "#000" },
  };
  const fileInput = useRef();
  const imageSize = options.imageOptions?.imageSize ?? 0.4;
  const imageMargin = options.imageOptions?.margin ?? 5;
  const hideDots = options.imageOptions?.hideBackgroundDots ?? true;
  const logo = options.logo;

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOptions({
        ...options,
        logo: ev.target.result,
        imageOptions: {
          ...options.imageOptions,
          imageSize: imageSize,
          margin: imageMargin,
          hideBackgroundDots: hideDots,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setOptions({
      ...options,
      logo: null,
      imageOptions: {
        ...options.imageOptions,
        imageSize: 0.4,
        margin: 5,
        hideBackgroundDots: true,
      },
    });
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <label className="flex flex-col"><span>{t('fgColor')}</span><input type="color" value={options.fgColor} onChange={e => setOptions({ ...options, fgColor: e.target.value })} /></label>
      <label className="flex flex-col"><span>{t('bgColor')}</span><input type="color" value={options.bgColor} onChange={e => setOptions({ ...options, bgColor: e.target.value })} /></label>
      <label className="flex flex-col"><span>{t('size')}</span><input type="number" min={100} max={1000} value={options.size} onChange={e => setOptions({ ...options, size: +e.target.value })} />{errors.size && <small className="text-red-500">{errors.size}</small>}</label>
      <label className="flex flex-col"><span>{t('margin')}</span><input type="number" min={0} max={50} value={options.margin} onChange={e => setOptions({ ...options, margin: +e.target.value })} />{errors.margin && <small className="text-red-500">{errors.margin}</small>}</label>
      <label className="flex flex-col"><span>{t('format')}</span><select value={options.format} onChange={e => setOptions({ ...options, format: e.target.value })}><option value="png">PNG</option><option value="svg">SVG</option><option value="jpg">JPG</option></select></label>
      <label className="flex flex-col col-span-2"><span>{t('theme')}</span><select onChange={e => { const tth = themes[e.target.value]; if (tth) setOptions({ ...options, fgColor: tth.fg, bgColor: tth.bg }); }}><option disabled>--Pick theme--</option>{Object.keys(themes).map(n => <option key={n}>{n}</option>)}</select></label>
      {/* Logo upload and controls */}
      <div className="col-span-1 sm:col-span-2 mt-2 p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col gap-2">
        <label className="font-semibold text-blue-700 mb-1">{t('logo')}</label>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <input ref={fileInput} type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
          {logo && (
            <div className="flex flex-col items-center gap-1">
              <img src={logo} alt="Logo preview" className="w-12 h-12 object-contain rounded shadow border border-blue-200 bg-white" />
              <button type="button" onClick={handleRemoveLogo} className="text-xs text-red-500 hover:underline mt-1">{t('remove')}</button>
            </div>
          )}
        </div>
        {logo && (
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2 text-sm">{t('logoSize')}
              <input type="range" min={0.1} max={0.5} step={0.01} value={imageSize} onChange={e => setOptions({ ...options, imageOptions: { ...options.imageOptions, imageSize: +e.target.value } })} className="flex-1" />
              <span className="ml-2 text-xs text-blue-700 font-mono">{Math.round(imageSize * 100)}%</span>
            </label>
            <label className="flex items-center gap-2 text-sm">{t('logoMargin')}
              <input type="range" min={0} max={30} step={1} value={imageMargin} onChange={e => setOptions({ ...options, imageOptions: { ...options.imageOptions, margin: +e.target.value } })} className="flex-1" />
              <span className="ml-2 text-xs text-blue-700 font-mono">{imageMargin}px</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={hideDots} onChange={e => setOptions({ ...options, imageOptions: { ...options.imageOptions, hideBackgroundDots: e.target.checked } })} />
              {t('hideDots')}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
