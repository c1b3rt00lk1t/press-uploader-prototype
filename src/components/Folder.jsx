import React from "react";

const Folder = ({ folder, draggableFiles, srcFilesObj }) => {
  const tagStyle = { fontSize: "10px", border: "solid", borderRadius: "5px", borderWidth: "1px", marginRight: "5px", paddingLeft: "2px", textAlign: "center", lineHeight:"20px", height: "20px"};

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
            style={{
              color:
                srcFilesObj && srcFilesObj[file.id] !== folder.id
                  ? "rgb(220, 0, 0)"
                  : "black",
            }}
          >
            {srcFilesObj && srcFilesObj[file.id] !== folder.id && (
              srcFilesObj[file.id] ?
              <span style={tagStyle}>
                check: {srcFilesObj && srcFilesObj[file.id]}{" "}
              </span> : 
              <span style={tagStyle}>
               not found{" "}
            </span>
            )}{" "}
            {file.id}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Folder;
