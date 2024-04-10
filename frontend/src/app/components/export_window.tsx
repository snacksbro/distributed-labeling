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
        onClick={() =>
          window.open("http://127.0.0.1:3001/export_json", "_blank")
        }
      />
      <input
        type="button"
        value="Export to YOLO"
        onClick={() =>
          window.open("http://127.0.0.1:3001/export_yolo", "_blank")
        }
      />
      <input
        type="button"
        value="Dismiss"
        onClick={() => setWindowVisibility("hidden")}
      />
    </div>
  );
}
