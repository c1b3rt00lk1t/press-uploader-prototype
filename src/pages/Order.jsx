import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";

import { v4 as uuidv4 } from "uuid";
import Folder from "../components/Folder";

const Order = () => {
  const {
    pdfFiles, relativePath
  } = useContext(PressUploaderContext);

  const files = pdfFiles.map((file) => ({
    file: file,
    id: uuidv4(),
    folder: file.webkitRelativePath
      .replace(`${relativePath}/`, "")
      .replace(`/${file.name}`, ""),
  }));


  const folders = files
    .sort((a, b) => (a.folder > b.folder ? 1 : -1))
    .reduce((acc, b) => {
      if (acc.length){
        if (acc[acc.length - 1].folder !== b.folder){
           return acc.concat({folder: b.folder, files: [{file: b.file, id: b.id}], id: uuidv4()})
        } else {
          const arrayPrev = acc.slice(0,acc.length - 1);
          const changedItem = acc[acc.length - 1];
          changedItem.files.push({file: b.file, id: b.id})
          return [...arrayPrev,changedItem];
        }


      } else {
        return acc.concat({folder: b.folder, files: [{file: b.file, id: b.id}], id: uuidv4()})
      }

    }, []);


  // folders.length && console.log(folders);

  return (
    <div>
      <div className="horizontal">
        <ul className="orderContentList" style={{ width: "40vw" }}>
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
