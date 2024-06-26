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
    <div className="fixed " style={{ visibility: formVisibility }}>
      <p className="underline text-lg">Label Editor</p>
      <form>
        <label for="label-name" className="text-lg">
          Name:
        </label>
        <br />
        <input
          type="text"
          id="label-name"
          placeholder="Label Name..."
          className="py-1 px-1 border rounded-lg"
          value={labelName}
          onChange={handleNameChange}
        />
        <br />
        <label for="label-color" className="text-lg">
          Color:
        </label>
        <br />
        <input
          type="text"
          id="label-color"
          placeholder="Label Color..."
          className="py-1 px-1 border rounded-lg"
          value={labelColor}
          onChange={handleColorChange}
        />
        <br />
        <input
          className="bg-green-500 hover:bg-green-700 text-white px-5 border border-green-700 rounded text-xl my-3"
          type="button"
          value="Confirm"
          onClick={() => {
            submitNewLabel(labelName, labelColor);
            setFormVisibility("", "", false);
          }}
        />
        <input
          className="bg-red-500 hover:bg-red-700 text-white px-5 text-xl border border-red-700 rounded mx-3"
          type="button"
          value="Cancel"
          onClick={() => setFormVisibility("", "", false)}
        />
      </form>
    </div>
  );
}
