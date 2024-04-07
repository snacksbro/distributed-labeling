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
  const [placeholderName, setPlaceholderName] = useState("");
  const [placeholderColor, setPlaceHolderColor] = useState("");
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const retrieved_labels = res.data["label_list"];

      // Default label behavior
      if (currentLabel == "") setCurrentLabel(retrieved_labels[0].name);

      updateLabels(retrieved_labels);
    });
  }, []);

  const createNewLabelType = (labelName, labelColor = "undefined") => {
    axios.post("http://127.0.0.1:3001/create_new_label_type", {
      name: labelName,
      color: labelColor,
    });
    // Then update the labels somehow
  };

  const showEditor = (name = "", color = "", isVisible = true) => {
    console.log(`Show editor called with ${name} ${color}`);
    if (isVisible) {
      setShowForm("visible");
    } else {
      setShowForm("hidden");
    }
    setPlaceholderName(name);
    setPlaceHolderColor(color);
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
          onClick={() => showEditor("", "", true)}
        />
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
          type="button"
          value="Edit"
          onClick={() => showEditor(currentLabel, "#AAAAAA", true)}
        />
        <input
          class="bg-red-500 hover:bg-red-700 text-white px-1 border border-red-700 rounded"
          type="button"
          value="Delete"
        />
      </div>
      <LabelEditor
        labelName={placeholderName}
        setLabelName={setPlaceholderName}
        labelColor={placeholderColor}
        setLabelColor={setPlaceHolderColor}
        formVisibility={showForm}
        setFormVisibility={showEditor}
        createNewLabelType={createNewLabelType}
      />
    </div>
  );
}
