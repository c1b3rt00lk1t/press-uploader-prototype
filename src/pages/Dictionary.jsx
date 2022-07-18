import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Tree from "./Tree";

const Dictionary = () => {
  const { handleUploadDictionary, handleGetDictionaryFromDB,handleDictionary, dictionary } =
    useContext(PressUploaderContext);

  return (<>
  <h1>Dictionary</h1>
  {!!dictionary && <Tree inputs={dictionary.zones}/>}
  <button onClick={handleGetDictionaryFromDB}>Get dictionary</button>
  <button onClick={handleDictionary("america",true,true)}>Set dictionary</button>
  <button onClick={handleUploadDictionary}>Send dictionary</button>
  
  </>)
};

export default Dictionary;
