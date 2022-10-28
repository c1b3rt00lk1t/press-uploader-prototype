import React, { useContext, useState } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";

import Folder from "../components/Folder";
import { FiDownloadCloud, FiUpload } from "react-icons/fi";

const Order = () => {
  // state for the new order
  const [newOrder, setNewOrder] = useState([
    { folder: "Add folder...", files: [], id: "Add folder..." },
  ]);

  // pdffiles and order file content are retrieved from context
  const { pdfFiles, relativePath, orderFileContent } =
    useContext(PressUploaderContext);

  // the order file content is transformed to the folders variable (see below) format
  const target = orderFileContent.reduce(
    (acc, b) => {
      if (isNaN(b[0])) {
        acc.result.push({ folder: b, files: [], id: b });
        acc.index++;
      } else {
        acc.result[acc.index].files.push({ file: null, id: b });
      }
      return acc;
    },
    { result: [], index: -1 }
  ).result;

  // the pdf files info is simmplified
  const srcFiles = pdfFiles.map((file) => ({
    file: file,
    id: file.name.replace(/.pdf/g, ""),
    folder: file.webkitRelativePath
      .replace(`${relativePath}/`, "")
      .replace(`/${file.name}`, ""),
  }));

  // Hashtable (object) with ids and folders
  const srcFilesObj = srcFiles.reduce((acc,b) => ({...acc,[b.id]:b.folder}),{});

// the files that are already in the new order are filtered out
  const files = srcFiles
  .filter(item => !newOrder.flatMap((folder) => folder.files.map(file => file.id)).includes(item.id));

  // the pdf files info is restructured so that are grouped by folder
  const folders = files
    .sort((a, b) => (a.folder > b.folder ? 1 : -1))
    .reduce((acc, b) => {
      if (acc.length) {
        if (acc[acc.length - 1].folder !== b.folder) {
          return acc.concat({
            folder: b.folder,
            files: [{ file: b.file, id: b.id }],
            id: b.folder,
          });
        } else {
          const arrayPrev = acc.slice(0, acc.length - 1);
          const changedItem = acc[acc.length - 1];
          changedItem.files.push({ file: b.file, id: b.id });
          return [...arrayPrev, changedItem];
        }
      } else {
        return acc.concat({
          folder: b.folder,
          files: [{ file: b.file, id: b.id }],
          id: b.folder,
        });
      }
    }, [])

  // in case there is an order file content, it can be loaded, overwriting the new order content
  const handleUploadOrderClick = () => {
    if (target.length) {
      setNewOrder([
        ...target,
        { folder: "Add folder...", files: [], id: "Add folder..." },
      ]);
    } else {
      window.alert("Missing order file or basic checks not done.");
    }
  };

  return (
    <>
      <button onClick={handleUploadOrderClick}>
        Upload order
        <FiUpload style={{ color: "black", marginLeft: "5px" }} />
      </button>
      <button onClick={() => {}}>
        <a
          style={{ color: "black" }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            newOrder
              .slice(0, -1)
              .map(
                (a) =>
                  `${a.folder}\r\n${a.files
                    .map((file) => file.id)
                    .join("\r\n")}`
              )
              .join("\r\n\r\n")
          )}`}
          download={"Order.txt"}
        >
          Download order
          <FiDownloadCloud style={{ color: "black", marginLeft: "5px" }} />
        </a>
      </button>

      <div className="horizontal">
        <div>
        <h3 style={{marginLeft: "15px"}}>Source folders:</h3>
          <div className="horizontal">
            <ul className="orderContentList" style={{ width: "25vw" }}>
              {folders.map((folder) => (
                <Folder key={folder.id} folder={folder} draggableFiles={true} />
              ))}
            </ul>
          </div>
        </div>
        <div>
        <h3 style={{marginLeft: "15px"}}>Order:</h3>
        <div className="horizontal">
          <ul
            className="orderContentList"
            style={{ width: "60vw", marginRight: "5vw" }}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={(ev) => {
              ev.stopPropagation();
              const onDragId = ev.dataTransfer.getData("id");
              const onDropId = ev.target.id;

              // Handling of the folder block
              if (ev.target.className === "orderFolder") {
                const onDropIdx = newOrder.findIndex(
                  (folder) => folder.id === onDropId
                );

                // First time handling
                if (
                  !newOrder.filter((folder) => folder.id === onDragId).length
                ) {
                  const draggedFolder = folders.filter(
                    (folder) => folder.id === onDragId
                  );
                  setNewOrder(
                    newOrder
                      .slice(0, onDropIdx)
                      .concat(draggedFolder)
                      .concat(newOrder.slice(onDropIdx))
                  );
                } else {
                  // Folder block movements
                  // Check to prevent duplicate folder blocks
                  if (onDragId !== onDropId) {
                    const draggedFolder = newOrder.filter(
                      (folder) => folder.id === onDragId
                    );
                    const onDragIdx = newOrder.findIndex(
                      (folder) => folder.id === onDragId
                    );

                    onDragIdx > onDropIdx
                      ? setNewOrder(
                          newOrder
                            .slice(0, onDropIdx)
                            .concat(draggedFolder)
                            .concat(newOrder.slice(onDropIdx, onDragIdx))
                            .concat(newOrder.slice(onDragIdx + 1))
                        )
                      : setNewOrder(
                          newOrder
                            .slice(0, onDragIdx)
                            .concat(newOrder.slice(onDragIdx + 1, onDropIdx))
                            .concat(draggedFolder)
                            .concat(newOrder.slice(onDropIdx))
                        );
                    }
                }
              } else if (ev.target.className === "orderFile") {
                // Handling of files reorders
                const folderOfDraggedFile = newOrder.filter((folder) =>
                  folder.files.map((file) => file.id).includes(onDragId)
                );

                const folderOfDroppedFile = newOrder.filter((folder) =>
                  folder.files.map((file) => file.id).includes(onDropId)
                );
                const folderOfDroppedFileIdx = newOrder.findIndex(
                  (folder) => folder.id === folderOfDroppedFile[0].id
                );

                if (!folderOfDraggedFile.length){
                  
                  const dropFileRelIdx = folderOfDroppedFile[0].files.findIndex(
                    (file) => file.id === onDropId
                  );

                  const newOrderCopy = [...newOrder];
                  newOrderCopy[folderOfDroppedFileIdx].files.splice(
                    dropFileRelIdx,
                    0,
                    {file: null, id: onDragId}
                  );
                  
                  setNewOrder(newOrderCopy);

                } else if (folderOfDraggedFile[0].id !== folderOfDroppedFile[0].id) { 
                // Handling of files reorders across different folder blocks
                  const folderOfDraggedFileIdx = newOrder.findIndex(
                    (folder) => folder.id === folderOfDraggedFile[0].id
                  );
                  const draggedFileRelIdx =
                      folderOfDraggedFile[0].files.findIndex(
                      (file) => file.id === onDragId
                    );
                  const draggedFileRel = folderOfDraggedFile[0].files.filter(
                    (file) => file.id === onDragId
                  )[0];
                  const dropFileRelIdx = folderOfDroppedFile[0].files.findIndex(
                    (file) => file.id === onDropId
                  );
                  const newOrderCopy = [...newOrder];
                  newOrderCopy[folderOfDroppedFileIdx].files.splice(
                    dropFileRelIdx,
                    0,
                    draggedFileRel
                  );
                  newOrderCopy[folderOfDraggedFileIdx].files.splice(
                    draggedFileRelIdx,
                    1
                  );

                  setNewOrder(newOrderCopy);


                } else if (folderOfDraggedFile[0].id === folderOfDroppedFile[0].id) {
                 // Handling of files reorders inside the same folder block
                  const draggedFileRelIdx =
                      folderOfDraggedFile[0].files.findIndex(
                      (file) => file.id === onDragId
                    );
                  const draggedFileRel = folderOfDraggedFile[0].files.filter(
                    (file) => file.id === onDragId
                  )[0];

                  const dropFileRelIdx = folderOfDroppedFile[0].files.findIndex(
                    (file) => file.id === onDropId
                  );

                  const newOrderCopy = [...newOrder];
                  newOrderCopy[folderOfDroppedFileIdx].files.splice(
                    dropFileRelIdx,
                    0,
                    draggedFileRel
                  );
                  newOrderCopy[folderOfDroppedFileIdx].files.splice(
                    draggedFileRelIdx > dropFileRelIdx
                      ? draggedFileRelIdx + 1
                      : draggedFileRelIdx,
                    1
                  );

                  setNewOrder(newOrderCopy);
                } 
              }
            }}
          >
            {newOrder.map((folder) => (
              <Folder key={folder.id} folder={folder} draggableFiles={true} srcFilesObj={srcFilesObj} hoverOn={true}/>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default Order;
