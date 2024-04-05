import React from "react";

export default function LabelEditor({
  labelName,
  labelColor,
  formVisibility,
  setFormVisibility,
}) {
  // const [currentName, setCurrentName] = useState("");
  // const [currentColor, setCurrentColor] = useState("");
  // const [visibility, setVisibility] = useState("hidden");

  const showEditor = (name = "", color = "") => {
    setCurrentName(name);
    setCurrentColor(color);
    setVisibility("visible");
  };

  const createNewLabel = (name = "", color = "") => {
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
        />
        <label for="label-color">Color:</label>
        <input
          type="text"
          id="label-color"
          placeholder="Label Color..."
          value={labelColor}
        />
        <input
          type="button"
          value="Confirm"
          onClick={() => createNewLabel(false)}
        />
        <input type="button" value="Cancel" />
      </form>
    </div>
  );
}
