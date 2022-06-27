import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Uploader from "./pages/Uploader";
import Selector from "./pages/Selector";
import Tagger from "./pages/Tagger";
import NavBar from "./components/NavBar";

function App() {
  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [orderFileContent, setOrderFileContent] = useState();
  const [session, setSession] = useState();
  const [taggedFiles, setTaggedFiles] = useState();
  const [urls, setUrls] = useState([]);
  const [relativePath, setRelativePath] = useState();

  /* Logic for Selector */
  const clickSelector = () => {
    document.getElementById("file-selector").click();
  };

  const handleSelectFolder = (ev) => {
    const filesArray = [...ev.target.files];
    const relativePathString = filesArray[0].webkitRelativePath;
    const pdfFilesArray = filesArray.filter(
      (file) => file.type === "application/pdf"
    );
    setFiles(filesArray);
    setPdfFiles(pdfFilesArray);
    console.log(
      pdfFilesArray.length +
        " PDF and " +
        (filesArray.length - pdfFilesArray.length) +
        " non-PDF files selected."
    );
    setRelativePath(
      [...relativePathString]
        .slice(0, [...relativePathString].indexOf("/"))
        .join("")
    );
  };

  const basicFolderChecks = () => {
    readOrderFile(files);
  };

  const readOrderFile = async (files) => {
    const orderFile = files.filter(
      (file) =>
        file.name.toLowerCase().includes("orden") && file.name.endsWith(".txt")
    );
    if (orderFile.length === 0) {
      console.log("There is no order file.");
      return;
    } else if (orderFile.length > 1) {
      console.log("There are too many order files.");
      return;
    } else {
      console.log("Order file loaded.");
    }

    const fr = new FileReader();
    const fileSelection = new Promise((resolve) => {
      fr.onload = () => resolve(fr.result);
      fr.readAsText(orderFile[0], "UTF-8");
    });
    setOrderFileContent(
      [await fileSelection][0].split("\r\n").filter((a) => a !== "")
    );
    const name = orderFile[0].name;
    setSession([...name].slice(0,8).join(''))
  };


  const prepareTaggedFiles = () => {
    const getDate = (arr, i) => {
      if (isNaN(parseInt(arr[0]))) {
        return { date: "00000000", arr: arr, order: i };
      } else {
        return {
          date: arr.slice(0, 8),
          arr: arr.slice(11, arr.length),
          order: i,
        };
      }
    };
    const getSourceTitle = (arr) => {
      if (arr.date === "00000000") {
        return {
          date: "00000000",
          source: "label",
          title: arr.arr.join(""),
          order: arr.order,
        };
      } else {
        return {
          date: arr.date.join(""),
          source: arr.arr.slice(0, arr.arr.indexOf("-") - 1).join(""),
          title: arr.arr
            .slice(arr.arr.indexOf("-") + 2, arr.arr.length)
            .join(""),
          order: arr.order,
        };
      }
    };

    const enhanceTaggedFiles = (arr) => {

      return {...arr,session: session, zones: [],sectors: [],tags: [], others: [], id: session + arr.order}

    }

    setTaggedFiles(orderFileContent.map((item, i) =>
    enhanceTaggedFiles(getSourceTitle(getDate([...item], i))))
    );
  };
  /* Logic for Tagger */

  const handleTaggedFiles = (a) => {
    setTaggedFiles(a);
  };

  /* Logic for Uploader */

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
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Selector
                  clickSelector={clickSelector}
                  handleSelectFolder={handleSelectFolder}
                  basicFolderChecks={basicFolderChecks}
                  prepareTaggedFiles={prepareTaggedFiles}
                />
              </>
            }
          />
          <Route
            path="/uploader"
            element={
              <Uploader
                files={files}
                urls={urls}
                relativePath={relativePath}
                clickSelector={clickSelector}
                handleSelectFolder={handleSelectFolder}
                handleUploadFiles={handleUploadFiles}
                handleGetFileURL={handleGetFileURL}
              />
            }
          />
          <Route
            path="/tagger"
            element={
              <Tagger
                files={files}
                orderFileContent={orderFileContent}
                taggedFiles={taggedFiles}
                handleTaggedFiles={handleTaggedFiles}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
