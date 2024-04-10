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

export default function Homer() {
  const [brightness, setBrightness] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [sliceCount, setSliceCount] = useState(0);
  const [polygonPoints, setPolygonPoints] = useState([
    { name: "", points: [] },
  ]);
  const [labels, setLabels] = useState([[]]); // Remove this? Since it's now all local
  const [currentLabel, setCurrentLabel] = useState("");
  const [showExport, setShowExport] = useState("hidden");

  const updateBrightness = (value) => {
    setBrightness(value);
    console.log("Brightness updated to " + value.toString());
  };

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
    <div>
      <SliderWindow
        brightness={brightness}
        updateBrightness={updateBrightness}
      />
      <UploadButton
        sliceCount={sliceCount}
        updateSliceCount={updateSliceCount}
      />
      <ImportButton />
      <Controls
        sliceCount={sliceCount}
        imageIndex={imageIndex}
        updateImageIndex={updateImageIndex}
      />
      <div className="bg-sky-900">
        <p>Hello vorld!</p>
        <p>You are brightness is {brightness}</p>
      </div>
      <Viewer
        currentLabel={currentLabel}
        labels={labels}
        imageIndex={imageIndex}
        polygonPoints={polygonPoints}
        updateLabels={updateLabels}
        setCurrentLabel={setCurrentLabel}
      />
      <input
        type="button"
        value="Export"
        onClick={() => setShowExport("visible")}
      />
      <ExportWindow
        windowVisibility={showExport}
        setWindowVisibility={setShowExport}
      />
      <Keybinds
        moveLabel={moveLabel}
        imageIndex={imageIndex}
        updateImageIndex={updateImageIndex}
      />
    </div>
  );
}
