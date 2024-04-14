import React from "react";

export default function ExportWindow({
  windowVisibility,
  setWindowVisibility,
}) {
  return (
    <div style={{ visibility: windowVisibility }}>
      <input
        type="button"
        value="Export to JSON"
        class="bg-blue-500 hover:bg-blue-700 text-white px-5 text-xl border border-blue-700 rounded"
        onClick={() =>
          window.open("http://127.0.0.1:3001/export_json", "_blank")
        }
      />
      <br />
      <input
        type="button"
        value="Export to YOLO"
        class="bg-blue-500 my-3 hover:bg-blue-700 text-white px-5 text-xl border border-blue-700 rounded"
        onClick={() =>
          window.open("http://127.0.0.1:3001/export_yolo", "_blank")
        }
      />
      <br />
      <input
        type="button"
        value="Dismiss"
        class="bg-red-500 hover:bg-red-700 text-white px-5 text-xl border border-red-700 rounded"
        onClick={() => setWindowVisibility("hidden")}
      />
    </div>
  );
}
