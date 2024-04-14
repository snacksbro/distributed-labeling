"use client";
import React, { useState } from "react";
import SliderWindow from "./components/sliders";
import UploadButton from "./components/upload";
import ImportButton from "./components/import";
import Controls from "./components/controls";
import Viewer from "./components/viewer";
import Keybinds from "./components/keybinds";
import ExportWindow from "./components/export_window";
import axios from "axios";
import "./components/styles/page.css";

export default function Homer() {
  // Sliders
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(100);

  // Checkboxes
  const [grayscale, setGrayscale] = useState(false);
  const [inversion, setInversion] = useState(false);

  // Viewer
  const [imageIndex, setImageIndex] = useState(0);
  const [sliceCount, setSliceCount] = useState(0);
  const [polygonPoints, setPolygonPoints] = useState([
    { name: "", points: [] },
  ]);

  // Label Window
  const [labels, setLabels] = useState([[]]); // Remove this? Since it's now all local
  const [currentLabel, setCurrentLabel] = useState("");

  // Export
  const [showExport, setShowExport] = useState("hidden");

  // Tab
  const [showAdjust, setShowAdjust] = useState(true);

  const updateLabels = (value) => {
    setLabels(value);
  };

  const moveLabel = (direction) => {
    let i;
    for (i = 0; i < labels.length; i++)
      if (labels[i].name == currentLabel) break;
    if (i + direction != -1 && i + direction != labels.length) {
      updateCurrentLabel(labels[i + direction].name);
    }
  };

  // Is this needed at all if I just pass setCurrentLabel to the labelmanager?
  const updateCurrentLabel = (value) => {
    setCurrentLabel(value);
    console.log("Label updated to " + value);
  };

  const updateImageIndex = (value) => {
    if (value < 0 || value > sliceCount) return false;
    console.log(
      "Labels sent off! They are " + JSON.stringify(polygonPoints, null, 4),
    );

    setPolygonPoints([[]]);

    setImageIndex(value);
  };

  const updateSliceCount = (value) => {
    setSliceCount(value);
  };

  return (
    <div id="main-container">
      <div
        className="w-auto inline-block px-4 bg-blue-300 w-[20vw]"
        id="left-window"
      >
        <div id="left-tabs" className="flex flex-rows">
          <input
            className={`px-4 flex-1 ${showAdjust ? "bg-blue-300" : "bg-blue-500"} `}
            type="button"
            onClick={() => setShowAdjust(true)}
            value="Adjust"
          />
          <input
            className={`px-4 flex-1 ${showAdjust ? "bg-blue-500" : "bg-blue-300"} `}
            type="button"
            onClick={() => setShowAdjust(false)}
            value="Data"
          />
        </div>
        <div
          className={`left-tab ${showAdjust ? "visible" : "hidden"}`}
          id="image-tab"
        >
          <SliderWindow
            brightness={brightness}
            setBrightness={setBrightness}
            contrast={contrast}
            setContrast={setContrast}
            minThreshold={minThreshold}
            setMinThreshold={setMinThreshold}
            maxThreshold={maxThreshold}
            setMaxThreshold={setMaxThreshold}
            grayscale={grayscale}
            setGrayscale={setGrayscale}
            inversion={inversion}
            setInversion={setInversion}
          />
          <Controls
            sliceCount={sliceCount}
            imageIndex={imageIndex}
            updateImageIndex={updateImageIndex}
          />
        </div>
        <div
          className={`right-tab ${showAdjust ? "hidden" : "visible"}`}
          id="data-tab"
        >
          <p className="underline text-lg">Upload DICOM</p>
          <UploadButton
            sliceCount={sliceCount}
            updateSliceCount={updateSliceCount}
          />
          <p className="underline text-lg">Import Labels</p>
          <ImportButton />
          <input
            type="button"
            value="Export"
            onClick={() => setShowExport("visible")}
          />
          <ExportWindow
            windowVisibility={showExport}
            setWindowVisibility={setShowExport}
          />
        </div>
      </div>
      <Viewer
        currentLabel={currentLabel}
        labels={labels}
        imageIndex={imageIndex}
        polygonPoints={polygonPoints}
        updateLabels={updateLabels}
        setCurrentLabel={setCurrentLabel}
      />
      <Keybinds
        moveLabel={moveLabel}
        imageIndex={imageIndex}
        updateImageIndex={updateImageIndex}
      />
    </div>
  );
}
