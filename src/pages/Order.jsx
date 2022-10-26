import React, { useContext, useState } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";

import Folder from "../components/Folder";


const Order = () => {

  const [newOrder, setNewOrder] = useState([{folder: 'Add folder...', files:[], id: 'Add folder...'}]);

  const {
    pdfFiles, relativePath
  } = useContext(PressUploaderContext);

  const files = pdfFiles.map((file) => ({
    file: file,
    id: file.name,
    folder: file.webkitRelativePath
      .replace(`${relativePath}/`, "")
      .replace(`/${file.name}`, ""),
  }));


  const folders = files
    .sort((a, b) => (a.folder > b.folder ? 1 : -1))
    .reduce((acc, b) => {
      if (acc.length){
        if (acc[acc.length - 1].folder !== b.folder){
           return acc.concat({folder: b.folder, files: [{file: b.file, id: b.id}], id: b.folder})
        } else {
          const arrayPrev = acc.slice(0,acc.length - 1);
          const changedItem = acc[acc.length - 1];
          changedItem.files.push({file: b.file, id: b.id})
          return [...arrayPrev,changedItem];
        }


      } else {
        return acc.concat({folder: b.folder, files: [{file: b.file, id: b.id}], id: b.folder})
      }

    }, []);



  return (
    <div className="horizontal">
      <div className="horizontal">
        <ul className="orderContentList" style={{ width: "37.5vw" }}>
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder}/>
          ))}
        </ul>
      </div>
      <div className="horizontal">
        <ul className="orderContentList" style={{ width: "37.5vw", marginRight: "5vw" }} onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => {
          ev.stopPropagation();
          const id = ev.dataTransfer.getData("id");
          if(ev.target.className==='orderFolder'){
            const onDropId = ev.target.id;
            const onDropIdx = newOrder.findIndex( folder => folder.id === onDropId);
            const draggedFolder = folders.filter( folder => folder.id === id);

            if(!newOrder.filter( folder => folder.id === id).length){
              setNewOrder(newOrder.slice(0,onDropIdx).concat(draggedFolder).concat(newOrder.slice(onDropIdx)))
            }      
            console.log('orderFolder hit')
            console.log(ev.target, onDropId,onDropIdx )
          }
        
        }}>
           {newOrder.map((folder) => (
            <Folder key={folder.id} folder={folder}/>
          ))}
          </ul></div>
    </div>
  );
};

export default Order;
