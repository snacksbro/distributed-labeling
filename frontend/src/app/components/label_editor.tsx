import React, { useState } from "react";

export default function LabelEditor({
  labelName,
  setLabelName,
  labelColor,
  setLabelColor,
  formVisibility,
  setFormVisibility,
  createNewLabelType,
}) {
  const handleNameChange = (event) => {
    setLabelName(event.target.value);
  };
  const handleColorChange = (event) => {
    setLabelColor(event.target.value);
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
          value={labelName}
          onChange={handleNameChange}
        />
        <label for="label-color">Color:</label>
        <input
          type="text"
          id="label-color"
          placeholder="Label Color..."
          value={labelColor}
          onChange={handleColorChange}
        />
        <input
          type="button"
          value="Confirm"
          onClick={() => submitNewLabel(labelName, labelColor)}
        />
        <input
          type="button"
          value="Cancel"
          onClick={() => setFormVisibility("", "", false)}
        />
      </form>
    </div>
  );
}
