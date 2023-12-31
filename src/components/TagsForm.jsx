/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const TagsForm = ({
  handleTagsNext,
  handleMergeLoad,
  session,
  taggedFiles,
  origin,
  formatFileTags,
  setMerged,
  handleDirectUploadMerged,
  refDoneBtn,
  refMergerSelector,
  refSendBtn,
  refNextBtn,
}) => {
  // let { zones, sectors, tags } = selectedFile;

  const navigate = useNavigate();

  // const clickLoader = () => {
  //   // Triggers the event
  //   document.getElementById("loader-selector").click();
  // };

  const clickMerger = () => {
    // Triggers the event
    refMergerSelector.current.click();
  };

  return (
    <div className="tagsForm">
      <div className={"tagFormBtns"}>
        <button id="nextBtn" ref={refNextBtn} onClick={handleTagsNext}>
          Next
        </button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(taggedFiles)
          )}`}
          download={`${
            taggedFiles[0].url && taggedFiles[0].url2 ? "merged" : "tagged"
          }_${session}_${new Date().getFullYear()}${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}${new Date().getDate()}_${new Date()
            .getHours()
            .toString()
            .padStart(2, "0")}${new Date().getMinutes()}.json`}
        >
          <button>{`Save`}</button>
        </a>

        {/* <button onClick={clickLoader} id="display-loader">
          Load
        </button>
        <input
          onChange={handleTagsLoad}
          type="file"
          accept=".json"
          id="loader-selector"
          name="fileLoad"
          style={{ display: "none" }}
        /> */}
        <button onClick={clickMerger} id="display-merger">
          Merge
        </button>
        <input
          onChange={handleMergeLoad}
          type="file"
          accept=".json"
          ref={refMergerSelector}
          id="merger-selector"
          name="fileMerge"
          style={{ display: "none" }}
        />

        {origin === "folder" && (
          <button
            id="doneBtn"
            ref={refDoneBtn}
            onClick={(ev) => {
              handleTagsNext(ev);
              if (taggedFiles[0].url && taggedFiles[0].url2) {
                console.log("Urls already merged.");
                setMerged(taggedFiles.map((a) => formatFileTags(a)));
                navigate("/merger");
              } else {
                navigate("/uploader");
              }
            }}
          >
            Done
          </button>
        )}
        {origin === "server" && (
          <button
            id="sendBtn"
            ref={refSendBtn}
            onClick={() => {
              const newMerged = taggedFiles.map((a) => formatFileTags(a));
              setMerged(newMerged);
              handleDirectUploadMerged(newMerged);
            }}
          >
            {" "}
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default TagsForm;
