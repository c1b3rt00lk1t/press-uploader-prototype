import React from "react";

const TagsForm = ({
  selectedFile,
  handleTagsNext,
  handleZonesChange,
  handleSectorsChange,
  handleTagsChange,
}) => {
  let { zones, sectors, tags } = selectedFile;

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
      <div className={'tagFormBtns'}>
        <button onClick={handleTagsNext}>Next</button>
        <button onClick={handleTagsNext} disabled>Save</button>
        <button onClick={handleTagsNext} disabled>Load</button>
        <button onClick={handleTagsNext} disabled>Done</button>
      </div>
    </div>
  );
};

export default TagsForm;
