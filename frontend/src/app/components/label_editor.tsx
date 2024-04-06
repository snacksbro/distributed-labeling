import React, { useState } from "react";

export default function LabelEditor({
  labelName,
  labelColor,
  formVisibility,
  setFormVisibility,
  createNewLabelType,
}) {
  // const [currentName, setCurrentName] = useState("");
  // const [currentColor, setCurrentColor] = useState("");
  // const [visibility, setVisibility] = useState("hidden");
  const [placeholderName, setPlaceHolderName] = useState("");
  const [placeholderColor, setPlaceHolderColor] = useState("");

  const showEditor = (name = "", color = "") => {
    console.log(`Show editor called with ${name} ${color}`);
    setPlaceHolderName(name);
    setPlaceHolderColor(color);
    setVisibility("visible");
  };

  const handleNameChange = (event) => {
    setPlaceHolderName(event.target.value);
  };
  const handleColorChange = (event) => {
    setPlaceHolderColor(event.target.value);
  };

  const submitNewLabel = (name = "", color = "") => {
    createNewLabelType(name, color);
    setFormVisibility(false);
  };

  return (
    <div style={{ visibility: formVisibility }}>
      <form>
        <label for="label-name">Name:</label>
        <input
          type="text"
          id="label-name"
          placeholder="Label Name..."
          value={placeholderName}
          onChange={handleNameChange}
        />
        <label for="label-color">Color:</label>
        <input
          type="text"
          id="label-color"
          placeholder="Label Color..."
          value={placeholderColor}
          onChange={handleColorChange}
        />
        <input
          type="button"
          value="Confirm"
          onClick={() => submitNewLabel(labelName, labelColor)}
        />
        <input type="button" value="Cancel" />
      </form>
    </div>
  );
}
