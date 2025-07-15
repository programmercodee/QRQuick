import React from "react";

export default function QRHistory({ history, onSelect }) {
  return (
    <div className="border rounded p-2">
      <h3 className="font-semibold mb-2">History</h3>
      {history.length ? history.map((h,i)=>(
        <button key={i} className="block text-left w-full hover:bg-gray-100 py-1 px-2" onClick={()=>onSelect(h)}>
          {new Date(h.time).toLocaleString()}
        </button>
      )): <small>No history yet</small>}
    </div>
  );
}
