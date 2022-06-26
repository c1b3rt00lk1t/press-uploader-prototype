import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";

function App() {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const clickSelector = () => {
    document.getElementById("file-selector").click();
  };

  const handleSelectFolder = (ev) => {
    setFiles([...ev.target.files]);
    console.log([...ev.target.files].length + ' files selected.')
  };

  const handleUploadFiles = () => {
    Promise.all(
      files.map((file) => {
        return uploadFile(file, file.webkitRelativePath);
      })
    ).then((_) => console.log("Everything loaded"));
  };

  const handleGetFileURL = async () => {
    let urlsTmp =[];
    await Promise.all(
      files.map(async (file,i) => {
        urlsTmp[i] = await getFileURL(file.webkitRelativePath);
      })
    );

    let fileUrls = Array.from({length: urlsTmp.length},(_,i) => ({name: files[i].webkitRelativePath,url: urlsTmp[i]}));


    setUrls(fileUrls);
  };

  return (
    <div>
      Press Uploader
      <div id="selector">
        <button onClick={clickSelector} id="display-selector">
          Select folder
        </button>
        <span id="selection-result" className="contador"></span>
        <input
          onChange={handleSelectFolder}
          type="file"
          id="file-selector"
          name="fileList"
          style={{ display: "none" }}
          webkitdirectory="true"
        />
        <button>Basic checks</button>
        {/* checks if there is an order file (an only one), if the folder already exists in target, if there is internet connection, if there are rare characters */}
        <button onClick={handleUploadFiles}>Upload files</button>
        <button onClick={handleGetFileURL}> Get URLs</button>
      </div>
    </div>
  );
}

export default App;
