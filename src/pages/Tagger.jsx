import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import { useState } from "react";
import TagsForm from "../components/TagsForm";
import PreviewPdf from "../components/PreviewPdf";
import Dictionary from "../components/dictionary/Dictionary";


const Tagger = () => {
  const {
    origin,
    files,
    taggedFiles,
    handleTaggedFiles,
    previous,
    setPrevious,
    selectedTagger, 
    setSelectedTagger,
    relativePath,
    session,
    setMerged,
    handlePreviousAfterLoad,
    handleDirectUploadMerged
  } = useContext(PressUploaderContext);

  // get the focus for usage of onKeyDown
  const refFocus = useRef(null);

  // ref for buttons in TagsForm
  const refDoneBtn = useRef();
  const refMergerSelector = useRef();
  const refSendBtn = useRef();

  // ref for the searchBox focus
  const refSearchBoxInput = useRef();

  // ref for buttons in Dictionary
  const refResetBtn = useRef();
  const refPastePreviousBtn = useRef();
  const refPasteLastBtn = useRef();

  useEffect(() => {
    refFocus.current.focus();
  }, []);

  // preparations

  const orderArray = taggedFiles
    .filter((a) => a.source !== "label")
    .map((a) => a.order);

  const minOrder = orderArray.reduce((a, b) => Math.min(+a, +b));

  const maxOrder = orderArray.reduce((a, b) => Math.max(+a, +b));

  const [selected, setSelected] = useState(selectedTagger || +minOrder);

  const handleSelectItem = (ev) => {
    setSelected(+ev.target.dataset.order);
    // used to keep a global reference to the selected file in the tagger so that it does not return to the first one every time the tagger is exited
    setSelectedTagger(+ev.target.dataset.order)
  };

  /* Logic for the Tag Form */

  const formatTags = (tags) => {
    if (tags) {
      return tags
        .map((tag) => tag.trim())
        .map((tag) => tag.toLowerCase())
        .filter((tag) => tag !== "");
    } else {
      return [];
    }
  };

  const formatFileTags = (file) => {
    const formated = { ...file };
    formated.zones = formatTags(formated.zones);
    formated.sectors = formatTags(formated.sectors);
    formated.tags = formatTags(formated.tags);
    return formated;
  };

  const handleZonesChange = (ev) => {
    handleTaggedFiles(
      taggedFiles.map((a) =>
        a.order === selected ? { ...a, zones: ev.target.value.split(",") } : a
      )
    );
  };

  const handleChangeDictionary = (type) => (input) => {
    handleTaggedFiles(
      taggedFiles.map((a) => {
        if (a.order === selected) {
          const b = { ...a };
          b[type] = input;
          return b;
        } else {
          return a;
        }
      })
    );
  };

  const handleZonesChangeDictionary = handleChangeDictionary("zones");
  const handleSectorsChangeDictionary = handleChangeDictionary("sectors");
  const handleTagsChangeDictionary = handleChangeDictionary("tags");
  const handleResetDictionary = () => {
    handleTaggedFiles(
      taggedFiles.map((a) => {
        if (a.order === selected) {
          const b = { ...a };
          b.zones = [];
          b.sectors = [];
          b.tags = [];
          return b;
        } else {
          return a;
        }
      })
    );
  };

  const handleGetPreviousTags = (previousItem) => {
    handleTaggedFiles(
      taggedFiles.map((a) => {
        if (a.order === selected) {
          const b = { ...a };
          b.zones = previousItem.zones;
          b.sectors = previousItem.sectors;
          b.tags = previousItem.tags;
          return b;
        } else {
          return a;
        }
      })
    );
  };

  const handleSectorsChange = (ev) => {
    handleTaggedFiles(
      taggedFiles.map((a) =>
        a.order === selected ? { ...a, sectors: ev.target.value.split(",") } : a
      )
    );
  };

  const handleTagsChange = (ev) => {
    handleTaggedFiles(
      taggedFiles.map((a) =>
        a.order === selected ? { ...a, tags: ev.target.value.split(",") } : a
      )
    );
  };

  const handleTagsNext = (ev) => {
    ev.preventDefault();

    handleTaggedFiles(taggedFiles.map((a) => formatFileTags(a)));

    setPrevious(previous.concat(selected));

    if (selected < maxOrder) {
      const index = orderArray[orderArray.indexOf(selected) + 1];
      setSelected(index);
      setSelectedTagger(index)
    } else if (selected >= maxOrder) {
      setSelected(minOrder);
      setSelectedTagger(minOrder);
    }
  };

  const handleTagsLoad = async (ev) => {
    const filesArray = [...ev.target.files];

    const fr = new FileReader();
    const fileTagged = await new Promise((resolve) => {
      fr.onload = () => resolve(fr.result);
      fr.readAsText(filesArray[0], "UTF-8");
    });
    const fileTaggedParsed = JSON.parse(fileTagged);

    if (fileTaggedParsed[0].session === session) {
      handleTaggedFiles(fileTaggedParsed);
      handlePreviousAfterLoad(fileTaggedParsed);
    } else {
      alert(
        "The tagged file does not correspond to the current working session."
      );
    }
  };

  const handleMergeLoad = async (ev) => {
    const filesArray = [...ev.target.files];

    const fr = new FileReader();
    const fileTagged = await new Promise((resolve) => {
      fr.onload = () => resolve(fr.result);
      fr.readAsText(filesArray[0], "UTF-8");
    });
    const fileTaggedParsed = JSON.parse(fileTagged);

    if (fileTaggedParsed[0].session === session) {
      const mergedTagFiles = taggedFiles.map((file) => {
        const toMerge = fileTaggedParsed.filter(
          (input) => input.title === file.title
        )[0];

        if (toMerge) {
          if (toMerge.zones.length) {
            file.zones = [...new Set([...file.zones,...toMerge.zones])];
          }
          if (toMerge.sectors.length) {
            file.sectors = [...new Set([...file.sectors,...toMerge.sectors])];
          }
          if (toMerge.tags.length) {
            file.tags =  [...new Set([...file.tags,...toMerge.tags])];
          }
          if (toMerge.others.length) {
            file.others = [...new Set([...file.others,...toMerge.others])];;
          }
        }

        return file;
      });

      handleTaggedFiles(mergedTagFiles);
      handlePreviousAfterLoad(mergedTagFiles);
    } else {
      alert(
        "The tagged file does not correspond to the current working session."
      );
    }
  };

  /* Handling of the onKeyDown event */

  // sets the state of the focus for the search box component
  const [searchBoxfocus, setSearchBoxFocus] = useState(false);
  const handleSearchBoxFocus = () => setSearchBoxFocus(true);
  const handleSearchBoxBlur = () => setSearchBoxFocus(false);

  const handleKeyDown = (ev) => {
   // enables only the keyboard shortcuts if the focus is not in the search box component
   if( !searchBoxfocus ) {
    if (ev.key === "n" || ev.key === "N")  {
      handleTagsNext(ev);
    } else if (ev.key === "d" || ev.key === "D") {
      refDoneBtn.current.click();
      // document.getElementById("doneBtn").click();
    } else if (ev.key === "m" || ev.key === "M") {
      refMergerSelector.current.click();
      // document.getElementById("merger-selector").click();
    } else if (ev.key === "l" || ev.key === "L") {
      refPasteLastBtn.current.click();
      // document.getElementById("select-last").click();
    } else if (ev.key === "r" || ev.key === "R") {
      refResetBtn.current.click();
      // document.getElementById("dict-reset").click();
    } else if (ev.key === "p" || ev.key === "P") {
      refPastePreviousBtn.current.click();
      // document.getElementById("dict-prev").click();
    } else if (ev.key === "s" || ev.key === "S") {
      refSendBtn.current.click();
      // document.getElementById("sendBtn").click();
    } else if (ev.key === "f" || ev.key === "F")  {
      // allows to focus on the search box
      ev.preventDefault();
      refSearchBoxInput.current.focus();
      // document.querySelector("input").focus();
    } 
   } else if (ev.key === "AltGraph") {
      ev.preventDefault();
      document.querySelector('#dictionary-search-box-check').click();
   } else if (ev.key === "Shift") {
    document.getElementById('nextBtn').focus()
   }

  };

  const selectedFile = taggedFiles.filter((item) => item.order === selected)[0];
  const url =
    origin === "folder"
      ? files.filter((file) => file.name.includes(selectedFile.title))[0]
      : selectedFile.url;

  return (
    // ref, tabIndex are necessary to make use of onKeyDown
    <div ref={refFocus} tabIndex="-1" onKeyDown={handleKeyDown}>
      <div className="horizontal">
        <ul className="orderContentList">
          {taggedFiles.map((item) => (
            <li
              onClick={handleSelectItem}
              key={item.order}
              data-order={item.order}
              className={`${
                item.source !== "label" && item.order === selected
                  ? "selectedContentItem"
                  : undefined
              } ${item.source === "label" ? "label" : undefined} ${
                previous.indexOf(item.order) > -1 && item.source !== "label"
                  ? "previous"
                  : undefined
              }`}
            >
              {" "}
              {item.title}
            </li>
          ))}
        </ul>

        <div>
          <PreviewPdf
            url={url}
            files={files}
            selectedFileTitle={selectedFile.title}
            selectedFileSource={selectedFile.source}
          />
        </div>
        <div className="vertical">
          <Dictionary
            embed={true}
            selectedFile={selectedFile}
            handleZonesChangeDictionary={handleZonesChangeDictionary}
            handleSectorsChangeDictionary={handleSectorsChangeDictionary}
            handleTagsChangeDictionary={handleTagsChangeDictionary}
            handleResetDictionary={handleResetDictionary}
            // added to be able to retrieve the tags, zones and sectors of the previous one
            taggedFiles={taggedFiles}
            previous={previous}
            handleGetPreviousTags={handleGetPreviousTags}
            handleSearchBoxFocus={handleSearchBoxFocus}
            handleSearchBoxBlur={handleSearchBoxBlur}
            refSearchBoxInput={refSearchBoxInput}
            refResetBtn={refResetBtn}
            refPastePreviousBtn={refPastePreviousBtn}
            refPasteLastBtn={refPasteLastBtn}
          />
          <TagsForm
            selectedFile={selectedFile}
            handleZonesChange={handleZonesChange}
            handleSectorsChange={handleSectorsChange}
            handleTagsChange={handleTagsChange}
            handleTagsNext={handleTagsNext}
            taggedFiles={taggedFiles}
            relativePath={relativePath}
            handleTagsLoad={handleTagsLoad}
            handleMergeLoad={handleMergeLoad}
            origin={origin}
            formatFileTags={formatFileTags}
            setMerged={setMerged}
            session={session}
            handleDirectUploadMerged={handleDirectUploadMerged}
            refDoneBtn={refDoneBtn}
            refMergerSelector={refMergerSelector}
            refSendBtn={refSendBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default Tagger;
