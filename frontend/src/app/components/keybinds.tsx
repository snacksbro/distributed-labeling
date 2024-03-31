import { useEffect } from "react";

export default function Keybinds({ moveLabel, imageIndex, updateImageIndex }) {
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowRight":
        updateImageIndex(imageIndex + 1);
        break;
      case "ArrowLeft":
        updateImageIndex(imageIndex - 1);
        break;
      case "ArrowDown":
        moveLabel(1);
        break;
      case "ArrowUp":
        moveLabel(-1);
        break;
    }
    // Disable the ability to scroll the page with the arrowkeys
    if (event.key.startsWith("Arrow")) event.preventDefault();
  };

  // On mount, intercept keypresses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [imageIndex, updateImageIndex]);
}
