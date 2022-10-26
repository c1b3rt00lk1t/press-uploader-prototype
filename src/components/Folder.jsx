import React from "react";

const Folder = ({ folder }) => {
  return (
    <li
      className="orderFolder"
      key={folder.id}
      draggable
      id={folder.id}
      onDragStart={(ev) => {
        console.log("dragstart:", folder.id);
        ev.dataTransfer.setData("id", folder.id);
      }}
    >
      {folder.folder}
      <ul>
        {folder.files.map((file) => (
          <li
            className="orderFile"
            draggable
            onDragStart={(ev) => {
              ev.stopPropagation();
              console.log("dragstart:", file.id);
              ev.dataTransfer.setData("id", file.id);
            }}
            key={file.id}
            id={file.id}
          >
            {file.file.name.replace(/.pdf/g, "")}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Folder;
