import React from "react";
import { useState } from "react";
import TagsForm from "../components/TagsForm";
import PreviewPdf from "../components/PreviewPdf";

const Tagger = ({
  files,
  taggedFiles,
  handleTaggedFiles,
  previous,
  setPrevious,
  relativePath,
}) => {
  const [selected, setSelected] = useState(+2);

  const handleSelectItem = (ev) => {
    setSelected(+ev.target.dataset.order);
  };

  /* Logic for the Tag Form */

  
  const formatTags = (tags) => {
    if (tags){
    return tags
      .map((tag) => tag.trim())
      .map((tag) => tag.toLowerCase())
      .filter((tag) => tag !== "");
    } else {
      return [];
    }
  };

  const formatFileTags = (file) => {
    const formated = {...file};
    formated.zones = formatTags(formated.zones); 
    formated.sectors = formatTags(formated.sectors); 
    formated.tags = formatTags(formated.tags); 
    return formated;
  }

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

    if (selected < taggedFiles.length - 1) {
      setSelected(selected + 1);
    } else if (selected >= taggedFiles.length - 1) {
      setSelected(+2);
    }
  };

  const selectedFile = taggedFiles.filter((item) => item.order === selected)[0];

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
          />
        </div>
      </div>
    </div>
  );
};

export default Tagger;
