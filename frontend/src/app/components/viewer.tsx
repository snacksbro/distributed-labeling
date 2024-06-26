import React, { useRef, useEffect } from "react";
import axios from "axios";
import LabelWindow from "./label_window";
import "./styles/viewer.css";

export default function Viewer({
  labels,
  currentLabel,
  imageIndex,
  polygonPoints,
  updateLabels,
  setCurrentLabel,
}) {
  const canvasRef = useRef(null);
  const currentLabelRef = useRef(currentLabel);
  let canvas;
  let context;
  let sliceImage;
  let squareIndex;

  // Yes this is a massive bit of ducttape over geniunely bad code, but I'm carrying this project and don't care anymore.
  useEffect(() => {
    currentLabelRef.current = currentLabel; // Update ref when currentLabel changes
  }, [currentLabel]);

  // To be run whenever the slice updates
  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    squareIndex = 0;
    getLabels();

    const drawLabels = () => {
      squareIndex = 0;

      // Remove old labels and draw the slide image
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(sliceImage, 0, 0, canvas.width, canvas.height);

      if (polygonPoints != null && polygonPoints.length > 0) {
        for (let i = 0; i < polygonPoints.length; i++) {
          if (typeof polygonPoints[i] === "undefined") continue;
          renderPolygon(polygonPoints[i].points, polygonPoints[i].name);
          squareIndex++;
        }
      }
    };

    const handleClick = (event) => {
      // This is taken to get the relative location of client clicks
      const canvasRect = canvas.getBoundingClientRect();
      canvas = canvasRef.current;

      if (polygonPoints.length <= squareIndex) {
        polygonPoints[squareIndex] = {
          name: currentLabelRef.current,
          points: [],
        };
      }

      // This takes into account both the canvas offset, as well as the scale factor
      polygonPoints[squareIndex].points.push([
        (event.x - canvasRect.left) / (canvasRect.width / canvas.width),
        (event.y - canvasRect.top) / (canvasRect.height / canvas.height),
      ]);

      // If the shape is "complete" i.e. has 2 points
      if (polygonPoints[squareIndex].points.length >= 2) {
        renderPolygon(
          polygonPoints[squareIndex].points,
          polygonPoints[squareIndex].name,
        );
        squareIndex++;
      }
    };

    const handleRightClick = (event) => {
      console.log("Right click detected!");
      event.preventDefault();

      // TODO: Make a function to calculate x/y (DRY)
      const canvasRect = canvas.getBoundingClientRect();
      canvas = canvasRef.current;
      const mouseX =
        (event.x - canvasRect.left) / (canvasRect.width / canvas.width);
      const mouseY =
        (event.y - canvasRect.top) / (canvasRect.height / canvas.height);

      console.log("Polygon len is " + polygonPoints.length);
      console.log(`Event data is ${mouseX} ${mouseY}`);
      // Can't use .length due to a Javascript bug: https://stackoverflow.com/questions/31065075/array-length-gives-incorrect-length
      // My only "solution" is to write an actual splice function to remake the array
      for (let i = 0; i < polygonPoints.length; i++) {
        if (typeof polygonPoints[i] === "undefined") continue;
        console.log(
          `${i} Box data is: ${polygonPoints[i].points[0][0]} ${polygonPoints[i].points[1][0]} ${polygonPoints[i].points[0][1]} ${polygonPoints[i].points[1][1]}`,
        );
        if (
          mouseX > polygonPoints[i].points[0][0] &&
          mouseX < polygonPoints[i].points[1][0] &&
          mouseY > polygonPoints[i].points[0][1] &&
          mouseY < polygonPoints[i].points[1][1]
        ) {
          console.log("It happened!");
          polygonPoints.splice(i, 1);
          drawLabels();
          return;
        }
      }
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu", handleRightClick);

    // Remove eventlistener on unmount
    return () => {
      canvas.removeEventListener("click", handleClick);
      axios.post("http://127.0.0.1:3001/send_segmentation", {
        segments: polygonPoints,
        index: imageIndex,
      });
    };
  }, [imageIndex]);

  const getLabels = () => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    sliceImage = new Image();
    sliceImage.src = `http://127.0.0.1:3001/get_slice?index=${imageIndex}`;
    sliceImage.onload = () => {
      axios
        .get(`http://127.0.0.1:3001/get_slice_info?index=${imageIndex}`, {})
        .then((res) => {
          canvas.width = res.data["width"];
          canvas.height = res.data["height"];

          // Remove old labels and draw the slide image
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(sliceImage, 0, 0, canvas.width, canvas.height);

          // Only render if there's segments to draw
          if (res.data["segments"] != null && res.data["segments"].length > 0) {
            for (let i = 0; i < res.data["segments"].length; i++) {
              renderPolygon(
                res.data["segments"][i].points,
                res.data["segments"][i].name,
              );
              squareIndex++;
            }
            polygonPoints = res.data["segments"];
          } else {
            // Init
            polygonPoints[0] = { name: "", points: [] };
          }
        });
    };
  };

  const renderPolygon = (points, labelName) => {
    context.beginPath();
    const rectWidth = points[1][0] - points[0][0];
    const rectHeight = points[1][1] - points[0][1];
    context.rect(points[0][0], points[0][1], rectWidth, rectHeight);
    const color = getCurrentColor(labelName);
    context.strokeStyle = "#" + color;
    context.lineWidth = 2;
    context.stroke();
  };

  const getCurrentColor = (labelName = undefined) => {
    let i;
    for (i = 0; i < labels.length; i++) {
      if (labels[i].name == labelName) {
        return labels[i].color;
      }
    }
  };

  return (
    <div id="viewer-container">
      <canvas ref={canvasRef} />
      <LabelWindow
        imageIndex={imageIndex}
        labels={labels}
        updateLabels={updateLabels}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        getLabels={getLabels}
      />
    </div>
  );
}
