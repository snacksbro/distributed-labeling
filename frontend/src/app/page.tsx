"use client";
import React, { useState } from "react";
import SliderWindow from "./components/sliders";
import UploadButton from "./components/upload";
import Controls from "./components/controls";
import Viewer from "./components/viewer";
import Keybinds from "./components/keybinds";
import axios from "axios";

export default function Homer() {
  const [brightness, setBrightness] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [sliceCount, setSliceCount] = useState(0);
  const [polygonPoints, setPolygonPoints] = useState([[]]);

  const updateBrightness = (value) => {
    setBrightness(value);
    console.log("Brightness updated to " + value.toString());
  };

  const updateImageIndex = (value) => {
    if (value < 0 || value > sliceCount) return false;
    axios.post(
      "http://127.0.0.1:3001/send_segmentation",
      { segments: polygonPoints, index: imageIndex },
      // { index: imageIndex },
      {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      },
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
      <Controls
        sliceCount={sliceCount}
        imageIndex={imageIndex}
        updateImageIndex={updateImageIndex}
      />
      <div className="bg-sky-900">
        <p>Hello vorld!</p>
        <p>You are brightness is {brightness}</p>
      </div>
      <Viewer imageIndex={imageIndex} polygonPoints={polygonPoints} />
      <Keybinds imageIndex={imageIndex} updateImageIndex={updateImageIndex} />
    </div>
  );
}
