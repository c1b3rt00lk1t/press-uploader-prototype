import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";

function App() {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [relativePath, setRelativePath] = useState();

  const clickSelector = () => {
    document.getElementById("file-selector").click();
  };

  const handleSelectFolder = (ev) => {
    const filesArray = [...ev.target.files];
    const relativePathString = filesArray[0].webkitRelativePath;
    setFiles(filesArray);
    console.log(filesArray.length + " files selected.");
    setRelativePath(
      [...relativePathString]
        .slice(0, [...relativePathString].indexOf("/"))
        .join("")
    );
  };

  const handleUploadFiles = () => {
    Promise.all(
      files.map((file) => {
        return uploadFile(file, file.webkitRelativePath);
      })
    ).then((_) => console.log("Everything loaded"));
  };

  const handleGetFileURL = async () => {
    let urlsTmp = [];
    await Promise.all(
      files.map(async (file, i) => {
        urlsTmp[i] = await getFileURL(file.webkitRelativePath);
      })
    );

    let fileUrls = Array.from({ length: urlsTmp.length }, (_, i) => ({
      name: files[i].webkitRelativePath,
      url: urlsTmp[i],
    }));

    setUrls(fileUrls);
    console.log("All urls received.");
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
        {!!files.length && !!urls.length && (
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(urls)
            )}`}
            download={`url_${relativePath}_${new Date().getFullYear()}${(
              new Date().getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}${new Date().getDate()}_${new Date()
              .getHours()
              .toString()
              .padStart(2, "0")}${new Date().getMinutes()}.json`}
          >
            <button>{`Download JSON`}</button>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
