import React from "react";
import { useNavigate } from "react-router-dom";

const TagsForm = ({
  selectedFile,
  handleTagsNext,
  // handleZonesChange,
  // handleSectorsChange,
  // handleTagsChange,
  handleTagsLoad,
  handleMergeLoad,
  relativePath,
  session,
  taggedFiles,
  origin,
  formatFileTags,
  setMerged,
}) => {
  // let { zones, sectors, tags } = selectedFile;

  const navigate = useNavigate();

  const clickLoader = () => {
    // Triggers the event
    document.getElementById("loader-selector").click();
  };

  const clickMerger = () => {
    // Triggers the event
    document.getElementById("merger-selector").click();
  };

  return (
    <div className="tagsForm">
      {/* <div>
        Zones:
        <div>
          <input
            type="text"
            style={{ width: "15vw" }}
            onChange={handleZonesChange}
            value={zones}
          ></input>
        </div>
      </div>
      <div>
        Sectors:
        <div>
          <input
            type="text"
            style={{ width: "15vw" }}
            onChange={handleSectorsChange}
            value={sectors}
          ></input>
        </div>
      </div>
      <div>
        Tags:
        <div>
          <input
            type="text"
            style={{ width: "15vw" }}
            onChange={handleTagsChange}
            value={tags}
          ></input>
        </div>
      </div> */}
      <div className={"tagFormBtns"}>
        <button onClick={handleTagsNext}>Next</button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(taggedFiles)
          )}`}
          download={`${
            relativePath ? "tagged" : "merged"
          }_${session}_${new Date().getFullYear()}${(new Date().getMonth() + 1)
            .toString()
            .padStart(2, "0")}${new Date().getDate()}_${new Date()
            .getHours()
            .toString()
            .padStart(2, "0")}${new Date().getMinutes()}.json`}
        >
          <button>{`Save`}</button>
        </a>

        <button onClick={clickLoader} id="display-loader">
          Load
        </button>
        <input
          onChange={handleTagsLoad}
          type="file"
          accept=".json"
          id="loader-selector"
          name="fileLoad"
          style={{ display: "none" }}
        />
        <button onClick={clickMerger} id="display-merger">
          Merge
        </button>
        <input
          onChange={handleMergeLoad}
          type="file"
          accept=".json"
          id="merger-selector"
          name="fileMerge"
          style={{ display: "none" }}
        />

        <button
          onClick={(ev) => {
            handleTagsNext(ev);
            if (origin === "folder") {
              console.log(taggedFiles)
              if (taggedFiles[0].url && taggedFiles[0].url2) {
                console.log('Urls already merged.')
                setMerged(taggedFiles.map((a) => formatFileTags(a)));
                navigate("/merger");
              } else {
                navigate("/uploader");
              }
            } else if (origin === "server") {
              setMerged(taggedFiles.map((a) => formatFileTags(a)));
              navigate("/merger");
            }
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TagsForm;
