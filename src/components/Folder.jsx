import React from "react";
import File from "./File";

const Folder = ({ folder, draggableFiles, srcFilesObj, hoverOn }) => {
  

  return (
    <li
      className="orderFolder"
      key={folder.id}
      draggable
      id={folder.id}
      onDragStart={(ev) => {
        ev.dataTransfer.setData("id", folder.id);
      }}
    >
      {folder.folder}
      <ul>
        {folder.files.map((file) => (
          <File draggableFiles={draggableFiles} folder={folder} file={file} srcFilesObj={srcFilesObj} hoverOn={hoverOn}/>
        ))}
      </ul>
    </li>
  );
};

export default Folder;
