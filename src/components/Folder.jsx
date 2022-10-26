import React from "react";

const Folder = ({ folder }) => {
  return (
    <li
      key={folder.id}
      draggable
      onDragStart={(ev) => {
        console.log("dragstart:", folder.id);
        ev.dataTransfer.setData("id", folder.id);
      }}
    >
      {folder.folder}
      <ul>
        {folder.files.map((file) => (
          <li
            draggable
            onDragStart={(ev) => {
              ev.stopPropagation();
              console.log("dragstart:", file.id);
              ev.dataTransfer.setData("id", file.id);
            }}
            key={file.id}
          >
            {file.file.name.replace(/.pdf/g, "")}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Folder;
