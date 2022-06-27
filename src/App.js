import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Uploader from "./pages/Uploader";

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
    <>
      <Router>
        <Routes>
        <Route
              exact
              path="/"
              element={
                <>
                <Uploader files={files} urls={urls} relativePath={relativePath} clickSelector={clickSelector} handleSelectFolder={handleSelectFolder} handleUploadFiles={handleUploadFiles} handleGetFileURL={handleGetFileURL} />
                </>
              }
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
