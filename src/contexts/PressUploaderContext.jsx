import { useEffect } from "react";
import { createContext, useState } from "react";
import {
  getDataFromDBSession,
  writeDataSession,
  getDataFromDBDictionary,
  writeDataDictionary,
} from "../firebase";
import { uploadFile, getFileURL } from "../firebase";
import { uploadFileToBackUp, getFileURLFromBackUp } from "../firebase2";

const PressUploaderContext = createContext();

export const PressUploaderContextProvider = ({ children }) => {
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
      !!sessions.length
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
  };

  const basicFolderChecks = () => {
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
  )
  const handleUploadDictionary = () => {
    writeDataDictionary(dictionary);
  };

  

  useEffect(() => {
    const handleGetDictionaryFromDB = () => {
    
      const handleDataFromDB = (data) => {
        window.localStorage.setItem("PrUp_dictionary", JSON.stringify(data)); 
        setDictionary(data)
      };
      getDataFromDBDictionary(handleDataFromDB);
    };

    handleGetDictionaryFromDB();
  }, [])


  const handleDictionary = (zones, sectors, tags) => () => {
    
    setDictionary(
      {
        "zones": {
          "type": "B",
          "global": true,
          "africa": true,
          "europa": {
            "ue": true,
            "schengen": true,
            "alemania": true,
            "serbia": true,
            "rusia": true,
            "rumanía": true,
            "polonia": true,
            "montenegro": true,
            "albania": true,
            "macedonia del norte": true,
            "grecia": true,
            "kosovo": true,
            "bosnia-herzegovina": true,
            "irlanda": true
          },
          "norteamérica": {
            "eeuu": true,
            "méxico": true
          },
          "latinoamérica": {
            "venezuela": true
          },
          "asia": {
            "asia central": true,
            "oriente medio": {
              "turquía": true
            },
            "cáucaso": true,
            "asia pacífico": {
              "japón": true
            },
            "sudeste asiático": {
              "camboya": true,
              "tailandia": true
            },
            "china": true,
            "india": true
          },
          "áfrica": {
            "egipto": true,
            "marruecos": true,
            "argelia": true,
            "somalia": true,
            "sudáfrica": true
          }
        },
        "sectors": {
          "alimentario": true,
          "aeronáutico": {
            "aeropuertos": true,
            "aerolíneas": true,
            "industria aeronáutica": true
          },
          "naval": {
            "puertos": true
          },
          "comercio": {
            "comercio online": true,
            "delivery": true,
            "logística": true,
            "supermercados": true,
            "pequeño comercio": true,
            "gran comercio": true
          },
          "transporte": {
            "carretera": true,
            "marítimo": true,
            "contenedores": true
          },
          "tecnología": {
            "electrónica": true,
            "informática": true,
            "redes sociales": true,
            "telefonía móvil": true,
            "semiconductores": true,
            "telecomunicaciones": {
            "cinco G": true
            }
          },
          "sanidad": true,
          "construcción": {
            "vivienda": true
          },
          "textil": true,
          "avícola": true,
          "agrario": true,
          "bancario": true,
          "automovilístico": {
            "coche eléctrico": true,
            "segunda mano": true
          },
          "energía": {
            "petróleo": {
              "opep": true,
              "precio": true,
              "gasolina": true
            },
            "gas": {
              "gnl": true
            },
            "carbón": true,
            "renovables": true,
            "eléctricas": true,
            "reservas": true,
            "suministro": true
          },
          "materias primas": {
            "fertilizantes": {
              "potasa": true
            },
            "cereales": {
              "trigo": true,
              "maíz": true,
              "cebada": true,
              "soja": true,
              "girasol": true
            },
            "azúcar": true,
            "café": true,
            "metales": {
              "cobre": true,
              "hierro": true,
              "litio": true
            }
          },
          "alimentación": true,
          "siderúrgico": {
            "acero": true,
            "cobre": true
          },
          "seguros": true
        },
        "tags": {
          "cadena de suministro": {
            "laboral": true
          },
          "economía": {
            "type": "A",
            "pib": true,
            "inflación": true,
            "deflación": true,
            "pequeño y gran capital": true,
            "impuestos": true,
            "plataformas": true,
            "multinacionales": true,
            "multimillonarios": true,
            "inversión": true,
            "financiero": {
              "política monetaria": {
                "tipos": true,
                "reservas": true,
                "compra activos": true
              },
              "liquidez": true,
              "fondos": true,
              "bolsa": {
                "dividendos": false
              },
              "deuda": {
                "deuda estatal": true,
                "deuda corporativa": true
              },
              "bonos": {
                "dividendos": true
              },
              "bancos centrales": {
                "bce": true,
                "fed": true
              },
              "divisas": {
                "euro": true,
                "yen": true,
                "rublo": true
              },
              "oro": true,
              "remesas": true,
              "criptomoneda": true
            },
            "sobreproducción": {
              "sobreproducción de capitales": true
            }
          },
          "laboral": {
            "smi": true,
            "despidos": true,
            "directivos": true,
            "sindicalismo subvencionado": true,
            "asesinato laboral": true,
            "patronal": true
          },
          "imperialismo": {
            "ayudas": true
          },
          "situación interna": {
            "proletarización": true,
            "pequeña burguesía": true,
            "patronal": true
          },
          "des-integración": {
            "brexit": true
          },
          "militar": {
            "type": "B",
            "otan": true,
            "armamento": true,
            "misiles": true,
            "fuerzas navales": true,
            "fuerzas terrestres": false,
            "fuerzas aéreas": false,
            "atentado": true
          },
          "relaciones comerciales": {
            "import-export": true
          },
          "inmigración": true,
          "fronteras": true,
          "guerra comercial": {
            "sanciones": true
          },
          "infraestructuras": true,
          "crisis": {
            "type": "B",
            "colapso": true,
            "caída": true,
            "escasez": true,
            "sobreproducción": false,
            "quiebra": true,
            "impago": true,
            "corte": true
          },
          "patentes": true,
          "control social": {
            "drogas": {
              "marihuana": true
            },
            "religión": true,
            "circo parlamentario": true
          },
          "organismos internacionales": {
            "type": "B",
            "ocde": true,
            "fmi": true,
            "g7": true,
            "aie": true
          },
          "contaminación": true,
          "intervención estatal": {
            "nacionalización-privatización": true,
            "ayudas": true
          },
          "ciencia burguesa": true,
          "desarrollo productivo": true,
          "informe": true
        }
      }
    )
  }

  /* Logic for Tagger */

  const handleTaggedFiles = (a) => {
    setTaggedFiles(a);
  };

  /* Logic for Uploader */

  const handleUploadFiles = () => {
    setUploaderUpload({ status: undefined, msg: ["Loading..."] });
    Promise.all(
      pdfFiles.map((file) => {
        return uploadFile(file, file.webkitRelativePath);
      })
    ).then((_) =>
      setUploaderUpload({ status: true, msg: ["Everything loaded."] })
    );
  };

  const handleUploadFilesToBackUp = () => {
    setUploaderUploadToBackUp({ status: undefined, msg: ["Loading..."] });
    Promise.all(
      pdfFiles.map((file) => {
        return uploadFileToBackUp(file, file.webkitRelativePath);
      })
    ).then((_) =>
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
    !!fileUrls.length
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
    !!fileUrls.length
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
      if ( url.length && url2.length) {
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

    !!mergedTmp.length
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
    writeDataSession(merged,session).then((result) => {
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

  return (
    <PressUploaderContext.Provider
      value={{
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
        handleDictionary,
        dictionary,

        //// TAGGER
        // origin,
        files,
        orderFileContent,
        // relativePath,
        taggedFiles,
        handleTaggedFiles,
        previous,
        setPrevious,
        session,
        setMerged,
        handlePreviousAfterLoad,

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
