import React, {useState} from 'react'
import Edit from './Edit';

const File = ({draggableFiles,folder ,file, srcFilesObj, hoverOn, handleDeleteFile}) => {
    const tagStyle = {
        fontSize: "10px",
        border: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        marginRight: "5px",
        paddingLeft: "2px",
        textAlign: "center",
        lineHeight: "20px",
        height: "20px",
      };

      const [hover, setHover] = useState(false);

  return (
    <li
            className="orderFile"
            onMouseEnter={() => setHover(true && hoverOn)}
            onMouseLeave={() => setHover(false)}
            draggable={draggableFiles}
            onDragStart={(ev) => {
              ev.stopPropagation();
              ev.dataTransfer.setData("id", file.id);
            }}

            id={file.id}
            style={{
              color:
                srcFilesObj && srcFilesObj[file.id] !== folder.id
                  ? "rgb(220, 0, 0)"
                  : "black",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {hover && <Edit handleDelete={handleDeleteFile} editId={file.id}/>}{" "}
            {srcFilesObj &&
              srcFilesObj[file.id] !== folder.id &&
              (srcFilesObj[file.id] ? (
                <span style={tagStyle}>
                  check: {srcFilesObj && srcFilesObj[file.id]}{" "}
                </span>
              ) : (
                <span style={tagStyle}>not found </span>
              ))}{" "}
            {file.id}

            
          </li>
  )
}

export default File