import React, { useEffect, useState } from "react";
import axios from "axios";

// .get(`http://127.0.0.1:3001/get_labels?index=${imageIndex}`)
export default function LabelWindow({ imageIndex, labels }) {
  const [labelElems, setLabelElems] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/get_label_list`).then((res) => {
      const labels = res.data["label_list"];
      const newLabelElems = [];
      // console.log("GOT " + labels[0]);
      console.log(labels);
      for (let i = 0; i < labels.length; i++) {
        newLabelElems.push(<li key={i}>{labels[i].name}</li>);
      }
      console.log(labelElems);
      setLabelElems(newLabelElems);
    });
  }, []);
  // USE STATE BRO
  return (
    <div>
      <ul>{labelElems}</ul>
    </div>
  );
}
