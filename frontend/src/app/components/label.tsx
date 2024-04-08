import React from "react";

export default function Label({ selectedLabel, labelIndex, labelContent }) {
  return (
    <li
      key={labelIndex}
      style={
        selectedLabel == labelContent.name ? { border: "1px solid blue" } : {}
      }
    >
      <span style={{ color: "#" + labelContent.color, content: "" }}>
        {"\x15"}
      </span>
      {labelContent.name}
    </li>
  );
}
