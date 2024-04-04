import React, { useEffect, useState } from "react";
import axios from "axios";
import Label from "./label";

// .get(`http://127.0.0.1:3001/get_labels?index=${imageIndex}`)
export default function LabelWindow({
  imageIndex,
  labels,
  updateLabels,
  currentLabel,
  setCurrentLabel,
}) {
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const retrieved_labels = res.data["label_list"];

      // Default label behavior
      if (currentLabel == "") setCurrentLabel(retrieved_labels[0].name);

      updateLabels(retrieved_labels);
    });
  }, []);
  return (
    <div>
      <ul>
        {labels.map((label, index) => (
          <Label
            key={index}
            selectedLabel={currentLabel}
            labelIndex={index}
            labelContent={label}
          />
        ))}
      </ul>
      <div>
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
          type="button"
          value="Add Label"
        />
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
          type="button"
          value="Delete Label"
        />
      </div>
    </div>
  );
}
