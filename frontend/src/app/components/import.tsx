import axios from "axios";

export default function ImportButton() {
  const handleImport = (event) => {
    const file = event.target.files[0];
    console.log("Selected file: " + file.name);
    importSubmit(file);
  };

  const importSubmit = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:3001/import_json", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Import: " + res.data["success"]);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  return (
    <div>
      <input type="file" id="import" name="import" onChange={handleImport} />
    </div>
  );
}
