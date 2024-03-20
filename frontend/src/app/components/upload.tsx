import axios from "axios";

// TODO: Make host/port configurable for both frontend and backend
// TODO: Add neat upload progress bar

export default function UploadButton({ updateSliceCount }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file: " + file.name);
    formSubmit(file);
  };

  const formSubmit = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:3001/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        updateSliceCount(res.data["slice_count"]);
        console.log("Slice count updated: " + res.data["slice_count"]);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div>
      <input
        type="file"
        id="file_upload"
        name="filename"
        onChange={handleFileChange}
      />
    </div>
  );
}
