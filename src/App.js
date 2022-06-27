import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Uploader from "./pages/Uploader";

function App() {
  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [relativePath, setRelativePath] = useState();

  const clickSelector = () => {
    document.getElementById("file-selector").click();
  };

  const handleSelectFolder = (ev) => {
    const filesArray = [...ev.target.files];
    const relativePathString = filesArray[0].webkitRelativePath;
    const pdfFilesArray = filesArray.filter(file => file.type === "application/pdf");
    setFiles(filesArray);
    setPdfFiles(pdfFilesArray)
    console.log(pdfFilesArray.length + " PDF and " + (filesArray.length - pdfFilesArray.length) + " non-PDF files selected.");
    setRelativePath(
      [...relativePathString]
        .slice(0, [...relativePathString].indexOf("/"))
        .join("")
    );
  };

  const handleUploadFiles = () => {
    Promise.all(
      pdfFiles.map((file) => {
        return uploadFile(file, file.webkitRelativePath);
      })
    ).then((_) => console.log("Everything loaded"));
  };

  const handleGetFileURL = async () => {
    let urlsTmp = [];
    await Promise.all(
      pdfFiles.map(async (file, i) => {
        urlsTmp[i] = await getFileURL(file.webkitRelativePath);
      })
    );

    let fileUrls = Array.from({ length: urlsTmp.length }, (_, i) => ({
      name: pdfFiles[i].webkitRelativePath,
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
