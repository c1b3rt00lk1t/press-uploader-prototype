import React from "react";

const Folder = ({ folder, draggableFiles }) => {
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
          <li
            className="orderFile"
            draggable={draggableFiles}
            onDragStart={(ev) => {
              ev.stopPropagation();
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
