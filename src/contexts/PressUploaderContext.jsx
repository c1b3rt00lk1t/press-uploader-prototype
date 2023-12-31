/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { createContext, useState } from "react";
import {
  getDataFromDBSession,
  writeDataSession,
  getDataFromDBDictionary,
  writeDataDictionary,
  updateDataDictionary,
  getDataFromDBSessionList,
  writeDataSysSession,
} from "../firebase";
import { uploadFile, getFileURL } from "../firebase";
import { uploadFileToBackUp, getFileURLFromBackUp } from "../firebase2";

const PressUploaderContext = createContext();

export const PressUploaderContextProvider = ({ children }) => {
  /** LOG IN CONTEXT */

  const [authenticated, setAuthenticated] = useState();

  /** START CONTEXT */
  const [origin, setOrigin] = useState();

  /**
   * SERVER CONTEXT
   * */

  const [data, setData] = useState();
  const [uniqueSessions, setUniqueSessions] = useState([]);
  const [session, setSession] = useState();
  const [taggedFiles, setTaggedFiles] = useState([]);

  /* States for controlling the status and messages of the cards */
  const emptyCard = { status: undefined, msg: [] };
  const [serverGetSessions, setServerGetSessions] = useState(emptyCard);
  const [serverSelectSession, setServerSelectSession] = useState(emptyCard);

  /* Functions */

  const handleGetSessionsFromDB = () => {
    setServerGetSessions({ status: undefined, msg: ["Getting sessions..."] });
    const handleDataFromDB = (data) => {
      // The states derived from the data are set
      const sessions = Object.keys(data);
      setData(data);
      setUniqueSessions(sessions);
      sessions.length
        ? setServerGetSessions({
            status: true,
            msg: ["All sessions received."],
          })
        : setServerGetSessions({
            status: false,
            msg: ["No sessions received."],
          });
    };
    getDataFromDBSession(handleDataFromDB);
  };

  const handleSessionSelection = (e) => {
    setSession(e.target.innerText);
  };

  const prepareTaggedFilesFromServer = () => {
    const enhanceTaggedFilesFromServer = (arr) => {
      if (!arr.zones) {
        arr.zones = [];
      }
      if (!arr.sectors) {
        arr.sectors = [];
      }
      if (!arr.tags) {
        arr.tags = [];
      }
      if (!arr.others) {
        arr.others = [];
      }
      return arr;
    };
    const taggedFilesTmp = data[session].map((a) =>
      enhanceTaggedFilesFromServer(a)
    );
    setTaggedFiles(taggedFilesTmp);
    handlePreviousAfterLoad(taggedFilesTmp);
    setReadyToTagger(true);
  };
  const handlePreviousAfterLoad = (fileList) => {
    setPrevious(
      fileList
        .filter(
          (file) => file.zones.length || file.sectors.length || file.tags.length
        )
        .map((file) => file.order)
    );
  };

  const handleClickSelectSession = () => {
    prepareTaggedFilesFromServer();

    setServerSelectSession({
      status: true,
      msg: [""],
    });
  };

  /**
   * PREVIOUS APP CONTEXT MIGRATED
   */

  const [files, setFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [orderFileContent, setOrderFileContent] = useState([]);

  const [previous, setPrevious] = useState([]);
  const [urls, setUrls] = useState([]);
  const [urlsFromBackUp, setUrlsFromBackUp] = useState([]);
  const [merged, setMerged] = useState([]);
  const [relativePath, setRelativePath] = useState();

  /* States for controlling the the status and messages of the cards */
  const [selectorSelectCard, setSelectorSelectCard] = useState(emptyCard);
  const [selectorBasicChecksCard, setSelectorBasicChecksCard] =
    useState(emptyCard);
  const [selectorPrepareTaggerCard, setSelectorPrepareTaggerCard] =
    useState(emptyCard);

  const [uploaderUpload, setUploaderUpload] = useState(emptyCard);
  const [uploaderGetURLs, setUploaderGetURLs] = useState(emptyCard);
  const [uploaderUploadToBackUp, setUploaderUploadToBackUp] =
    useState(emptyCard);
  const [uploaderGetURLsFromBackUp, setUploaderGetURLsFromBackUp] =
    useState(emptyCard);

  const [mergerBasicChecksCard, setMergerBasicChecksCard] = useState(emptyCard);
  const [mergerMergeCard, setMergerMergeCard] = useState(emptyCard);
  const [mergerSendToServer, setMergerSendToServer] = useState(emptyCard);

  const [checkoutCard, setCheckoutCard] = useState(emptyCard);

  /* States for controlling the enabling of next components */
  const [readyToOrder, setReadyToOrder] = useState(false);
  const [basicSelectorChecks, setBasicSelectorChecks] = useState(false);
  const [readyToTagger, setReadyToTagger] = useState(false);

  /* Logic for Selector */
  const clickSelector = () => {
    // Resets the next states
    setSelectorBasicChecksCard({ status: undefined, msg: [""] });
    setReadyToOrder(false);
    setBasicSelectorChecks(false);
    setSelectorPrepareTaggerCard({ status: undefined, msg: [""] });

    // Triggers the event
    document.getElementById("file-selector").click();
  };

  const handleSelectFolder = (ev) => {
    const filesArray = [...ev.target.files];
    const relativePathString = filesArray[0].webkitRelativePath;

    const pdfFilesArray = filesArray.filter(
      (file) => file.type === "application/pdf"
    );

    const pdfsOutsideSubFolders = pdfFilesArray.reduce(
      (acc, b) => acc || b.webkitRelativePath.split("/").length < 3,
      false
    );
    if (pdfsOutsideSubFolders) {
      alert(
        "This does not look like an appropriate folder...\nSelect a correct one."
      );
      setSelectorSelectCard(emptyCard);
      return;
    }

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
    setUrlsFromBackUp([]);
    setSelectedTagger(null);
  };

  const basicFolderChecks = () => {
    console.log("basic checks");
    readOrderFile(files);
    checkFilesSizes(pdfFiles);
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
      let msgOrderContent = [];
      // if there is one and only one order, let's check its content
      const fr = new FileReader();
      const fileSelection = new Promise((resolve) => {
        fr.onload = () => resolve(fr.result);
        fr.readAsText(orderFile[0], "UTF-8");
        document.getElementById("file-selector").value = "";
      });

      setOrderFileContent(
        [await fileSelection][0].split("\r\n").filter((a) => a !== "")
      );

      const content = [await fileSelection][0]
        .split("\r\n")
        .filter((a) => a !== "");

      const checkPfdsInOrder = pdfFiles
        .map((a) => a.name.replace(/.pdf/g, ""))
        .filter(
          (name) =>
            !content.reduce((acc, file) => acc || file.includes(name), false)
        )
        .map((a) => "=> " + a);

      if (checkPfdsInOrder.length) {
        msgOrderContent.concat(
          (msgOrderContent = [
            `\nThe following pdfs are not found in the ORDER:`,
            ...checkPfdsInOrder,
          ])
        );
        console.log("There are pdfs that are not found in the order.");
      }

      const checkOrderInPdfs = content
        .map((a) => a.replace(/\t/g, ""))
        .filter(
          (name) =>
            !isNaN(name[0]) &&
            !pdfFiles
              .map((a) => a.name.replace(/.pdf/g, ""))
              .reduce((acc, file) => acc || file.includes(name), false)
        )
        .map((a) => "=> " + a);

      if (checkOrderInPdfs.length) {
        msgOrderContent = msgOrderContent.concat([
          `\nThe following order entries are not found in the FOLDERS:`,
          ...checkOrderInPdfs,
        ]);
        console.log(
          "There are order entries that are not found in the folders."
        );
      }

      if (checkOrderInPdfs.length || checkPfdsInOrder.length) {
        setSelectorBasicChecksCard({ status: false, msg: msgOrderContent });
        return;
      }

      // const checkWierdCharacters = content.filter( name => name !== name.replace(/[“”‘’&\\#+()$~%'":*?<>{}]/g,'_'))
      // console.log(checkWierdCharacters)

      const name = orderFile[0].name;
      setSession([...name].slice(0, 8).join(""));
      setBasicSelectorChecks(true);

      const msg = "Order file loaded.";
      setSelectorBasicChecksCard({ status: true, msg: [msg] });
      console.log("Order file loaded.");
    }
  };

  const checkFilesSizes = (inputFiles) => {
    const bigFiles = inputFiles
      .filter((pdf) => pdf.size >= 512000)
      .sort((a, b) => b.size - a.size)
      .map(
        (pdf) =>
          pdf.webkitRelativePath +
          " size: " +
          (+pdf.size / 1024 / 1024).toFixed(2) +
          " MB"
      );

    bigFiles.forEach((a) => console.log(a));
  };

  const prepareTaggedFilesFromFolder = () => {
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
            .join("")
            .replace(/\t/g, ""),
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

    console.log(
      orderFileContent.map((item, i) =>
        enhanceTaggedFiles(getSourceTitle(getDate([...item], i)))
      )
    );
    setTaggedFiles(
      orderFileContent.map((item, i) =>
        enhanceTaggedFiles(getSourceTitle(getDate([...item], i)))
      )
    );
    setReadyToTagger(true);
    const msg = "Order enhanced to be tagged.";
    setSelectorPrepareTaggerCard({ status: true, msg: [msg] });
  };

  /**
   *
   * DICTIONARY CONTEXT
   *
   * */

  const [dictionary, setDictionary] = useState(
    JSON.parse(window.localStorage.getItem("PrUp_dictionary"))
    //   {
    //   "zones": true,
    //   "sectors": true,
    //   "tags": true
    // }
  );
  const handleUploadDictionary = () => {
    writeDataDictionary(dictionary);
  };

  const handleAddToDictionary = (item, subpath) => {
    updateDataDictionary(item, subpath);
  };

  useEffect(() => {
    const handleGetDictionaryFromDB = () => {
      const handleDataFromDB = (data) => {
        window.localStorage.setItem("PrUp_dictionary", JSON.stringify(data));
        setDictionary(data);
      };
      getDataFromDBDictionary(handleDataFromDB);
    };

    handleGetDictionaryFromDB();
  }, []);



  /* Logic for Tagger */

  const handleTaggedFiles = (a) => {
    setTaggedFiles(a);
  };

  // used to keep a global reference to the selected file in the tagger so that it does not return to the first one every time the tagger is exited
  const [selectedTagger, setSelectedTagger] = useState();

  /* Logic for Uploader */

  const handleUploadFiles = () => {
    setUploaderUpload({ status: undefined, msg: ["Loading..."] });
    Promise.all(
      pdfFiles.map((file) => {
        return uploadFile(file, file.webkitRelativePath);
      })
    ).then(() =>
      setUploaderUpload({ status: true, msg: ["Everything loaded."] })
    );
  };

  const handleUploadFilesToBackUp = () => {
    setUploaderUploadToBackUp({ status: undefined, msg: ["Loading..."] });
    Promise.all(
      pdfFiles.map((file) => {
        return uploadFileToBackUp(file, file.webkitRelativePath);
      })
    ).then(() =>
      setUploaderUploadToBackUp({ status: true, msg: ["Everything loaded."] })
    );
  };

  const handleGetFileURL = async () => {
    setUploaderGetURLs({ status: undefined, msg: ["Getting the URLs..."] });
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
    fileUrls.length
      ? setUploaderGetURLs({ status: true, msg: ["All urls received."] })
      : setUploaderGetURLs({ status: false, msg: ["No urls received."] });
  };

  const handleGetFileURLFromBackUp = async () => {
    setUploaderGetURLsFromBackUp({
      status: undefined,
      msg: ["Getting the URLs..."],
    });
    let urlsTmp = [];
    await Promise.all(
      pdfFiles.map(async (file, i) => {
        // From the backup, also the size is gotten
        urlsTmp[i] = await getFileURLFromBackUp(file.webkitRelativePath);
      })
    );

    let fileUrls = Array.from({ length: urlsTmp.length }, (_, i) => ({
      name: pdfFiles[i].webkitRelativePath,
      url: urlsTmp[i].url,
      // From the backup, also the size is gotten
      size: urlsTmp[i].size,
    }));

    setUrlsFromBackUp(fileUrls);
    console.log("All urls received from backup.");
    fileUrls.length
      ? setUploaderGetURLsFromBackUp({
          status: true,
          msg: ["All urls received."],
        })
      : setUploaderGetURLsFromBackUp({
          status: false,
          msg: ["No urls received."],
        });
  };

  /* Logic for the Merger */
  const handleMerge = () => {
    let mergedTmp = [];
    const taggedPDFs = taggedFiles.filter(
      (tagged) => tagged.source !== "label"
    );
    for (let tagged of taggedPDFs) {
      // console.log(tagged.title)
      // console.log(urls.filter( url => url.name.includes(tagged.title)))

      /* IMPORTANT: the "labels" have to be filtered OUT !!!! */
      const url = urls.filter((url) => url.name.includes(tagged.title));
      const url2 = urlsFromBackUp.filter((url) =>
        url.name.includes(tagged.title)
      );
      if (url.length && url2.length) {
        // console.log(url[0].url)
        mergedTmp.push({
          ...tagged,
          ...url[0],
          url2: url2[0].url,
          size: url2[0].size,
        });
      }
    }
    setMerged(mergedTmp);

    mergedTmp.length
      ? setMergerMergeCard({
          status: true,
          msg: "Tags and urls successfully merged.",
        })
      : setMergerMergeCard({ status: false, msg: "Tags and urls not merged." });
  };

  const handleBasicMergeChecks = () => {
    let msg = [];
    let status = true;

    if (!urls.length) {
      msg.push("No urls to merge.");
      status = false;
    } else {
      msg.push("Found urls to merge.");
    }

    if (!urlsFromBackUp.length) {
      msg.push("No urls from backup to merge.");
      status = false;
    } else {
      msg.push("Found urls from backup to merge.");
    }

    if (!taggedFiles.length) {
      status = false;
      msg.push("No tagged files to merge.");
    } else {
      msg.push("Found tagged files to merge.");
    }
    setMergerBasicChecksCard({ status: status, msg: msg });
  };

  const handleUploadMerged = () => {
    setMergerSendToServer({ status: undefined, msg: "Sending..." });
    writeDataSession(merged, session).then((result) => {
      if (result) {
        setMergerSendToServer({ status: true, msg: "Tags and urls sent." });
      } else {
        setMergerSendToServer({
          status: false,
          msg: "Error sending tags and urls.",
        });
      }
    });
  };

  const handleDirectUploadMerged = (input) => {
    writeDataSession(input, session);
  };

  /* Logic for the Checkout */
  const [checkoutSession, setCheckoutSession] = useState("");
  const [checkoutSessionURL, setCheckoutSessionURL] = useState("");
  const [checkoutSessionList, setCheckoutSessionList] = useState();
  

  const handleChangeCheckoutSession = (e) => setCheckoutSession(e.target.value);

  const handleChangeCheckoutSessionURL = (e) =>
    setCheckoutSessionURL(e.target.value);

  const resetCheckout = () => {
    setCheckoutSession("");
    setCheckoutSessionURL("");
  };

  
   const handleGetSessionList = (data) => {
    setCheckoutSessionList(data);
  };

  const handleClickCheckout = () => {
    const updatedSessionList = {...checkoutSessionList,[checkoutSession]: checkoutSessionURL};
    writeDataSysSession(updatedSessionList);
    setCheckoutSessionList(updatedSessionList);
    setCheckoutCard({status: undefined, msg: `${checkoutSession} checked out.`})
    resetCheckout();
  };




  return (
    <PressUploaderContext.Provider
      value={{
        //// LOGIN
        authenticated,
        setAuthenticated,
        //// START
        origin,
        setOrigin,
        //// SERVER
        handleGetSessionsFromDB,
        data,
        uniqueSessions,
        serverGetSessions,
        handleSessionSelection,
        handleClickSelectSession,
        serverSelectSession,

        //// SELECTOR
        clickSelector,
        handleSelectFolder,
        basicFolderChecks,
        prepareTaggedFiles: prepareTaggedFilesFromFolder,
        basicSelectorChecks,
        selectorSelectCard,
        selectorBasicChecksCard,
        selectorPrepareTaggerCard,

        //// ORDER
        pdfFiles,
        relativePath,

        //// DICTIONARY
        handleUploadDictionary,
        dictionary,
        handleAddToDictionary,

        //// TAGGER
        // origin,
        files,
        orderFileContent,
        // relativePath,
        taggedFiles,
        handleTaggedFiles,
        previous,
        setPrevious,
        selectedTagger,
        setSelectedTagger,
        session,
        setMerged,
        handlePreviousAfterLoad,
        handleDirectUploadMerged,

        //// UPLOADER
        // clickSelector,
        // handleSelectFolder,
        handleUploadFiles,
        handleGetFileURL,
        uploaderUpload,
        uploaderGetURLs,
        handleUploadFilesToBackUp,
        handleGetFileURLFromBackUp,
        uploaderUploadToBackUp,
        uploaderGetURLsFromBackUp,

        //// MERGER
        handleMerge,
        handleBasicMergeChecks,
        handleUploadMerged,
        mergerBasicChecksCard,
        mergerMergeCard,
        mergerSendToServer,

        //// CHECKOUT
        checkoutSession,
        checkoutSessionURL,
        handleChangeCheckoutSession,
        handleChangeCheckoutSessionURL,
        getDataFromDBSessionList,
        handleGetSessionList,
        handleClickCheckout,
        checkoutCard,

        //// NAVBAR
        readyToTagger,
        // basicSelectorChecks,
        readyToOrder,
      }}
    >
      {children}
    </PressUploaderContext.Provider>
  );
};

export default PressUploaderContext;
