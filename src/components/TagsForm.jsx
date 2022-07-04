import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TagsForm = ({
  selectedFile,
  handleTagsNext,
  handleZonesChange,
  handleSectorsChange,
  handleTagsChange,
  relativePath,
  taggedFiles,
}) => {
  let { zones, sectors, tags } = selectedFile;

  const navigate = useNavigate();

  return (
    <div className="tagsForm">
      <div>
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
      </div>
      <div className={"tagFormBtns"}>
        <button onClick={handleTagsNext}>Next</button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(taggedFiles)
          )}`}
          download={`tagged_${relativePath}_${new Date().getFullYear()}${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}${new Date().getDate()}_${new Date()
            .getHours()
            .toString()
            .padStart(2, "0")}${new Date().getMinutes()}.json`}
        >
          <button disabled={!relativePath}>{`Save`}</button>
        </a>

        <button onClick={handleTagsNext} disabled>
          Load
        </button>
        <button
          onClick={() => {
            navigate("/uploader");
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TagsForm;
