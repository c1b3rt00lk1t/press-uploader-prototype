import React from "react";
import { useState } from "react";
import { uploadFile, getFileURL } from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Uploader from "./pages/Uploader";
import Selector from "./pages/Selector";
import Tagger from "./pages/Tagger";
import NavBar from "./components/NavBar";
import Merger from "./pages/Merger";
import Order from "./pages/Order";

function App() {
  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [orderFileContent, setOrderFileContent] = useState([]);
  const [session, setSession] = useState();
  const [taggedFiles, setTaggedFiles] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [urls, setUrls] = useState([]);
  const [relativePath, setRelativePath] = useState();

  /* States for controlling the enabling of next components */
  const emptyCard = { status: undefined, msg: [] };
  const [selectorSelectCard, setSelectorSelectCard] = useState(emptyCard);
  const [selectorBasicChecksCard, setSelectorBasicChecksCard] =
    useState(emptyCard);
  const [selectorPrepareTaggerCard, setSelectorPrepareTaggerCard] =
    useState(emptyCard);

  const [readyToOrder, setReadyToOrder] = useState(false);
  const [basicSelectorChecks, setBasicSelectorChecks] = useState(false);
  const [readyToTagger, setReadyToTagger] = useState(false);

  /* Logic for Selector */
  const clickSelector = () => {
    // Resets the next states
    setSelectorBasicChecksCard({ status: undefined, msg: [""] });
    setReadyToOrder(false);
    setBasicSelectorChecks(false);
    setSelectorPrepareTaggerCard({status: undefined,msg:[""]})


    
    // Triggers the event
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

    const msg =
      pdfFilesArray.length +
      " PDF and " +
      (filesArray.length - pdfFilesArray.length) +
      " non-PDF files selected.";
    setRelativePath(
      [...relativePathString]
        .slice(0, [...relativePathString].indexOf("/"))
        .join("")
    );
    resetStates();

    setSelectorSelectCard({ status: true, msg: [msg] });
    setReadyToOrder(true);
  };

  const resetStates = () => {
    setOrderFileContent([]);
    setSession("");
    setTaggedFiles([]);
    setPrevious([]);
    setUrls([]);
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
      const msg = "There is no order file.";
      setSelectorBasicChecksCard({ status: false, msg: [msg] });
      console.log("There is no order file.");
      return;
    } else if (orderFile.length > 1) {
      const msg = "There are too many order files.";
      setSelectorBasicChecksCard({ status: false, msg: [msg] });
      console.log("There are too many order files.");
      return;
    } else {
      const fr = new FileReader();
      const fileSelection = new Promise((resolve) => {
        fr.onload = () => resolve(fr.result);
        fr.readAsText(orderFile[0], "UTF-8");
      });
      setOrderFileContent(
        [await fileSelection][0].split("\r\n").filter((a) => a !== "")
      );
      const name = orderFile[0].name;
      setSession([...name].slice(0, 8).join(""));
      setBasicSelectorChecks(true);

      const msg = "Order file loaded.";
      setSelectorBasicChecksCard({ status: true, msg: [msg] });
      console.log("Order file loaded.");
    }
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
      return {
        ...arr,
        session: session,
        zones: [],
        sectors: [],
        tags: [],
        others: [],
        id: session + arr.order,
      };
    };

    setTaggedFiles(
      orderFileContent.map((item, i) =>
        enhanceTaggedFiles(getSourceTitle(getDate([...item], i)))
      )
    );
    setReadyToTagger(true);
    const msg = "Order enhanced to be tagged.";
    setSelectorPrepareTaggerCard({ status: true, msg: [msg] });
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

  /* Logic for the Merger */
  const handleMerge = () => {
    let merged = [];
    const taggedPDFs = taggedFiles.filter(
      (tagged) => tagged.source !== "label"
    );
    for (let tagged of taggedPDFs) {
      // console.log(tagged.title)
      // console.log(urls.filter( url => url.name.includes(tagged.title)))

      /* IMPORTANT: the "labels" have to be filtered OUT !!!! */
      const url = urls.filter((url) => url.name.includes(tagged.title));
      if (url.length) {
        // console.log(url[0].url)
        merged.push({ ...tagged, ...url[0] });
      }
    }
  };

  const handleDownloadMerged = () => {};

  const handleBasicMergeChecks = () => {
    if (!urls.length) {
      console.log("No urls to merge.");
    }
    if (!taggedFiles.length) {
      console.log("No tagged files to merge.");
    }
  };

  return (
    <>
      <Router>
        <NavBar
          readyToTagger={readyToTagger}
          basicSelectorChecks={basicSelectorChecks}
          readyToOrder={readyToOrder}
        />
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
                  basicSelectorChecks={basicSelectorChecks}
                  selectorSelectCard={selectorSelectCard}
                  selectorBasicChecksCard={selectorBasicChecksCard}
                  selectorPrepareTaggerCard={selectorPrepareTaggerCard}
                />
              </>
            }
          />
          <Route
            path="/order"
            element={<Order pdfFiles={pdfFiles} relativePath={relativePath} />}
          />
          <Route
            path="/tagger"
            element={
              <Tagger
                files={files}
                orderFileContent={orderFileContent}
                taggedFiles={taggedFiles}
                handleTaggedFiles={handleTaggedFiles}
                previous={previous}
                setPrevious={setPrevious}
              />
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
            path="/merger"
            element={
              <Merger
                handleMerge={handleMerge}
                handleDownloadMerged={handleDownloadMerged}
                handleBasicMergeChecks={handleBasicMergeChecks}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
