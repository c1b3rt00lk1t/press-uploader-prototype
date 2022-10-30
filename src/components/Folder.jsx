import React, { useState } from "react";
import Edit from "./Edit";
import File from "./File";

const Folder = ({
  folder,
  draggableFiles,
  srcFilesObj,
  hoverOn,
  handleDeleteFile,
  handleDeleteFolder
}) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true && hoverOn)}
      onMouseLeave={() => setHover(false)}
      className="orderFolder"
      key={folder.id}
      draggable
      id={folder.id}
      onDragStart={(ev) => {
        ev.dataTransfer.setData("id", folder.id);
      }}
    >
      {hover && folder.folder !== "Drag a folder and drop it here..." && <Edit handleDelete={handleDeleteFolder} editId={folder.id}/>}
      {folder.folder}
      <ul>
        {folder.files.map((file) => (
          <File
            draggableFiles={draggableFiles}
            folder={folder}
            key={file.id}
            file={file}
            srcFilesObj={srcFilesObj}
            hoverOn={hoverOn}
            handleDeleteFile={handleDeleteFile}
          />
        ))}
      </ul>
    </li>
  );
};

export default Folder;
