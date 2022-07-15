import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import { useState } from "react";
import TagsForm from "../components/TagsForm";
import PreviewPdf from "../components/PreviewPdf";

const Tagger = () => {
  const {
    origin,
    files,
    taggedFiles,
    handleTaggedFiles,
    previous,
    setPrevious,
    relativePath,
    session,
    setMerged,
    handlePreviousAfterLoad,
  } = useContext(PressUploaderContext);

  const orderArray = taggedFiles
    .filter((a) => a.source !== "label")
    .map((a) => a.order);

  const minOrder = orderArray.reduce((a, b) => Math.min(+a, +b));

  const maxOrder = orderArray.reduce((a, b) => Math.max(+a, +b));

  const [selected, setSelected] = useState(+minOrder);

  const handleSelectItem = (ev) => {
    setSelected(+ev.target.dataset.order);
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
    alert("HI");

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
            file.zones.push(toMerge.zones);
          }
          if (toMerge.sectors.length) {
            file.sectors.push(toMerge.sectors);
          }
          if (toMerge.tags.length) {
            file.tags.push(toMerge.tags);
          }
          if (toMerge.others.length) {
            file.others.push(toMerge.others);
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

  const selectedFile = taggedFiles.filter((item) => item.order === selected)[0];
  const url =
    origin === "folder"
      ? files.filter((file) => file.name.includes(selectedFile.title))[0]
      : selectedFile.url;

  return (
    <div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Tagger;
