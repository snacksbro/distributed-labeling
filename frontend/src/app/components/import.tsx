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
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        id="import"
        name="import"
        onChange={handleImport}
      />
    </div>
  );
}
