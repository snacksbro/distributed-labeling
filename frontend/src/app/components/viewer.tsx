import React, { useRef, useEffect } from "react";
import axios from "axios";

export default function Viewer({ imageIndex, polygonPoints }) {
  const canvasRef = useRef(null);

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
          console.log(res.data["segments"]);
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(sliceImage, 0, 0, canvas.width, canvas.height);
          if (res.data["segments"] != null) {
            for (let i = 0; i < res.data["segments"].length; i++) {
              if (res.data["segments"][i].length > 0) {
                renderPolygon(res.data["segments"][i]);
              }
            }
          }
        });
    };

    const renderPolygon = (points) => {
      context.beginPath();
      const rectWidth = points[1][0] - points[0][0];
      const rectHeight = points[1][1] - points[0][1];
      context.rect(points[0][0], points[0][1], rectWidth, rectHeight);
      context.strokeStyle = "blue";
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
      polygonPoints[squareIndex].push([
        event.x - canvasRect.left,
        event.y - canvasRect.top,
      ]);
      // console.log(squarePoints);

      // If the shape is "complete" i.e. has 2 points
      if (polygonPoints[squareIndex].length >= 2) {
        renderPolygon(polygonPoints[squareIndex]);
        squareIndex++;
        polygonPoints.push([]);
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
