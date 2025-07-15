import React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ setText }) {
  const handleScan = () => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps:10, qrbox:250 });
    scanner.render(result=>{
      setText(result);
      scanner.clear();
    });
  };
  return (
    <div>
      <h3>Scanner</h3>
      <div id="qr-reader"></div>
      <button className="btn mt-2" onClick={handleScan}>Start Scan</button>
    </div>
  );
}
