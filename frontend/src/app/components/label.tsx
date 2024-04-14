import React from "react";

export default function Label({ selectedLabel, labelIndex, labelContent }) {
  return (
    <li
      className="bg-slate-50 py-2 px-2"
      key={labelIndex}
      style={
        selectedLabel == labelContent.name
          ? { backgroundColor: "rgb(203 213 225)" }
          : {}
      }
    >
      <span style={{ color: "#" + labelContent.color, content: "" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 inline"
        >
          <path
            fillRule="evenodd"
            d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {labelContent.name}
    </li>
  );
}
