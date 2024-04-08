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
  getLabels,
}) {
  const [showForm, setShowForm] = useState("hidden");
  const [placeholderName, setPlaceholderName] = useState("");
  const [placeholderColor, setPlaceHolderColor] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchLabelList();
  }, []);

  const fetchLabelList = () => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const retrieved_labels = res.data["label_list"];

      // Default label behavior
      if (currentLabel == "") setCurrentLabel(retrieved_labels[0].name);

      updateLabels(retrieved_labels);
    });
  };

  const createNewLabelType = (labelName, labelColor = "undefined") => {
    if (editMode) {
      editLabelType(labelName, labelColor);
      return;
    }
    axios
      .post("http://127.0.0.1:3001/create_new_label_type", {
        name: labelName,
        color: labelColor,
      })
      .then((res) => {
        if (res.data["success"]) {
          fetchLabelList();
        }
      });
  };

  const editLabelType = (labelName, labelColor = "undefined") => {
    axios
      .post("http://127.0.0.1:3001/edit_label_type", {
        old_name: currentLabel,
        new_name: labelName,
        color: labelColor,
      })
      .then((res) => {
        if (res.data["success"]) {
          fetchLabelList();
          getLabels();
        }
      });
  };

  const deleteLabelType = (labelName) => {
    axios
      .post("http://127.0.0.1:3001/delete_label_type", {
        name: labelName,
      })
      .then((res) => {
        if (res.data["success"]) {
          fetchLabelList();
          getLabels();
        }
      });
  };

  const showEditor = (name = "", color = "", isVisible = true) => {
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
          onClick={() => {
            setEditMode(false);
            showEditor("", "", true);
          }}
        />
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white px-1 border border-blue-700 rounded"
          type="button"
          value="Edit"
          onClick={() => {
            setEditMode(true);
            showEditor(currentLabel, "#AAAAAA", true);
          }}
        />
        <input
          class="bg-red-500 hover:bg-red-700 text-white px-1 border border-red-700 rounded"
          type="button"
          value="Delete"
          onClick={() => {
            deleteLabelType(currentLabel);
          }}
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
