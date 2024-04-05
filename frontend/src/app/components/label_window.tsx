import React, { useEffect, useState } from "react";
import axios from "axios";
import Label from "./label";
import LabelEditor from "./label_editor";

// .get(`http://127.0.0.1:3001/get_labels?index=${imageIndex}`)
export default function LabelWindow({
  imageIndex,
  labels,
  updateLabels,
  currentLabel,
  setCurrentLabel,
}) {
  // let showForm = "hidden";
  const [showForm, setShowForm] = useState("hidden");
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const retrieved_labels = res.data["label_list"];

      // Default label behavior
      if (currentLabel == "") setCurrentLabel(retrieved_labels[0].name);

      updateLabels(retrieved_labels);
    });
  }, []);

  const showEditor = (isVisible = true) => {
    if (isVisible) {
      setShowForm("visible");
    } else {
      setShowForm("hidden");
    }
  };

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
          class="bg-green-500 hover:bg-green-700 text-white px-1 border border-green-700 rounded"
          type="button"
          value="Add"
        />
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
          type="button"
          value="Edit"
          onClick={showEditor}
        />
        <input
          class="bg-red-500 hover:bg-red-700 text-white px-1 border border-red-700 rounded"
          type="button"
          value="Delete"
        />
      </div>
      <LabelEditor
        labelName={currentLabel}
        labelColor={"#C0FFEE"}
        formVisibility={showForm}
        setFormVisibility={showEditor}
      />
    </div>
  );
}
