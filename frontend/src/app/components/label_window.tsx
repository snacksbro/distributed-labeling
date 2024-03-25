import React, { useEffect, useState } from "react";
import axios from "axios";
import Label from "./label";

// .get(`http://127.0.0.1:3001/get_labels?index=${imageIndex}`)
export default function LabelWindow({
  imageIndex,
  labels,
  currentLabel,
  setCurrentLabel,
}) {
  const [labelElems, setLabelElems] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const labels = res.data["label_list"];
      const newLabelElems = [];

      // Default label behavior
      if (currentLabel == "") setCurrentLabel(labels[0].name);

      // Render each
      for (let i = 0; i < labels.length; i++) {
        newLabelElems.push(
          <Label
            selectedLabel={currentLabel}
            labelIndex={i}
            labelContent={labels[i]}
          />,
        );
      }
      console.log(labelElems);
      setLabelElems(newLabelElems);
    });
  }, []);
  return (
    <div>
      <ul>{labelElems}</ul>
    </div>
  );
}
