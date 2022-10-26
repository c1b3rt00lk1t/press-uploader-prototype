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

    }, [])
    // This last filter make the folder block disappear once it is dropped to the new order.
    .filter(folder => !newOrder.map(a => a.id).includes(folder.id));



  return (
    <div className="horizontal">
      <div className="horizontal">
        <ul className="orderContentList" style={{ width: "25vw" }}>
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder} draggableFiles={false}/>
          ))}
        </ul>
      </div>
      <div className="horizontal">
        <ul className="orderContentList" style={{ width: "60vw", marginRight: "5vw" }} onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => {
          ev.stopPropagation();
          const onDragId = ev.dataTransfer.getData("id");
          console.log('onDragId',onDragId)

          // Handling of the folder block
          if(ev.target.className==='orderFolder'){
            const onDropId = ev.target.id;
            const onDropIdx = newOrder.findIndex( folder => folder.id === onDropId);
          
            // First time handling
            if(!newOrder.filter( folder => folder.id === onDragId).length){
              const draggedFolder = folders.filter( folder => folder.id === onDragId);
              setNewOrder(newOrder.slice(0,onDropIdx).concat(draggedFolder).concat(newOrder.slice(onDropIdx)));
            } else {
              // Folder block movements 
              const draggedFolder = newOrder.filter( folder => folder.id === onDragId);
              const onDragIdx = newOrder.findIndex(folder => folder.id === onDragId);

              onDragIdx > onDropIdx ? 
                      setNewOrder(newOrder.slice(0,onDropIdx).concat(draggedFolder).concat(newOrder.slice(onDropIdx,onDragIdx)).concat(newOrder.slice(onDragIdx + 1))) : 
                      setNewOrder(newOrder.slice(0,onDragIdx).concat(newOrder.slice(onDragIdx + 1, onDropIdx)).concat(draggedFolder).concat(newOrder.slice(onDropIdx)));
            }     
          } 
        
        }}>
           {newOrder.map((folder) => (
            <Folder key={folder.id} folder={folder} draggableFiles={true}/>
          ))}
          </ul></div>
    </div>
  );
};

export default Order;
