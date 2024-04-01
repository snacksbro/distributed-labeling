import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Viewer({
  labels,
  currentLabel,
  imageIndex,
  polygonPoints,
}) {
  const canvasRef = useRef(null);
  const currentLabelRef = useRef(currentLabel);

  // Yes this is a massive bit of ducttape over geniunely bad code, but I'm carrying this project and don't care anymore.
  useEffect(() => {
    currentLabelRef.current = currentLabel; // Update ref when currentLabel changes
  }, [currentLabel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const sliceImage = new Image();
    sliceImage.src = `http://127.0.0.1:3001/get_slice?index=${imageIndex}`;
    sliceImage.onload = () => {
      // Getting image information
      axios
        .get(`http://127.0.0.1:3001/get_slice_info?index=${imageIndex}`, {})
        .then((res) => {
          canvas.width = res.data["width"];
          canvas.height = res.data["height"];
          console.log(
            "SEGS ARE " + JSON.stringify(res.data["segments"], null, 4),
          );

          // Remove old labels and draw the slide image
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(sliceImage, 0, 0, canvas.width, canvas.height);

          // Only render if there's segments to draw
          if (
            res.data["segments"] != null &&
            res.data["segments"][i].length > 0
          ) {
            for (let i = 0; i < res.data["segments"].length; i++) {
              if (res.data["segments"][i].length > 0) {
                renderPolygon(
                  res.data["segments"][i].points,
                  res.data["segments"][i].name,
                );
              }
            }
          } else {
            // Init
            polygonPoints[0] = { name: "", points: [] };
          }
        });
    };

    const getCurrentColor = (labelName = undefined) => {
      let i;
      for (i = 0; i < labels.length; i++) {
        if (labels[i].name == labelName) {
          console.log("GOT RIGHT LABEL " + labels[i].name + labelName);
          return labels[i].color;
          // Must be an issue with propgration of currentLabel
        } else console.log("TOTALYL NOT " + labels[i].name + labelName);
      }
    };

    const renderPolygon = (points, labelName) => {
      context.beginPath();
      const rectWidth = points[1][0] - points[0][0];
      const rectHeight = points[1][1] - points[0][1];
      // const color = labels[currentLabel].color;
      console.log("GOT COLOR " + getCurrentColor(labelName));
      context.rect(points[0][0], points[0][1], rectWidth, rectHeight);
      const color = getCurrentColor(labelName);
      context.strokeStyle = "#" + color;
      context.lineWidth = 2;
      context.stroke();
    };

    // Array of shapes
    // Which each is an array of points
    // Which each point is an array of x/y
    // const squarePoints = [[]]; // Will later be changed to load from server
    let squareIndex = 0;

    const handleClick = (event) => {
      // This is taken to get the relative location of client clicks
      const canvasRect = canvas.getBoundingClientRect();
      polygonPoints[squareIndex].name = currentLabelRef.current;
      polygonPoints[squareIndex].points.push([
        event.x - canvasRect.left,
        event.y - canvasRect.top,
      ]);
      // console.log(squarePoints);

      // If the shape is "complete" i.e. has 2 points
      if (polygonPoints[squareIndex].points.length >= 2) {
        console.log("New poly! Drawing " + polygonPoints[squareIndex].name);
        renderPolygon(
          polygonPoints[squareIndex].points,
          polygonPoints[squareIndex].name,
        );
        squareIndex++;
        polygonPoints.push({ name: "", points: [] });
      }
    };

    canvas.addEventListener("click", handleClick);

    // Remove eventlistener on unmount
    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [imageIndex]);
  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
