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
  } = useContext(PressUploaderContext);

  // get the focus for usage of onKeyDown
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
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
    console.log(input);

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
      setSelected(orderArray[orderArray.indexOf(selected) + 1]);
    } else if (selected >= maxOrder) {
      setSelected(minOrder);
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
            file.zones.push(...toMerge.zones);
          }
          if (toMerge.sectors.length) {
            file.sectors.push(...toMerge.sectors);
          }
          if (toMerge.tags.length) {
            file.tags.push(...toMerge.tags);
          }
          if (toMerge.others.length) {
            file.others.push(...toMerge.others);
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
  const handleKeyDown = (ev) => {
    if (ev.key === "n" || ev.key === "N") {
      handleTagsNext(ev);
    } else if (ev.key === "d" || ev.key === "D") {
      document.getElementById("doneBtn").click();
    } else if (ev.key === "m" || ev.key === "M") {
      document.getElementById("merger-selector").click();
    } else if (ev.key === "l" || ev.key === "L") {
      document.getElementById("loader-selector").click();
    } else if (ev.key === "r" || ev.key === "R") {
      document.getElementById("dict-reset").click();
    } else if (ev.key === "p" || ev.key === "P") {
      document.getElementById("dict-prev").click();
    }

  };

  const selectedFile = taggedFiles.filter((item) => item.order === selected)[0];
  const url =
    origin === "folder"
      ? files.filter((file) => file.name.includes(selectedFile.title))[0]
      : selectedFile.url;

  return (
    // ref, tabIndex are necessary to make use of onKeyDown
    <div ref={ref} tabIndex="-1" onKeyDown={handleKeyDown}>
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
        <div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Tagger;
