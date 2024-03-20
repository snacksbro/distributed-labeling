import { useEffect } from "react";

export default function Keybinds({ imageIndex, updateImageIndex }) {
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowRight":
        updateImageIndex(imageIndex + 1);
        break;
      case "ArrowLeft":
        updateImageIndex(imageIndex - 1);
        break;
    }
  };

  // On mount, intercept keypresses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [imageIndex, updateImageIndex]);
}