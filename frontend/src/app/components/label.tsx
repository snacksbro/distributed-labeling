import React from "react";

export default function Label({ selectedLabel, labelIndex, labelContent }) {
  return (
    <li
      className="bg-slate-50"
      key={labelIndex}
      style={
        selectedLabel == labelContent.name
          ? { backgroundColor: "rgb(203 213 225)" }
          : {}
      }
    >
      <span style={{ color: "#" + labelContent.color, content: "" }}>
        {"\x15"}
      </span>
      {labelContent.name}
    </li>
  );
}
