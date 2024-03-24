import React from "react";

export default function Label({ labelIndex, labelContent }) {
  return (
    <li key={labelIndex}>
      <span style={{ color: "#" + labelContent.color, content: "" }}>
        {"\x15"}
      </span>
      {labelContent.name}
    </li>
  );
}
